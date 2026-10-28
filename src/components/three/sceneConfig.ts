import type { ImmersiveSafeArea, ImmersiveSectionId } from '../../types/portfolio';

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

export interface SceneViewport {
  width: number;
  height: number;
  safeArea: ImmersiveSafeArea;
}

export const SCENE_FOV = 42;

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

const CAMERA_TAN = Math.tan((SCENE_FOV * Math.PI) / 360);
const FRAME_MARGIN = 0.9;
const MIN_OVERVIEW_DISTANCE = 6;
const COMPACT_FOCUS_DISTANCE = 6;
const OVERVIEW_CONTENT = {
  centerX: -0.05,
  centerY: 0.44,
  width: 6.7,
  height: 4.2,
};
const FOCUS_CONTENT_OFFSET_Y = 0.08;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const getCameraView = (section: ImmersiveSectionId): CameraView => {
  if (section === 'overview') {
    return overviewView;
  }

  const node = immersiveSceneNodes.find((sceneNode) => sceneNode.section === section);
  if (!node) return overviewView;

  const [x, y, z] = node.position;

  return {
    position: [x, y, z + 4.6],
    target: [x - 1, y, z],
  };
};

export const getFramedCameraView = (
  section: ImmersiveSectionId,
  viewport: SceneViewport,
): CameraView => {
  const width = Math.max(1, viewport.width);
  const height = Math.max(1, viewport.height);
  const top = clamp(viewport.safeArea.top, 0, height - 1);
  const bottom = clamp(viewport.safeArea.bottom, top + 1, height);
  const left = clamp(viewport.safeArea.left, 0, width - 1);
  const right = clamp(viewport.safeArea.right, left + 1, width);
  const safeWidth = Math.max(1, right - left);
  const safeHeight = Math.max(1, bottom - top);
  const safeCenterX = (left + right) / 2;
  const safeCenterY = (top + bottom) / 2;

  if (section === 'overview') {
    const distanceFromHeight =
      OVERVIEW_CONTENT.height /
      (2 * CAMERA_TAN * FRAME_MARGIN * (safeHeight / height));
    const distanceFromWidth =
      OVERVIEW_CONTENT.width /
      (2 * CAMERA_TAN * FRAME_MARGIN * (safeWidth / height));
    const distance = Math.max(
      distanceFromHeight,
      distanceFromWidth,
      MIN_OVERVIEW_DISTANCE,
    );
    const pixelsPerWorldUnit = height / (2 * distance * CAMERA_TAN);
    const targetX =
      OVERVIEW_CONTENT.centerX - (safeCenterX - width / 2) / pixelsPerWorldUnit;
    const targetY =
      OVERVIEW_CONTENT.centerY - (height / 2 - safeCenterY) / pixelsPerWorldUnit;

    return {
      position: [0, 0, distance],
      target: [targetX, targetY, 0],
    };
  }

  const node = immersiveSceneNodes.find((sceneNode) => sceneNode.section === section);
  if (!node) {
    return {
      position: [0, 0, MIN_OVERVIEW_DISTANCE],
      target: [0, 0, 0],
    };
  }

  const [x, y, z] = node.position;
  const pixelsPerWorldUnit =
    height / (2 * COMPACT_FOCUS_DISTANCE * CAMERA_TAN);
  const contentCenterY = y + FOCUS_CONTENT_OFFSET_Y;
  const targetX = x - (safeCenterX - width / 2) / pixelsPerWorldUnit;
  const targetY =
    contentCenterY - (height / 2 - safeCenterY) / pixelsPerWorldUnit;

  return {
    position: [x, y, z + COMPACT_FOCUS_DISTANCE],
    target: [targetX, targetY, z],
  };
};
