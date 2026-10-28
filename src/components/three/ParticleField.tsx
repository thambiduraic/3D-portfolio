import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Points } from 'three';

interface ParticleFieldProps {
  count?: number;
  radius?: number;
  spread?: number;
  size?: number;
  opacity?: number;
  color?: string;
  animated?: boolean;
}

const pseudoRandom = (seed: number) => {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
};

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 240,
  radius = 3.2,
  spread = 2.1,
  size = 0.018,
  opacity = 0.55,
  color = '#38bdf8',
  animated = true,
}) => {
  const pointsRef = useRef<Points>(null);

  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const particleRadius = radius + pseudoRandom(index + 1) * spread;
      const theta = pseudoRandom(index + 11) * Math.PI * 2;
      const phi = Math.acos(2 * pseudoRandom(index + 21) - 1);

      values[index * 3] = particleRadius * Math.sin(phi) * Math.cos(theta);
      values[index * 3 + 1] = particleRadius * Math.cos(phi) * 0.72;
      values[index * 3 + 2] = particleRadius * Math.sin(phi) * Math.sin(theta);
    }

    return values;
  }, [count, radius, spread]);

  useFrame((_state, delta) => {
    if (!pointsRef.current || !animated) return;
    pointsRef.current.rotation.y += delta * 0.035;
    pointsRef.current.rotation.x += delta * 0.006;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </points>
  );
};
