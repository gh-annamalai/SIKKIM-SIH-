import { useEffect, useRef } from 'react';

export function useAnimateOnScroll<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          node.classList.add('animate-fade-in-up');
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);
  return ref;
}
