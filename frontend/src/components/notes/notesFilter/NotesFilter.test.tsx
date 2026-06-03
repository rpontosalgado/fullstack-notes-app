/// <reference types="@testing-library/jest-dom/vitest" />
import { type Mock, describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotesFilter } from './NotesFilter';
import { renderWithTheme } from '../../../test/renderWithTheme';
import type { NotesFilters } from '../../../types/notes';

type FilterFn = (filters: Omit<NotesFilters, 'page' | 'limit'>) => void;

describe('NotesFilter', () => {
  let onFilter: Mock<FilterFn>;

  beforeEach(() => {
    onFilter = vi.fn<FilterFn>();
  });

  it('renders all filter inputs', () => {
    renderWithTheme(<NotesFilter onFilter={onFilter} />);
    expect(screen.getByPlaceholderText('Selecione um site')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Selecione um equipamento')).toBeInTheDocument();
    expect(screen.getByText('Filtrar')).toBeInTheDocument();
    expect(screen.getByText('Limpar')).toBeInTheDocument();
  });

  it('calls onFilter with values when Filtrar is clicked', async () => {
    renderWithTheme(<NotesFilter onFilter={onFilter} />);
    await userEvent.type(screen.getByPlaceholderText('Selecione um site'), 'Site A');
    await userEvent.click(screen.getByText('Filtrar'));
    expect(onFilter).toHaveBeenCalledWith({ site: 'Site A' });
  });

  it('calls onFilter with equipment and date range', async () => {
    renderWithTheme(<NotesFilter onFilter={onFilter} />);
    await userEvent.type(screen.getByPlaceholderText('Selecione um equipamento'), 'Bomba');

    const dateInputs = document.querySelectorAll<HTMLInputElement>('input[type="date"]');
    await userEvent.clear(dateInputs[0]);
    await userEvent.type(dateInputs[0], '2024-01-01');
    await userEvent.clear(dateInputs[1]);
    await userEvent.type(dateInputs[1], '2024-01-31');

    await userEvent.click(screen.getByText('Filtrar'));
    expect(onFilter).toHaveBeenCalledWith({
      equipment: 'Bomba',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
    });
  });

  it('clears all fields and calls onFilter with empty object', async () => {
    renderWithTheme(<NotesFilter onFilter={onFilter} />);
    const siteInput = screen.getByPlaceholderText('Selecione um site');
    await userEvent.type(siteInput, 'Test');
    await userEvent.click(screen.getByText('Limpar'));
    expect(onFilter).toHaveBeenCalledWith({});
  });
});
