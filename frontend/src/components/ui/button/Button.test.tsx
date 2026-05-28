import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';
import { renderWithTheme } from '../../../test/renderWithTheme';

describe('Button', () => {
  it('renders children', () => {
    renderWithTheme(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    renderWithTheme(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByText('Click'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders secondary variant', () => {
    renderWithTheme(<Button $variant="secondary">Cancel</Button>);
    const btn = screen.getByText('Cancel');
    expect(btn).toHaveStyle({ background: 'transparent' });
  });

  it('renders danger variant', () => {
    renderWithTheme(<Button $variant="danger">Delete</Button>);
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('disables the button when disabled', () => {
    renderWithTheme(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });

  it('renders md size', () => {
    renderWithTheme(<Button $size="md">Large</Button>);
    const btn = screen.getByText('Large');
    expect(btn).toHaveStyle({ height: '40px' });
  });

  it('applies fullWidth', () => {
    renderWithTheme(<Button $fullWidth>Full</Button>);
    expect(screen.getByText('Full')).toHaveStyle({ width: '100%' });
  });
});
