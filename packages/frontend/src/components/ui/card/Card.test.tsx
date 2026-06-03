import { describe, it, expect } from 'vitest';
import { Card } from './Card';
import { renderWithTheme } from '../../../test/renderWithTheme';

describe('Card', () => {
  it('renders children', () => {
    const { container } = renderWithTheme(<Card><p>content</p></Card>);
    expect(container.querySelector('p')).toHaveTextContent('content');
  });

  it('renders with white background and border', () => {
    const { container } = renderWithTheme(<Card />);
    expect(container.firstChild).toHaveStyle({ background: '#ffffff', border: '1px solid #E7E7E7' });
  });

  it('applies padding when number', () => {
    const { container } = renderWithTheme(<Card $padding={24} />);
    expect(container.firstChild).toHaveStyle({ padding: '24px' });
  });

  it('applies custom radius', () => {
    const { container } = renderWithTheme(<Card $radius="xl" />);
    expect(container.firstChild).toHaveStyle({ borderRadius: '12px' });
  });
});
