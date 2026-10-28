import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { ImmersiveSectionId, PortfolioMode } from '../types/portfolio';
import { PortfolioModeContext } from './portfolioMode';

const STORAGE_KEY = 'portfolio:display-mode';

const readStoredMode = (): PortfolioMode | null => {
  try {
    const storedMode = window.localStorage.getItem(STORAGE_KEY);
    return storedMode === 'immersive' || storedMode === 'classic' ? storedMode : null;
  } catch {
    return null;
  }
};

const getInitialMode = (): PortfolioMode => {
  if (typeof window === 'undefined') return 'classic';

  const storedMode = readStoredMode();
  if (storedMode) return storedMode;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasWideViewport = window.matchMedia('(min-width: 768px)').matches;

  return !prefersReducedMotion && hasWideViewport ? 'immersive' : 'classic';
};

interface PortfolioModeProviderProps {
  children: ReactNode;
}

export const PortfolioModeProvider: React.FC<PortfolioModeProviderProps> = ({ children }) => {
  const [mode, setModeState] = useState<PortfolioMode>(getInitialMode);
  const [activeSection, setActiveSection] = useState<ImmersiveSectionId>('overview');

  const setMode = useCallback((nextMode: PortfolioMode) => {
    setModeState(nextMode);
    if (nextMode === 'immersive') setActiveSection('overview');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === 'immersive' ? 'classic' : 'immersive');
  }, [mode, setMode]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      return;
    }
  }, [mode]);

  useEffect(() => {
    document.documentElement.dataset.portfolioMode = mode;
    document.body.classList.toggle('scene-locked', mode === 'immersive');

    return () => {
      document.body.classList.remove('scene-locked');
    };
  }, [mode]);

  const value = useMemo(
    () => ({ mode, setMode, toggleMode, activeSection, setActiveSection }),
    [mode, setMode, toggleMode, activeSection],
  );

  return <PortfolioModeContext.Provider value={value}>{children}</PortfolioModeContext.Provider>;
};
