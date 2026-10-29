import type { ColorTheme } from '../../types/portfolio';
import type { SceneLabelPalette } from './labelTexture';

interface PipelineTierPalette {
  color: string;
  accent: string;
}

interface PipelinePalette {
  plate: string;
  plateOpacity: number;
  plateEmissiveIntensity: number;
  tiers: readonly PipelineTierPalette[];
  ringOpacity: number;
  strut: string;
  strutOpacity: number;
  core: string;
  coreOpacity: number;
  coreGlow: string;
  coreGlowOpacity: number;
  packet: string;
  orbitA: string;
  orbitAOpacity: number;
  orbitB: string;
  orbitBOpacity: number;
  beaconBody: string;
  beaconEmissive: string;
  beaconEmissiveIntensity: number;
}

interface NodePalette {
  base: string;
  active: string;
  emissiveBase: string;
  emissiveActive: string;
  halo: string;
  ring: string;
  line: string;
  lineActive: string;
  packet: string;
  timeline: string;
  timelineActive: string;
  label: SceneLabelPalette;
}

export interface SceneTheme {
  fog: string;
  fogNear: number;
  fogFar: number;
  ambientIntensity: number;
  hemisphereSky: string;
  hemisphereGround: string;
  hemisphereIntensity: number;
  directionalColor: string;
  directionalIntensity: number;
  pointA: { color: string; intensity: number };
  pointB: { color: string; intensity: number };
  shadowOpacity: number;
  additive: boolean;
  pipeline: PipelinePalette;
  node: NodePalette;
  particles: { color: string; opacity: number };
  shards: { colors: readonly string[]; opacity: number };
}

export const sceneThemes: Record<ColorTheme, SceneTheme> = {
  dark: {
    fog: '#07090e',
    fogNear: 12,
    fogFar: 38,
    ambientIntensity: 0.55,
    hemisphereSky: '#bae6fd',
    hemisphereGround: '#020617',
    hemisphereIntensity: 0.35,
    directionalColor: '#bae6fd',
    directionalIntensity: 2.2,
    pointA: { color: '#0ea5e9', intensity: 22 },
    pointB: { color: '#38bdf8', intensity: 10 },
    shadowOpacity: 0.24,
    additive: true,
    pipeline: {
      plate: '#08131c',
      plateOpacity: 0.7,
      plateEmissiveIntensity: 0.1,
      tiers: [
        { color: '#0ea5e9', accent: '#7dd3fc' },
        { color: '#38bdf8', accent: '#bae6fd' },
        { color: '#7dd3fc', accent: '#e0f2fe' },
      ],
      ringOpacity: 0.38,
      strut: '#1f6f8f',
      strutOpacity: 0.34,
      core: '#7dd3fc',
      coreOpacity: 0.28,
      coreGlow: '#38bdf8',
      coreGlowOpacity: 0.055,
      packet: '#bae6fd',
      orbitA: '#38bdf8',
      orbitAOpacity: 0.32,
      orbitB: '#7dd3fc',
      orbitBOpacity: 0.2,
      beaconBody: '#0b2030',
      beaconEmissive: '#38bdf8',
      beaconEmissiveIntensity: 1.1,
    },
    node: {
      base: '#38bdf8',
      active: '#e0f2fe',
      emissiveBase: '#0ea5e9',
      emissiveActive: '#bae6fd',
      halo: '#38bdf8',
      ring: '#bae6fd',
      line: '#1f6f8f',
      lineActive: '#7dd3fc',
      packet: '#bae6fd',
      timeline: '#38bdf8',
      timelineActive: '#e0f2fe',
      label: {
        background: 'rgba(8, 12, 18, 0.97)',
        border: 'rgba(56, 189, 248, 0.34)',
        accent: '#38bdf8',
        title: '#f4f7fb',
        detail: '#a4b0c2',
      },
    },
    particles: { color: '#38bdf8', opacity: 0.4 },
    shards: {
      colors: ['#38bdf8', '#7dd3fc', '#1f6f8f', '#bae6fd'],
      opacity: 0.16,
    },
  },
  light: {
    fog: '#f4f7fb',
    fogNear: 13,
    fogFar: 40,
    ambientIntensity: 0.8,
    hemisphereSky: '#ffffff',
    hemisphereGround: '#d9e6f2',
    hemisphereIntensity: 0.55,
    directionalColor: '#ffffff',
    directionalIntensity: 2,
    pointA: { color: '#0284c7', intensity: 16 },
    pointB: { color: '#38bdf8', intensity: 7 },
    shadowOpacity: 0.12,
    additive: false,
    pipeline: {
      plate: '#0d2739',
      plateOpacity: 0.84,
      plateEmissiveIntensity: 0.05,
      tiers: [
        { color: '#075985', accent: '#0369a1' },
        { color: '#0369a1', accent: '#0284c7' },
        { color: '#0c4a6e', accent: '#075985' },
      ],
      ringOpacity: 0.46,
      strut: '#5b7388',
      strutOpacity: 0.48,
      core: '#0369a1',
      coreOpacity: 0.65,
      coreGlow: '#0284c7',
      coreGlowOpacity: 0.16,
      packet: '#0369a1',
      orbitA: '#0369a1',
      orbitAOpacity: 0.38,
      orbitB: '#075985',
      orbitBOpacity: 0.3,
      beaconBody: '#0b1727',
      beaconEmissive: '#0284c7',
      beaconEmissiveIntensity: 0.8,
    },
    node: {
      base: '#0369a1',
      active: '#0b1727',
      emissiveBase: '#0284c7',
      emissiveActive: '#0369a1',
      halo: '#0369a1',
      ring: '#075985',
      line: '#5b7388',
      lineActive: '#0369a1',
      packet: '#0369a1',
      timeline: '#0369a1',
      timelineActive: '#0b1727',
      label: {
        background: 'rgba(255, 255, 255, 0.99)',
        border: 'rgba(3, 105, 161, 0.32)',
        accent: '#0369a1',
        title: '#0b1727',
        detail: '#46586d',
      },
    },
    particles: { color: '#0369a1', opacity: 0.34 },
    shards: {
      colors: ['#0369a1', '#0284c7', '#5b7388', '#075985'],
      opacity: 0.2,
    },
  },
};
