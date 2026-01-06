import React, { useEffect, useRef } from 'react';
import './Dialog.module.css';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  closeOnOverlayClick?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div 
      ref={overlayRef}
      className="v3ai-dialog-overlay" 
      onClick={handleOverlayClick}
    >
      <div className={`v3ai-dialog v3ai-dialog--${size}`}>
        {title && (
          <div className="v3ai-dialog__header">
            <h2 className="v3ai-dialog__title">{title}</h2>
            <button 
              className="v3ai-dialog__close" 
              onClick={onClose}
              aria-label="Close dialog"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        )}
        <div className="v3ai-dialog__content">
          {children}
        </div>
        {footer && (
          <div className="v3ai-dialog__footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
