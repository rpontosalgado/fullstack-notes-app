import { render, type RenderOptions } from '@testing-library/react';
import { type ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

function Wrapper({ children }: { children: ReactElement }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export function renderWithTheme(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, { wrapper: Wrapper, ...options });
}
