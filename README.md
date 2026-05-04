# Receitas Top API 🍳

API para gerenciamento de receitas e ingredientes, com arquitetura em camadas profissional.

## 🚀 Tecnologias

- **[TypeScript](https://www.typescriptlang.org/)** ~5.7
- **[Express](https://expressjs.com/)** ~4.21
- **[Knex.js](http://knexjs.org/)** ~3.1 (Query Builder)
- **[PostgreSQL](https://www.postgresql.org/)** (Database)
- **[Zod](https://zod.dev/)** ~3.24 (Validação de DTOs)
- **[Pino](https://getpino.io/)** ~9.x (Logging estruturado)
- **[date-fns](https://date-fns.org/)** ~4.x (Formatação de datas)

## 📐 Arquitetura

```
src/
├── server.ts              # Composition root (DI manual)
├── app.ts                 # Express app factory
├── config/                # Validação de env vars
├── errors/                # Classes de erro tipadas
├── shared/                # Logger (Pino)
├── middlewares/            # Error handler, request logger, validação Zod
├── modules/
│   ├── ingrediente/       # DTO → Controller → Service → Repository
│   └── receita/           # DTO → Controller → Service → Repository
└── database/              # Knex connection, migrations, seeds
```

## 📋 Funcionalidades

- CRUD completo de **Ingredientes**
- CRUD completo de **Receitas**
- Associação de ingredientes a receitas com cálculo automático de custo
- Validação de entrada com Zod
- Logging estruturado de todas as requests
- Error handling centralizado com respostas padronizadas

## 🛠️ Como executar

### Pré-requisitos

- Node.js 18+
- PostgreSQL

### Configuração

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure `.env` baseado no `.env.example`:
   ```env
   NODE_DB_CONNECTION=postgres://usuario:senha@host:porta/banco
   PORT=3333
   NODE_ENV=development
   LOG_LEVEL=info
   ```
4. Execute as migrations:
   ```bash
   npm run knex:migrate
   ```

### Executando

```bash
npm run dev
```

Servidor disponível em `http://localhost:3333`.

## 🛣️ Rotas

### Ingredientes
| Método | Rota | Descrição |
|---|---|---|
| GET | `/ingrediente` | Lista todos |
| GET | `/ingrediente/:id` | Busca por ID |
| POST | `/ingrediente` | Cria novo |
| PUT | `/ingrediente/:id` | Atualiza |
| DELETE | `/ingrediente/:id` | Remove |

### Receitas
| Método | Rota | Descrição |
|---|---|---|
| GET | `/receita` | Lista todas |
| GET | `/receita/:id` | Busca por ID (com ingredientes) |
| POST | `/receita` | Cria nova (com ingredientes) |
| PUT | `/receita/:id` | Atualiza descrição |
| DELETE | `/receita/:id` | Remove |
| POST | `/receita/:id/ingredientes/remover` | Remove ingredientes |

### Exemplo de Erro Validação (422)
```json
{
  "status": "error",
  "message": "Erro de validação.",
  "statusCode": 422,
  "details": {
    "descricao": ["Descrição é obrigatória"],
    "preco": ["Preço deve ser positivo"]
  }
}
```

## 📄 Licença

ISC
