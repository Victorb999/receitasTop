import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import { ValidationError } from "../errors/ValidationError";
import { logger } from "../shared/logger";
import { StatusCodes } from "http-status-codes";

export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    if (err instanceof ValidationError) {
        res.status(err.statusCode).json({
            status: "error",
            message: err.message,
            statusCode: err.statusCode,
            details: err.details,
        });
        return;
    }

    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: "error",
            message: err.message,
            statusCode: err.statusCode,
        });
        return;
    }

    logger.error({ err }, "Erro interno inesperado");

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: "Erro interno do servidor.",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
}
