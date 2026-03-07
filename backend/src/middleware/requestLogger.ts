import type { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.js";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
    logger.info(`[REQ] ${req.method} ${req.url}`);
    next();
}
