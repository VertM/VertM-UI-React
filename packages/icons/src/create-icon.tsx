import { createElement, type CSSProperties, type SVGProps } from 'react';

export type IconSize = number | 'small' | 'middle' | 'large';

const SIZE_MAP: Record<Exclude<IconSize, number>, number> = {
  small: 14,
  middle: 16,
  large: 20,
};

export interface VertMIconProps extends Omit<SVGProps<SVGSVGElement>, 'color'> {
  /** 图标尺寸（px 或预设） @default 'middle' */
  size?: IconSize;
  /** 图标颜色 @default 'currentColor' */
  color?: string;
  /** 是否旋转动画（加载态） @default false */
  spin?: boolean;
  /**
   * 竖排时是否将方向性图标旋转 90°
   * @default true
   */
  rotateForVertical?: boolean;
  /** 当前书写模式是否为竖排 @default false */
  vertical?: boolean;
}

export interface IconDefinition {
  name: string;
  /** Whether this icon has a directional meaning (arrow, chevron, etc.). */
  directional?: boolean;
  viewBox?: string;
  paths: string | string[];
}

export function resolveIconSize(size: IconSize = 'middle'): number {
  return typeof size === 'number' ? size : SIZE_MAP[size];
}

export function createIconComponent(def: IconDefinition) {
  const { name, directional = false, viewBox = '0 0 24 24', paths } = def;
  const pathList = Array.isArray(paths) ? paths : [paths];

  function Icon({
    size = 'middle',
    color,
    spin = false,
    rotateForVertical = true,
    vertical = false,
    className = '',
    style,
    ...rest
  }: VertMIconProps) {
    const px = resolveIconSize(size);
    const shouldRotate = directional && rotateForVertical && vertical;

    const iconStyle: CSSProperties = {
      display: 'inline-block',
      width: px,
      height: px,
      color: color ?? 'currentColor',
      fill: 'currentColor',
      verticalAlign: '-0.125em',
      transform: shouldRotate ? 'rotate(90deg)' : undefined,
      animation: spin ? 'vertm-icon-spin 1s linear infinite' : undefined,
      ...style,
    };

    return createElement(
      'svg',
      {
        ...rest,
        className: `vertm-icon vertm-icon-${name} ${className}`.trim(),
        viewBox,
        width: px,
        height: px,
        style: iconStyle,
        'aria-hidden': rest['aria-hidden'] ?? true,
        focusable: 'false',
      },
      pathList.map((d, i) =>
        createElement('path', { key: i, d, fill: 'currentColor' })
      )
    );
  }

  Icon.displayName = `VertMIcon(${name})`;
  return Icon;
}
