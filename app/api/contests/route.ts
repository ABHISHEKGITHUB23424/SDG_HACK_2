import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    const contests = await prisma.contest.findMany({
        include: {
            participants: {
                include: { student: true }
            }
        },
        orderBy: { startTime: 'desc' }
    });
    return NextResponse.json(contests);
}

export async function POST(req: Request) {
    const { title, time, participantIds } = await req.json();
    const contest = await prisma.contest.create({
        data: {
            title,
            startTime: new Date(time),
            participants: {
                create: participantIds.map((id: string) => ({
                    studentId: id,
                    status: "PENDING"
                }))
            }
        }
    });
    return NextResponse.json(contest, { status: 201 });
}
