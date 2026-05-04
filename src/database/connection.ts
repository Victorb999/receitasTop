import knex from "knex";
import { env } from "../config/env";

const connection = knex({
  client: "pg",
  connection: env.NODE_DB_CONNECTION,
  searchPath: ["knex", "public"],
  useNullAsDefault: true,
});

export default connection;
