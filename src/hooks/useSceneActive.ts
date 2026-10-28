import { useEffect, useRef, useState } from 'react';

export function useSceneActive<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const onScreenRef = useRef(true);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreenRef.current = entry.isIntersecting;
        setActive(entry.isIntersecting && !document.hidden);
      },
      { rootMargin: '160px' },
    );

    const handleVisibility = () => {
      setActive(onScreenRef.current && !document.hidden);
    };

    observer.observe(element);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return { ref, active };
}
