import React from 'react';
import { Box, FileText, Moon, Sun } from 'lucide-react';
import { usePortfolioMode } from '../../context/portfolioMode';
import { useTheme } from '../../context/theme';
import { cn } from '../../lib/utils';

const options = [
  { mode: 'immersive' as const, label: '3D Immersive', shortLabel: '3D', Icon: Box },
  { mode: 'classic' as const, label: '2D Classic', shortLabel: '2D', Icon: FileText },
];

export const ModeToggle: React.FC = () => {
  const { mode, setMode } = usePortfolioMode();
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <div
      className="display-controls fixed bottom-4 right-4 z-[70] inline-flex items-center gap-1 rounded-full border border-border-strong/70 bg-background/85 p-1 backdrop-blur-xl sm:bottom-6 sm:right-6"
      role="group"
      aria-label="Display controls"
    >
      {options.map(({ mode: optionMode, label, shortLabel, Icon }) => {
        const isActive = mode === optionMode;

        return (
          <button
            key={optionMode}
            type="button"
            onClick={() => setMode(optionMode)}
            aria-pressed={isActive}
            aria-label={`Switch to ${label} mode`}
            className={cn(
              'inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors',
              isActive
                ? 'bg-accent text-accent-contrast'
                : 'text-muted hover:bg-surface-elevated hover:text-foreground',
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{shortLabel}</span>
          </button>
        );
      })}

      <span className="mx-0.5 h-4 w-px bg-border" aria-hidden="true" />

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${nextTheme} theme`}
        title={`Switch to ${nextTheme} theme`}
        className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
      >
        {theme === 'dark' ? (
          <Sun className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Moon className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};
