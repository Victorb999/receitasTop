import { Request, Response, NextFunction } from "express";
import { IngredienteService } from "./ingrediente.service";
import { StatusCodes } from "http-status-codes";

export class IngredienteController {
    constructor(private readonly service: IngredienteService) { }

    index = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const ingredientes = await this.service.findAll();
            res.json({ ingredientes });
        } catch (error) {
            next(error);
        }
    };

    show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const ingrediente = await this.service.findById(id);
            res.json({ ingrediente });
        } catch (error) {
            next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.create(req.body);
            res.status(StatusCodes.CREATED).json(result);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const result = await this.service.update(id, req.body);
            res.json(result);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const result = await this.service.delete(id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    };
}
