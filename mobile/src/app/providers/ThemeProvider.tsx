import React, { createContext, useContext, type PropsWithChildren } from 'react';
import { theme, type Theme } from '../theme';

const ThemeContext = createContext<Theme>(theme);

export function ThemeProvider({ children }: PropsWithChildren) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
