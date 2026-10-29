import React from 'react';
import { Canvas } from '@react-three/fiber';
import type {
  ColorTheme,
  ImmersiveSafeArea,
  ImmersiveSectionId,
} from '../../types/portfolio';
import { AmbientShards } from './AmbientShards';
import { CameraRig } from './CameraRig';
import { FramePacer } from './FramePacer';
import { ImmersiveNode } from './ImmersiveNode';
import { ParticleField } from './ParticleField';
import { ScenePipeline } from './ScenePipeline';
import { immersiveSceneNodes, SCENE_FOV } from './sceneConfig';
import { sceneThemes } from './sceneTheme';

interface ImmersiveSceneProps {
  active: boolean;
  activeSection: ImmersiveSectionId;
  reducedMotion: boolean;
  onSelectSection: (section: ImmersiveSectionId) => void;
  safeArea: ImmersiveSafeArea;
  theme: ColorTheme;
}

const ImmersiveScene: React.FC<ImmersiveSceneProps> = ({
  active,
  activeSection,
  reducedMotion,
  onSelectSection,
  safeArea,
  theme,
}) => {
  const palette = sceneThemes[theme];

  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? 'demand' : 'never'}
      shadows="soft"
      resize={{ scroll: false, debounce: 100 }}
      camera={{ position: [0, 0.1, 11], fov: SCENE_FOV, near: 0.1, far: 80 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
      }}
      onPointerMissed={() => onSelectSection('overview')}
    >
      <FramePacer active={active} fps={reducedMotion ? 30 : 60} />

      <fog attach="fog" args={[palette.fog, palette.fogNear, palette.fogFar]} />
      <ambientLight intensity={palette.ambientIntensity} />
      <hemisphereLight
        args={[
          palette.hemisphereSky,
          palette.hemisphereGround,
          palette.hemisphereIntensity,
        ]}
      />
      <directionalLight
        position={[4, 7, 5]}
        intensity={palette.directionalIntensity}
        color={palette.directionalColor}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      />
      <pointLight
        position={[-4, -3, 3]}
        intensity={palette.pointA.intensity}
        color={palette.pointA.color}
        distance={16}
        decay={2}
      />
      <pointLight
        position={[3.5, 2.5, 4]}
        intensity={palette.pointB.intensity}
        color={palette.pointB.color}
        distance={14}
        decay={2}
      />

      <CameraRig
        activeSection={activeSection}
        reducedMotion={reducedMotion}
        safeArea={safeArea}
      />

      <ScenePipeline reducedMotion={reducedMotion} palette={palette} />

      {immersiveSceneNodes.map((node) => (
        <ImmersiveNode
          key={node.section}
          node={node}
          activeSection={activeSection}
          reducedMotion={reducedMotion}
          onSelect={onSelectSection}
          palette={palette}
        />
      ))}

      <ParticleField
        count={340}
        radius={4.4}
        spread={3.8}
        size={0.017}
        opacity={palette.particles.opacity}
        color={palette.particles.color}
        animated={!reducedMotion}
      />

      <AmbientShards
        animated={!reducedMotion}
        faded={activeSection !== 'overview'}
        palette={palette}
      />
    </Canvas>
  );
};

export default ImmersiveScene;
