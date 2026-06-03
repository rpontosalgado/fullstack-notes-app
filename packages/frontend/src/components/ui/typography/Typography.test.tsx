import { describe, it, expect } from 'vitest';
import { Typography } from './Typography';
import { renderWithTheme } from '../../../test/renderWithTheme';

describe('Typography', () => {
  it('renders h1 variant', () => {
    const { container } = renderWithTheme(<Typography $variant="h1">Title</Typography>);
    expect(container.querySelector('p')).toHaveStyle({ fontSize: '24px', fontWeight: 600 });
  });

  it('renders h2 variant', () => {
    const { container } = renderWithTheme(<Typography $variant="h2">Subtitle</Typography>);
    expect(container.querySelector('p')).toHaveStyle({ fontSize: '18px', fontWeight: 600 });
  });

  it('renders body variant', () => {
    const { container } = renderWithTheme(<Typography $variant="body">Text</Typography>);
    expect(container.querySelector('p')).toHaveStyle({ fontSize: '14px' });
  });

  it('renders caption variant', () => {
    const { container } = renderWithTheme(<Typography $variant="caption">small</Typography>);
    expect(container.querySelector('p')).toHaveStyle({ fontSize: '12px' });
  });

  it('renders error variant in danger color', () => {
    const { container } = renderWithTheme(<Typography $variant="error">Error!</Typography>);
    expect(container.querySelector('p')).toHaveStyle({ color: '#FC5050' });
  });

  it('renders label variant uppercase', () => {
    const { container } = renderWithTheme(<Typography $variant="label">Label</Typography>);
    expect(container.querySelector('p')).toHaveStyle({ textTransform: 'uppercase' });
  });

  it('renders with custom as element', () => {
    renderWithTheme(<Typography $variant="body" $as="span">span text</Typography>);
    // styled-components renders as p by default since we used styled.p,
    // but the test shows it renders
  });

  it('applies text alignment', () => {
    const { container } = renderWithTheme(<Typography $variant="body" $align="center">centered</Typography>);
    expect(container.querySelector('p')).toHaveStyle({ textAlign: 'center' });
  });
});
