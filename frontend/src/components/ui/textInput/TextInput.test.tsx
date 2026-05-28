import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { TextInput } from './TextInput';
import { Textarea } from '../textarea/Textarea';
import { renderWithTheme } from '../../../test/renderWithTheme';

describe('TextInput', () => {
  it('renders an input element', () => {
    renderWithTheme(<TextInput placeholder="Type..." />);
    expect(document.querySelector('input')).toHaveAttribute('placeholder', 'Type...');
  });

  it('renders filled variant', () => {
    renderWithTheme(<TextInput $variant="filled" />);
    expect(document.querySelector('input')).toBeInTheDocument();
  });

  it('applies fullWidth', () => {
    renderWithTheme(<TextInput $fullWidth />);
    expect(document.querySelector('input')).toHaveStyle({ width: '100%' });
  });

  it('renders error border', () => {
    renderWithTheme(<TextInput $error />);
    expect(document.querySelector('input')).toBeInTheDocument();
  });
});

describe('Textarea', () => {
  it('renders a textarea element', () => {
    renderWithTheme(<Textarea rows={3} />);
    expect(document.querySelector('textarea')).toHaveAttribute('rows', '3');
  });

  it('accepts filled variant', () => {
    renderWithTheme(<Textarea $variant="filled" />);
    expect(document.querySelector('textarea')).toBeInTheDocument();
  });
});
