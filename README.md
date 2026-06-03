# Notes App — Full Stack Monorepo

A full-stack notes management application built with NestJS, PostgreSQL, React, TypeScript, and Docker.

## Structure

```
.
├── packages/
│   ├── backend/    # RESTful API (NestJS + PostgreSQL)
│   └── frontend/   # React SPA (Vite + TypeScript + styled-components)
├── materials/      # Seed data (notes.csv)
└── docker-compose.yml
```

---

## Backend

### Tech Stack

- **NestJS** — modular, opinionated Node.js framework
- **TypeORM** — TypeScript-native ORM
- **PostgreSQL** — relational database
- **Swagger (OpenAPI)** — interactive API docs at `/api/docs`
- **class-validator / class-transformer** — request validation and transformation
- **Joi** — environment variable validation

### Prerequisites

- Node.js >= 18
- Yarn 4

### Running

#### With Docker (recommended)

```bash
docker-compose up --build
```

The seed runs automatically on startup. API available at `http://localhost:3000`, Swagger at `http://localhost:3000/api/docs`.

To tear down:

```bash
docker-compose down -v
```

#### Locally

```bash
cd packages/backend
cp .env.example .env   # configure your DB credentials
yarn install
yarn seed              # populate DB from materials/notes.csv
yarn start:dev         # hot-reload on port 3000
```

### API Endpoints

| Method   | Route                | Description                    |
| -------- | -------------------- | ------------------------------ |
| `GET`    | `/api/v1/notes`      | List notes (filtered, paginated) |
| `GET`    | `/api/v1/notes/:id`  | Get note by UUID               |
| `POST`   | `/api/v1/notes`      | Create a note                  |
| `PUT`    | `/api/v1/notes/:id`  | Update a note                  |
| `DELETE` | `/api/v1/notes/:id`  | Delete a note                  |

**Filter params on `GET /api/v1/notes`:** `site`, `equipment`, `startDate`, `endDate`, `page`, `limit`.

### Testing

```bash
yarn workspace @notes-app/backend run jest
```

---

## Frontend

### Tech Stack

- **React 19** with **TypeScript**
- **Vite** — fast builds and HMR
- **styled-components v6** — CSS-in-JS with `DefaultTheme` typing
- **Vitest** + **Testing Library** — unit and component testing
- **Sora** (Google Fonts)

### Prerequisites

- Node.js >= 18
- Yarn 4
- Backend running on `http://localhost:3000`

### Running

```bash
cd packages/frontend
yarn install
yarn dev                # http://localhost:5173
yarn build              # production build
```

Vite proxies `/api` to `http://localhost:3000` during development.

### Design System

The UI is built on an atomic design system with reusable primitives:

| Layer | Components |
|-------|-----------|
| **Atoms** | `Button`, `Flex`, `Typography`, `TextInput`, `Textarea`, `Card`, `Skeleton`, `Badge`, `IconButton` |
| **Molecules** | `Modal`, `FormField`, `TableSkeleton`, `ModalActions` |
| **Organisms** | `NotesPage`, `NotesFilter`, `NotesTable`, `NoteForm`, `CreateNoteModal`, `EditNoteModal`, `DeleteConfirmModal`, `Pagination`, `Sidebar` |

All design tokens (colors, spacing, typography, radius) are centralized in `src/styles/theme.ts` and provided via `ThemeProvider`.

### Features

- View notes in a paginated table with skeleton loading states
- Full CRUD — create, edit, and delete notes via modals
- Filter by site, equipment, and date range
- Export table data to CSV
- 87 component/hook/utility tests

### Testing

```bash
yarn test          # run all tests
yarn test:backend  # backend only
yarn test:frontend # frontend only
```

---

## Tests Summary

| Layer    | Tests |
| -------- | ----- |
| Backend  | 31    |
| Frontend | 87    |
| **Total**| **118** |
