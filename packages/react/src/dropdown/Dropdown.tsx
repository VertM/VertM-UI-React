import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Ellipsis } from '@vertm/icons';
import { useIsVertical, useVertMConfig } from '../config/context.js';
import { VertMButton, type ButtonProps } from '../button/Button.js';
import { useControlled } from '../hooks/useControlled.js';
import { computeOverlayPosition, type Placement } from '../overlay/placement.js';
import { Portal } from '../overlay/Portal.js';
import { VertMMenu, type MenuProps } from '../menu/Menu.js';
import type { MenuItemType } from '../menu/context.js';
import type { MenuSelectInfo } from '../menu/types.js';
import type { TriggerType } from '../overlay/Overlay.js';

export interface DropdownOpenChangeInfo {
  source: 'trigger' | 'menu';
}

/** Ant Design compatible `menu` config for Dropdown. */
export type DropdownMenuConfig = Pick<
  MenuProps,
  'items' | 'selectedKeys' | 'defaultSelectedKeys'
> & {
  onClick?: (info: MenuSelectInfo) => void;
  onSelect?: (info: MenuSelectInfo) => void;
  selectable?: boolean;
};

export interface DropdownArrowConfig {
  /** 箭头是否指向触发器中心 */
  pointAtCenter?: boolean;
}

export interface DropdownProps {
  /** 下拉菜单配置 */
  menu: DropdownMenuConfig;
  /** 触发下拉的子元素 */
  children: ReactElement;
  /** 触发方式 @default ['hover'] */
  trigger?: TriggerType | TriggerType[];
  /** 弹出位置；竖排默认 rightTop，横排默认 bottomLeft */
  placement?: Placement;
  /** 是否显示箭头；可为配置对象 @default false */
  arrow?: boolean | DropdownArrowConfig;
  /** 受控展开状态 */
  open?: boolean;
  /** 非受控初始展开状态 @default false */
  defaultOpen?: boolean;
  /** 展开状态变化回调 */
  onOpenChange?: (open: boolean, info?: DropdownOpenChangeInfo) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 关闭时是否销毁菜单节点 */
  destroyOnHidden?: boolean;
  /** 是否自动调整溢出位置 */
  autoAdjustOverflow?: boolean;
  /** 弹出层挂载容器 */
  getPopupContainer?: () => HTMLElement;
  /** 自定义渲染弹出层内容 */
  popupRender?: (menu: ReactNode) => ReactNode;
  /** 点击菜单项后是否关闭 @default true */
  menuCloseOnClick?: boolean;
  /** 触发器自定义类名 */
  className?: string;
  /** 弹出层自定义类名 */
  overlayClassName?: string;
  /** 弹出层自定义样式 */
  overlayStyle?: CSSProperties;
}

export interface DropdownButtonProps extends Omit<DropdownProps, 'children'> {
  /** 主按钮内容 */
  children?: ReactNode;
  /** 按钮类型 */
  type?: ButtonProps['type'];
  /** 按钮尺寸 */
  size?: ButtonProps['size'];
  /** 是否载入中 */
  loading?: boolean;
  /** 危险态 */
  danger?: boolean;
  /** 下拉触发按钮图标 */
  icon?: ReactNode;
  /** 自定义渲染左右按钮 */
  buttonsRender?: (buttons: ReactNode[]) => ReactNode[];
}

const CLOSE_DELAY = 150;

type TriggerProps = {
  className?: string;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onClick?: (e: MouseEvent) => void;
  onContextMenu?: (e: MouseEvent) => void;
  ref?: (node: HTMLElement | null) => void;
};

function resolveDefaultPlacement(isVerticalWriting: boolean): Placement {
  return isVerticalWriting ? 'rightTop' : 'bottomLeft';
}

