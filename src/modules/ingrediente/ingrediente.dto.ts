import { z } from "zod";

export const CreateIngredienteDTO = z.object({
    descricao: z.string().min(1, "Descrição é obrigatória"),
    unidade: z.string().min(1, "Unidade é obrigatória"),
    quantidade: z.number().positive("Quantidade deve ser positiva"),
    preco: z.number().positive("Preço deve ser positivo"),
});

export type CreateIngredienteInput = z.infer<typeof CreateIngredienteDTO>;

export const UpdateIngredienteDTO = z.object({
    descricao: z.string().min(1, "Descrição é obrigatória").optional(),
    unidade: z.string().min(1, "Unidade é obrigatória").optional(),
    quantidade: z.number().positive("Quantidade deve ser positiva").optional(),
    preco: z.number().positive("Preço deve ser positivo").optional(),
});

export type UpdateIngredienteInput = z.infer<typeof UpdateIngredienteDTO>;
