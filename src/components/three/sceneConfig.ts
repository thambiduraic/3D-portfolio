import type { ImmersiveSectionId } from '../../types/portfolio';

export type Vec3 = [number, number, number];

export interface ImmersiveSceneNode {
  section: ImmersiveSectionId;
  label: string;
  detail: string;
  position: Vec3;
}

export interface CameraView {
  position: Vec3;
  target: Vec3;
}

export const immersiveSceneNodes: ImmersiveSceneNode[] = [
  {
    section: 'frontend',
    label: 'Frontend',
    detail: 'React · TypeScript',
    position: [-2.55, 1.15, 0.7],
  },
  {
    section: 'backend',
    label: 'Backend',
    detail: 'Python · Django',
    position: [2.4, 0.92, -0.25],
  },
  {
    section: 'experience',
    label: 'Experience',
    detail: 'ReachCopilot · NSCHOOL',
    position: [-1.82, -1.55, 1.05],
  },
  {
    section: 'projects',
    label: 'Projects',
    detail: 'PulseBoard',
    position: [1.95, -1.58, 1.12],
  },
  {
    section: 'contact',
    label: 'Contact',
    detail: 'Email · GitHub',
    position: [0, 1.9, -0.92],
  },
];

const overviewView: CameraView = {
  position: [0, 1.8, 11],
  target: [-2.6, -0.15, 0],
};

const compactOverviewView: CameraView = {
  position: [0, 0, 20],
  target: [0, -3.2, 0],
};

export const getCameraView = (section: ImmersiveSectionId, compact: boolean): CameraView => {
  if (section === 'overview') {
    return compact ? compactOverviewView : overviewView;
  }

  const node = immersiveSceneNodes.find((sceneNode) => sceneNode.section === section);
  if (!node) return overviewView;

  const [x, y, z] = node.position;

  if (compact) {
    return {
      position: [x, y, z + 6],
      target: [x, y - 0.92, z],
    };
  }

  return {
    position: [x, y, z + 4.6],
    target: [x - 1, y, z],
  };
};
