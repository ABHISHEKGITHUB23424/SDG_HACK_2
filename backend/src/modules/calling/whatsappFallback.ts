import { logger } from "../../config/logger.js";
import { prisma } from "../../db/prisma.js";
import type { Student, Contest } from "../../../prisma/generated-client/index.js";

export async function sendWhatsAppFallback(student: Student, contest: Contest, callLogId: string) {
    logger.info(`[FALLBACK] Sending WhatsApp Nudge to ${student.name} for ${contest.name}`);

    // Simulate Twilio API call
    console.log(`
    🤖 [AI CHATBOT WHATSAPP FALLBACK INITIATED]
    ========================================================
    To: ${student.phone} (${student.name})
    
    [Bot]: "Hi ${student.name}, this is the Academic Success AI Bot 🤖."
    [Bot]: "I just tried calling you but missed you! I noticed you haven't joined the ${contest.name} yet."
    [Bot]: "It started a little while ago. Is everything okay? 
    
    Please reply with an option:
    1️⃣ - 'I am joining now'
    2️⃣ - 'I am facing technical issues'
    3️⃣ - 'I need an extension / OD'
    4️⃣ - 'Talk to a human staff'"
    ========================================================
    `);

    await prisma.callLog.update({
        where: { id: callLogId },
        data: { whatsappSent: true }
    });
}
