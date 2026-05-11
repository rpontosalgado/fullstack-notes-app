import styled from 'styled-components';

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  height: 38px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[800]};
  background: ${({ theme }) => theme.colors.white};
  transition: border-color 0.15s;
  min-width: 160px;
  font-family: ${({ theme }) => theme.font.family};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const DateRange = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DateSeparator = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[400]};
  white-space: nowrap;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 38px;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 13px;
  font-weight: 600;
  font-family: ${({ theme }) => theme.font.family};
  transition: background-color 0.15s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[600]};
  }
`;

export const ClearButton = styled.button`
  height: 38px;
  padding: 0 14px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-family: ${({ theme }) => theme.font.family};
  transition:
    border-color 0.15s,
    color 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gray[400]};
    color: ${({ theme }) => theme.colors.gray[800]};
  }
`;
