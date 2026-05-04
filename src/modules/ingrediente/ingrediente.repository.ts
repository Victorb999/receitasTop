import { Knex } from "knex";

export interface Ingrediente {
    id: number;
    descricao: string;
    unidade: string;
    quantidade: number;
    preco: number;
    data: string;
}

export class IngredienteRepository {
    constructor(private readonly db: Knex) { }

    async findAll(): Promise<Ingrediente[]> {
        return this.db("ingrediente").select("*").orderBy("descricao");
    }

    async findById(id: number): Promise<Ingrediente | undefined> {
        return this.db("ingrediente").where("id", id).first();
    }

    async create(
        data: Omit<Ingrediente, "id">,
        trx?: Knex.Transaction
    ): Promise<number> {
        const conn = trx || this.db;
        const result = await conn("ingrediente").returning("id").insert(data);
        const inserted = result[0] as unknown as { id: number } | number;
        return typeof inserted === "object" ? inserted.id : inserted;
    }

    async update(
        id: number,
        data: Partial<Omit<Ingrediente, "id">>,
        trx?: Knex.Transaction
    ): Promise<number> {
        const conn = trx || this.db;
        return conn("ingrediente").where("id", id).update(data);
    }

    async delete(id: number): Promise<number> {
        return this.db("ingrediente").where("id", id).del();
    }

    async deleteAssociationsByIngredienteId(id: number): Promise<number> {
        return this.db("ingrediente_receita").where("ingrediente_id", id).del();
    }
}
