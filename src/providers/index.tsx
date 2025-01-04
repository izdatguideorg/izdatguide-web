import React from 'react';

import { HeaderThemeProvider } from './HeaderTheme';
import { ThemeProvider } from './Theme';

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <ThemeProvider>
    <HeaderThemeProvider>{children}</HeaderThemeProvider>
  </ThemeProvider>
);
