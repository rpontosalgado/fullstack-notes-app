import type { JSX } from 'react';
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
import { Flex } from '../../ui/flex/Flex';
import { Typography } from '../../ui/typography/Typography';
import { Badge } from '../../ui/badge/Badge';
import {
  Divider,
  NavButton,
  NavIcon,
  NavList,
  SidebarWrapper,
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
      <div style={{ padding: '24px 20px 64px', alignSelf: 'center' }}>
        <LogoIcon />
      </div>

      <Flex
        as="nav"
        $direction="column"
        $gap={24}
        $flex={1}
        $padding="16px 0"
        style={{ overflowY: 'auto' }}
      >
        <Flex $direction="column" $gap={4}>
          <div style={{ padding: '0 20px', marginBottom: 4 }}>
            <Typography $variant="h3">Menu Principal</Typography>
          </div>
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
        </Flex>

        <Divider />

        <Flex $direction="column" $gap={4}>
          <div style={{ padding: '0 20px', marginBottom: 4 }}>
            <Typography $variant="h3">Opcoes</Typography>
          </div>
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
        </Flex>
      </Flex>

      <Flex
        $direction="column"
        $gap={12}
        $padding="16px 20px"
        style={{ borderTop: '1px solid #393939' }}
      >
        <Typography $variant="caption">
          &copy; 2026 Notes App | v1.0.0
        </Typography>
        <Flex $align="center" $gap={10}>
          <Badge $size="md">JD</Badge>
          <Typography $variant="body" style={{ color: '#E7E7E7' }}>
            John Doe
          </Typography>
        </Flex>
      </Flex>
    </SidebarWrapper>
  );
};
