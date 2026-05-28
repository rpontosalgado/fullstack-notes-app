# Backend — Notes API

RESTful API built with **NestJS**, **TypeORM** and **PostgreSQL** for note management.

## Tech Stack

- **NestJS** — modular, opinionated Node.js framework
- **TypeORM** — TypeScript-native ORM
- **PostgreSQL** — relational database
- **Swagger (OpenAPI)** — interactive API documentation
- **class-validator / class-transformer** — request validation and transformation
- **Joi** — environment variable validation
- **Jest + Supertest** — unit and integration tests (31 tests)
- **Docker + Docker Compose** — containerized API and database

## Project Structure

```
backend/
├── scripts/
│   └── entrypoint.sh             # Container startup (migrations + seed + server)
├── src/
│   ├── config/
│   │   └── env.validation.ts     # Joi environment validation schema
│   ├── database/
│   │   ├── data-source.ts        # TypeORM DataSource config
│   │   ├── migrations/           # Versioned schema migrations
│   │   └── seed.ts               # CSV seed script
│   └── notes/
│       ├── dto/
│       │   ├── create-notes.dto.ts
│       │   ├── filter-notes.dto.ts
│       │   └── update-note.dto.ts
│       ├── note.entity.ts
│       ├── notes.controller.ts
│       ├── notes.controller.spec.ts
│       ├── notes.module.ts
│       ├── notes.service.ts
│       └── notes.service.spec.ts
│   ├── app.module.ts
│   └── main.ts
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .env.example
├── Dockerfile
└── tsconfig.json
```

## Running

### With Docker (recommended)

**Prerequisites:** Docker, Docker Compose

```bash
docker-compose up --build
```

The seed runs automatically on startup. API available at `http://localhost:3000`, Swagger at `http://localhost:3000/api/docs`.

```bash
docker-compose down -v  # tear down and remove DB volume
```

### Locally

**Prerequisites:** Node.js >= 18, Yarn 4, PostgreSQL

```bash
cp .env.example .env   # configure your DB credentials
yarn install
yarn seed              # populate DB from ../materials/notes.csv
yarn start:dev         # hot-reload on port 3000
```

## API Endpoints

| Method   | Route                | Description                      |
| -------- | -------------------- | -------------------------------- |
| `GET`    | `/api/v1/notes`      | List notes (filtered, paginated) |
| `GET`    | `/api/v1/notes/:id`  | Get note by UUID                 |
| `POST`   | `/api/v1/notes`      | Create a note                    |
| `PUT`    | `/api/v1/notes/:id`  | Update a note                    |
| `DELETE` | `/api/v1/notes/:id`  | Delete a note                    |

### `GET /api/v1/notes`

Returns a paginated list of notes. Supports the following query params:

| Parameter   | Type   | Description                         |
| ----------- | ------ | ----------------------------------- |
| `site`      | string | Filter by site (partial match)      |
| `equipment` | string | Filter by equipment (partial match) |
| `startDate` | string | Period start (ISO 8601)             |
| `endDate`   | string | Period end (ISO 8601)               |
| `page`      | number | Page number (default: 1)            |
| `limit`     | number | Items per page (default: 10)        |

**Example:**

```
GET /api/v1/notes?site=Martins&equipment=Gerador&startDate=2024-01-01&endDate=2024-08-31&page=1&limit=10
```

**Response:**

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

Returns a note by UUID. Returns `404` if not found.

### `POST /api/v1/notes`

Creates a new note. Returns `201 Created`.

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

### `PUT /api/v1/notes/:id`

Updates a note. All fields are optional — only provided fields are updated.

### `DELETE /api/v1/notes/:id`

Deletes a note. Returns `204 No Content`.

## API Documentation

Interactive Swagger docs available at:

```
http://localhost:3000/api/docs
```

## Testing

```bash
yarn workspace @roberto-de-abreu-salgado-desafio-full-stack/backend run jest
```

Tests cover the controller (integration via Supertest) and service (unit with mocked repository) — 31 tests total.
