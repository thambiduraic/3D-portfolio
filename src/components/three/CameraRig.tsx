import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import type { ImmersiveSafeArea, ImmersiveSectionId } from '../../types/portfolio';
import { getCameraView, getFramedCameraView } from './sceneConfig';

interface CameraRigProps {
  activeSection: ImmersiveSectionId;
  reducedMotion: boolean;
  safeArea: ImmersiveSafeArea;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  activeSection,
  reducedMotion,
  safeArea,
}) => {
  const viewportWidth = useThree((state) => state.size.width);
  const viewportHeight = useThree((state) => state.size.height);
  const compact = viewportWidth < 1280;
  const view = useMemo(
    () =>
      compact
        ? getFramedCameraView(activeSection, {
            width: viewportWidth,
            height: viewportHeight,
            safeArea,
          })
        : getCameraView(activeSection),
    [activeSection, compact, safeArea, viewportHeight, viewportWidth],
  );
  const desiredPosition = useMemo(() => new Vector3(...view.position), [view]);
  const desiredTarget = useMemo(() => new Vector3(...view.target), [view]);
  const lookAtTarget = useRef(new Vector3());
  const initialized = useRef(false);

  useFrame((state, delta) => {
    const camera = state.camera;

    if (!initialized.current) {
      camera.position.copy(desiredPosition);
      lookAtTarget.current.copy(desiredTarget);
      camera.lookAt(lookAtTarget.current);
      initialized.current = true;
      return;
    }

    if (reducedMotion) {
      camera.position.copy(desiredPosition);
      lookAtTarget.current.copy(desiredTarget);
      camera.lookAt(lookAtTarget.current);
      return;
    }

    const damping = 3.2;

    camera.position.x = MathUtils.damp(camera.position.x, desiredPosition.x, damping, delta);
    camera.position.y = MathUtils.damp(camera.position.y, desiredPosition.y, damping, delta);
    camera.position.z = MathUtils.damp(camera.position.z, desiredPosition.z, damping, delta);

    lookAtTarget.current.x = MathUtils.damp(lookAtTarget.current.x, desiredTarget.x, damping, delta);
    lookAtTarget.current.y = MathUtils.damp(lookAtTarget.current.y, desiredTarget.y, damping, delta);
    lookAtTarget.current.z = MathUtils.damp(lookAtTarget.current.z, desiredTarget.z, damping, delta);

    camera.lookAt(lookAtTarget.current);
  });

  return null;
};
