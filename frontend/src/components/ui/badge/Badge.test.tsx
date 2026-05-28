import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';
import { renderWithTheme } from '../../../test/renderWithTheme';

describe('Badge', () => {
  it('renders children', () => {
    renderWithTheme(<Badge>JD</Badge>);
    expect(document.querySelector('span')).toHaveTextContent('JD');
  });

  it('renders md size by default (30px)', () => {
    const { container } = renderWithTheme(<Badge />);
    expect(container.firstChild).toHaveStyle({ width: '30px', height: '30px' });
  });

  it('renders sm size (24px)', () => {
    const { container } = renderWithTheme(<Badge $size="sm" />);
    expect(container.firstChild).toHaveStyle({ width: '24px', height: '24px' });
  });

  it('renders circular shape', () => {
    const { container } = renderWithTheme(<Badge />);
    expect(container.firstChild).toHaveStyle({ borderRadius: '50%' });
  });
});
