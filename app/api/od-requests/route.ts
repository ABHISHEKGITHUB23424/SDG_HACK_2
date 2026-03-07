import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { evaluateODRequest } from "@/lib/ml/odEvaluator";

export const dynamic = "force-dynamic";

export async function GET() {
    const requests = await prisma.oDRequest.findMany({
        include: { student: true },
        orderBy: { id: "desc" }
    });
    return NextResponse.json(requests);
}

export async function POST(req: Request) {
    const { teamName, githubIds, avgCGPA, totalHackathons, studentId } = await req.json();

    const hasGithubActivity = githubIds.trim().length > 0;
    const teamSize = githubIds.split(',').length;

    const evaluation = evaluateODRequest({
        avgCGPA: parseFloat(avgCGPA),
        totalHackathons: parseInt(totalHackathons),
        teamSize,
        hasGithubActivity
    });

    const request = await prisma.oDRequest.create({
        data: {
            studentId: studentId,
            teamId: teamName,
            cgpa: parseFloat(avgCGPA),
            hackathonCount: parseInt(totalHackathons),
            status: evaluation.status,
            reason: evaluation.reason
        }
    });

    return NextResponse.json({ request, evaluation });
}
