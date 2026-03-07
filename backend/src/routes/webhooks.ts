import { Router } from "express";
import type { Request, Response } from "express";
import { handleVapiWebhook } from "../modules/calling/callbackHandler.js";
import { logger } from "../config/logger.js";

const webhookRouter = Router();

webhookRouter.post("/vapi", async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        logger.debug(`[WEBHOOK] /vapi payload received`, payload);

        // Acknowledge immediately per Vapi docs
        res.status(200).json({ success: true, message: "Webhook received" });

        // Handle asynchronously 
        await handleVapiWebhook(payload);

    } catch (error: any) {
        logger.error(`[WEBHOOK] /vapi handling error`, error);
    }
});

export default webhookRouter;
