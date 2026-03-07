import { logger } from "../../config/logger.js";

/**
 * SIMULATED PLATFORM ADAPTERS
 * In a real production system, these would use Scrapy, Playwright, or official APIs.
 */

export async function simulateLeetCodeFetch(contestId: string): Promise<string[]> {
    logger.info(`[SIMULATION] Fetching participants from LeetCode for ${contestId}`);

    // Simulate network delay
    await new Promise(r => setTimeout(r, 1500));

    // Return a subset of student platform IDs (Missing Students 3, 5, 8)
    return [
        "LC_STUDENT_01", "LC_STUDENT_02", "LC_STUDENT_04",
        "LC_STUDENT_06", "LC_STUDENT_07", "LC_STUDENT_09", "LC_STUDENT_10"
    ];
}

export async function simulateSkillRackFetch(contestId: string): Promise<string[]> {
    logger.info(`[SIMULATION] Fetching participants from SkillRack for ${contestId}`);

    await new Promise(r => setTimeout(r, 1200));

    // Missing Students 1, 2, 4, 10
    return [
        "SR_STUDENT_03", "SR_STUDENT_05", "SR_STUDENT_06",
        "SR_STUDENT_07", "SR_STUDENT_08", "SR_STUDENT_09"
    ];
}
