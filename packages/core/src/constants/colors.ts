export const colors = {
  // Primary
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  primaryLight: '#dbeafe',
  
  // Secondary
  secondary: '#8b5cf6',
  secondaryHover: '#7c3aed',
  secondaryLight: '#ede9fe',
  
  // Success
  success: '#10b981',
  successHover: '#059669',
  successLight: '#d1fae5',
  
  // Warning
  warning: '#f59e0b',
  warningHover: '#d97706',
  warningLight: '#fef3c7',
  
  // Error
  error: '#ef4444',
  errorHover: '#dc2626',
  errorLight: '#fee2e2',
  
  // Neutral
  white: '#ffffff',
  black: '#000000',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
} as const;

export type ColorName = keyof typeof colors;
