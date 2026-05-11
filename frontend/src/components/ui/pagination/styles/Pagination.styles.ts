import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  width: 34px;
  height: 34px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary[500] : theme.colors.gray[100]};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary[500] : theme.colors.white};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.white : theme.colors.gray[600]};
  font-size: 13px;
  font-family: ${({ theme }) => theme.font.family};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary[400]};
    color: ${({ $active, theme }) =>
      $active ? theme.colors.white : theme.colors.primary[600]};
  }
`;

export const NavButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray[500]};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary[400]};
    color: ${({ theme }) => theme.colors.primary[600]};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const Ellipsis = styled.span`
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 13px;
`;
