import { Children, type CSSProperties, type ReactNode } from 'react';
import { useVertMConfig, useIsVertical } from '../config/context.js';
import type { VertMSize } from '@vertm/tokens';

export type SpaceSize = VertMSize | number;
export type SpaceDirection = 'vertical' | 'horizontal';

export interface SpaceProps {
  children?: ReactNode;
  size?: SpaceSize | [SpaceSize, SpaceSize];
  direction?: SpaceDirection;
  wrap?: boolean;
  split?: ReactNode;
  align?: 'start' | 'end' | 'center' | 'baseline';
  className?: string;
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
