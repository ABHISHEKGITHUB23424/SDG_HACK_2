import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { prisma } from "../db/prisma.js";

const callLogsRouter = Router();

callLogsRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { contestId, studentId, status, page = "1" } = req.query;

        const skip = (Number(page) - 1) * 20;

        const where: any = {};
        if (contestId) where.contestId = String(contestId);
        if (studentId) where.studentId = String(studentId);
        if (status) where.callStatus = String(status);

        const logs = await prisma.callLog.findMany({
            where,
            include: {
                student: { select: { name: true, phone: true } },
                contest: { select: { name: true } }
            },
            orderBy: { initiatedAt: "desc" },
            take: 20,
            skip
        });

        const total = await prisma.callLog.count({ where });

        res.json({ success: true, data: { logs, total } });
    } catch (e) {
        next(e);
    }
});

export default callLogsRouter;
