export type Theme = 'dark' | 'light';

export interface ThemeContextType {
  setTheme: (theme: Theme | null) => void;
  theme?: Theme | null;
}

export const themeIsValid = (string: null | string): string is Theme =>
  string ? ['dark', 'light'].includes(string) : false;
