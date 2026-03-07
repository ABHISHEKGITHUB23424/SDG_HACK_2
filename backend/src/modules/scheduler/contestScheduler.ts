import cron from "node-cron";
import type { Contest } from "../../prisma/generated-client/index.js";
import { logger } from "../../config/logger.js";
import { jobRegistry } from "./jobRegistry.js";
import { checkParticipation } from "../participation/checkParticipation.js";
import { triggerAiCall } from "../calling/triggerAiCall.js";
import { prisma } from "../../db/prisma.js";

export function scheduleContestMonitor(contest: Contest): void {
    // Clear any existing job for this contest
    cancelContestMonitor(contest.id);

    let triggerTime = new Date(contest.scheduledAt.getTime() + 15 * 60 * 1000);

    // If triggerTime is in the past (for testing or missed), schedule 1 minute from now
    if (triggerTime.getTime() < Date.now()) {
        triggerTime = new Date(Date.now() + 60 * 1000);
    }

    const minute = triggerTime.getMinutes();
    const hour = triggerTime.getHours();
    const day = triggerTime.getDate();
    const month = triggerTime.getMonth() + 1; // getMonth is 0-indexed

    const cronExpression = `${minute} ${hour} ${day} ${month} *`;

    const job = cron.schedule(
        cronExpression,
        async () => {
            logger.info(`[CRON] Trigger fired for contest: ${contest.name}`);
            try {
                await runContestCheck(contest.id);
            } catch (e: any) {
                logger.error(`[CRON] Error checking participation for contest ${contest.id}: ${e.message}`);
            }
            job.stop();
            jobRegistry.delete(contest.id);
        },
        { timezone: "Asia/Kolkata" } as any
    );

    jobRegistry.set(contest.id, job);
    logger.info(`[SCHEDULER] Scheduled monitor for ${contest.name} at ${triggerTime.toISOString()}`);
}

export async function runContestCheck(contestId: string): Promise<void> {
    const result = await checkParticipation(contestId);
    const contest = await prisma.contest.findUnique({ where: { id: contestId } });

    if (!contest) return;

    const demoStudents = result.missing.slice(0, 3);
    for (const student of demoStudents) {
        try {
            await triggerAiCall(student, contest, "AUTO");

            // DEMO OPTIMIZATION: 
            // 6 second delay is plenty because our simulator now only takes 5 seconds!
            const delay = process.env.VAPI_API_KEY === "sim-test" ? 6000 : 2000;
            await new Promise((resume) => setTimeout(resume, delay));
        } catch (e: any) {
            logger.error(`[CRON] Call triggered fail for ${student.name}: ${e.message}`);
        }
    }

    logger.info(`[CRON] Checked ${result.total} students. Joined: ${result.joined.length}, Missing: ${result.missing.length}`);
}

export function cancelContestMonitor(contestId: string): void {
    const job = jobRegistry.get(contestId);
    if (job) {
        job.stop();
        jobRegistry.delete(contestId);
        logger.info(`[SCHEDULER] Cancelled job for contest ${contestId}`);
    }
}
