import { useEffect, useRef, useState } from 'react';

/**
 * Hook to add an animation class when the element enters the viewport.
 * @param animationClass Tailwind animation class, e.g. 'animate-slide-in-left'
 */
export function useInViewAnimation<T extends HTMLElement>(animationClass: string) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    animationClass: inView ? animationClass : '',
  };
}
