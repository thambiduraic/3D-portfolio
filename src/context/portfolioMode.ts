import { createContext, useContext } from 'react';
import type { ImmersiveSectionId, PortfolioMode } from '../types/portfolio';

export interface PortfolioModeContextValue {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
  toggleMode: () => void;
  activeSection: ImmersiveSectionId;
  setActiveSection: (section: ImmersiveSectionId) => void;
}

export const PortfolioModeContext = createContext<PortfolioModeContextValue | null>(null);

export function usePortfolioMode(): PortfolioModeContextValue {
  const context = useContext(PortfolioModeContext);
  if (!context) {
    throw new Error('usePortfolioMode must be used within PortfolioModeProvider');
  }
  return context;
}
