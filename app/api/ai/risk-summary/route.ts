import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const { studentId, semester, currentEvents, prevEvents, participationDrop } = await req.json();

    const student = await prisma.student.findUnique({ where: { id: studentId } });
    if (!student) return new NextResponse("Not Found", { status: 404 });

    const dateStr = new Date().toLocaleDateString();
    const summary = `Risk Summary for ${student.name} — ${dateStr}\nSemester ${semester} participation dropped by ${Math.round(participationDrop)}% vs Semester ${semester - 1}.\nAttended ${currentEvents} events vs ${prevEvents} previously.\nRecommended Actions: Schedule a counseling session, notify faculty advisor, review course load.`;

    const report = await prisma.riskReport.create({
        data: {
            studentId,
            semester,
            participationDrop,
            aiSummary: summary
        }
    });

    return NextResponse.json(report);
}
