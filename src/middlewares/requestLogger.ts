import { Request, Response, NextFunction } from "express";
import { logger } from "../shared/logger";

export function requestLogger(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        logger.info(
            {
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                duration: `${duration}ms`,
            },
            `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
        );
    });

    next();
}
