import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalActions } from './ModalActions';
import { renderWithTheme } from '../../../test/renderWithTheme';

describe('ModalActions', () => {
  it('renders cancel and submit buttons', () => {
    renderWithTheme(
      <ModalActions
        onCancel={vi.fn()}
        submitLabel="Salvar"
        submitting={false}
      />,
    );
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });

  it('shows submitting label when submitting', () => {
    renderWithTheme(
      <ModalActions
        onCancel={vi.fn()}
        submitLabel="Salvar"
        submittingLabel="Salvando..."
        submitting
      />,
    );
    expect(screen.getByText('Salvando...')).toBeInTheDocument();
    expect(screen.queryByText('Salvar')).not.toBeInTheDocument();
  });

  it('calls onCancel when cancel is clicked', async () => {
    const onCancel = vi.fn();
    renderWithTheme(
      <ModalActions onCancel={onCancel} submitLabel="OK" submitting={false} />,
    );
    await userEvent.click(screen.getByText('Cancelar'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit for button type', async () => {
    const onSubmit = vi.fn();
    renderWithTheme(
      <ModalActions
        onCancel={vi.fn()}
        onSubmit={onSubmit}
        submitLabel="Excluir"
        submitting={false}
        submitType="button"
        variant="danger"
      />,
    );
    await userEvent.click(screen.getByText('Excluir'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('uses danger variant styling', () => {
    renderWithTheme(
      <ModalActions
        onCancel={vi.fn()}
        submitLabel="Delete"
        submitting={false}
        variant="danger"
      />,
    );
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });
});
