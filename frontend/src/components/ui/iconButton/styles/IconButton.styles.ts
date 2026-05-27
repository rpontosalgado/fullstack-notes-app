import styled from 'styled-components';

export const IconButton = styled.button<{
  $danger?: boolean;
}>`
  width: 30px;
  height: 30px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  color: ${({ theme }) => theme.colors.gray[500]};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover:not(:disabled) {
    background: ${({ $danger, theme }) =>
      $danger ? '#fff5f5' : theme.colors.gray[100]};
    border-color: ${({ $danger, theme }) =>
      $danger ? theme.colors.danger.light : theme.colors.gray[100]};
    color: ${({ $danger, theme }) =>
      $danger ? theme.colors.danger.main : theme.colors.gray[800]};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & + & {
    margin-left: 6px;
  }
`;