function DropdownBase({
  menu,
  children,
  trigger = ['hover'],
  placement,
  arrow = false,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  destroyOnHidden = false,
  autoAdjustOverflow: _autoAdjustOverflow = true,
  getPopupContainer,
  popupRender,
  menuCloseOnClick = true,
  className = '',
  overlayClassName = '',
  overlayStyle,
}: DropdownProps) {
  const config = useVertMConfig();
  const isVerticalWriting = useIsVertical();
  const [open, setOpenState] = useControlled(controlledOpen, defaultOpen);
  const triggerRef = useRef<HTMLElement | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number>();
  const contextPointRef = useRef<{ x: number; y: number } | null>(null);
  const [pos, setPos] = useState({
    top: 0,
    left: 0,
    placement: resolveDefaultPlacement(isVerticalWriting),
  });
  const [mounted, setMounted] = useState(open);
  const openRef = useRef(open);
  openRef.current = open;

  const triggers = useMemo(
    () => (Array.isArray(trigger) ? trigger : [trigger]),
    [trigger]
  );
  const showArrow = Boolean(arrow);
  const resolvedPlacement = placement ?? resolveDefaultPlacement(isVerticalWriting);

  const menuOnClickRef = useRef(menu.onClick);
  const menuOnSelectRef = useRef(menu.onSelect);
  menuOnClickRef.current = menu.onClick;
  menuOnSelectRef.current = menu.onSelect;

  const setVisible = useCallback(
    (next: boolean, source: DropdownOpenChangeInfo['source'] = 'trigger') => {
      if (disabled || openRef.current === next) return;
      setOpenState(next);
      onOpenChange?.(next, { source });
      if (next) setMounted(true);
      if (!next && destroyOnHidden) {
        window.setTimeout(() => setMounted(false), 200);
      }
    },
    [disabled, destroyOnHidden, onOpenChange, setOpenState]
  );

  const updatePosition = useCallback(() => {
    const popupEl = popupRef.current;
    if (!popupEl) return;

    const contextPoint = contextPointRef.current;
    if (contextPoint && triggers.includes('contextMenu')) {
      const p = popupEl.getBoundingClientRect();
      const result = computeOverlayPosition(
        { top: contextPoint.y, left: contextPoint.x, width: 0, height: 0 },
        { top: 0, left: 0, width: p.width, height: p.height },
        resolvedPlacement
      );
      setPos((prev) => {
        if (
          prev.top === result.top &&
          prev.left === result.left &&
          prev.placement === result.placement
        ) {
          return prev;
        }
        return result;
      });
      return;
    }

    const triggerEl = triggerRef.current;
    if (!triggerEl) return;
    const t = triggerEl.getBoundingClientRect();
    const p = popupEl.getBoundingClientRect();
    const result = computeOverlayPosition(
      { top: t.top, left: t.left, width: t.width, height: t.height },
      { top: 0, left: 0, width: p.width, height: p.height },
      resolvedPlacement
    );
    setPos((prev) => {
      if (
        prev.top === result.top &&
        prev.left === result.left &&
        prev.placement === result.placement
      ) {
        return prev;
      }
      return result;
    });
  }, [resolvedPlacement, triggers]);

  const handleMenuSelect = useCallback(
    (info: MenuSelectInfo) => {
      menuOnSelectRef.current?.(info);
      menuOnClickRef.current?.(info);
      if (menuCloseOnClick) {
        setVisible(false, 'menu');
      }
    },
    [menuCloseOnClick, setVisible]
  );

  const menuNode = useMemo(
    () => (
      <VertMMenu
        mode="vertical"
        className="vertm-menu--dropdown vertm-menu--popup"
        items={menu.items}
        selectedKeys={menu.selectedKeys}
        defaultSelectedKeys={menu.defaultSelectedKeys}
        defaultPopupPlacement={isVerticalWriting ? 'rightTop' : 'rightTop'}
        arrowVertical={false}
        onSelect={handleMenuSelect}
      />
    ),
    [menu.items, menu.selectedKeys, menu.defaultSelectedKeys, handleMenuSelect, isVerticalWriting]
  );

  const popupContent = popupRender ? popupRender(menuNode) : menuNode;

  useLayoutEffect(() => {
    if (!open || disabled) return;
    updatePosition();
    const id = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(id);
  }, [open, disabled, updatePosition]);

  useEffect(() => {
    if (!open || disabled) return;
    const onScroll = () => updatePosition();
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
    };
  }, [open, disabled, updatePosition]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    },
    []
  );

  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setVisible(false, 'trigger'), CLOSE_DELAY);
  }, [setVisible]);

  const cancelClose = useCallback(() => {
    window.clearTimeout(closeTimerRef.current);
  }, []);

  const triggerRefCallback = useCallback((node: HTMLElement | null) => {
    triggerRef.current = node;
  }, []);

  if (!isValidElement(children)) {
    return children;
  }

  const childProps = children.props as TriggerProps;
  const merged: TriggerProps = {
    className: [childProps.className, className].filter(Boolean).join(' '),
    ref: triggerRefCallback,
  };

  if (triggers.includes('hover') && !disabled) {
    merged.onMouseEnter = (e) => {
      childProps.onMouseEnter?.(e);
      contextPointRef.current = null;
      cancelClose();
      setVisible(true, 'trigger');
    };
    merged.onMouseLeave = (e) => {
      childProps.onMouseLeave?.(e);
      scheduleClose();
    };
  }

  if (triggers.includes('focus') && !disabled) {
    merged.onFocus = (e) => {
      childProps.onFocus?.(e);
      contextPointRef.current = null;
      setVisible(true, 'trigger');
    };
    merged.onBlur = (e) => {
      childProps.onBlur?.(e);
      scheduleClose();
    };
  }

  if (triggers.includes('click') && !disabled) {
    merged.onClick = (e) => {
      childProps.onClick?.(e);
      contextPointRef.current = null;
      setVisible(!open, 'trigger');
    };
  }

  if (triggers.includes('contextMenu') && !disabled) {
    merged.onContextMenu = (e) => {
      e.preventDefault();
      childProps.onContextMenu?.(e);
      contextPointRef.current = { x: e.clientX, y: e.clientY };
      setVisible(true, 'trigger');
    };
  }

  const child = cloneElement(children, merged);
  const shouldRenderPopup = destroyOnHidden ? mounted && open : open;

  const popup =
    shouldRenderPopup &&
    !disabled && (
      <Portal container={getPopupContainer ?? config.getPopupContainer}>
        <div
          ref={popupRef}
          className={[
            'vertm-dropdown',
            isVerticalWriting && 'vertm-dropdown--vertical-writing',
            `vertm-dropdown--${pos.placement}`,
            showArrow && 'vertm-dropdown--arrow',
            overlayClassName,
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            zIndex: config.theme.zIndexPopup,
            width: 'max-content',
            ...overlayStyle,
          }}
          data-vertical-writing={isVerticalWriting || undefined}
          onMouseEnter={triggers.includes('hover') ? cancelClose : undefined}
          onMouseLeave={triggers.includes('hover') ? scheduleClose : undefined}
        >
          {showArrow && <span className="vertm-dropdown__arrow" aria-hidden />}
          <div className="vertm-dropdown__menu">{popupContent}</div>
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

function DropdownButton({
  children,
  type = 'default',
  size,
  loading = false,
  danger = false,
  icon,
  buttonsRender,
  menu,
  trigger = ['hover'],
  disabled,
  ...rest
}: DropdownButtonProps) {
  const isVerticalWriting = useIsVertical();
  const resolvedIcon = icon ?? <Ellipsis vertical={isVerticalWriting} size="small" />;

  const left = (
    <VertMButton type={type} size={size} loading={loading} danger={danger} disabled={disabled}>
      {children}
    </VertMButton>
  );

  const right = (
    <DropdownBase menu={menu} trigger={trigger} disabled={disabled} {...rest}>
      <VertMButton
        type={type}
        size={size}
        danger={danger}
        disabled={disabled}
        icon={resolvedIcon}
        aria-label="Open dropdown menu"
      />
    </DropdownBase>
  );

  const buttons = buttonsRender ? buttonsRender([left, right]) : [left, right];

  return (
    <div className="vertm-dropdown-button" role="group">
      {buttons[0]}
      {buttons[1]}
    </div>
  );
}

export const VertMDropdown = Object.assign(DropdownBase, { Button: DropdownButton });

export type { MenuItemType };
