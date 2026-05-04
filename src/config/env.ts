import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
    NODE_DB_CONNECTION: z.string().min(1, "NODE_DB_CONNECTION é obrigatória"),
    PORT: z.coerce.number().default(3333),
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
    LOG_LEVEL: z
        .enum(["fatal", "error", "warn", "info", "debug", "trace"])
        .default("info"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error(
        "❌ Variáveis de ambiente inválidas:",
        parsed.error.flatten().fieldErrors
    );
    process.exit(1);
}

export const env = parsed.data;
