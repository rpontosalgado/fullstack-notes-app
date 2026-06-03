import { styled } from 'styled-components';

export const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Main = styled.main`
  margin-left: ${({ theme }) => theme.sidebar.width};
  flex: 1;
  padding: 32px;
  background-color: ${({ theme }) => theme.colors.bg};
  min-height: 100vh;
`;
