import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const users = await prisma.user.findMany({
            select: { id: true, name: true, email: true, role: true }
        });

        const students = await prisma.student.findMany({
            include: {
                _count: {
                    select: { participants: true, odRequests: true, riskReports: true }
                }
            }
        });

        const contests = await prisma.contest.findMany();

        const odRequests = await prisma.oDRequest.findMany({
            include: { student: { select: { name: true, rollNo: true } } }
        });

        const riskReports = await prisma.riskReport.findMany({
            include: { student: { select: { name: true, rollNo: true } } }
        });

        const systemData = {
            users,
            students,
            contests,
            odRequests,
            riskReports
        };

        return NextResponse.json(systemData);
    } catch (error) {
        console.error("Failed to fetch admin data:", error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
