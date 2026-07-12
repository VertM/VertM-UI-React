import { createElement, type CSSProperties, type SVGProps } from 'react';

export type IconSize = number | 'small' | 'middle' | 'large';

const SIZE_MAP: Record<Exclude<IconSize, number>, number> = {
  small: 14,
  middle: 16,
  large: 20,
};

export interface VertMIconProps extends Omit<SVGProps<SVGSVGElement>, 'color'> {
  /** Icon size in px or preset. */
  size?: IconSize;
  /** Icon color; defaults to `currentColor`. */
  color?: string;
  /** Enable spin animation (for loading states). */
  spin?: boolean;
  /**
   * Rotate directional icons 90° for vertical-lr layout.
   * @default true when used inside VertM vertical context.
   */
  rotateForVertical?: boolean;
  /** Whether the current writing mode is vertical. */
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
