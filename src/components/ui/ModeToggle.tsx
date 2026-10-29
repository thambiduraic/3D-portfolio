import React from 'react';
import { Box, FileText, Moon, Sun } from 'lucide-react';
import { usePortfolioMode } from '../../context/portfolioMode';
import { useTheme } from '../../context/theme';
import { cn } from '../../lib/utils';
import { segmentedActive, segmentedIdle, segmentedItem } from './controlStyles';

const options = [
  { mode: 'immersive' as const, label: '3D Immersive', shortLabel: '3D', Icon: Box },
  { mode: 'classic' as const, label: '2D Classic', shortLabel: '2D', Icon: FileText },
];

interface ModeToggleProps {
  className?: string;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ className }) => {
  const { mode, setMode } = usePortfolioMode();
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <div
      className={cn(
        'display-controls inline-flex items-center gap-1 rounded-full border border-border-strong/70 bg-background/85 p-1 backdrop-blur-xl',
        className,
      )}
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
            className={cn(segmentedItem, isActive ? segmentedActive : segmentedIdle)}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden xl:inline">{label}</span>
            <span className="xl:hidden">{shortLabel}</span>
          </button>
        );
      })}

      <span className="mx-0.5 h-4 w-px bg-border" aria-hidden="true" />

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${nextTheme} theme`}
        title={`Switch to ${nextTheme} theme`}
        className={cn(segmentedItem, segmentedIdle)}
      >
        {theme === 'dark' ? (
          <Sun className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Moon className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        <span className="hidden xl:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
      </button>
    </div>
  );
};
