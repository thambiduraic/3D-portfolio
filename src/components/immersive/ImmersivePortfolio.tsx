import React, { useEffect } from 'react';
import { usePortfolioMode } from '../../context/portfolioMode';
import { immersiveSections } from '../../data/portfolioData';
import { ImmersiveHeader } from './ImmersiveHeader';
import { ImmersivePanel } from './ImmersivePanel';
import { ImmersiveVisual } from '../three/ImmersiveVisual';

export const ImmersivePortfolio: React.FC = () => {
  const { activeSection, setActiveSection } = usePortfolioMode();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select, [contenteditable="true"]')) {
        return;
      }

      const currentIndex = immersiveSections.findIndex((section) => section.id === activeSection);
      const isForward = event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'PageDown';
      const isBackward = event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'PageUp';

      if (isForward || isBackward) {
        event.preventDefault();
        const direction = isForward ? 1 : -1;
        const nextIndex = (currentIndex + direction + immersiveSections.length) % immersiveSections.length;
        setActiveSection(immersiveSections[nextIndex].id);
        return;
      }

      if (event.key === 'Home') {
        event.preventDefault();
        setActiveSection('overview');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, setActiveSection]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-background text-foreground">
      <ImmersiveVisual activeSection={activeSection} onSelectSection={setActiveSection} />

      <div className="scene-vignette pointer-events-none fixed inset-0 z-[1]" />
      <div className="scene-left-scrim pointer-events-none fixed inset-0 z-[2] hidden xl:block" />
      <div className="scene-bottom-scrim pointer-events-none fixed inset-0 z-[2] xl:hidden" />

      <ImmersiveHeader activeSection={activeSection} onNavigate={setActiveSection} />

      <main className="pointer-events-none fixed inset-0 z-20" aria-label="Interactive resume content">
        <aside className="pointer-events-auto absolute inset-x-0 bottom-0 max-h-[58vh] overflow-y-auto border-t border-border bg-background/95 px-5 pb-24 pt-5 backdrop-blur-xl xl:inset-y-0 xl:right-auto xl:max-h-none xl:w-[min(31rem,36vw)] xl:overflow-visible xl:border-r xl:border-t-0 xl:bg-background/80 xl:px-0 xl:py-0">
          <div className="no-scrollbar xl:h-full xl:overflow-y-auto xl:px-8 xl:pb-24 xl:pt-28">
            <ImmersivePanel section={activeSection} onNavigate={setActiveSection} />
          </div>
        </aside>
      </main>

      <p className="pointer-events-none fixed bottom-5 left-1/2 z-20 hidden -translate-x-1/2 rounded-full border border-border/70 bg-background/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-dim backdrop-blur xl:block">
        Click a node to focus · Use arrow keys to navigate
      </p>
    </div>
  );
};
