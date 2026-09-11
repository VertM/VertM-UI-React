import { createContext, useContext, type ReactNode } from 'react';
import type { MenuMode } from './types.js';
import type { Placement } from '../overlay/placement.js';

export type MenuExpandIconRender = (info: {
  open: boolean;
  isVerticalWriting: boolean;
}) => ReactNode;

/** 箭头 / 展开图标配置（Menu 或 SubMenu 级） */
export interface MenuArrowConfig {
  /** 自定义展开图标；函数可接收 open 状态 */
  expandIcon?: ReactNode | MenuExpandIconRender;
  /** 收起时默认箭头旋转角度（度） */
  arrowRotate?: number;
  /** 展开时默认箭头旋转角度（度） */
  arrowRotateOpen?: number;
  /** 是否将 vertical 传给默认 ChevronRight 图标 */
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
