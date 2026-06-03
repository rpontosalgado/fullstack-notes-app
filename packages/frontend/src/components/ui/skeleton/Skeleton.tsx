import styled from 'styled-components';
import { shimmer } from '../../../styles/animations';

interface SkeletonProps {
  $width?: string;
  $height?: string;
  $radius?: string;
}

export const Skeleton = styled.div<SkeletonProps>`
  height: ${({ $height }) => $height ?? '14px'};
  width: ${({ $width }) => $width ?? '80%'};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.gray[100]} 25%,
    #f0f0f0 50%,
    ${({ theme }) => theme.colors.gray[100]} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.2s infinite;
  border-radius: ${({ $radius, theme }) => $radius ?? theme.radius.sm};
`;
