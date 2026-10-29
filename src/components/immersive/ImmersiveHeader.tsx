import React, { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { Menu, X } from 'lucide-react';
import { immersiveSections, personalInfo } from '../../data/portfolioData';
import type { ImmersiveSectionId } from '../../types/portfolio';
import { cn } from '../../lib/utils';
import { ModeToggle } from '../ui/ModeToggle';
import { segmentedActive, segmentedIdle, segmentedItem } from '../ui/controlStyles';

interface ImmersiveHeaderProps {
  activeSection: ImmersiveSectionId;
  onNavigate: (section: ImmersiveSectionId) => void;
  headerRef: RefObject<HTMLElement | null>;
}

export const ImmersiveHeader: React.FC<ImmersiveHeaderProps> = ({
  activeSection,
  onNavigate,
  headerRef,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleChange = () => {
      if (mediaQuery.matches) setMenuOpen(false);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleNavigate = (section: ImmersiveSectionId) => {
    onNavigate(section);
    setMenuOpen(false);
  };

  const renderSectionButtons = () =>
    immersiveSections.map((section) => {
      const isActive = activeSection === section.id;

      return (
        <button
          key={section.id}
          type="button"
          onClick={() => handleNavigate(section.id)}
          aria-current={isActive ? 'page' : undefined}
          className={cn(
            segmentedItem,
            'uppercase tracking-[0.08em]',
            isActive ? segmentedActive : segmentedIdle,
          )}
        >
          {section.label}
        </button>
      );
    });

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3 xl:gap-6 xl:px-8">
        <div className="flex min-w-0 w-fit items-center gap-3 text-left text-foreground">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-control border border-foreground bg-foreground font-mono text-sm font-semibold text-background">
            TC
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-semibold leading-none tracking-tight sm:text-base">
              {personalInfo.name}
            </span>
            <span className="mt-1.5 truncate font-mono text-xs tracking-[0.04em] text-muted">
              Interactive resume
            </span>
          </span>
        </div>

        <nav
          className="hidden min-w-0 flex-1 items-center gap-1 lg:flex"
          aria-label="Immersive sections"
        >
          {renderSectionButtons()}
        </nav>

        <div className="hidden lg:block">
          <ModeToggle />
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="immersive-navigation"
          aria-label={menuOpen ? 'Close section navigation' : 'Open section navigation'}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-control border border-border bg-surface text-foreground transition-colors hover:bg-surface-elevated lg:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <div
          id="immersive-navigation"
          className="border-t border-border/60 bg-background/95 px-4 pb-4 pt-3 backdrop-blur-xl lg:hidden"
        >
          <nav className="grid grid-cols-3 gap-1" aria-label="Immersive sections">
            {renderSectionButtons()}
          </nav>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
              Display
            </span>
            <ModeToggle />
          </div>
        </div>
      )}
    </header>
  );
};
