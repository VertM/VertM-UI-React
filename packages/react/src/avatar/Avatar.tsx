import { Children, useState, type CSSProperties, type ReactNode } from 'react';
import { VertMText } from '../VertMText.js';

export type AvatarSize = 'small' | 'default' | 'large' | number;
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps {
  size?: AvatarSize;
  shape?: AvatarShape;
  src?: string;
  alt?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface AvatarGroupProps {
  children?: ReactNode;
  maxCount?: number;
  size?: AvatarSize;
  className?: string;
  style?: CSSProperties;
}

const SIZE_MAP: Record<'small' | 'default' | 'large', number> = {
  small: 24,
  default: 32,
  large: 40,
};

function resolveSize(size: AvatarSize = 'default'): number {
  return typeof size === 'number' ? size : SIZE_MAP[size];
}

function AvatarBase({
  size = 'default',
  shape = 'circle',
  src,
  alt = '',
  icon,
  children,
  className = '',
  style,
}: AvatarProps) {
  const px = resolveSize(size);
  const [failed, setFailed] = useState(false);

  const showImage = src && !failed;
  const textChild = typeof children === 'string' ? children.slice(0, 2) : children;

  return (
    <span
      className={['vertm-avatar', `vertm-avatar--${shape}`, className].filter(Boolean).join(' ')}
      style={{ width: px, height: px, fontSize: px * 0.45, ...style }}
    >
      {showImage ? (
        <img src={src} alt={alt} className="vertm-avatar__img" onError={() => setFailed(true)} />
      ) : icon ? (
        <span className="vertm-avatar__icon">{icon}</span>
      ) : typeof children === 'string' ? (
        <VertMText as="span" text={textChild as string} className="vertm-avatar__text" inheritTypography />
      ) : (
        textChild
      )}
    </span>
  );
}

function AvatarGroup({ children, maxCount, size = 'default', className = '', style }: AvatarGroupProps) {
  const items = Children.toArray(children);
  const visible = maxCount != null && items.length > maxCount ? items.slice(0, maxCount) : items;
  const rest = maxCount != null && items.length > maxCount ? items.length - maxCount : 0;
  const px = resolveSize(size);

  return (
    <div className={`vertm-avatar-group ${className}`.trim()} style={style}>
      {visible}
      {rest > 0 && (
        <span
          className="vertm-avatar vertm-avatar--circle vertm-avatar--overflow"
          style={{ width: px, height: px, fontSize: px * 0.4 }}
        >
          +{rest}
        </span>
      )}
    </div>
  );
}

export const VertMAvatar = Object.assign(AvatarBase, { Group: AvatarGroup });
