import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormField } from './FormField';
import { renderWithTheme } from '../../../test/renderWithTheme';

describe('FormField', () => {
  it('renders label and text input', () => {
    renderWithTheme(
      <FormField
        label="Site"
        name="site"
        value=""
        onChange={vi.fn()}
        placeholder="Nome do site"
      />,
    );
    expect(screen.getByText('Site')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nome do site')).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const onChange = vi.fn();
    renderWithTheme(
      <FormField label="Site" name="site" value="" onChange={onChange} />,
    );
    await userEvent.type(screen.getByRole('textbox'), 'test');
    expect(onChange).toHaveBeenCalled();
  });

  it('renders input with type datetime-local', () => {
    renderWithTheme(
      <FormField
        label="Data"
        name="timestamp"
        type="datetime-local"
        value=""
        onChange={vi.fn()}
      />,
    );
    const input = document.querySelector('input[type="datetime-local"]');
    expect(input).toBeInTheDocument();
  });

  it('renders textarea when multiline is true', () => {
    renderWithTheme(
      <FormField
        label="Message"
        name="message"
        value=""
        onChange={vi.fn()}
        multiline
        rows={4}
      />,
    );
    expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA');
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '4');
  });
});
