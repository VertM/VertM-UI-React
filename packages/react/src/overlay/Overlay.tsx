import {
  useState,
  useEffect,
  useRef,
  useCallback,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type CSSProperties,
} from 'react';
import { Close } from '@vertm/icons';
import { useVertMConfig } from '../config/context.js';
import { Portal } from './Portal.js';
import { computeOverlayPosition, type Placement } from './placement.js';

export type TriggerType = 'hover' | 'focus' | 'click' | 'contextMenu';

type TriggerProps = {
  className?: string;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  onContextMenu?: (e: React.MouseEvent) => void;
};

export interface OverlayProps {
  children: ReactElement;
  content: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: Placement;
  trigger?: TriggerType | TriggerType[];
  className?: string;
  overlayClassName?: string;
  overlayStyle?: CSSProperties;
  showArrow?: boolean;
  closable?: boolean;
  disabled?: boolean;
  zIndex?: number;
}

export function Overlay({
  children,
  content,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  placement = 'top',
  trigger = 'hover',
  className = '',
  overlayClassName = '',
  overlayStyle,
  showArrow = true,
  closable = false,
  disabled = false,
  zIndex,
}: OverlayProps) {
  const config = useVertMConfig();
  const [open, setOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const visible = isControlled ? controlledOpen : open;

  const triggerRef = useRef<HTMLElement | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0, placement });

  const setVisible = useCallback(
    (next: boolean) => {
      if (!isControlled) setOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  const updatePosition = useCallback(() => {
    const triggerEl = triggerRef.current;
    const popupEl = popupRef.current;
    if (!triggerEl || !popupEl) return;
    const t = triggerEl.getBoundingClientRect();
    const p = popupEl.getBoundingClientRect();
    const result = computeOverlayPosition(
      { top: t.top, left: t.left, width: t.width, height: t.height },
      { top: 0, left: 0, width: p.width, height: p.height },
      placement
    );
    setPos(result);
  }, [placement]);

  useEffect(() => {
    if (!visible) return;
    updatePosition();
    const onScroll = () => updatePosition();
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
    };
  }, [visible, updatePosition]);

  const triggers = Array.isArray(trigger) ? trigger : [trigger];

  if (!isValidElement(children)) {
    return children;
  }

  const childProps = children.props as TriggerProps;

  const merged: TriggerProps & { ref?: (node: HTMLElement | null) => void } = {
    className: [childProps.className, className].filter(Boolean).join(' '),
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
    },
  };

  if (triggers.includes('hover') && !disabled) {
    merged.onMouseEnter = (e) => {
      childProps.onMouseEnter?.(e);
      setVisible(true);
    };
    merged.onMouseLeave = (e) => {
      childProps.onMouseLeave?.(e);
      setVisible(false);
    };
  }
  if (triggers.includes('focus') && !disabled) {
    merged.onFocus = (e) => {
      childProps.onFocus?.(e);
      setVisible(true);
    };
    merged.onBlur = (e) => {
      childProps.onBlur?.(e);
      setVisible(false);
    };
  }
  if (triggers.includes('click') && !disabled) {
    merged.onClick = (e) => {
      childProps.onClick?.(e);
      setVisible(!visible);
    };
  }
  if (triggers.includes('contextMenu') && !disabled) {
    merged.onContextMenu = (e) => {
      e.preventDefault();
      childProps.onContextMenu?.(e);
      setVisible(true);
    };
  }

  const child = cloneElement(children, merged);

  const popup = visible && !disabled && (
    <Portal container={config.getPopupContainer}>
      <div
        ref={popupRef}
        className={`vertm-overlay vertm-overlay--${pos.placement} ${overlayClassName}`.trim()}
        style={{
          position: 'fixed',
          top: pos.top,
          left: pos.left,
          zIndex: zIndex ?? config.theme.zIndexTooltip,
          ...overlayStyle,
        }}
        role="tooltip"
        onMouseEnter={() => triggers.includes('hover') && setVisible(true)}
        onMouseLeave={() => triggers.includes('hover') && setVisible(false)}
      >
        {closable && (
          <button
            type="button"
            className="vertm-popup-close vertm-popup-close--end"
            aria-label="Close"
            onClick={() => setVisible(false)}
          >
            <Close size="small" vertical={false} />
          </button>
        )}
        {showArrow && <span className="vertm-overlay__arrow" aria-hidden />}
        <div className="vertm-overlay__content">{content}</div>
      </div>
    </Portal>
  );

  return (
    <>
      {child}
      {popup}
    </>
  );
}
