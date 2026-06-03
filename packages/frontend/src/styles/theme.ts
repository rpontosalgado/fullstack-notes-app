export const theme = {
  colors: {
    primary: {
      50: '#fdf2f2',
      100: '#fce7e7',
      200: '#fbcbcb',
      300: '#f7a0a0',
      400: '#f06464',
      500: '#d94343',
      600: '#b83232',
      700: '#942828',
      800: '#7a2020',
      900: '#5e1919',
      950: '#2d1010',
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
