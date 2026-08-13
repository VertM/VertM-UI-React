import {
  useEffect,
  useRef,
  type ReactNode,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import { Close } from '@vertm/icons';
import { Portal } from '../overlay/Portal.js';
import { useVertMConfig } from '../config/context.js';
import { useIsVertical } from '../config/context.js';
import { useFocusTrap } from '../hooks/useFocusTrap.js';
import { VertMText } from '../VertMText.js';

export interface ModalProps {
  open?: boolean;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode | null;
  onCancel?: () => void;
  onOk?: () => void;
  okText?: string;
  cancelText?: string;
  mask?: boolean;
  maskClosable?: boolean;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
  destroyOnClose?: boolean;
}

export function VertMModal({
  open = false,
  title,
  children,
  footer,
  onCancel,
  onOk,
  okText = 'ᠵᠥᠪᠰᠢᠶᠡᠷᠡᠨ᠎ᠡ',
  cancelText = 'ᠦᠭᠡᠢ',
  mask = true,
  maskClosable = true,
  width = 520,
  className = '',
  style,
  destroyOnClose = false,
}: ModalProps) {
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

  if (!open && destroyOnClose) return null;
  if (!open) return null;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onCancel?.();
  };

  const defaultFooter = (
    <>
      <button type="button" className="vertm-btn vertm-btn--default" onClick={onCancel}>
        <VertMText as="span" text={cancelText} />
      </button>
      <button type="button" className="vertm-btn vertm-btn--primary" onClick={onOk}>
        <VertMText as="span" text={okText} />
      </button>
    </>
  );

  return (
    <Portal container={config.getPopupContainer}>
      <div className="vertm-modal-wrap" onKeyDown={handleKeyDown}>
        {mask && (
          <div
            className="vertm-modal__mask"
            onClick={maskClosable ? onCancel : undefined}
            aria-hidden
          />
        )}
        <div
          ref={panelRef}
          className={`vertm-modal ${className}`.trim()}
          style={{ width, ...style }}
          role="dialog"
          aria-modal
          tabIndex={-1}
        >
          <div className="vertm-split vertm-split--with-close vertm-modal__main">
            <div className="vertm-split__start">
              <button
                type="button"
                className="vertm-modal__close vertm-popup-close"
                aria-label="Close"
                onClick={onCancel}
              >
                <Close vertical={vertical} rotateForVertical={false} />
              </button>
              {title && (
                <div className="vertm-split__title vertm-modal__title">
                  {typeof title === 'string' ? <VertMText as="span" text={title} /> : title}
                </div>
              )}
            </div>
            <div className="vertm-split__center vertm-modal__body">{children}</div>
            {footer !== null && (
              <div className="vertm-split__end vertm-split__end--bottom vertm-modal__footer">{footer ?? defaultFooter}</div>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
}
