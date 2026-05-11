# Notes API - Backend

RESTful API built with **NestJS**, **TypeORM**, and **PostgreSQL** for managing notes.

## Tech Stack

- **Framework:** NestJS 10
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Validation:** class-validator / class-transformer
- **Documentation:** Swagger (OpenAPI)

## Prerequisites

- Node.js >= 18
- PostgreSQL running locally

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and adjust the values:

```bash
cp .env.example .env
```

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=notes_db
PORT=3000
```

### 3. Create the database

Connect to PostgreSQL and run:

```sql
CREATE DATABASE notes_db;
```

### 4. Run the seed script

Populates the database with the initial data from `materials/notes.csv`:

```bash
npm run seed
```

### 5. Start the server

```bash
# Development (with hot-reload)
npm run start:dev

# Production
npm run build && npm run start:prod
```

## API Documentation

Swagger UI is available at:

```
http://localhost:3000/api/docs
```

## API Endpoints

### `GET /api/v1/notes`

Returns a paginated list of notes. Supports optional query filters:

| Parameter   | Type   | Description                         |
| ----------- | ------ | ----------------------------------- |
| `site`      | string | Filter by site name (partial match) |
| `equipment` | string | Filter by equipment (partial match) |
| `startDate` | string | Start of date range (ISO 8601)      |
| `endDate`   | string | End of date range (ISO 8601)        |
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

Returns a single note by UUID.

### `POST /api/v1/notes`

Creates a new note.

**Request body:**

```json
{
  "site": "Martins S.A.",
  "equipment": "Gerador",
  "variable": "Tensão",
  "timestamp": "2024-08-01T18:48:37.381Z",
  "author": "Márcia Albuquerque",
  "message": "Your note message here"
}
```

**Response:** `201 Created` with the created note object.
