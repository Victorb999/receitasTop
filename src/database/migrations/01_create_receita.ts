import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("receita", (table) => {
        table.increments("id").primary();
        table.string("descricao").notNullable();
        table.float("valor_total").notNullable();
        table.date("data").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("receita");
}