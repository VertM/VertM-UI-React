import { Children, type CSSProperties, type ReactNode } from 'react';
import { useVertMConfig, useIsVertical } from '../config/context.js';
import type { VertMSize } from '@vertm/tokens';

export type SpaceSize = VertMSize | number;
export type SpaceDirection = 'vertical' | 'horizontal';

export interface SpaceProps {
  /** 间距内的子元素 */
  children?: ReactNode;
  /** 间距大小，未设时跟随 ConfigProvider；可为 [水平, 垂直] */
  size?: SpaceSize | [SpaceSize, SpaceSize];
  /** 排列方向；未设时竖排为 vertical，横排为 horizontal */
  direction?: SpaceDirection;
  /** 是否自动换行 @default false */
  wrap?: boolean;
  /** 分隔符，插在相邻子元素之间 */
  split?: ReactNode;
  /** 交叉轴对齐方式 @default 'center' */
  align?: 'start' | 'end' | 'center' | 'baseline';
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

const GAP_MAP: Record<VertMSize, number> = {
  small: 8,
  middle: 16,
  large: 24,
};

function resolveGap(size: SpaceSize): number {
  return typeof size === 'number' ? size : GAP_MAP[size];
}

export function VertMSpace({
  children,
  size,
  direction,
  wrap = false,
  split,
  align = 'center',
  className = '',
  style,
}: SpaceProps) {
  const config = useVertMConfig();
  const isVertical = useIsVertical();
  const resolvedDirection = direction ?? (isVertical ? 'vertical' : 'horizontal');
  const gapSize = size ?? config.size;
  const gap = Array.isArray(gapSize)
    ? `${resolveGap(gapSize[1])}px ${resolveGap(gapSize[0])}px`
    : `${resolveGap(gapSize)}px`;

  const items = Children.toArray(children).filter(Boolean);

  return (
    <div
      className={`vertm-space vertm-space--${resolvedDirection} ${className}`.trim()}
      style={{ gap, flexWrap: wrap ? 'wrap' : undefined, alignItems: align, ...style }}
      role="group"
    >
      {items.map((child, i) => (
        <span key={i} className="vertm-space__item">
          {child}
          {split && i < items.length - 1 && (
            <span className="vertm-space__split">{split}</span>
          )}
        </span>
      ))}
    </div>
  );
}
