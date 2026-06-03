import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';
import { renderWithTheme } from '../../../test/renderWithTheme';

describe('Modal', () => {
  it('renders title and children', () => {
    renderWithTheme(
      <Modal title="Test Modal" onClose={vi.fn()}>
        <p>Modal content</p>
      </Modal>,
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('renders close button by default', () => {
    renderWithTheme(<Modal title="Modal" onClose={vi.fn()}><p /></Modal>);
    expect(screen.getByLabelText('Fechar')).toBeInTheDocument();
  });

  it('hides close button when showCloseButton is false', () => {
    renderWithTheme(
      <Modal title="Modal" onClose={vi.fn()} showCloseButton={false}>
        <p />
      </Modal>,
    );
    expect(screen.queryByLabelText('Fechar')).not.toBeInTheDocument();
  });

  it('calls onClose when close button clicked', async () => {
    const onClose = vi.fn();
    renderWithTheme(<Modal title="Modal" onClose={onClose}><p /></Modal>);
    await userEvent.click(screen.getByLabelText('Fechar'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay clicked', async () => {
    const onClose = vi.fn();
    const { container } = renderWithTheme(
      <Modal title="Modal" onClose={onClose}><p /></Modal>,
    );
    const overlay = container.firstChild as HTMLElement;
    await userEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('displays error message when provided', () => {
    renderWithTheme(
      <Modal title="Modal" onClose={vi.fn()} error="Something went wrong">
        <p />
      </Modal>,
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('does not display error when null', () => {
    renderWithTheme(
      <Modal title="Modal" onClose={vi.fn()} error={null}>
        <p />
      </Modal>,
    );
    expect(document.querySelector('[style*="margin-top"]')).not.toBeInTheDocument();
  });
});
