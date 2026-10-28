import React, { lazy, Suspense } from 'react';
import { useTheme } from '../../context/theme';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useSceneActive } from '../../hooks/useSceneActive';
import type { ImmersiveSectionId } from '../../types/portfolio';
import { SceneBoundary } from './SceneBoundary';
import { SceneFallback } from './SceneFallback';

const ImmersiveScene = lazy(() => import('./ImmersiveScene'));

interface ImmersiveVisualProps {
  activeSection: ImmersiveSectionId;
  onSelectSection: (section: ImmersiveSectionId) => void;
}

export const ImmersiveVisual: React.FC<ImmersiveVisualProps> = ({
  activeSection,
  onSelectSection,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { theme } = useTheme();
  const { ref, active } = useSceneActive<HTMLDivElement>();

  return (
    <div ref={ref} className="scene-stage fixed inset-0 z-0" aria-hidden="true">
      <div className="scene-aurora scene-aurora-a" />
      <div className="scene-aurora scene-aurora-b" />
      <div className="scene-grid-lines" />
      <Suspense fallback={<SceneFallback />}>
        <SceneBoundary fallback={<SceneFallback />}>
          <ImmersiveScene
            active={active}
            activeSection={activeSection}
            reducedMotion={prefersReducedMotion}
            onSelectSection={onSelectSection}
            theme={theme}
          />
        </SceneBoundary>
      </Suspense>
    </div>
  );
};
