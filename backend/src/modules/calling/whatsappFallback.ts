import { logger } from "../../config/logger.js";
import { prisma } from "../../db/prisma.js";
import type { Student, Contest } from "../../../prisma/generated-client/index.js";

export async function sendWhatsAppFallback(student: Student, contest: Contest, callLogId: string) {
    logger.info(`[FALLBACK] Sending WhatsApp Nudge to ${student.name} for ${contest.name}`);

    // Simulate Twilio API call
    console.log(`
    -------------------------------------------
    WHATSAPP SENDING (SIMULATED)
    TO: ${student.phone}
    BODY: Hi ${student.name}, we noticed you haven't joined the ${contest.name} yet. 
    It started 15 minutes ago. Please join now to avoid losing progress!
    -------------------------------------------
    `);

    await prisma.callLog.update({
        where: { id: callLogId },
        data: { whatsappSent: true }
    });
}
