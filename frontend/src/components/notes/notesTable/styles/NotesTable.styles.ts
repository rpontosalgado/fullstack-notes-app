import styled, { keyframes } from 'styled-components';

export const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  background: ${({ theme }) => theme.colors.white};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`;

export const Th = styled.th`
  background-color: ${({ theme }) => theme.colors.bg};
  padding: 12px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.gray[500]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  white-space: nowrap;
`;

export const Tr = styled.tr`
  transition: background-color 0.1s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[50]};
  }

  &:not(:last-child) td {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  }
`;

export const Td = styled.td`
  padding: 14px 16px;
  color: ${({ theme }) => theme.colors.gray[800]};
  vertical-align: top;
`;

export const MessageTd = styled(Td)`
  max-width: 280px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

export const EmptyCell = styled.td`
  text-align: center;
  padding: 48px 16px;
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 14px;
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger.main};
  font-size: 14px;
  padding: 32px;
  text-align: center;
`;

const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

export const Skeleton = styled.div`
  height: 14px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.gray[100]} 25%,
    #f0f0f0 50%,
    ${({ theme }) => theme.colors.gray[100]} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.2s infinite;
  border-radius: ${({ theme }) => theme.radius.sm};
  width: 80%;
`;
