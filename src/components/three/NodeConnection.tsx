import { useMemo, useRef } from 'react';
import type { FC } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, MathUtils, NormalBlending } from 'three';
import type { LineBasicMaterial, Mesh, MeshBasicMaterial } from 'three';
import type { ImmersiveSectionId } from '../../types/portfolio';
import type { ImmersiveSceneNode } from './sceneConfig';
import type { SceneTheme } from './sceneTheme';

interface NodeConnectionProps {
  node: ImmersiveSceneNode;
  activeSection: ImmersiveSectionId;
  hovered: boolean;
  reducedMotion: boolean;
  palette: SceneTheme;
}

export const NodeConnection: FC<NodeConnectionProps> = ({
  node,
  activeSection,
  hovered,
  reducedMotion,
  palette,
}) => {
  const lineMaterialRef = useRef<LineBasicMaterial>(null);
  const packetMaterialRef = useRef<MeshBasicMaterial>(null);
  const packetRef = useRef<Mesh>(null);
  const isActive = activeSection === node.section;
  const dimmed = activeSection !== 'overview' && !isActive;
  const highlighted = hovered || isActive;
  const glowBlending = palette.additive ? AdditiveBlending : NormalBlending;

  const positions = useMemo(
    () => new Float32Array([0, 0, 0, ...node.position]),
    [node.position],
  );

  const phase = useMemo(
    () => Math.abs(node.position[0] * 0.17 + node.position[1] * 0.29) % 1,
    [node.position],
  );

  useFrame((state, delta) => {
    if (lineMaterialRef.current) {
      const targetOpacity = highlighted
        ? 0.95
        : activeSection === 'overview'
          ? 0.4
          : dimmed
            ? 0.05
            : 0.28;

      lineMaterialRef.current.opacity = reducedMotion
        ? targetOpacity
        : MathUtils.damp(lineMaterialRef.current.opacity, targetOpacity, 10, delta);
    }

    if (packetMaterialRef.current) {
      const targetOpacity = highlighted ? 0.95 : 0;
      packetMaterialRef.current.opacity = reducedMotion
        ? targetOpacity
        : MathUtils.damp(packetMaterialRef.current.opacity, targetOpacity, 10, delta);
    }

    if (!packetRef.current) return;

    const visible = highlighted && !reducedMotion;
    packetRef.current.visible = visible;

    if (!visible) return;

    const progress = (state.clock.elapsedTime * 0.34 + phase) % 1;
    packetRef.current.position.set(
      node.position[0] * progress,
      node.position[1] * progress,
      node.position[2] * progress,
    );
  });

  return (
    <>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lineMaterialRef}
          color={highlighted ? palette.node.lineActive : palette.node.line}
          transparent
          opacity={0.4}
          depthWrite={false}
          toneMapped={false}
          blending={glowBlending}
        />
      </lineSegments>

      <mesh ref={packetRef}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial
          ref={packetMaterialRef}
          color={palette.node.packet}
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
          blending={glowBlending}
        />
      </mesh>
    </>
  );
};
