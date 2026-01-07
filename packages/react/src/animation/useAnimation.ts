import { useState, useEffect, useRef } from 'react';

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  loop?: boolean;
}

export function useAnimation(
  target: React.RefObject<HTMLElement>,
  animations: Record<string, string | number>,
  config: AnimationConfig = {}
) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!target.current) return;

    const {
      duration = 300,
      delay = 0,
      easing = 'ease-out',
      loop = false
    } = config;

    const element = target.current;
    element.style.transition = `all ${duration}ms ${easing}`;

    const animate = () => {
      setIsAnimating(true);
      Object.entries(animations).forEach(([property, value]) => {
        element.style[property as any] = typeof value === 'number' ? `${value}px` : value;
      });

      if (loop) {
        setTimeout(() => {
          setIsAnimating(false);
          setTimeout(animate, delay);
        }, duration);
      } else {
        setTimeout(() => setIsAnimating(false), duration);
      }
    };

    const timer = setTimeout(animate, delay);

    return () => clearTimeout(timer);
  }, [target, animations, config]);

  return { isAnimating };
}
