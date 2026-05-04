import { Router } from "express";
import { IngredienteController } from "./ingrediente.controller";
import { validateBody } from "../../middlewares";
import {
    CreateIngredienteDTO,
    UpdateIngredienteDTO,
} from "./ingrediente.dto";

export function createIngredienteRoutes(
    controller: IngredienteController
): Router {
    const router = Router();

    router.get("/", controller.index);
    router.get("/:id", controller.show);
    router.post("/", validateBody(CreateIngredienteDTO), controller.create);
    router.put("/:id", validateBody(UpdateIngredienteDTO), controller.update);
    router.delete("/:id", controller.delete);

    return router;
}
