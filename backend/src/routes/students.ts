import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { prisma } from "../db/prisma.js";
import z from "zod";

const studentsRouter = Router();

studentsRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const students = await prisma.student.findMany({ orderBy: { name: 'asc' } });
        res.json({ success: true, data: students });
    } catch (e) { next(e) }
});

studentsRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bodyArgs = z.object({
            name: z.string(),
            rollNo: z.string(),
            phone: z.string(),
            email: z.string().email(),
            leetcodeId: z.string().optional(),
            skillrackId: z.string().optional()
        }).parse(req.body);

        const created = await prisma.student.create({ data: bodyArgs as any });
        res.json({ success: true, data: created });
    } catch (e) { next(e) }
});

studentsRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const student = await prisma.student.findUnique({
            where: { id: req.params.id },
            include: { callLogs: true }
        });
        if (!student) return res.status(404).json({ success: false, error: "Not Found" });
        res.json({ success: true, data: student });
    } catch (e) { next(e) }
});

export default studentsRouter;
