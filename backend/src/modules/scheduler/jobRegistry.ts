import type { ScheduledTask } from "node-cron";

/**
 * Registry to keep track of active contest monitoring jobs
 * Key: contestId
 * Value: node-cron job object
 */
export const jobRegistry = new Map<string, ScheduledTask>();
