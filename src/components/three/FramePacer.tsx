import { useEffect } from 'react';
import type { FC } from 'react';
import { useThree } from '@react-three/fiber';

interface FramePacerProps {
  active: boolean;
  fps?: number;
}

export const FramePacer: FC<FramePacerProps> = ({ active, fps = 60 }) => {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (!active) return;

    const interval = 1000 / fps;
    let animationFrame = 0;
    let lastTime = performance.now();
    let accumulator = 0;

    const tick = (time: number) => {
      accumulator += time - lastTime;
      lastTime = time;

      if (accumulator >= interval) {
        invalidate();
        accumulator %= interval;
      }

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [active, fps, invalidate]);

  return null;
};
