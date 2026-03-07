import { prisma } from "../../db/prisma.js";
import { logger } from "../../config/logger.js";
import { simulateLeetCodeFetch, simulateSkillRackFetch } from "./platformAdapters.js";

export async function checkParticipation(contestId: string) {
    const contest = await prisma.contest.findUnique({
        where: { id: contestId },
        include: { participations: { include: { student: true } } }
    });

    if (!contest) throw new Error("Contest not found");

    logger.info(`[WORKER] Checking participation for ${contest.name} (${contest.platform})`);

    let joinedIds: string[] = [];

    if (contest.platform === "LeetCode") {
        joinedIds = await simulateLeetCodeFetch(contest.externalId);
    } else if (contest.platform === "SkillRack") {
        joinedIds = await simulateSkillRackFetch(contest.externalId);
    }

    const updates = contest.participations.map(async (p: any) => {
        const platformId = contest.platform === "LeetCode" ? p.student.leetcodeId : p.student.skillrackId;
        const hasJoined = joinedIds.includes(platformId);
        const newStatus = hasJoined ? "JOINED" : "MISSING";

        return prisma.participation.update({
            where: { id: p.id },
            data: {
                status: newStatus,
                joinedAt: hasJoined && !p.joinedAt ? new Date() : p.joinedAt
            }
        });
    });

    await Promise.all(updates);

    // Fetch updated statuses
    const updatedParticipations = await prisma.participation.findMany({
        where: { contestId },
        include: { student: true }
    });

    const joined = updatedParticipations.filter(p => p.status === "JOINED").map(p => p.student);
    const missing = updatedParticipations.filter(p => p.status === "MISSING").map(p => p.student);

    return {
        joined,
        missing,
        total: updatedParticipations.length,
        timestamp: new Date()
    };
}
