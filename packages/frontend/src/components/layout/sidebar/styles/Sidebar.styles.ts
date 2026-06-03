import styled from 'styled-components';

export const SidebarWrapper = styled.aside`
  width: ${({ theme }) => theme.sidebar.width};
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.black};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
`;

export const Logo = styled.div`
  padding: 24px 20px 64px;
  align-self: center;
`;

export const Nav = styled.nav`
  flex: 1;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
`;

export const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NavLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.gray[100]};
  padding: 0 20px;
  margin-bottom: 4px;
  display: block;
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 40px 0 16px;
  justify-content: left;
`;

export const NavButton = styled.button<{ $active?: boolean }>`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary[300] : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.black : theme.colors.gray[100]};
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  font-family: ${({ theme }) => theme.font.family};
  text-align: left;
  transition:
    background 0.15s,
    color 0.15s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[700]};
    color: ${({ theme }) => theme.colors.gray[100]};
  }
`;

export const NavIcon = styled.span<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  color: inherit;
`;

export const Divider = styled.div`
  margin: 0 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
`;

export const Footer = styled.div`
  padding: 16px 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[700]};
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FooterCopy = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const UserAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary[700]};
  color: ${({ theme }) => theme.colors.primary[200]};
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const UserName = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[100]};
`;
