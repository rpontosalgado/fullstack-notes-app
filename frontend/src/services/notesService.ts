import type {
  CreateNotePayload,
  Note,
  NotesFilters,
  PaginatedResponse,
  UpdateNotePayload,
} from '../types/notes';

const BASE_URL = '/api/v1';

function buildQueryString(filters: NotesFilters): string {
  const params = new URLSearchParams();

  if (filters.site) params.append('site', filters.site);
  if (filters.equipment) params.append('equipment', filters.equipment);
  if (filters.startDate) params.append('startDate', filters.startDate);
  if (filters.endDate) params.append('endDate', filters.endDate);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  return params.toString();
}

export async function fetchNotes(
  filters: NotesFilters,
): Promise<PaginatedResponse<Note>> {
  const qs = buildQueryString(filters);
  const response = await fetch(`${BASE_URL}/notes${qs ? `?${qs}` : ''}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch notes: ${response.statusText}`);
  }

  return response.json() as Promise<PaginatedResponse<Note>>;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to create note: ${response.statusText}`);
  }

  return response.json() as Promise<Note>;
}

export async function updateNote(
  id: string,
  payload: UpdateNotePayload,
): Promise<Note> {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to update note: ${response.statusText}`);
  }

  return response.json() as Promise<Note>;
}

export async function deleteNote(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete note: ${response.statusText}`);
  }
}
