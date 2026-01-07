import React from 'react';
import { IconProps } from './types';

export const Play: React.FC<IconProps> = ({ 
  size = 24, 
  color = 'currentColor',
  className = '',
  ...props 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

Play.displayName = 'Play';
