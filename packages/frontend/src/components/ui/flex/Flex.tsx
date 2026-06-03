import styled from 'styled-components';

interface FlexProps {
  $direction?: 'row' | 'column';
  $align?: 'start' | 'center' | 'end' | 'stretch';
  $justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  $gap?: number | string;
  $wrap?: boolean;
  $flex?: number | string;
  $padding?: number | string;
  $fullHeight?: boolean;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction ?? 'row'};
  align-items: ${({ $align }) => $align ?? 'start'};
  justify-content: ${({ $justify }) => $justify ?? 'start'};
  gap: ${({ $gap }) => (typeof $gap === 'number' ? `${$gap}px` : $gap ?? 0)};
  ${({ $wrap }) => $wrap && 'flex-wrap: wrap;'}
  ${({ $flex }) => $flex != null && `flex: ${$flex};`}
  ${({ $padding }) =>
    $padding != null &&
    `padding: ${typeof $padding === 'number' ? `${$padding}px` : $padding};`}
  ${({ $fullHeight }) => $fullHeight && 'height: 100%;'}
`;
