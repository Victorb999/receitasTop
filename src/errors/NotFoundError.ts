import { StatusCodes } from "http-status-codes";
import { AppError } from "./AppError";

export class NotFoundError extends AppError {
    constructor(resource: string) {
        super(`${resource} não encontrado(a).`, StatusCodes.NOT_FOUND);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
