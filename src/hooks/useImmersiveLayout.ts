import { useEffect, useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import type { ImmersiveSafeArea } from '../types/portfolio';

const SIDEBAR_MEDIA_QUERY =
  '(min-width: 1280px), (min-width: 768px) and (orientation: landscape), (orientation: landscape) and (max-height: 600px)';

const SIDE_PANEL_BOTTOM_INSET = 64;

const getSidebarLayout = () =>
  typeof window !== 'undefined' && window.matchMedia(SIDEBAR_MEDIA_QUERY).matches;

const getFullSafeArea = (): ImmersiveSafeArea => {
  if (typeof window === 'undefined') {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }

  return {
    top: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
    left: 0,
  };
};

const hasChanged = (current: ImmersiveSafeArea, next: ImmersiveSafeArea) =>
  current.top !== next.top ||
  current.right !== next.right ||
  current.bottom !== next.bottom ||
  current.left !== next.left;

export const useImmersiveLayout = (
  headerRef: RefObject<HTMLElement | null>,
  panelRef: RefObject<HTMLElement | null>,
) => {
  const [sidebar, setSidebar] = useState(getSidebarLayout);
  const [safeArea, setSafeArea] = useState<ImmersiveSafeArea>(getFullSafeArea);

  useEffect(() => {
    const mediaQuery = window.matchMedia(SIDEBAR_MEDIA_QUERY);
    const handleChange = () => setSidebar(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useLayoutEffect(() => {
    const updateSafeArea = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const headerRect = headerRef.current?.getBoundingClientRect();
      const panelRect = panelRef.current?.getBoundingClientRect();
      const top = Math.round(Math.max(0, Math.min(height, headerRect?.bottom ?? 0)));

      const nextSafeArea: ImmersiveSafeArea = {
        top,
        right: width,
        bottom: sidebar
          ? Math.round(Math.max(top + 1, height - SIDE_PANEL_BOTTOM_INSET))
          : Math.round(
              Math.max(top + 1, Math.min(height, panelRect?.top ?? height)),
            ),
        left: sidebar && panelRect ? Math.round(panelRect.right) : 0,
      };

      setSafeArea((currentSafeArea) =>
        hasChanged(currentSafeArea, nextSafeArea) ? nextSafeArea : currentSafeArea,
      );
    };

    updateSafeArea();

    const resizeObserver = new ResizeObserver(updateSafeArea);
    if (headerRef.current) resizeObserver.observe(headerRef.current);
    if (panelRef.current) resizeObserver.observe(panelRef.current);
    window.addEventListener('resize', updateSafeArea);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateSafeArea);
    };
  }, [headerRef, panelRef, sidebar]);

  return { sidebar, safeArea };
};
