import { describe, it, expect } from 'vitest';
import { Skeleton } from './Skeleton';
import { renderWithTheme } from '../../../test/renderWithTheme';

describe('Skeleton', () => {
  it('renders a div', () => {
    const { container } = renderWithTheme(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('accepts custom width and height', () => {
    const { container } = renderWithTheme(<Skeleton $width="200px" $height="20px" />);
    expect(container.firstChild).toHaveStyle({ width: '200px', height: '20px' });
  });

  it('defaults to 14px height and 80% width', () => {
    const { container } = renderWithTheme(<Skeleton />);
    expect(container.firstChild).toHaveStyle({ height: '14px', width: '80%' });
  });
});
