import type { JSX } from 'react';
import 'styled-components';
import {
  AnalyticsIcon,
  DashboardIcon,
  HistoryIcon,
  HomeIcon,
  LogoIcon,
  LogsIcon,
  MapIcon,
  NotesIcon,
} from '../../ui/icons';
import {
  Divider,
  Footer,
  FooterCopy,
  Logo,
  Nav,
  NavButton,
  NavIcon,
  NavLabel,
  NavList,
  NavSection,
  SidebarWrapper,
  User,
  UserAvatar,
  UserName,
} from './styles/Sidebar.styles';

interface NavItem {
  icon: JSX.Element;
  label: string;
  active?: boolean;
}

const mainNavItems: NavItem[] = [
  { icon: <HomeIcon />, label: 'Home' },
  { icon: <AnalyticsIcon />, label: 'Analytics' },
  { icon: <NotesIcon />, label: 'Notas', active: true },
  { icon: <HistoryIcon />, label: 'Histórico' },
  { icon: <MapIcon />, label: 'Mapa' },
  { icon: <DashboardIcon />, label: 'Dashboard' },
];

const optionNavItems: NavItem[] = [{ icon: <LogsIcon />, label: 'Logs' }];

export const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Logo>
        <LogoIcon />
      </Logo>

      <Nav>
        <NavSection>
          <NavLabel>Menu Principal</NavLabel>
          <NavList>
            {mainNavItems.map((item) => (
              <li key={item.label}>
                <NavButton $active={item.active}>
                  <NavIcon $active={item.active}>{item.icon}</NavIcon>
                  {item.label}
                </NavButton>
              </li>
            ))}
          </NavList>
        </NavSection>

        <Divider />

        <NavSection>
          <NavLabel>Opções</NavLabel>
          <NavList>
            {optionNavItems.map((item) => (
              <li key={item.label}>
                <NavButton>
                  <NavIcon>{item.icon}</NavIcon>
                  {item.label}
                </NavButton>
              </li>
            ))}
          </NavList>
        </NavSection>
      </Nav>

      <Footer>
        <FooterCopy>© 2024 Enterpriseipsum | v1.0.0</FooterCopy>
        <User>
          <UserAvatar>EG</UserAvatar>
          <UserName>Elias EG</UserName>
        </User>
      </Footer>
    </SidebarWrapper>
  );
};
