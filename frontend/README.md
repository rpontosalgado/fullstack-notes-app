# Notes Frontend

React + TypeScript + Vite SPA for the Notes management application.

## Tech Stack

- **React 19** with **TypeScript**
- **Vite** — build tool with fast HMR
- **styled-components v6** — CSS-in-JS with `DefaultTheme` typing
- **Vitest** + **Testing Library** — unit and component testing
- **Sora** (Google Fonts)

## Prerequisites

- Node.js >= 18
- Yarn 4
- Backend API running on `http://localhost:3000`

## Setup

```bash
yarn install
yarn dev      # http://localhost:5173
yarn build    # production build to dist/
yarn test     # run 87 component/hook/utility tests
```

Vite proxies `/api` requests to `http://localhost:3000`.

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── sidebar/
│   │       ├── styles/Sidebar.styles.ts
│   │       └── Sidebar.tsx
│   ├── notes/
│   │   ├── createNoteModal/CreateNoteModal.tsx
│   │   ├── deleteConfirmModal/DeleteConfirmModal.tsx
│   │   ├── editNoteModal/EditNoteModal.tsx
│   │   ├── noteForm/NoteForm.tsx
│   │   ├── notesFilter/
│   │   │   ├── NotesFilter.test.tsx
│   │   │   └── NotesFilter.tsx
│   │   ├── notesPage/NotesPage.tsx
│   │   └── notesTable/
│   │       ├── styles/NotesTable.styles.ts
│   │       ├── NotesTable.test.tsx
│   │       └── NotesTable.tsx
│   └── ui/
│       ├── badge/Badge.tsx
│       ├── button/Button.tsx
│       ├── card/Card.tsx
│       ├── flex/Flex.tsx
│       ├── formField/FormField.tsx
│       ├── iconButton/styles/IconButton.styles.ts
│       ├── icons/                        # 16 SVG icon components
│       ├── modal/
│       │   ├── styles/Modal.styles.ts
│       │   └── Modal.tsx
│       ├── modalActions/ModalActions.tsx
│       ├── pagination/
│       │   ├── styles/Pagination.styles.ts
│       │   └── Pagination.tsx
│       ├── skeleton/Skeleton.tsx
│       ├── tableSkeleton/TableSkeleton.tsx
│       ├── textInput/TextInput.tsx
│       ├── textarea/Textarea.tsx
│       └── typography/Typography.tsx
├── hooks/
│   ├── useModalAction.ts
│   └── useNotes.ts
├── services/notesService.ts
├── styles/
│   ├── animations.ts
│   ├── App.styles.ts
│   ├── global.css
│   ├── styled.d.ts
│   └── theme.ts
├── test/
│   ├── renderWithTheme.tsx
│   └── setup.ts
├── types/notes.ts
├── utils/date.ts
├── App.tsx
└── main.tsx
```

## Design System

The UI follows an atomic design approach:

| Layer | Components | Purpose |
|-------|-----------|---------|
| **Atoms** | `Button`, `Flex`, `Typography`, `TextInput`, `Textarea`, `Card`, `Skeleton`, `Badge`, `IconButton` | Reusable primitives |
| **Molecules** | `Modal`, `FormField`, `TableSkeleton`, `ModalActions` | Composed from atoms |
| **Organisms** | `NotesPage`, `NotesFilter`, `NotesTable`, `NoteForm`, modals, `Pagination`, `Sidebar` | Feature-level components |

Design tokens are defined in `src/styles/theme.ts` and injected via `ThemeProvider` with full `DefaultTheme` TypeScript inference.

## Features

- Full CRUD — create, edit, delete notes via modals
- Paginated table with skeleton loading states
- Filtering by site, equipment, and date range (via backend API)
- CSV export of the current page
- 87 automated tests

## Testing

```bash
yarn test       # vitest run (single pass)
yarn test:watch # watch mode
```

Tests use `vitest` with `jsdom`, `@testing-library/react`, and `@testing-library/user-event`. A custom `renderWithTheme` wrapper injects the styled-components theme.
