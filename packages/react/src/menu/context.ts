import { createContext, useContext, type ReactNode } from 'react';
import type { MenuMode } from './types.js';
import type { Placement } from '../overlay/placement.js';

export type MenuExpandIconRender = (info: {
  open: boolean;
  isVerticalWriting: boolean;
}) => ReactNode;

/** Arrow / expand icon configuration (Menu or SubMenu level). */
export interface MenuArrowConfig {
  /** Custom expand icon; function receives open state. */
  expandIcon?: ReactNode | MenuExpandIconRender;
  /** Default chevron rotation (deg) when closed. */
  arrowRotate?: number;
  /** Default chevron rotation (deg) when open. */
  arrowRotateOpen?: number;
  /** Pass `vertical` to the default ChevronRight icon. */
  arrowVertical?: boolean;
}

export interface MenuContextValue {
  mode: MenuMode;
  selectedKeys: string[];
  openKeys: string[];
  toggleOpenKey: (key: string) => void;
  selectKey: (key: string, keyPath: string[]) => void;
  inline: boolean;
  isVerticalWriting: boolean;
  keyPathPrefix: string[];
  arrow: MenuArrowConfig;
  defaultPopupPlacement?: Placement;
}

export const MenuContext = createContext<MenuContextValue | null>(null);

export function useMenuContext(): MenuContextValue {
  const ctx = useContext(MenuContext);
  if (!ctx) {
    throw new Error('Menu compound components must be used within VertMMenu');
  }
  return ctx;
}

export interface MenuItemType {
  key: string;
  label?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  /** `divider` renders a separator line (Dropdown / Menu). */
  type?: 'divider' | 'group';
  children?: MenuItemType[];
  expandIcon?: ReactNode | MenuExpandIconRender;
  arrowRotate?: number;
  arrowRotateOpen?: number;
  arrowVertical?: boolean;
  popupPlacement?: Placement;
}
