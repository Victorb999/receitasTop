import { format } from "date-fns";
import { ReceitaRepository } from "./receita.repository";
import { IngredienteRepository } from "../ingrediente/ingrediente.repository";
import {
    CreateReceitaInput,
    UpdateReceitaInput,
    RemoveIngredientesInput,
} from "./receita.dto";
import { NotFoundError } from "../../errors";

export class ReceitaService {
    constructor(
        private readonly receitaRepository: ReceitaRepository,
        private readonly ingredienteRepository: IngredienteRepository
    ) { }

    async findAll() {
        return this.receitaRepository.findAll();
    }

    async findById(id: number) {
        const receita = await this.receitaRepository.findById(id);

        if (!receita) {
            throw new NotFoundError("Receita");
        }

        const ingredientes =
            await this.receitaRepository.findIngredientesByReceitaId(id);

        return { receita, ingredientes };
    }

    async create(input: CreateReceitaInput) {
        const data = format(new Date(), "MM/dd/yyyy");
        const trx = await this.receitaRepository.getTransaction();

        try {
            const receitaId = await this.receitaRepository.create(
                {
                    descricao: input.receita.descricao,
                    valor_total: 0,
                    data,
                },
                trx
            );

            let valorTotal = 0;

            for (const item of input.ingredientes) {
                const ingrediente = await this.ingredienteRepository.findById(item.id);

                if (!ingrediente) {
                    await trx.rollback();
                    throw new NotFoundError(`Ingrediente com ID ${item.id}`);
                }

                const precoCalculado =
                    (item.quantidade * ingrediente.preco) / ingrediente.quantidade;

                await this.receitaRepository.addIngrediente(
                    {
                        ingrediente_id: item.id,
                        receita_id: receitaId,
                        data,
                        quantidade: item.quantidade,
                        preco: precoCalculado,
                    },
                    trx
                );

                valorTotal += precoCalculado;
            }

            await this.receitaRepository.updateValorTotal(receitaId, valorTotal, trx);
            await trx.commit();

            return { id: receitaId };
        } catch (error) {
            if (!trx.isCompleted()) {
                await trx.rollback();
            }
            throw error;
        }
    }

    async update(id: number, input: UpdateReceitaInput) {
        const data = format(new Date(), "dd/MM/yyyy");

        const existing = await this.receitaRepository.findById(id);
        if (!existing) {
            throw new NotFoundError("Receita");
        }

        await this.receitaRepository.update(id, {
            descricao: input.descricao,
            data,
        });

        return { updated: true };
    }

    async delete(id: number) {
        const existing = await this.receitaRepository.findById(id);
        if (!existing) {
            throw new NotFoundError("Receita");
        }

        await this.receitaRepository.deleteAllIngredientes(id);
        await this.receitaRepository.delete(id);

        return { deleted: true };
    }

    async removeIngredientes(receitaId: number, input: RemoveIngredientesInput) {
        const existing = await this.receitaRepository.findById(receitaId);
        if (!existing) {
            throw new NotFoundError("Receita");
        }

        const ids = input.Ingredientes.map((i) => i.id);
        await this.receitaRepository.removeIngredientes(receitaId, ids);

        const receita = await this.receitaRepository.findById(receitaId);
        return { receita };
    }
}
