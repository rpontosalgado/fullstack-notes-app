# Backend — Notes API

API RESTful construída com **NestJS**, **TypeORM** e **PostgreSQL** para gerenciamento de notas.

## Tecnologias

- **NestJS** — framework Node.js modular e opinado
- **TypeORM** — ORM com suporte nativo a TypeScript
- **PostgreSQL** — banco de dados relacional
- **Swagger (OpenAPI)** — documentação interativa da API
- **class-validator / class-transformer** — validação e transformação de dados
- **Jest + Supertest** — testes unitários e de integração
- **Docker + Docker Compose** — containerização da API e do banco de dados

## Estrutura do Projeto

```
backend/
├── scripts/
│   └── entrypoint.sh         # Script de inicialização do container
├── src/
│   ├── database/
│   │   ├── data-source.ts    # Configuração do DataSource (TypeORM)
│   │   └── seed.ts           # Script de carga inicial de dados
│   └── notes/
│       ├── dto/
│       │   ├── create-note.dto.ts
│       │   └── filter-notes.dto.ts
│       ├── note.entity.ts
│       ├── notes.controller.ts
│       ├── notes.controller.spec.ts
│       ├── notes.module.ts
│       ├── notes.service.ts
│       └── notes.service.spec.ts
├── .env.example
├── Dockerfile
└── materials/
    └── notes.csv             # Dados iniciais
```

## Como rodar

### A. Com Docker (recomendado)

A forma mais simples de rodar o backend é via Docker Compose, sem precisar configurar o PostgreSQL localmente.

**Pré-requisitos**

- Docker
- Docker Compose

**1. Suba os serviços**

```bash
docker-compose up --build
```

O seed é executado automaticamente ao iniciar o container, populando o banco com os dados do `materials/notes.csv`. A API estará disponível em `http://localhost:3000` e o Swagger em `http://localhost:3000/api/docs`.

**2. Para encerrar**

```bash
docker-compose down
```

Para remover também o volume do banco de dados:

```bash
docker-compose down -v
```

### B. Localmente

**Pré-requisitos**

- Node.js >= 18
- Yarn 4
- PostgreSQL rodando localmente

**1. Instalar dependências**

```bash
yarn install
```

**2. Configurar variáveis de ambiente**

```bash
cp .env.example .env
```

Ajuste os valores conforme seu ambiente:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=notes_db
PORT=3000
```

**3. Criar o banco de dados**

```sql
CREATE DATABASE notes_db;
```

**4. Popular o banco com os dados iniciais**

```bash
yarn seed
```

O script lê `materials/notes.csv` e insere os registros no banco. Caso já existam dados, o seed é ignorado automaticamente.

**5. Iniciar o servidor**

```bash
# Desenvolvimento (com hot-reload)
yarn start:dev

# Produção
yarn build && yarn start:prod
```

## Testes

```bash
# Rodar todos os testes
yarn test

# Rodar com cobertura
yarn test:cov
```

## Documentação da API

A documentação interativa via Swagger está disponível em:

```
http://localhost:3000/api/docs
```

## Endpoints

| Método | Rota                | Descrição                           |
| ------ | ------------------- | ----------------------------------- |
| `GET`  | `/api/v1/notes`     | Lista notas com filtros e paginação |
| `GET`  | `/api/v1/notes/:id` | Busca uma nota pelo ID              |
| `POST` | `/api/v1/notes`     | Cria uma nova nota                  |

### `GET /api/v1/notes`

Retorna uma lista paginada de notas. Suporta os seguintes filtros via query params:

| Parâmetro   | Tipo   | Descrição                                         |
| ----------- | ------ | ------------------------------------------------- |
| `site`      | string | Filtra por nome do site (correspondência parcial) |
| `equipment` | string | Filtra por equipamento (correspondência parcial)  |
| `startDate` | string | Início do período (ISO 8601)                      |
| `endDate`   | string | Fim do período (ISO 8601)                         |
| `page`      | number | Número da página (padrão: 1)                      |
| `limit`     | number | Itens por página (padrão: 10)                     |

**Exemplo:**

```
GET /api/v1/notes?site=Martins&equipment=Gerador&startDate=2024-01-01&endDate=2024-08-31&page=1&limit=10
```

**Resposta:**

```json
{
  "data": [...],
  "total": 42,
  "page": 1,
  "limit": 10,
  "totalPages": 5
}
```

### `GET /api/v1/notes/:id`

Retorna uma nota pelo UUID. Retorna `404` caso não encontrada.

### `POST /api/v1/notes`

Cria uma nova nota.

**Body:**

```json
{
  "site": "Martins S.A.",
  "equipment": "Gerador",
  "variable": "Tensão",
  "timestamp": "2024-08-01T18:48:37.381Z",
  "author": "Márcia Albuquerque",
  "message": "Conteúdo da nota"
}
```

**Resposta:** `201 Created` com o objeto da nota criada.
