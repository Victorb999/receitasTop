import { format } from "date-fns";
import { IngredienteRepository } from "./ingrediente.repository";
import { CreateIngredienteInput, UpdateIngredienteInput } from "./ingrediente.dto";
import { NotFoundError } from "../../errors";

export class IngredienteService {
    constructor(private readonly repository: IngredienteRepository) { }

    async findAll() {
        return this.repository.findAll();
    }

    async findById(id: number) {
        const ingrediente = await this.repository.findById(id);

        if (!ingrediente) {
            throw new NotFoundError("Ingrediente");
        }

        return ingrediente;
    }

    async create(input: CreateIngredienteInput) {
        const data = format(new Date(), "MM/dd/yyyy");

        const id = await this.repository.create({
            descricao: input.descricao,
            unidade: input.unidade,
            quantidade: input.quantidade,
            preco: input.preco,
            data,
        });

        return { id };
    }

    async update(id: number, input: UpdateIngredienteInput) {
        const data = format(new Date(), "dd/MM/yyyy");

        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new NotFoundError("Ingrediente");
        }

        await this.repository.update(id, {
            ...input,
            data,
        });

        return { updated: true };
    }

    async delete(id: number) {
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new NotFoundError("Ingrediente");
        }

        await this.repository.deleteAssociationsByIngredienteId(id);
        await this.repository.delete(id);

        return { deleted: true };
    }
}
