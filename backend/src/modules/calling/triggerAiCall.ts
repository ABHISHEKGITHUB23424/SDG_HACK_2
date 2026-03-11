import axios from "axios";
import { env } from "../../config/env.js";
import { logger } from "../../config/logger.js";
import { prisma } from "../../db/prisma.js";
import type { Student, Contest } from "../../../prisma/generated-client/index.js";
import { sendWhatsAppFallback } from "./whatsappFallback.js";

let demoCallCount = 0;

export async function triggerAiCall(student: Student, contest: Contest, triggeredBy: string = "AUTO") {
    const callLog = await prisma.callLog.create({
        data: {
            contestId: contest.id,
            studentId: student.id,
            callStatus: "INITIATED",
            triggeredBy,
        },
    });

    try {
        const payload = {
            assistantId: env.VAPI_ASSISTANT_ID,
            phoneNumberId: env.VAPI_PHONE_NUMBER_ID,
            customer: {
                number: env.DEMO_PHONE_NUMBER || student.phone,
                name: student.name,
            },
            assistantOverrides: {
                variableValues: {
                    studentName: student.name,
                    contestName: contest.name,
                },
            },
        };

        logger.info(`[TRIGGER] Vapi AI Call for ${student.name} (${student.phone})`);

        // DEMO SIMULATOR MODE: Fast 5-second cycle for presentations
        if (env.VAPI_API_KEY === "sim-test") {
            demoCallCount++;
            // The 3rd student always fails for demo pitch (exactly 1 failure in 3 calls)
            const isFailingStudent = demoCallCount % 3 === 0;

            logger.warn(`[SIMULATOR] Sequence #${demoCallCount} for ${student.name} (Result: ${isFailingStudent ? 'FAIL' : 'SUCCESS'})`);
            const fakeId = `sim-call-${Math.random().toString(36).substr(2, 9)}`;

            // Step 1: RINGING (1s)
            setTimeout(async () => {
                await prisma.callLog.update({
                    where: { id: callLog.id },
                    data: { vapiCallId: fakeId, callStatus: "RINGING" }
                });

                // Step 2: IN_PROGRESS (2s)
                setTimeout(async () => {
                    await prisma.callLog.update({
                        where: { id: callLog.id },
                        data: { callStatus: "IN_PROGRESS" }
                    });

                    // Step 3: SUCCESS or FAIL (2s)
                    setTimeout(async () => {
                        const finalStatus = isFailingStudent ? "FAILED" : "COMPLETED";
                        await prisma.callLog.update({
                            where: { id: callLog.id },
                            data: { callStatus: finalStatus }
                        });

                        if (isFailingStudent) {
                            logger.error(`[SIMULATOR] Student ${student.name} did not answer the Voice Call. Activating AI Chatbot Fallback...`);

                            // Trigger the AI Chatbot WhatsApp fallback sequence for unanswered calls
                            await sendWhatsAppFallback(student, contest, callLog.id);
                        } else {
                            logger.info(`[SIMULATOR] Call COMPLETED for ${student.name}`);
                        }
                    }, 2000);
                }, 2000);
            }, 1000);

            return { success: true, callId: callLog.id, vapiCallId: fakeId };
        }

        const response = await axios.post("https://api.vapi.ai/call/phone", payload, {
            headers: { Authorization: `Bearer ${env.VAPI_API_KEY}` },
        });

        const vapiCallId = response.data.id;

        await prisma.callLog.update({
            where: { id: callLog.id },
            data: {
                vapiCallId,
                callStatus: "RINGING",
            },
        });

        return { success: true, callId: callLog.id, vapiCallId };

    } catch (error: any) {
        const errorMsg = error.response?.data?.message || error.message;
        logger.error(`[TRIGGER] Vapi API call failed for ${student.name}: ${errorMsg}`);

        await prisma.callLog.update({
            where: { id: callLog.id },
            data: { callStatus: "FAILED" },
        });

        // Trigger WhatsApp Fallback immediately on API failure
        await sendWhatsAppFallback(student, contest, callLog.id);

        return { success: false, error: errorMsg };
    }
}
