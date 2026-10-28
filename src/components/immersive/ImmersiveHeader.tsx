import React from 'react';
import type { RefObject } from 'react';
import { immersiveSections, personalInfo } from '../../data/portfolioData';
import type { ImmersiveSectionId } from '../../types/portfolio';
import { cn } from '../../lib/utils';

interface ImmersiveHeaderProps {
  activeSection: ImmersiveSectionId;
  onNavigate: (section: ImmersiveSectionId) => void;
  headerRef: RefObject<HTMLElement | null>;
}

export const ImmersiveHeader: React.FC<ImmersiveHeaderProps> = ({
  activeSection,
  onNavigate,
  headerRef,
}) => (
  <header
    ref={headerRef}
    className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl"
  >
    <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:gap-6 md:px-8">
      <button
        type="button"
        onClick={() => onNavigate('overview')}
        className="group flex w-fit cursor-pointer items-center gap-3 text-left text-foreground"
        aria-label="Go to overview"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-control border border-foreground bg-foreground font-mono text-sm font-semibold text-background transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-contrast">
          TC
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-semibold leading-none tracking-tight sm:text-base">
            {personalInfo.name}
          </span>
          <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            Interactive Resume
          </span>
        </span>
      </button>

      <nav className="grid grid-cols-3 gap-1 md:min-w-0 md:flex-1 lg:flex lg:flex-none lg:items-center" aria-label="Immersive sections">
        {immersiveSections.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onNavigate(section.id)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'cursor-pointer rounded-control border px-2 py-1.5 text-[10px] font-medium uppercase tracking-[0.08em] transition-colors md:px-3 md:text-[11px] md:tracking-[0.1em]',
                isActive
                  ? 'border-accent/60 bg-accent-subtle text-foreground'
                  : 'border-transparent text-muted hover:border-border hover:text-foreground',
              )}
            >
              {section.label}
            </button>
          );
        })}
      </nav>

      <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted xl:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-success" />
        <span>Available for frontend roles</span>
      </div>
    </div>
  </header>
);
