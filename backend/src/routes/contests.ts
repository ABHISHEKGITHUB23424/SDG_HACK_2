import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { prisma } from "../db/prisma.js";
import z from "zod";
import { scheduleContestMonitor, cancelContestMonitor, runContestCheck } from "../modules/scheduler/contestScheduler.js";
import { checkParticipation } from "../modules/participation/checkParticipation.js";
import { triggerAiCall } from "../modules/calling/triggerAiCall.js";
import { logger } from "../config/logger.js";

const contestsRouter = Router();

contestsRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contests = await prisma.contest.findMany({
            include: {
                _count: { select: { participations: true } },
                participations: { select: { status: true } }
            },
            orderBy: { scheduledAt: 'desc' }
        });

        const enriched = contests.map((c: any) => {
            const joined = c.participations.filter((p: any) => p.status === "JOINED").length;
            const missing = c.participations.filter((p: any) => p.status === "MISSING").length;
            const pending = c.participations.filter((p: any) => p.status === "PENDING").length;
            return {
                ...c,
                metrics: { joined, missing, pending, total: c._count.participations }
            };
        });

        res.json({ success: true, data: enriched });
    } catch (e) { next(e); }
});

contestsRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = z.object({
            name: z.string(),
            platform: z.enum(["LeetCode", "SkillRack", "Manual"]),
            externalId: z.string(),
            scheduledAt: z.string(),
            durationMins: z.number().int(),
            studentIds: z.array(z.string()).optional(),
            targetClass: z.string().optional()
        }).parse(req.body);

        let studentIds = parsed.studentIds || [];

        if (studentIds.length === 0) {
            let whereClause: any = {};
            if (parsed.targetClass === "CSEA") {
                whereClause = { department: "CSE", section: "A" };
            } else if (parsed.targetClass === "CSEB") {
                whereClause = { department: "CSE", section: "B" };
            } else if (parsed.targetClass === "ECEA") {
                whereClause = { department: "ECE", section: "A" };
            } else {
                // Default to all students if no specific class matches or is provided
                whereClause = {};
            }

            const students = await prisma.student.findMany({ where: whereClause });
            studentIds = students.map(s => s.id);
            logger.info(`[CONTEST] Enrolling ${studentIds.length} students for class ${parsed.targetClass}`);
        }

        const contest = await prisma.contest.create({
            data: {
                name: parsed.name,
                platform: parsed.platform,
                externalId: parsed.externalId,
                scheduledAt: new Date(parsed.scheduledAt),
                durationMins: parsed.durationMins,
                status: "SCHEDULED",
                participations: {
                    create: studentIds.map((id: string) => ({ studentId: id, status: "PENDING" }))
                }
            } as any
        });

        scheduleContestMonitor(contest as any);

        res.status(201).json({ success: true, data: contest });
    } catch (e) { next(e); }
});

contestsRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const contest = await prisma.contest.findUnique({
            where: { id },
            include: {
                participations: { include: { student: true } },
                callLogs: true
            }
        });
        if (!contest) return res.status(404).json({ success: false, error: "Not Found" });
        res.json({ success: true, data: contest });
    } catch (e) { next(e); }
});

contestsRouter.patch("/:id/status", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const { status } = z.object({ status: z.enum(["ACTIVE", "COMPLETED", "CANCELLED"]) }).parse(req.body);
        const updated = await prisma.contest.update({
            where: { id },
            data: { status }
        });

        if (status === "CANCELLED" || status === "COMPLETED") {
            cancelContestMonitor(id);
        }

        res.json({ success: true, data: updated });
    } catch (e) { next(e); }
});

contestsRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        await prisma.$transaction([
            prisma.participation.deleteMany({ where: { contestId: id } }),
            prisma.callLog.deleteMany({ where: { contestId: id } }),
            prisma.contest.delete({ where: { id } })
        ]);
        cancelContestMonitor(id);
        res.json({ success: true, data: null });
    } catch (e) { next(e); }
});

contestsRouter.get("/:id/participants", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const participations = await prisma.participation.findMany({
            where: { contestId: id },
            include: { student: true }
        });
        const mapped = participations.map((p: any) => ({
            ...p.student,
            participationId: p.id,
            status: p.status,
            joinedAt: p.joinedAt,
            updatedAt: p.updatedAt
        }));
        res.json({ success: true, data: mapped });
    } catch (e) { next(e); }
});

contestsRouter.post("/:id/check", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const result = await checkParticipation(id);
        res.json({ success: true, data: result });
    } catch (e) { next(e); }
});

contestsRouter.post("/:id/trigger-auto", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        runContestCheck(id).catch(err => logger.error(`[ROUTE] Auto-trigger failed for ${id}: ${err.message}`));
        res.json({ success: true, message: "Automated sequence initiated" });
    } catch (e) { next(e); }
});

contestsRouter.post("/:id/call/:studentId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contestId = req.params.id as string;
        const studentId = req.params.studentId as string;
        const contest = await prisma.contest.findUnique({ where: { id: contestId } });
        const student = await prisma.student.findUnique({ where: { id: studentId } });
        if (!contest || !student) return res.status(404).json({ success: false, error: "Contest or Student Not Found" });

        const existingActiveLog = await prisma.callLog.findFirst({
            where: {
                contestId: contest.id,
                studentId: student.id,
                callStatus: { in: ["INITIATED", "RINGING", "IN_PROGRESS"] }
            }
        });

        if (existingActiveLog) {
            return res.status(400).json({ success: false, error: "Call currently in progress" })
        }

        const result = await triggerAiCall(student as any, contest as any, "MANUAL");
        if (result.success) {
            res.json({ success: true, data: result });
        } else {
            res.status(400).json({ success: false, error: result.error });
        }
    } catch (e: any) {
        res.status(500).json({ success: false, error: e.message || "Internal Error" });
    }
});

export default contestsRouter;
