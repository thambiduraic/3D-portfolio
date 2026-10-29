import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { AdditiveBlending, MathUtils, NormalBlending } from 'three';
import type {
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SpriteMaterial,
} from 'three';
import type { ImmersiveSectionId } from '../../types/portfolio';
import { createSceneLabel } from './labelTexture';
import { NodeConnection } from './NodeConnection';
import type { ImmersiveSceneNode } from './sceneConfig';
import type { SceneTheme } from './sceneTheme';

interface ImmersiveNodeProps {
  node: ImmersiveSceneNode;
  activeSection: ImmersiveSectionId;
  reducedMotion: boolean;
  onSelect: (section: ImmersiveSectionId) => void;
  palette: SceneTheme;
}

export const ImmersiveNode: React.FC<ImmersiveNodeProps> = ({
  node,
  activeSection,
  reducedMotion,
  onSelect,
  palette,
}) => {
  const [hovered, setHovered] = useState(false);
  const viewportWidth = useThree((state) => state.size.width);
  const labelScale =
    activeSection === 'overview'
      ? viewportWidth < 380
        ? 1.7
        : viewportWidth < 480
          ? 1.45
          : viewportWidth < 920
            ? 1.4
            : 1
      : 1;
  const groupRef = useRef<Group>(null);
  const pulseRef = useRef<Mesh>(null);
  const nodeMaterialRef = useRef<MeshStandardMaterial>(null);
  const haloMaterialRef = useRef<MeshBasicMaterial>(null);
  const ringMaterialRef = useRef<MeshBasicMaterial>(null);
  const labelMaterialRef = useRef<SpriteMaterial>(null);
  const isActive = activeSection === node.section;
  const dimmed = activeSection !== 'overview' && !isActive;
  const glowBlending = palette.additive ? AdditiveBlending : NormalBlending;
  const label = useMemo(
    () => createSceneLabel(node.label, node.detail, palette.node.label),
    [node.label, node.detail, palette.node.label],
  );

  useEffect(() => {
    return () => {
      label?.texture.dispose();
      document.body.style.cursor = '';
    };
  }, [label]);

  useFrame((state, delta) => {
    const targetScale = hovered ? 1.1 : isActive ? 1.08 : 1;
    const targetEmissive = isActive ? 2.6 : hovered ? 2.2 : 1.1;
    const targetHalo = dimmed ? 0.03 : hovered ? 0.24 : isActive ? 0.18 : 0.08;
    const targetRing = hovered ? 0.9 : isActive ? 0.55 : 0;
    const targetLabel = dimmed ? 0.22 : hovered || isActive ? 1 : 0.92;

    if (groupRef.current) {
      groupRef.current.scale.setScalar(
        reducedMotion
          ? targetScale
          : MathUtils.damp(groupRef.current.scale.x, targetScale, 14, delta),
      );
    }

    if (nodeMaterialRef.current) {
      nodeMaterialRef.current.emissiveIntensity = reducedMotion
        ? targetEmissive
        : MathUtils.damp(
            nodeMaterialRef.current.emissiveIntensity,
            targetEmissive,
            10,
            delta,
          );
    }

    if (haloMaterialRef.current) {
      haloMaterialRef.current.opacity = reducedMotion
        ? targetHalo
        : MathUtils.damp(haloMaterialRef.current.opacity, targetHalo, 10, delta);
    }

    if (ringMaterialRef.current) {
      ringMaterialRef.current.opacity = reducedMotion
        ? targetRing
        : MathUtils.damp(ringMaterialRef.current.opacity, targetRing, 12, delta);
    }

    if (labelMaterialRef.current) {
      labelMaterialRef.current.opacity = reducedMotion
        ? targetLabel
        : MathUtils.damp(labelMaterialRef.current.opacity, targetLabel, 10, delta);
    }

    if (!pulseRef.current || reducedMotion) return;

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.6) * 0.08;
    pulseRef.current.scale.setScalar(pulse);
    pulseRef.current.rotation.z += delta * 0.5;
  });

  const handleSelect = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setHovered(false);
    document.body.style.cursor = '';
    onSelect(node.section);
  };

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = '';
  };

  return (
    <>
      <NodeConnection
        node={node}
        activeSection={activeSection}
        hovered={hovered}
        reducedMotion={reducedMotion}
        palette={palette}
      />

      <group
        ref={groupRef}
        position={node.position}
        onClick={handleSelect}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <mesh>
          <sphereGeometry args={[0.065, 20, 20]} />
          <meshStandardMaterial
            ref={nodeMaterialRef}
            color={isActive ? palette.node.active : palette.node.base}
            emissive={isActive ? palette.node.emissiveActive : palette.node.emissiveBase}
            emissiveIntensity={isActive ? 2.6 : 1.1}
            roughness={0.3}
            metalness={0.45}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.21, 16, 16]} />
          <meshBasicMaterial
            ref={haloMaterialRef}
            color={palette.node.halo}
            transparent
            opacity={0.08}
            depthWrite={false}
            toneMapped={false}
            blending={glowBlending}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.34, 12, 12]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        <mesh>
          <torusGeometry args={[0.16, 0.004, 8, 64]} />
          <meshBasicMaterial
            ref={ringMaterialRef}
            color={palette.node.ring}
            transparent
            opacity={0}
            depthWrite={false}
            toneMapped={false}
            blending={glowBlending}
          />
        </mesh>

        {isActive && (
          <mesh ref={pulseRef}>
            <torusGeometry args={[0.205, 0.005, 8, 64]} />
            <meshBasicMaterial
              color={palette.node.ring}
              transparent
              opacity={0.9}
              depthWrite={false}
              toneMapped={false}
              blending={glowBlending}
            />
          </mesh>
        )}

        {node.section === 'experience' && (
          <group position={[0, -0.19, 0]}>
            <mesh>
              <boxGeometry args={[0.78, 0.008, 0.008]} />
              <meshBasicMaterial
                color={palette.node.timeline}
                transparent
                opacity={isActive ? 0.9 : dimmed ? 0.12 : 0.38}
              />
            </mesh>
            {[-0.3, 0, 0.3].map((offset) => (
              <mesh key={offset} position={[offset, 0, 0]}>
                <sphereGeometry args={[0.023, 12, 12]} />
                <meshBasicMaterial
                  color={isActive ? palette.node.timelineActive : palette.node.timeline}
                  transparent
                  opacity={dimmed ? 0.18 : 0.8}
                />
              </mesh>
            ))}
          </group>
        )}

        {label && (
          <sprite
            position={[0, 0.37, 0.02]}
            scale={[label.aspect * 0.3 * labelScale, 0.3 * labelScale, 1]}
          >
            <spriteMaterial
              ref={labelMaterialRef}
              map={label.texture}
              transparent
              opacity={0.92}
              depthWrite={false}
              toneMapped={false}
            />
          </sprite>
        )}
      </group>
    </>
  );
};
