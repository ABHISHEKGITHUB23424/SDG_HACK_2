import type { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.js";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    logger.error(`[ERROR] ${err.stack || err.message}`);

    if (err.name === "ZodError") {
        return res.status(400).json({
            success: false,
            error: "Validation Error",
            details: err.errors
        });
    }

    res.status(err.status || 500).json({
        success: false,
        error: err.message || "Internal Server Error"
    });
}
