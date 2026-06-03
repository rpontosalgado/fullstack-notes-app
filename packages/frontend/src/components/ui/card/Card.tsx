import styled from 'styled-components';

interface CardProps {
  $radius?: 'sm' | 'md' | 'lg' | 'xl';
  $padding?: number | string;
}

const radiusMap = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
};

export const Card = styled.div<CardProps>`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  border-radius: ${({ $radius }) =>
    $radius ? radiusMap[$radius] : '8px'};
  ${({ $padding }) =>
    $padding != null &&
    `padding: ${typeof $padding === 'number' ? `${$padding}px` : $padding};`}
  overflow-x: auto;
`;
