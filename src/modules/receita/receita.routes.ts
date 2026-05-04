import { Router } from "express";
import { ReceitaController } from "./receita.controller";
import { validateBody } from "../../middlewares";
import {
    CreateReceitaDTO,
    UpdateReceitaDTO,
    RemoveIngredientesDTO,
} from "./receita.dto";

export function createReceitaRoutes(controller: ReceitaController): Router {
    const router = Router();

    router.get("/", controller.index);
    router.get("/:id", controller.show);
    router.post("/", validateBody(CreateReceitaDTO), controller.create);
    router.put("/:id", validateBody(UpdateReceitaDTO), controller.update);
    router.delete("/:id", controller.delete);
    router.post(
        "/:id/ingredientes/remover",
        validateBody(RemoveIngredientesDTO),
        controller.removeIngredientes
    );

    return router;
}
