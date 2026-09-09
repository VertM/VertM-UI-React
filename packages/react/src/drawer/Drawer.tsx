import { useEffect, useRef, type ReactNode, type CSSProperties, type KeyboardEvent } from 'react';
import { Close } from '@vertm/icons';
import { Portal } from '../overlay/Portal.js';
import { useVertMConfig, useIsVertical } from '../config/context.js';
import { useFocusTrap } from '../hooks/useFocusTrap.js';
import { VertMText } from '../VertMText.js';

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface DrawerProps {
  open?: boolean;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  placement?: DrawerPlacement;
  size?: number | string;
  mask?: boolean;
  maskClosable?: boolean;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}

export function VertMDrawer({
  open = false,
  title,
  children,
  footer,
  placement = 'right',
  size = 378,
  mask = true,
  maskClosable = true,
  onClose,
  className = '',
  style,
}: DrawerProps) {
  const config = useVertMConfig();
  const vertical = useIsVertical();
  const panelRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return;
    prevFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      prevFocus.current?.focus();
    };
  }, [open]);

  if (!open) return null;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose?.();
  };

  const sizeStyle =
    placement === 'left' || placement === 'right'
      ? { width: size }
      : { height: size };

  return (
    <Portal container={config.getPopupContainer}>
      <div className="vertm-drawer-wrap" onKeyDown={handleKeyDown}>
        {mask && (
          <div
            className="vertm-drawer__mask"
            onClick={maskClosable ? onClose : undefined}
            aria-hidden
          />
        )}
        <div
          ref={panelRef}
          className={`vertm-drawer vertm-drawer--${placement} ${className}`.trim()}
          style={{ ...sizeStyle, ...style }}
          role="dialog"
          aria-modal
          tabIndex={-1}
        >
          <div className="vertm-split vertm-split--with-close vertm-drawer__main">
            <div className="vertm-split__start">
              <button
                type="button"
                className="vertm-drawer__close vertm-popup-close"
                aria-label="Close"
                onClick={onClose}
              >
                <Close vertical={vertical} rotateForVertical={false} />
              </button>
              {title && (
                <div className="vertm-split__title vertm-drawer__title">
                  {typeof title === 'string' ? <VertMText as="span" text={title} /> : title}
                </div>
              )}
            </div>
            <div className="vertm-split__center vertm-drawer__body">{children}</div>
            {footer && <div className="vertm-split__end vertm-split__end--bottom vertm-drawer__footer">{footer}</div>}
          </div>
        </div>
      </div>
    </Portal>
  );
}
