import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ParticleField } from './ParticleField';
import { TechCore } from './TechCore';

interface ResumeSceneProps {
  active: boolean;
}

const ResumeScene: React.FC<ResumeSceneProps> = ({ active }) => (
  <Canvas
    dpr={[1, 1.75]}
    frameloop={active ? 'always' : 'demand'}
    camera={{ position: [0, 0, 6.4], fov: 42 }}
    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
  >
    <ambientLight intensity={0.85} />
    <directionalLight position={[4, 5, 6]} intensity={1.6} color="#bae6fd" />
    <pointLight position={[-4, -3, 3]} intensity={22} color="#0ea5e9" />
    <TechCore />
    <ParticleField />
  </Canvas>
);

export default ResumeScene;
