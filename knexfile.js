const path = require("path");
require("dotenv/config");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  client: "pg",
  connection: process.env.NODE_DB_CONNECTION,
  searchPath: ["knex", "public"],
  migrations: {
    directory: isProduction
      ? path.resolve(__dirname, "dist", "database", "migrations")
      : path.resolve(__dirname, "src", "database", "migrations"),
  },
  seeds: {
    directory: isProduction
      ? path.resolve(__dirname, "dist", "database", "seeds")
      : path.resolve(__dirname, "src", "database", "seeds"),
  },
  useNullAsDefault: true,
};
//npx knex --knexfile knexfile.js migrate:latest
