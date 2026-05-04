import { z } from "zod";

const IngredienteItemDTO = z.object({
    id: z.number().int().positive("ID do ingrediente é obrigatório"),
    quantidade: z.number().positive("Quantidade deve ser positiva"),
});

export const CreateReceitaDTO = z.object({
    receita: z.object({
        descricao: z.string().min(1, "Descrição da receita é obrigatória"),
    }),
    ingredientes: z
        .array(IngredienteItemDTO)
        .min(1, "Pelo menos um ingrediente é obrigatório"),
});

export type CreateReceitaInput = z.infer<typeof CreateReceitaDTO>;

export const UpdateReceitaDTO = z.object({
    descricao: z.string().min(1, "Descrição é obrigatória"),
});

export type UpdateReceitaInput = z.infer<typeof UpdateReceitaDTO>;

export const RemoveIngredientesDTO = z.object({
    Ingredientes: z
        .array(
            z.object({
                id: z.number().int().positive(),
            })
        )
        .min(1, "Pelo menos um ingrediente é obrigatório"),
});

export type RemoveIngredientesInput = z.infer<typeof RemoveIngredientesDTO>;
