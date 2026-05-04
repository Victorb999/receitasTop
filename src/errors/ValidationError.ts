import { StatusCodes } from "http-status-codes";
import { AppError } from "./AppError";
import { ZodError } from "zod";

export class ValidationError extends AppError {
    public readonly details: Record<string, string[]>;

    constructor(zodError: ZodError) {
        super("Erro de validação.", StatusCodes.UNPROCESSABLE_ENTITY);
        this.details = zodError.flatten().fieldErrors as Record<string, string[]>;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
