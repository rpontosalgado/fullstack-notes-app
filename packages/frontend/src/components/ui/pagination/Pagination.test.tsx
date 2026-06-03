import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';
import { renderWithTheme } from '../../../test/renderWithTheme';

describe('Pagination', () => {
  it('returns null when totalPages <= 1', () => {
    const { container } = renderWithTheme(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders page buttons', () => {
    renderWithTheme(
      <Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />,
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onPageChange when a page is clicked', async () => {
    const onPageChange = vi.fn();
    renderWithTheme(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />,
    );
    await userEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange for next via chevron', async () => {
    const onPageChange = vi.fn();
    renderWithTheme(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />,
    );
    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[buttons.length - 1];
    await userEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('disables previous chevron on first page', () => {
    renderWithTheme(
      <Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />,
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
  });

  it('disables next chevron on last page', () => {
    renderWithTheme(
      <Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} />,
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons[buttons.length - 1]).toBeDisabled();
  });

  it('shows ellipsis for large page ranges', () => {
    renderWithTheme(
      <Pagination currentPage={5} totalPages={20} onPageChange={vi.fn()} />,
    );
    expect(screen.getAllByText('...')).toHaveLength(2);
  });
});
