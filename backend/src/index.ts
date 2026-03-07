import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { prisma } from "./db/prisma.js";
import { scheduleContestMonitor } from "./modules/scheduler/contestScheduler.js";

import webhookRouter from "./routes/webhooks.js";
import contestsRouter from "./routes/contests.js";
import studentsRouter from "./routes/students.js";
import callLogsRouter from "./routes/callLogs.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/webhooks", webhookRouter);
app.use("/api/contests", contestsRouter);
app.use("/api/students", studentsRouter);
app.use("/api/call-logs", callLogsRouter);

app.use(errorHandler);

app.listen(env.PORT, async () => {
    logger.info(`[STARTUP] Express server listening on port ${env.PORT}`);

    try {
        const scheduledContests = await prisma.contest.findMany({
            where: {
                status: "SCHEDULED",
                scheduledAt: { gt: new Date() }
            }
        });

        scheduledContests.forEach((contest) => scheduleContestMonitor(contest));
        logger.info(`[STARTUP] Scheduled ${scheduledContests.length} contest monitors`);
    } catch (error: any) {
        logger.error(`[STARTUP] Error fetching scheduled contests: ${error.message}`);
    }
});
