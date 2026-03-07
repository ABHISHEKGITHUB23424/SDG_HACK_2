import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const student = await prisma.student.findUnique({
        where: { id: params.id },
        include: {
            riskReports: { orderBy: { createdAt: 'desc' }, take: 5 }
        }
    });

    if (!student) {
        return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(student);
}
