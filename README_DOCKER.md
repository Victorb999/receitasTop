# Dockerizando o Receitas Top API

Este projeto agora conta com suporte a Docker e Docker Compose para facilitar o desenvolvimento e deploy.

## Requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Como rodar

Para subir a aplicação e o banco de dados PostgreSQL, utilize o comando:

```bash
docker-compose up --build
```

Isso fará o seguinte:
1. Construirá a imagem da API (multi-stage build).
2. Subirá um container PostgreSQL.
3. Rodará as migrações do banco de dados automaticamente.
4. Iniciará o servidor na porta `3333`.

## Serviços

- **API**: acessível em `http://localhost:3333`
- **Banco de Dados**: PostgreSQL rodando internamente na rede do Docker.

## Variáveis de Ambiente

O arquivo `docker-compose.yml` já vem configurado com valores padrão, mas você pode customizar:
- `PORT`: Porta da aplicação (padrão 3333).
- `NODE_DB_CONNECTION`: String de conexão com o banco.

## Migrações e Seeds

As migrações rodam automaticamente no startup do container da API.
Para rodar seeds manualmente dentro do container:

```bash
docker-compose exec app npm run knex:seed
```
