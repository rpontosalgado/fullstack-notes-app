import { useState, useEffect, useCallback } from 'react';
import { fetchNotes, createNote } from '../services/notesService';
import type {
  CreateNotePayload,
  Note,
  NotesFilters,
  PaginatedResponse,
} from '../types/notes';

const ITEMS_PER_PAGE = 10;

export function useNotes() {
  const [data, setData] = useState<PaginatedResponse<Note> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<NotesFilters>({
    page: 1,
    limit: ITEMS_PER_PAGE,
  });

  const loadNotes = useCallback(async (currentFilters: NotesFilters) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchNotes(currentFilters);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      await loadNotes(filters);
    })();
  }, [filters, loadNotes]);

  const applyFilters = useCallback(
    (newFilters: Omit<NotesFilters, 'page' | 'limit'>) => {
      setFilters({ ...newFilters, page: 1, limit: ITEMS_PER_PAGE });
    },
    [],
  );

  const goToPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const addNote = useCallback(
    async (payload: CreateNotePayload): Promise<void> => {
      await createNote(payload);
      await loadNotes(filters);
    },
    [filters, loadNotes],
  );

  return { data, loading, error, filters, applyFilters, goToPage, addNote };
}
