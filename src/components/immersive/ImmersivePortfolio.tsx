import React, { useEffect, useRef } from 'react';
import { usePortfolioMode } from '../../context/portfolioMode';
import { immersiveSections } from '../../data/portfolioData';
import { useImmersiveLayout } from '../../hooks/useImmersiveLayout';
import { cn } from '../../lib/utils';
import { ImmersiveHeader } from './ImmersiveHeader';
import { ImmersivePanel } from './ImmersivePanel';
import { ImmersiveVisual } from '../three/ImmersiveVisual';

export const ImmersivePortfolio: React.FC = () => {
  const { activeSection, setActiveSection } = usePortfolioMode();
  const headerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const { sidebar, safeArea } = useImmersiveLayout(headerRef, panelRef);

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
      <ImmersiveVisual
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        safeArea={safeArea}
      />

      <div className="scene-vignette pointer-events-none fixed inset-0 z-[1]" />
      {sidebar ? (
        <div className="scene-left-scrim pointer-events-none fixed inset-0 z-[2]" />
      ) : (
        <div className="scene-bottom-scrim pointer-events-none fixed inset-0 z-[2]" />
      )}

      <ImmersiveHeader
        activeSection={activeSection}
        onNavigate={setActiveSection}
        headerRef={headerRef}
      />

      <main className="pointer-events-none fixed inset-0 z-20" aria-label="Interactive resume content">
        <aside
          ref={panelRef}
          className={cn(
            'pointer-events-auto absolute border-border backdrop-blur-xl',
            sidebar
              ? 'inset-y-0 right-auto w-[clamp(18rem,36vw,31rem)] overflow-visible border-r bg-background/80'
              : 'inset-x-0 bottom-0 max-h-[52dvh] overflow-y-auto border-t bg-background/95 px-5 pb-24 pt-5',
          )}
        >
          <div
            className={cn(
              'no-scrollbar',
              sidebar && 'h-full overflow-y-auto px-8 pb-20',
            )}
            style={
              sidebar
                ? { paddingTop: Math.max(112, safeArea.top + 16) }
                : undefined
            }
          >
            <ImmersivePanel section={activeSection} onNavigate={setActiveSection} />
          </div>
        </aside>
      </main>

      <p
        className={cn(
          'pointer-events-none fixed bottom-5 left-1/2 z-20 hidden -translate-x-1/2 rounded-full border border-border/70 bg-background/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-dim backdrop-blur',
          sidebar && 'block',
        )}
      >
        Click a node to focus · Use arrow keys to navigate
      </p>
    </div>
  );
};
