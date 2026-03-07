import { NextResponse } from "next/server";
import { sendWhatsAppNudge } from "@/lib/stubs/twilio";

export async function POST(req: Request) {
    const { phone, message } = await req.json();
    const result = await sendWhatsAppNudge(phone, message);
    return NextResponse.json(result);
}
