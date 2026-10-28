import { useRef } from 'react';
import type { FC } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, NormalBlending } from 'three';
import type { Group } from 'three';
import type { SceneTheme } from './sceneTheme';

interface AmbientShardsProps {
  animated: boolean;
  faded: boolean;
  palette: SceneTheme;
}

export const AmbientShards: FC<AmbientShardsProps> = ({ animated, faded, palette }) => {
  const groupRef = useRef<Group>(null);
  const opacity = palette.shards.opacity * (faded ? 0.375 : 1);
  const blending = palette.additive ? AdditiveBlending : NormalBlending;
  const [shardA, shardB, shardC, shardD] = palette.shards.colors;

  useFrame((state, delta) => {
    if (!animated || !groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.018;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.14) * 0.09;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-4.2, 1.9, -1.8]} rotation={[0.4, 0.2, 0.7]}>
        <octahedronGeometry args={[0.42, 0]} />
        <meshBasicMaterial
          color={shardA}
          wireframe
          transparent
          opacity={opacity}
          depthWrite={false}
          toneMapped={false}
          blending={blending}
        />
      </mesh>

      <mesh position={[4.5, -1.1, -2.3]} rotation={[0.8, 0.5, 0.2]}>
        <icosahedronGeometry args={[0.34, 0]} />
        <meshBasicMaterial
          color={shardB}
          wireframe
          transparent
          opacity={opacity * 0.8}
          depthWrite={false}
          toneMapped={false}
          blending={blending}
        />
      </mesh>

      <mesh position={[-3.7, -2.15, -1.1]} rotation={[0.2, 0.9, 0.4]}>
        <tetrahedronGeometry args={[0.38, 0]} />
        <meshBasicMaterial
          color={shardC}
          wireframe
          transparent
          opacity={opacity}
          depthWrite={false}
          toneMapped={false}
          blending={blending}
        />
      </mesh>

      <mesh position={[3.9, 2.5, -1.4]} rotation={[0.6, 0.1, 0.9]}>
        <octahedronGeometry args={[0.26, 0]} />
        <meshBasicMaterial
          color={shardD}
          wireframe
          transparent
          opacity={opacity * 0.65}
          depthWrite={false}
          toneMapped={false}
          blending={blending}
        />
      </mesh>
    </group>
  );
};
