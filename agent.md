# Agent Context: Receitas Top API 🕵️‍♂️

Contexto para agentes de IA trabalhando no projeto **Receitas Top**.

## 🏗 Arquitetura

Arquitetura em camadas com Dependency Injection manual:

```
src/
├── server.ts                    # Composition root (DI + start)
├── app.ts                       # Express app factory
├── config/env.ts                # Env validation (Zod)
├── errors/                      # AppError, NotFoundError, ValidationError
├── shared/logger.ts             # Pino logger
├── middlewares/                  # errorHandler, requestLogger, validateBody
├── modules/
│   ├── ingrediente/
│   │   ├── ingrediente.dto.ts         # Zod schemas
│   │   ├── ingrediente.repository.ts  # Knex queries
│   │   ├── ingrediente.service.ts     # Business logic
│   │   ├── ingrediente.controller.ts  # HTTP layer
│   │   └── ingrediente.routes.ts      # Route definitions
│   └── receita/
│       ├── receita.dto.ts
│       ├── receita.repository.ts
│       ├── receita.service.ts
│       ├── receita.controller.ts
│       └── receita.routes.ts
└── database/
    ├── connection.ts
    ├── migrations/
    └── seeds/
```

## 🔁 Fluxo de uma Request

```
Request → CORS → JSON → requestLogger → validateBody(Zod) → Controller → Service → Repository → DB
                                                              ↓ (error)
                                                         errorHandler → Response
```

## 🗄 Database

- **PostgreSQL** via Knex 3 query builder
- Tables: `ingrediente`, `receita`, `ingrediente_receita` (junction)
- Env var: `NODE_DB_CONNECTION`

## 🛠 Tech Stack

| Lib | Versão | Uso |
|---|---|---|
| TypeScript | ~5.7 | Linguagem |
| Express | ~4.21 | HTTP framework |
| Knex | ~3.1 | Query builder |
| Zod | ~3.24 | Validação DTOs |
| Pino | ~9.x | Logging |
| date-fns | ~4.x | Datas |

## 🚀 Commands

- `npm run dev` — Dev server
- `npm run build` — Compilar TS
- `npm run knex:migrate` — Migrations
- `npm run knex:seed` — Seeds

## 💡 Guidelines

- **Nova feature**: criar módulo em `src/modules/<nome>/` com dto, repo, service, controller, routes
- **Erros**: throw `NotFoundError` / `ValidationError` — nunca retornar `res.status()` no service
- **DI**: compor em `server.ts` — nunca importar dependências diretamente no controller/service
