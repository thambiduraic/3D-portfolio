import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { CanvasTexture, LinearFilter, MathUtils, SRGBColorSpace } from 'three';
import type { Group } from 'three';
import { sceneTechnologies } from '../../data/portfolioData';

const ORBIT_RADIUS = 2.05;
const LABEL_FONT = '600 40px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const LABEL_HEIGHT = 0.22;

interface TechLabel {
  label: string;
  texture: CanvasTexture;
  aspect: number;
}

const nodePositions = sceneTechnologies.map((label, index, all) => {
  const phi = Math.acos(1 - (2 * (index + 0.5)) / all.length);
  const theta = Math.PI * (1 + Math.sqrt(5)) * index;

  return {
    label,
    position: [
      ORBIT_RADIUS * Math.sin(phi) * Math.cos(theta),
      ORBIT_RADIUS * Math.cos(phi),
      ORBIT_RADIUS * Math.sin(phi) * Math.sin(theta),
    ] as [number, number, number],
  };
});

const drawRoundedRect = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
};

const createLabel = (label: string): TechLabel | null => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return null;

  const text = label.toUpperCase();
  const scale = 2;
  const paddingX = 18;
  const height = 56;

  context.font = LABEL_FONT;
  const width = Math.ceil(context.measureText(text).width) + paddingX * 2;

  canvas.width = width * scale;
  canvas.height = height * scale;

  context.scale(scale, scale);
  context.font = LABEL_FONT;
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  drawRoundedRect(context, 1, 1, width - 2, height - 2, 3);
  context.fillStyle = 'rgba(12, 16, 23, 0.92)';
  context.fill();
  context.strokeStyle = 'rgba(30, 38, 53, 1)';
  context.lineWidth = 1;
  context.stroke();

  context.fillStyle = '#a4b0c2';
  context.fillText(text, width / 2, height / 2 + 1);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.needsUpdate = true;

  return { label, texture, aspect: width / height };
};

const techLabels = typeof document === 'undefined'
  ? []
  : nodePositions.flatMap((node) => {
      const label = createLabel(node.label);
      return label ? [label] : [];
    });

const labelsByTech = new Map(techLabels.map((label) => [label.label, label]));

export const TechCore: React.FC = () => {
  const parallaxRef = useRef<Group>(null);
  const spinRef = useRef<Group>(null);
  const orbitRef = useRef<Group>(null);
  const ringARef = useRef<Group>(null);
  const ringBRef = useRef<Group>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      document.body.style.cursor = '';
    };
  }, []);

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;

    if (parallaxRef.current) {
      parallaxRef.current.rotation.x = MathUtils.damp(
        parallaxRef.current.rotation.x,
        -state.pointer.y * 0.16,
        2.4,
        delta,
      );
      parallaxRef.current.rotation.y = MathUtils.damp(
        parallaxRef.current.rotation.y,
        state.pointer.x * 0.26,
        2.4,
        delta,
      );
    }

    if (spinRef.current) {
      spinRef.current.rotation.y += delta * 0.14;
      spinRef.current.rotation.x = Math.sin(elapsed * 0.32) * 0.08;
    }

    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * 0.11;
      orbitRef.current.rotation.z = Math.sin(elapsed * 0.2) * 0.06;
    }

    if (ringARef.current) {
      ringARef.current.rotation.x += delta * 0.22;
      ringARef.current.rotation.y += delta * 0.12;
    }

    if (ringBRef.current) {
      ringBRef.current.rotation.y -= delta * 0.18;
      ringBRef.current.rotation.z += delta * 0.1;
    }
  });

  const clearHover = () => {
    setHoveredNode(null);
    document.body.style.cursor = '';
  };

  return (
    <group ref={parallaxRef}>
      <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.55}>
        <group ref={spinRef}>
          <mesh>
            <icosahedronGeometry args={[1.55, 1]} />
            <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.24} />
          </mesh>

          <mesh>
            <torusKnotGeometry args={[0.56, 0.15, 160, 20]} />
            <meshStandardMaterial
              color="#0b2030"
              metalness={0.82}
              roughness={0.28}
              emissive="#0ea5e9"
              emissiveIntensity={0.38}
            />
          </mesh>

          <mesh>
            <icosahedronGeometry args={[0.72, 1]} />
            <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.16} />
          </mesh>
        </group>

        <group ref={ringARef}>
          <mesh rotation={[Math.PI / 2.4, 0, 0]}>
            <torusGeometry args={[1.86, 0.006, 8, 160]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
          </mesh>
        </group>

        <group ref={ringBRef}>
          <mesh rotation={[0, Math.PI / 2.8, Math.PI / 5]}>
            <torusGeometry args={[2.08, 0.005, 8, 160]} />
            <meshBasicMaterial color="#7dd3fc" transparent opacity={0.26} />
          </mesh>
        </group>

        <group ref={orbitRef}>
          {nodePositions.map((node, index) => {
            const isHovered = hoveredNode === index;
            const label = labelsByTech.get(node.label);
            const labelScale = LABEL_HEIGHT * (isHovered ? 1.08 : 1);

            return (
              <group
                key={node.label}
                position={node.position}
                onPointerOver={(event) => {
                  event.stopPropagation();
                  setHoveredNode(index);
                  document.body.style.cursor = 'pointer';
                }}
                onPointerOut={clearHover}
              >
                <mesh>
                  <sphereGeometry args={[isHovered ? 0.075 : 0.055, 16, 16]} />
                  <meshStandardMaterial
                    color={isHovered ? '#e0f2fe' : '#38bdf8'}
                    emissive="#38bdf8"
                    emissiveIntensity={isHovered ? 2.2 : 0.85}
                  />
                </mesh>

                <mesh>
                  <sphereGeometry args={[0.26, 12, 12]} />
                  <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                </mesh>

                {label && (
                  <sprite position={[0, 0.27, 0]} scale={[label.aspect * labelScale, labelScale, 1]}>
                    <spriteMaterial
                      map={label.texture}
                      transparent
                      opacity={isHovered ? 1 : 0.88}
                      depthWrite={false}
                      depthTest={false}
                      toneMapped={false}
                    />
                  </sprite>
                )}
              </group>
            );
          })}
        </group>
      </Float>
    </group>
  );
};
