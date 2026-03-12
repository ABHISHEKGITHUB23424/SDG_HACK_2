import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { regNo, password } = body;

        if (!regNo || !password) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const student = await prisma.student.findUnique({
            where: {
                rollNo: regNo
            }
        });

        if (!student) {
            return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 });
        }

        if (student.passwordHash !== password) {
            return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
        }

        return NextResponse.json({
            success: true,
            student: {
                name: student.name,
                rollNo: student.rollNo,
                year: student.year,
                department: student.department
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Student Login error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
