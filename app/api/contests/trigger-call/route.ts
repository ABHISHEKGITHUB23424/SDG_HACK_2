import { NextResponse } from "next/server";
import { simulateVoiceCall } from "@/lib/stubs/vapi";

export async function POST(req: Request) {
    const { studentId, contestId } = await req.json();
    const result = await simulateVoiceCall(studentId, contestId);
    return NextResponse.json(result);
}
