import { useRef } from 'react';
import type { FC } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, NormalBlending } from 'three';
import type { Group, Mesh } from 'three';
import type { SceneTheme } from './sceneTheme';

interface ScenePipelineProps {
  reducedMotion: boolean;
  palette: SceneTheme;
}

const TIERS = [
  { y: -0.92, radius: 1.28 },
  { y: 0, radius: 1.02 },
  { y: 0.92, radius: 0.78 },
] as const;

const CORNER_ANGLES = [
  0,
  Math.PI / 3,
  (Math.PI * 2) / 3,
  Math.PI,
  (Math.PI * 4) / 3,
  (Math.PI * 5) / 3,
];

const PACKETS = [
  { angle: Math.PI / 6, offset: 0.08 },
  { angle: Math.PI / 6 + (Math.PI * 2) / 3, offset: 0.3 },
  { angle: Math.PI / 6 + (Math.PI * 4) / 3, offset: 0.52 },
  { angle: Math.PI / 2, offset: 0.72 },
  { angle: Math.PI / 2 + (Math.PI * 2) / 3, offset: 0.92 },
];

const PACKET_RADIUS = 0.6;
const PACKET_TRAVEL = 2.24;

export const ScenePipeline: FC<ScenePipelineProps> = ({ reducedMotion, palette }) => {
  const stackRef = useRef<Group>(null);
  const orbitARef = useRef<Group>(null);
  const orbitBRef = useRef<Group>(null);
  const beaconRef = useRef<Group>(null);
  const packetRefs = useRef<Array<Mesh | null>>([]);
  const glowBlending = palette.additive ? AdditiveBlending : NormalBlending;

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const elapsed = state.clock.elapsedTime;

    if (stackRef.current) {
      stackRef.current.rotation.y += delta * 0.12;
    }

    if (orbitARef.current) {
      orbitARef.current.rotation.z += delta * 0.09;
    }

    if (orbitBRef.current) {
      orbitBRef.current.rotation.z -= delta * 0.07;
    }

    if (beaconRef.current) {
      beaconRef.current.rotation.y += delta * 0.5;
      beaconRef.current.position.y = 1.38 + Math.sin(elapsed * 0.9) * 0.04;
    }

    packetRefs.current.forEach((packet, index) => {
      if (!packet) return;

      const packetData = PACKETS[index];
      const progress = (elapsed * 0.18 + packetData.offset) % 1;
      const fade = Math.sin(progress * Math.PI);

      packet.position.set(
        Math.cos(packetData.angle) * PACKET_RADIUS,
        -1.12 + progress * PACKET_TRAVEL,
        Math.sin(packetData.angle) * PACKET_RADIUS,
      );
      packet.scale.setScalar(0.55 + fade * 0.9);
    });
  });

  return (
    <group>
      <group ref={stackRef}>
        {TIERS.map((tier, index) => {
          const tierPalette = palette.pipeline.tiers[index];

          return (
            <group key={tier.y} position={[0, tier.y, 0]}>
              <mesh rotation={[0, Math.PI / 6, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[tier.radius, tier.radius * 0.94, 0.045, 6]} />
                <meshStandardMaterial
                  color={palette.pipeline.plate}
                  metalness={0.72}
                  roughness={0.28}
                  transparent
                  opacity={palette.pipeline.plateOpacity}
                  emissive={tierPalette.color}
                  emissiveIntensity={palette.pipeline.plateEmissiveIntensity}
                />
              </mesh>

              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[tier.radius * 0.98, 0.006, 8, 96]} />
                <meshBasicMaterial
                  color={tierPalette.accent}
                  transparent
                  opacity={palette.pipeline.ringOpacity}
                  depthWrite={false}
                  toneMapped={false}
                  blending={glowBlending}
                />
              </mesh>

              {CORNER_ANGLES.map((angle) => (
                <mesh
                  key={angle}
                  position={[
                    Math.cos(angle) * tier.radius,
                    0.028,
                    Math.sin(angle) * tier.radius,
                  ]}
                >
                  <sphereGeometry args={[0.018, 8, 8]} />
                  <meshBasicMaterial
                    color={tierPalette.accent}
                    transparent
                    opacity={0.82}
                    depthWrite={false}
                    toneMapped={false}
                  />
                </mesh>
              ))}
            </group>
          );
        })}

        {[Math.PI / 6, Math.PI / 6 + (Math.PI * 2) / 3, Math.PI / 6 + (Math.PI * 4) / 3].map(
          (angle) => (
            <mesh key={angle} position={[Math.cos(angle) * 0.6, 0, Math.sin(angle) * 0.6]}>
              <cylinderGeometry args={[0.005, 0.005, 1.84, 6]} />
              <meshBasicMaterial
                color={palette.pipeline.strut}
                transparent
                opacity={palette.pipeline.strutOpacity}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          ),
        )}

        <mesh>
          <cylinderGeometry args={[0.016, 0.016, 2.22, 8]} />
          <meshBasicMaterial
            color={palette.pipeline.core}
            transparent
            opacity={palette.pipeline.coreOpacity}
            depthWrite={false}
            toneMapped={false}
            blending={glowBlending}
          />
        </mesh>

        <mesh>
          <cylinderGeometry args={[0.055, 0.055, 2.22, 8]} />
          <meshBasicMaterial
            color={palette.pipeline.coreGlow}
            transparent
            opacity={palette.pipeline.coreGlowOpacity}
            depthWrite={false}
            toneMapped={false}
            blending={glowBlending}
          />
        </mesh>

        {PACKETS.map((packet, index) => (
          <mesh
            key={`${packet.angle}-${packet.offset}`}
            ref={(mesh) => {
              packetRefs.current[index] = mesh;
            }}
            position={[
              Math.cos(packet.angle) * PACKET_RADIUS,
              -1.12 + packet.offset * PACKET_TRAVEL,
              Math.sin(packet.angle) * PACKET_RADIUS,
            ]}
          >
            <sphereGeometry args={[0.026, 10, 10]} />
            <meshBasicMaterial
              color={palette.pipeline.packet}
              transparent
              opacity={0.92}
              depthWrite={false}
              toneMapped={false}
              blending={glowBlending}
            />
          </mesh>
        ))}
      </group>

      <group ref={orbitARef} rotation={[Math.PI / 2.5, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.58, 0.005, 8, 180]} />
          <meshBasicMaterial
            color={palette.pipeline.orbitA}
            transparent
            opacity={palette.pipeline.orbitAOpacity}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>

      <group ref={orbitBRef} rotation={[0, Math.PI / 2.8, Math.PI / 5]}>
        <mesh>
          <torusGeometry args={[1.84, 0.004, 8, 180]} />
          <meshBasicMaterial
            color={palette.pipeline.orbitB}
            transparent
            opacity={palette.pipeline.orbitBOpacity}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>

      <group ref={beaconRef} position={[0, 1.38, 0]}>
        <mesh>
          <octahedronGeometry args={[0.13, 0]} />
          <meshStandardMaterial
            color={palette.pipeline.beaconBody}
            metalness={0.8}
            roughness={0.24}
            emissive={palette.pipeline.beaconEmissive}
            emissiveIntensity={palette.pipeline.beaconEmissiveIntensity}
          />
        </mesh>
      </group>
    </group>
  );
};

