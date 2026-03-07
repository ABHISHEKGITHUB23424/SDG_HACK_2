import { prisma } from "../../db/prisma.js";
import { logger } from "../../config/logger.js";
import { sendWhatsAppFallback } from "./whatsappFallback.js";

export async function handleVapiWebhook(payload: any) {
    const { message } = payload;
    if (!message) return;

    const callStatusMap: any = {
        "call-started": "IN_PROGRESS",
        "call-ended": "COMPLETED",
        "call-failed": "FAILED",
        "no-answer": "NO_ANSWER"
    };

    const status = callStatusMap[message.type];
    if (!status) return;

    const vapiCallId = message.call?.id;
    if (!vapiCallId) return;

    const callLog = await prisma.callLog.findFirst({
        where: { vapiCallId },
        include: { student: true, contest: true }
    });

    if (!callLog) {
        logger.warn(`[WEBHOOK] No call log found for vapiCallId: ${vapiCallId}`);
        return;
    }

    await prisma.callLog.update({
        where: { id: callLog.id },
        data: { callStatus: status }
    });

    logger.info(`[WEBHOOK] Updated call ${callLog.id} status to ${status}`);

    // Trigger WhatsApp Fallback if call was unsuccessful
    if ((status === "FAILED" || status === "NO_ANSWER") && !callLog.whatsappSent) {
        await sendWhatsAppFallback(callLog.student, callLog.contest, callLog.id);
    }
}
