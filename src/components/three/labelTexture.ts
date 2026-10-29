import { CanvasTexture, LinearFilter, SRGBColorSpace } from 'three';
import type { CanvasTexture as CanvasTextureType } from 'three';

const TITLE_FONT = '700 44px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const DETAIL_FONT = '600 30px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const LABEL_SCALE = 2;
const LABEL_HEIGHT = 104;
const PADDING_X = 24;

export interface SceneLabel {
  texture: CanvasTextureType;
  aspect: number;
}

export interface SceneLabelPalette {
  background: string;
  border: string;
  accent: string;
  title: string;
  detail: string;
}

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

export const createSceneLabel = (
  title: string,
  detail: string,
  palette: SceneLabelPalette,
): SceneLabel | null => {
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return null;

  const titleText = title.toUpperCase();

  context.font = TITLE_FONT;
  const titleWidth = context.measureText(titleText).width;
  context.font = DETAIL_FONT;
  const detailWidth = context.measureText(detail).width;

  const width = Math.ceil(Math.max(titleWidth, detailWidth)) + PADDING_X * 2;
  canvas.width = width * LABEL_SCALE;
  canvas.height = LABEL_HEIGHT * LABEL_SCALE;

  context.scale(LABEL_SCALE, LABEL_SCALE);
  context.textAlign = 'left';
  context.textBaseline = 'middle';

  drawRoundedRect(context, 1, 1, width - 2, LABEL_HEIGHT - 2, 4);
  context.fillStyle = palette.background;
  context.fill();
  context.strokeStyle = palette.border;
  context.lineWidth = 1;
  context.stroke();

  context.fillStyle = palette.accent;
  context.fillRect(1, 1, 3, LABEL_HEIGHT - 2);

  context.font = TITLE_FONT;
  context.fillStyle = palette.title;
  context.fillText(titleText, PADDING_X, 38);

  context.font = DETAIL_FONT;
  context.fillStyle = palette.detail;
  context.fillText(detail, PADDING_X, 78);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.needsUpdate = true;

  return { texture, aspect: width / LABEL_HEIGHT };
};
