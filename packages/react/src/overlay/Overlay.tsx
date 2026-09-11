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
  /** 触发弹出层的子元素 */
  children: ReactElement;
  /** 弹出层内容 */
  content: ReactNode;
  /** 受控显示状态 */
  open?: boolean;
  /** 非受控初始显示状态 @default false */
  defaultOpen?: boolean;
  /** 显示状态变化回调 */
  onOpenChange?: (open: boolean) => void;
  /** 弹出位置 @default 'top' */
  placement?: Placement;
  /** 触发方式 @default 'hover' */
  trigger?: TriggerType | TriggerType[];
  /** 触发器自定义类名 */
  className?: string;
  /** 弹出层自定义类名 */
  overlayClassName?: string;
  /** 弹出层自定义样式 */
  overlayStyle?: CSSProperties;
  /** 是否显示箭头 @default true */
  showArrow?: boolean;
  /** 是否显示关闭按钮 @default false */
  closable?: boolean;
  /** 是否禁用 @default false */
  disabled?: boolean;
  /** 弹出层 z-index */
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
