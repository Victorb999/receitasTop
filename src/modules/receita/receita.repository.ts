import { Knex } from "knex";

export interface Receita {
    id: number;
    descricao: string;
    valor_total: number;
    data: string;
}

export interface IngredienteReceita {
    id: number;
    preco: number;
    data: string;
    quantidade: number;
    ingrediente_id: number;
    receita_id: number;
}

export class ReceitaRepository {
    constructor(private readonly db: Knex) { }

    async findAll(): Promise<Receita[]> {
        return this.db("receita").select("*").orderBy("descricao");
    }

    async findById(id: number): Promise<Receita | undefined> {
        return this.db("receita").where("id", id).first();
    }

    async create(
        data: Omit<Receita, "id">,
        trx: Knex.Transaction
    ): Promise<number> {
        const result = await trx("receita").returning("id").insert(data);
        const inserted = result[0] as unknown as { id: number } | number;
        return typeof inserted === "object" ? inserted.id : inserted;
    }

    async update(
        id: number,
        data: Partial<Omit<Receita, "id">>,
        trx?: Knex.Transaction
    ): Promise<number> {
        const conn = trx || this.db;
        return conn("receita").where("id", id).update(data);
    }

    async delete(id: number): Promise<number> {
        return this.db("receita").where("id", id).del();
    }

    async addIngrediente(
        data: Omit<IngredienteReceita, "id">,
        trx: Knex.Transaction
    ): Promise<void> {
        await trx("ingrediente_receita").insert(data);
    }

    async removeIngredientes(
        receitaId: number,
        ingredienteIds: number[]
    ): Promise<number> {
        return this.db("ingrediente_receita")
            .where("receita_id", receitaId)
            .whereIn("ingrediente_id", ingredienteIds)
            .del();
    }

    async deleteAllIngredientes(receitaId: number): Promise<number> {
        return this.db("ingrediente_receita")
            .where("receita_id", receitaId)
            .del();
    }

    async findIngredientesByReceitaId(receitaId: number) {
        return this.db("ingrediente")
            .join(
                "ingrediente_receita",
                "ingrediente.id",
                "=",
                "ingrediente_receita.ingrediente_id"
            )
            .where("ingrediente_receita.receita_id", receitaId)
            .select(
                "ingrediente.id",
                "ingrediente.descricao",
                "ingrediente_receita.preco",
                "ingrediente_receita.quantidade"
            );
    }

    async updateValorTotal(
        receitaId: number,
        valorTotal: number,
        trx: Knex.Transaction
    ): Promise<void> {
        await trx("receita")
            .where("id", receitaId)
            .update({ valor_total: valorTotal });
    }

    getTransaction(): Promise<Knex.Transaction> {
        return this.db.transaction();
    }
}
