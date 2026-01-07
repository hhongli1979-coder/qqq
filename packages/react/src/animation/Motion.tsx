import React, { useEffect, useRef, useState, CSSProperties } from 'react';

export interface MotionProps {
  initial?: CSSProperties;
  animate?: CSSProperties;
  exit?: CSSProperties;
  transition?: {
    duration?: number;
    delay?: number;
    easing?: string;
  };
  children: React.ReactNode;
  className?: string;
}

export const Motion: React.FC<MotionProps> = ({
  initial = {},
  animate = {},
  exit = {},
  transition = {},
  children,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const {
      duration = 300,
      delay = 0,
      easing = 'ease-out'
    } = transition;

    // Apply initial styles
    Object.assign(ref.current.style, initial);

    // Apply animation styles after delay
    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.style.transition = `all ${duration}ms ${easing}`;
        Object.assign(ref.current.style, animate);
        setIsVisible(true);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [initial, animate, transition]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
