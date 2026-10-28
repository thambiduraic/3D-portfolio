import React, { Component, lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useSceneActive } from '../../hooks/useSceneActive';
import { SceneFallback } from './SceneFallback';

const ResumeScene = lazy(() => import('./ResumeScene'));

interface SceneBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

class SceneBoundary extends Component<SceneBoundaryProps, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export const HeroVisual: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, active } = useSceneActive<HTMLDivElement>();

  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface" aria-hidden="true">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">interactive_stack.core</span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          live
        </span>
      </div>

      <div ref={ref} className="hero-visual relative aspect-square w-full">
        <div className="hero-visual-glow pointer-events-none absolute inset-0" />
        {prefersReducedMotion ? (
          <SceneFallback />
        ) : (
          <Suspense fallback={<SceneFallback />}>
            <SceneBoundary fallback={<SceneFallback />}>
              <ResumeScene active={active} />
            </SceneBoundary>
          </Suspense>
        )}
        <p className="pointer-events-none absolute inset-x-0 bottom-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
          <span className="hidden sm:inline">Move cursor · hover nodes</span>
          <span className="sm:hidden">Interactive stack map</span>
        </p>
      </div>

      <div className="grid grid-cols-3 divide-x divide-border border-t border-border text-center">
        {['React + TS', 'Python + Django', 'PostgreSQL + Supabase'].map((item) => (
          <div key={item} className="px-2 py-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
