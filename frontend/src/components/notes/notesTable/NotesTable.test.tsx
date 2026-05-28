import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotesTable } from './NotesTable';
import { renderWithTheme } from '../../../test/renderWithTheme';
import type { Note } from '../../../types/notes';

const sampleNotes: Note[] = [
  {
    id: '1',
    site: 'Site A',
    equipment: 'Bomba',
    variable: 'Corrente',
    timestamp: '2024-01-02T10:54:22.000Z',
    author: 'Daniel',
    message: 'Test message',
  },
  {
    id: '2',
    site: 'Site B',
    equipment: 'Motor',
    variable: 'Tensao',
    timestamp: '2024-01-03T14:00:00.000Z',
    author: 'Alice',
    message: 'Another message',
  },
];

describe('NotesTable', () => {
  it('renders table headers', () => {
    renderWithTheme(
      <NotesTable notes={[]} loading={false} error={null} onEdit={vi.fn()} onDelete={vi.fn()} />,
    );
    expect(screen.getByText('Site')).toBeInTheDocument();
    expect(screen.getByText('Equipamento')).toBeInTheDocument();
    expect(screen.getByText('Acoes')).toBeInTheDocument();
  });

  it('renders note data', () => {
    renderWithTheme(
      <NotesTable notes={sampleNotes} loading={false} error={null} onEdit={vi.fn()} onDelete={vi.fn()} />,
    );
    expect(screen.getByText('Site A')).toBeInTheDocument();
    expect(screen.getByText('Bomba')).toBeInTheDocument();
    expect(screen.getByText('Daniel')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByText('Site B')).toBeInTheDocument();
  });

  it('shows empty message when no notes', () => {
    renderWithTheme(
      <NotesTable notes={[]} loading={false} error={null} onEdit={vi.fn()} onDelete={vi.fn()} />,
    );
    expect(screen.getByText('Nenhuma nota encontrada.')).toBeInTheDocument();
  });

  it('shows error message when error', () => {
    renderWithTheme(
      <NotesTable notes={[]} loading={false} error="Network error" onEdit={vi.fn()} onDelete={vi.fn()} />,
    );
    expect(screen.getByText(/Network error/)).toBeInTheDocument();
  });

  it('shows skeleton when loading', () => {
    renderWithTheme(
      <NotesTable notes={[]} loading error={null} onEdit={vi.fn()} onDelete={vi.fn()} />,
    );
    // Should render 5 skeleton rows
    expect(screen.queryByText('Site A')).not.toBeInTheDocument();
  });

  it('calls onEdit when edit button clicked', async () => {
    const onEdit = vi.fn();
    renderWithTheme(
      <NotesTable notes={sampleNotes} loading={false} error={null} onEdit={onEdit} onDelete={vi.fn()} />,
    );
    const editButtons = screen.getAllByTitle('Editar');
    await userEvent.click(editButtons[0]);
    expect(onEdit).toHaveBeenCalledWith(sampleNotes[0]);
  });

  it('calls onDelete when delete button clicked', async () => {
    const onDelete = vi.fn();
    renderWithTheme(
      <NotesTable notes={sampleNotes} loading={false} error={null} onEdit={vi.fn()} onDelete={onDelete} />,
    );
    const deleteButtons = screen.getAllByTitle('Excluir');
    await userEvent.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledWith(sampleNotes[0]);
  });
});
