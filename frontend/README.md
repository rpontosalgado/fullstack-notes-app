# Notes Frontend

React + TypeScript + Vite frontend for the Notes management application.

## Tech Stack

- **Framework:** React 18
- **Build tool:** Vite 5
- **Language:** TypeScript
- **Styling:** styled-components v6
- **Font:** Sora (Google Fonts)

## Prerequisites

- Node.js >= 18
- Backend API running on `http://localhost:3000`

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

Vite proxies all `/api` requests to the backend at `http://localhost:3000`, so no CORS configuration is needed during development.

### 3. Build for production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── sidebar/
│   │       ├── styles/
│   │       │   └── Sidebar.styles.ts
│   │       └── Sidebar.tsx              # Navigation sidebar
│   ├── notes/
│   │   ├── createNoteModal/
│   │   │   ├── styles/
│   │   │   │   └── CreateNoteModal.styles.ts
│   │   │   └── CreateNoteModal.tsx      # Modal form to create a new note
│   │   ├── notesFilter/
│   │   │   ├── styles/
│   │   │   │   └── NotesFilter.styles.ts
│   │   │   └── NotesFilter.tsx          # Filter bar (site, equipment, date range)
│   │   ├── notesPage/
│   │   │   ├── styles/
│   │   │   │   └── NotesPage.styles.ts
│   │   │   └── NotesPage.tsx            # Main notes page
│   │   └── notesTable/
│   │       ├── styles/
│   │       │   └── NotesTable.styles.ts
│   │       └── NotesTable.tsx           # Notes data table with skeleton loading
│   └── ui/
│       ├── icons/
│       │   ├── index.ts                 # Barrel export for all icons
│       │   ├── AnalyticsIcon.tsx
│       │   ├── ChevronLeftIcon.tsx
│       │   ├── ChevronRightIcon.tsx
│       │   ├── DashboardIcon.tsx
│       │   ├── DoubleArrowIcon.tsx
│       │   ├── FilterIcon.tsx
│       │   ├── HistoryIcon.tsx
│       │   ├── HomeIcon.tsx
│       │   ├── LogoIcon.tsx
│       │   ├── LogsIcon.tsx
│       │   ├── MapIcon.tsx
│       │   ├── NotesIcon.tsx
│       │   ├── PlusIcon.tsx
│       │   └── XIcon.tsx
│       └── pagination/
│           ├── styles/
│           │   └── Pagination.styles.ts
│           └── Pagination.tsx           # Pagination control
├── hooks/
│   └── useNotes.ts                      # Data fetching, filtering and pagination state
├── services/
│   └── notesService.ts                  # API calls
├── styles/
│   ├── App.styles.ts                    # Root layout styled components
│   ├── global.css                       # Base reset and global body styles
│   ├── styled.d.ts                      # DefaultTheme declaration for styled-components
│   └── theme.ts                         # Design tokens (colors, spacing, typography)
├── types/
│   └── notes.ts                         # TypeScript interfaces
├── App.tsx
└── main.tsx
```

## Styling

Styles are managed with **styled-components**. The design tokens (colors, radius, font, sidebar width) are defined in `src/styles/theme.ts` and provided globally via `ThemeProvider` in `main.tsx`.

The `DefaultTheme` interface is extended in `src/styles/styles.d.ts` so every styled component gets full TypeScript autocomplete on the `theme` prop with no extra configuration needed.

Each component keeps its styled component definitions in a dedicated `styles/` subfolder alongside it, keeping component logic and style definitions cleanly separated.

## Features

- View all notes in a paginated table
- Filter notes by site, equipment, and date range
- Create new notes via a modal form
- Skeleton loading state while fetching data
- Fully typed theme with styled-components
