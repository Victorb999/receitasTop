import { env } from "./config/env";
import { createApp } from "./app";
import { logger } from "./shared/logger";
import { errorHandler } from "./middlewares";
import connection from "./database/connection";

// Repositories
import { IngredienteRepository } from "./modules/ingrediente/ingrediente.repository";
import { ReceitaRepository } from "./modules/receita/receita.repository";

// Services
import { IngredienteService } from "./modules/ingrediente/ingrediente.service";
import { ReceitaService } from "./modules/receita/receita.service";

// Controllers
import { IngredienteController } from "./modules/ingrediente/ingrediente.controller";
import { ReceitaController } from "./modules/receita/receita.controller";

// Routes
import { createIngredienteRoutes } from "./modules/ingrediente/ingrediente.routes";
import { createReceitaRoutes } from "./modules/receita/receita.routes";

// --- Dependency Injection (Composição Manual) ---

// 1. Repositories
const ingredienteRepository = new IngredienteRepository(connection);
const receitaRepository = new ReceitaRepository(connection);

// 2. Services
const ingredienteService = new IngredienteService(ingredienteRepository);
const receitaService = new ReceitaService(
  receitaRepository,
  ingredienteRepository
);

// 3. Controllers
const ingredienteController = new IngredienteController(ingredienteService);
const receitaController = new ReceitaController(receitaService);

// --- App Setup ---

const app = createApp();

// 4. Rotas
app.use("/ingrediente", createIngredienteRoutes(ingredienteController));
app.use("/receita", createReceitaRoutes(receitaController));

// Rota legada de compatibilidade
app.post(
  "/ingredienteReceita/:id",
  receitaController.removeIngredientes
);

// 5. Error handler (deve ser o último middleware)
app.use(errorHandler);

// --- Start ---

app.listen(
  {
    host: "0.0.0.0",
    port: env.PORT,
  },
  () => {
    logger.info(`🚀 Servidor rodando em http://localhost:${env.PORT}`);
  }
);
