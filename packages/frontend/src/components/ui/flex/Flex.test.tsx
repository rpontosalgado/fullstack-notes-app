import { describe, it, expect } from 'vitest';
import { Flex } from './Flex';
import { renderWithTheme } from '../../../test/renderWithTheme';

describe('Flex', () => {
  it('renders children', () => {
    const { container } = renderWithTheme(<Flex><span>child</span></Flex>);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('defaults to row direction', () => {
    const { container } = renderWithTheme(<Flex $gap={8} />);
    expect(container.firstChild).toHaveStyle({ flexDirection: 'row' });
  });

  it('renders column direction', () => {
    const { container } = renderWithTheme(<Flex $direction="column" />);
    expect(container.firstChild).toHaveStyle({ flexDirection: 'column' });
  });

  it('centers both axes', () => {
    const { container } = renderWithTheme(
      <Flex $align="center" $justify="center" $fullHeight />,
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveStyle({ alignItems: 'center', justifyContent: 'center', height: '100%' });
  });

  it('wraps when $wrap is true', () => {
    const { container } = renderWithTheme(<Flex $wrap />);
    expect(container.firstChild).toHaveStyle({ flexWrap: 'wrap' });
  });

  it('applies gap as pixels when number', () => {
    const { container } = renderWithTheme(<Flex $gap={16} />);
    expect(container.firstChild).toHaveStyle({ gap: '16px' });
  });
});
