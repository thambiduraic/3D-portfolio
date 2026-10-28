import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { ColorTheme } from '../types/portfolio';
import { ThemeContext } from './theme';

const STORAGE_KEY = 'portfolio:color-theme';
const THEME_COLORS: Record<ColorTheme, string> = {
  dark: '#07090e',
  light: '#f4f7fb',
};

const readStoredTheme = (): ColorTheme | null => {
  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : null;
  } catch {
    return null;
  }
};

const getInitialTheme = (): ColorTheme => {
  if (typeof document !== 'undefined') {
    const initialTheme = document.documentElement.dataset.theme;
    if (initialTheme === 'dark' || initialTheme === 'light') return initialTheme;
  }

  if (typeof window === 'undefined') return 'dark';
  return readStoredTheme() ?? 'dark';
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ColorTheme>(getInitialTheme);

  const setTheme = useCallback((nextTheme: ColorTheme) => {
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    themeColorMeta?.setAttribute('content', THEME_COLORS[theme]);

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      return;
    }
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
