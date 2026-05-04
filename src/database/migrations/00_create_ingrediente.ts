import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("ingrediente", (table) => {
        table.increments("id").primary();
        table.string("descricao").notNullable();
        table.string("unidade").notNullable();
        table.float("quantidade").notNullable();
        table.float("preco").notNullable();
        table.date("data").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("ingrediente");
}