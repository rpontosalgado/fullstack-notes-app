import styled from 'styled-components';

interface BadgeProps {
  $size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: '24px',
  md: '30px',
  lg: '36px',
};

const fontSizeMap = {
  sm: '10px',
  md: '11px',
  lg: '13px',
};

export const Badge = styled.span<BadgeProps>`
  width: ${({ $size }) => sizeMap[$size ?? 'md']};
  height: ${({ $size }) => sizeMap[$size ?? 'md']};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary[700]};
  color: ${({ theme }) => theme.colors.primary[200]};
  font-size: ${({ $size }) => fontSizeMap[$size ?? 'md']};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: ${({ theme }) => theme.font.family};
`;
