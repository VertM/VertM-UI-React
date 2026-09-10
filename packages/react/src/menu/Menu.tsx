import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { ChevronRight } from '@vertm/icons';
import { useIsVertical, useVertMConfig } from '../config/context.js';
import { useControlled } from '../hooks/useControlled.js';
import { computeOverlayPosition, type Placement } from '../overlay/placement.js';
import { Portal } from '../overlay/Portal.js';
import { VertMText } from '../VertMText.js';
import {
  MenuContext,
  useMenuContext,
  type MenuArrowConfig,
  type MenuContextValue,
  type MenuExpandIconRender,
  type MenuItemType,
} from './context.js';
import { focusFirstMenuControl, focusSiblingMenuControl } from './menuKeyboard.js';
import type { MenuMode, MenuSelectInfo } from './types.js';

export interface MenuProps extends MenuArrowConfig {
  mode?: MenuMode;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
  onSelect?: (info: MenuSelectInfo) => void;
  onOpenChange?: (openKeys: string[]) => void;
  /** Default popup placement for submenus. */
  defaultPopupPlacement?: Placement;
  items?: MenuItemType[];
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface MenuItemProps {
  itemKey: string;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface SubMenuProps extends MenuArrowConfig {
  itemKey: string;
  title: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  popupPlacement?: Placement;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const POPUP_CLOSE_DELAY = 150;

function renderLabel(node: ReactNode): ReactNode {
  return typeof node === 'string' ? <VertMText as="span" text={node} className="vertm-menu__text" /> : node;
}

function resolveSubMenuPlacement(
  isVerticalWriting: boolean,
  mode: MenuMode,
  override?: Placement
): Placement {
  if (override) return override;
  if (mode === 'horizontal') return 'bottomLeft';
  return isVerticalWriting ? 'rightTop' : 'rightTop';
}

function mergeArrowConfig(base: MenuArrowConfig, override?: MenuArrowConfig): MenuArrowConfig {
  if (!override) return base;
  return {
    expandIcon: override.expandIcon ?? base.expandIcon,
    arrowRotate: override.arrowRotate ?? base.arrowRotate,
    arrowRotateOpen: override.arrowRotateOpen ?? base.arrowRotateOpen,
    arrowVertical: override.arrowVertical ?? base.arrowVertical,
  };
}

function renderExpandIcon(
  config: MenuArrowConfig,
  open: boolean,
  isVerticalWriting: boolean
): ReactNode {
  const { expandIcon, arrowRotate, arrowRotateOpen, arrowVertical } = config;

  if (typeof expandIcon === 'function') {
    return expandIcon({ open, isVerticalWriting });
  }
  if (expandIcon != null) {
    return expandIcon;
  }

  const rotateClosed = arrowRotate ?? 0;
  const rotateOpen = arrowRotateOpen ?? 180;

  return (
    <ChevronRight
      vertical={arrowVertical ?? false}
      rotateForVertical={false}
      size="small"
      className="vertm-submenu__arrow"
      style={{
        transform: `rotate(${open ? rotateOpen : rotateClosed}deg)`,
        transition: 'transform var(--vertm-motion-duration-fast)',
      }}
    />
  );
}

function MenuItem({
  itemKey,
  icon,
  disabled = false,
  danger = false,
  className = '',
  style,
  children,
}: MenuItemProps) {
  const ctx = useMenuContext();
  const selected = ctx.selectedKeys.includes(itemKey);

  const handleClick = () => {
    if (disabled) return;
    ctx.selectKey(itemKey, [...ctx.keyPathPrefix, itemKey]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusSiblingMenuControl(e.currentTarget, 1);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusSiblingMenuControl(e.currentTarget, -1);
      return;
    }
    // Nested items live under a portalled popup; ArrowLeft closes that level.
    if (e.key === 'ArrowLeft') {
      const parentKey = ctx.keyPathPrefix[ctx.keyPathPrefix.length - 1];
      if (!parentKey) return;
      e.preventDefault();
      if (ctx.openKeys.includes(parentKey)) ctx.toggleOpenKey(parentKey);
      document
        .querySelector<HTMLElement>(
          `.vertm-submenu[data-menu-key="${CSS.escape(parentKey)}"] > .vertm-submenu__title`
        )
        ?.focus();
    }
  };

  return (
    <li
      role="menuitem"
      aria-disabled={disabled || undefined}
      aria-selected={selected || undefined}
      tabIndex={disabled ? -1 : 0}
      className={[
        'vertm-menu-item',
        selected && 'vertm-menu-item--selected',
        disabled && 'vertm-menu-item--disabled',
        danger && 'vertm-menu-item--danger',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      data-menu-key={itemKey}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {icon && <span className="vertm-menu-item__icon">{icon}</span>}
      <span className="vertm-menu-item__label">{renderLabel(children)}</span>
    </li>
  );
}

function SubMenu({
  itemKey,
  title,
  icon,
  disabled = false,
  popupPlacement,
  expandIcon,
  arrowRotate,
  arrowRotateOpen,
  arrowVertical,
  className = '',
  style,
  children,
}: SubMenuProps) {
  const ctx = useMenuContext();
  const config = useVertMConfig();
  const open = ctx.openKeys.includes(itemKey);
  const triggerRef = useRef<HTMLLIElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number>();
  const openedByHoverRef = useRef(false);
  const focusChildOnOpenRef = useRef(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const arrowConfig = mergeArrowConfig(ctx.arrow, {
    expandIcon,
    arrowRotate,
    arrowRotateOpen,
    arrowVertical,
  });

  const placement = resolveSubMenuPlacement(
    ctx.isVerticalWriting,
    ctx.mode,
    popupPlacement ?? ctx.defaultPopupPlacement
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

  useLayoutEffect(() => {
    if (!open || disabled) return;
    updatePosition();
    const id = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(id);
  }, [open, disabled, updatePosition, children]);

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

  const openSubMenu = () => {
    if (disabled) return;
    if (!ctx.openKeys.includes(itemKey)) ctx.toggleOpenKey(itemKey);
  };

  const closeSubMenu = () => {
    openedByHoverRef.current = false;
    if (ctx.openKeys.includes(itemKey)) ctx.toggleOpenKey(itemKey);
  };

  const handleTitleMouseEnter = () => {
    if (disabled) return;
    if (!ctx.openKeys.includes(itemKey)) openedByHoverRef.current = true;
    openSubMenu();
  };

  const scheduleClose = () => {
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(closeSubMenu, POPUP_CLOSE_DELAY);
  };

  const cancelClose = () => {
    window.clearTimeout(closeTimerRef.current);
  };

  const handleToggle = () => {
    if (disabled) return;
    // A mouse click is preceded by mouseenter, which already opened the popup.
    // Collapsing here would make the submenu impossible to open by clicking.
    if (openedByHoverRef.current) {
      openedByHoverRef.current = false;
      return;
    }
    ctx.toggleOpenKey(itemKey);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    if (disabled) return;
    const target = (e.target as HTMLElement).closest<HTMLElement>(
      '.vertm-submenu__title, [role="menuitem"]'
    );
    const focusFrom = target ?? e.currentTarget.querySelector<HTMLElement>('.vertm-submenu__title');

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
      return;
    }
    if (e.key === 'ArrowDown' && focusFrom) {
      e.preventDefault();
      focusSiblingMenuControl(focusFrom, 1);
      return;
    }
    if (e.key === 'ArrowUp' && focusFrom) {
      e.preventDefault();
      focusSiblingMenuControl(focusFrom, -1);
      return;
    }
    if (e.key === 'ArrowRight' && !open) {
      e.preventDefault();
      focusChildOnOpenRef.current = true;
      openSubMenu();
      return;
    }
    if (e.key === 'ArrowLeft' && open) {
      e.preventDefault();
      closeSubMenu();
      triggerRef.current?.querySelector<HTMLElement>('.vertm-submenu__title')?.focus();
    }
  };

  useEffect(() => {
    if (!open || !focusChildOnOpenRef.current) return;
    focusChildOnOpenRef.current = false;
    // Portal content mounts after open flips; wait a frame for the list.
    const id = requestAnimationFrame(() => {
      focusFirstMenuControl(popupRef.current);
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  const titleNode = (
    <div
      className="vertm-submenu__title"
      onClick={handleToggle}
      role="button"
      aria-expanded={open}
      aria-haspopup="menu"
      tabIndex={disabled ? -1 : 0}
      onMouseEnter={handleTitleMouseEnter}
      onMouseLeave={scheduleClose}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          handleToggle();
        }
        // Arrow keys bubble to the submenu li handler.
      }}
    >
      {icon && <span className="vertm-menu-item__icon">{icon}</span>}
      <span className="vertm-menu-item__label">{renderLabel(title)}</span>
      {renderExpandIcon(arrowConfig, open, ctx.isVerticalWriting)}
    </div>
  );

  const popup =
    open &&
    !disabled && (
      <Portal container={config.getPopupContainer}>
        <MenuContext.Provider
          value={{ ...ctx, keyPathPrefix: [...ctx.keyPathPrefix, itemKey] }}
        >
          <div
            ref={popupRef}
            className="vertm-menu vertm-menu--popup vertm-menu--vertical"
            data-vertical-writing={ctx.isVerticalWriting || undefined}
            style={{
              position: 'fixed',
              top: pos.top,
              left: pos.left,
              zIndex: config.theme.zIndexPopup,
            }}
            role="menu"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <ul className="vertm-menu__list">{children}</ul>
          </div>
        </MenuContext.Provider>
      </Portal>
    );

  return (
    <li
      ref={triggerRef}
      className={[
        'vertm-submenu',
        open && 'vertm-submenu--open',
        disabled && 'vertm-submenu--disabled',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      data-menu-key={itemKey}
      onKeyDown={handleKeyDown}
    >
      {titleNode}
      {popup}
    </li>
  );
}

function renderItems(items: MenuItemType[]): ReactNode {
  return items.map((item) => {
    if (item.type === 'divider') {
      return <li key={item.key} className="vertm-menu-item-divider" role="separator" />;
    }
    if (item.children && item.children.length > 0) {
      return (
        <SubMenu
          key={item.key}
          itemKey={item.key}
          title={item.label}
          icon={item.icon}
          disabled={item.disabled}
          popupPlacement={item.popupPlacement}
          expandIcon={item.expandIcon}
          arrowRotate={item.arrowRotate}
          arrowRotateOpen={item.arrowRotateOpen}
          arrowVertical={item.arrowVertical}
        >
          {renderItems(item.children)}
        </SubMenu>
      );
    }
    return (
      <MenuItem
        key={item.key}
        itemKey={item.key}
        icon={item.icon}
        disabled={item.disabled}
        danger={item.danger}
      >
        {item.label}
      </MenuItem>
    );
  });
}

function MenuBase({
  mode = 'vertical',
  selectedKeys,
  defaultSelectedKeys = [],
  openKeys,
  defaultOpenKeys = [],
  onSelect,
  onOpenChange,
  defaultPopupPlacement,
  expandIcon,
  arrowRotate,
  arrowRotateOpen,
  arrowVertical,
  items,
  className = '',
  style,
  children,
}: MenuProps) {
  const isVerticalWriting = useIsVertical();
  const [selected, setSelected] = useControlled(selectedKeys, defaultSelectedKeys);
  const [open, setOpen] = useControlled(openKeys, defaultOpenKeys, onOpenChange);
  const inline = mode === 'inline';

  const selectKey = useCallback(
    (key: string, keyPath: string[]) => {
      setSelected([key]);
      onSelect?.({ key, keyPath });
    },
    [onSelect, setSelected]
  );

  const toggleOpenKey = useCallback(
    (key: string) => {
      const next = open.includes(key) ? open.filter((k) => k !== key) : [...open, key];
      setOpen(next);
    },
    [open, setOpen]
  );

  const ctx: MenuContextValue = {
    mode,
    selectedKeys: selected,
    openKeys: open,
    toggleOpenKey,
    selectKey,
    inline,
    isVerticalWriting,
    keyPathPrefix: [],
    defaultPopupPlacement,
    arrow: { expandIcon, arrowRotate, arrowRotateOpen, arrowVertical },
  };

  const modeClass =
    mode === 'horizontal'
      ? 'vertm-menu--horizontal'
      : mode === 'inline'
        ? 'vertm-menu--inline'
        : 'vertm-menu--vertical';

  return (
    <MenuContext.Provider value={ctx}>
      <nav
        className={`vertm-menu ${modeClass} ${className}`.trim()}
        style={style}
        role="menu"
        data-vertical-writing={isVerticalWriting || undefined}
      >
        <ul className="vertm-menu__list">
          {items ? renderItems(items) : children}
        </ul>
      </nav>
    </MenuContext.Provider>
  );
}

export type { MenuItemType, MenuArrowConfig, MenuExpandIconRender };

export const VertMMenu = Object.assign(MenuBase, {
  Item: MenuItem,
  SubMenu,
});
