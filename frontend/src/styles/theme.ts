export const theme = {
  colors: {
    primary: {
      50: '#f3faf5',
      100: '#e2f6e9',
      200: '#c7ebd4',
      300: '#9bdab2',
      400: '#67c188',
      500: '#42a566',
      600: '#328751',
      700: '#2a6b42',
      800: '#265538',
      900: '#204730',
      950: '#0d2617',
    },
    danger: {
      main: '#FC5050',
      dark: '#F63131',
      light: '#F97171',
    },
    gray: {
      100: '#E7E7E7',
      400: '#A2A2A2',
      500: '#585858',
      600: '#444444',
      700: '#393939',
      800: '#333333',
    },
    bg: '#FAFAFA',
    white: '#ffffff',
    black: '#000000',
  },
  sidebar: {
    width: '220px',
  },
  font: {
    family: "'Sora', sans-serif",
  },
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    full: '9999px',
  },
} as const;

export type Theme = typeof theme;
