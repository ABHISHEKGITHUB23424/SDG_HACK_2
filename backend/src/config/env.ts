import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    DATABASE_URL: z.string().default("file:./dev.db"),
    PORT: z.string().default("4000").transform(Number),
    VAPI_API_KEY: z.string(),
    VAPI_ASSISTANT_ID: z.string(),
    VAPI_PHONE_NUMBER_ID: z.string(),
    VAPI_WEBHOOK_SECRET: z.string().optional(),
    TWILIO_ACCOUNT_SID: z.string().optional(),
    TWILIO_AUTH_TOKEN: z.string().optional(),
    TWILIO_WHATSAPP_FROM: z.string().default("whatsapp:+14155238886"),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    DEMO_PHONE_NUMBER: z.string().optional(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
    console.error("❌ Invalid environment variables:", result.error.format());
    process.exit(1);
}

export const env = result.data;
