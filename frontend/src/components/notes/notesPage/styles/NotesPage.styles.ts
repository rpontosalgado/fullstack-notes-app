import styled from 'styled-components';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[800]};
  line-height: 1.2;
`;

export const NewButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 18px;
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

export const FilterSection = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 16px;
`;

export const PaginationSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
`;

export const PaginationInfo = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[400]};
`;
