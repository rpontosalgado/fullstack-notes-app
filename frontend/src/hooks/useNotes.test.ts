import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useNotes } from './useNotes';
import * as notesService from '../services/notesService';

vi.mock('../services/notesService');

const mockFetchNotes = vi.mocked(notesService.fetchNotes);
const mockCreateNote = vi.mocked(notesService.createNote);
const mockUpdateNote = vi.mocked(notesService.updateNote);
const mockDeleteNote = vi.mocked(notesService.deleteNote);
const mockExportNotes = vi.mocked(notesService.exportNotes);

const paginatedResponse = {
  data: [
    {
      id: '1',
      site: 'Site A',
      equipment: 'Bomba',
      variable: 'Corrente',
      timestamp: '2024-01-01T00:00:00Z',
      author: 'Daniel',
      message: 'Test message',
    },
  ],
  total: 1,
  page: 1,
  limit: 10,
  totalPages: 1,
};

describe('useNotes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetchNotes.mockResolvedValue(paginatedResponse);
  });

  it('loads notes on mount', async () => {
    const { result } = renderHook(() => useNotes());
    await waitFor(() => expect(result.current.loading).toBe(false), {
      timeout: 3000,
    });
    expect(mockFetchNotes).toHaveBeenCalledWith({ page: 1, limit: 10 });
    expect(result.current.data).toEqual(paginatedResponse);
  });

  it('sets error on fetch failure', async () => {
    mockFetchNotes.mockRejectedValue(new Error('network error'));
    const { result } = renderHook(() => useNotes());
    await waitFor(() => expect(result.current.loading).toBe(false), {
      timeout: 3000,
    });
    expect(result.current.error).toBe('network error');
  });

  it('applyFilters resets page to 1', async () => {
    const { result } = renderHook(() => useNotes());
    await waitFor(() => expect(result.current.loading).toBe(false), {
      timeout: 3000,
    });
    mockFetchNotes.mockClear();
    act(() => result.current.applyFilters({ site: 'Test' }));
    await waitFor(() => expect(result.current.loading).toBe(false), {
      timeout: 3000,
    });
    expect(mockFetchNotes).toHaveBeenCalledWith(
      expect.objectContaining({ site: 'Test', page: 1, limit: 10 }),
    );
  });

  it('goToPage changes the page', async () => {
    const { result } = renderHook(() => useNotes());
    await waitFor(() => expect(result.current.loading).toBe(false), {
      timeout: 3000,
    });
    mockFetchNotes.mockClear();
    act(() => result.current.goToPage(3));
    await waitFor(() => expect(result.current.loading).toBe(false), {
      timeout: 3000,
    });
    expect(mockFetchNotes).toHaveBeenCalledWith(
      expect.objectContaining({ page: 3 }),
    );
  });

  it('addNote calls createNote and reloads', async () => {
    const { result } = renderHook(() => useNotes());
    await waitFor(() => expect(result.current.loading).toBe(false), {
      timeout: 3000,
    });
    mockFetchNotes.mockClear();
    const payload = {
      site: 'New',
      equipment: 'EQ',
      variable: 'V',
      timestamp: '2024-01-01T00:00:00Z',
      author: 'A',
      message: 'M',
    };
    mockCreateNote.mockResolvedValue({ ...payload, id: '2' });
    await act(async () => {
      await result.current.addNote(payload);
    });
    expect(mockCreateNote).toHaveBeenCalledWith(payload);
    expect(mockFetchNotes).toHaveBeenCalled();
  });

  it('editNote calls updateNote and reloads', async () => {
    const { result } = renderHook(() => useNotes());
    await waitFor(() => expect(result.current.loading).toBe(false), {
      timeout: 3000,
    });
    mockFetchNotes.mockClear();
    await act(async () => {
      await result.current.editNote('1', { site: 'Updated' });
    });
    expect(mockUpdateNote).toHaveBeenCalledWith('1', { site: 'Updated' });
    expect(mockFetchNotes).toHaveBeenCalled();
  });

  it('removeNote calls deleteNote and reloads', async () => {
    const { result } = renderHook(() => useNotes());
    await waitFor(() => expect(result.current.loading).toBe(false), {
      timeout: 3000,
    });
    mockFetchNotes.mockClear();
    await act(async () => {
      await result.current.removeNote('1');
    });
    expect(mockDeleteNote).toHaveBeenCalledWith('1');
    expect(mockFetchNotes).toHaveBeenCalled();
  });

  it('exportAll calls exportNotes with filter values (excluding page/limit)', async () => {
    const allNotes = [
      { id: '1', site: 'A', equipment: 'B', variable: 'C', timestamp: '2024-01-01T00:00:00Z', author: 'D', message: 'E' },
      { id: '2', site: 'F', equipment: 'G', variable: 'H', timestamp: '2024-01-02T00:00:00Z', author: 'I', message: 'J' },
    ];
    mockExportNotes.mockResolvedValue(allNotes);

    const { result } = renderHook(() => useNotes());
    await waitFor(() => expect(result.current.loading).toBe(false), {
      timeout: 3000,
    });

    act(() => result.current.applyFilters({ site: 'Test', equipment: 'Bomba' }));
    await waitFor(() => expect(result.current.loading).toBe(false), {
      timeout: 3000,
    });

    mockExportNotes.mockClear();
    let exported: typeof allNotes | undefined;
    await act(async () => {
      exported = await result.current.exportAll();
    });

    expect(mockExportNotes).toHaveBeenCalledWith({ site: 'Test', equipment: 'Bomba' });
    expect(exported).toEqual(allNotes);
  });
});

