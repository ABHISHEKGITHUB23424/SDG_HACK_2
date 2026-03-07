import { PrismaClient } from "../../prisma/generated-client/index.js";
import { env } from "../config/env.js";

export const prisma = new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
});
