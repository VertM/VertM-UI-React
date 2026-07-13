import { type CSSProperties, type ReactNode } from 'react';
import { useIsVertical } from '../config/context.js';
import { VertMText } from '../VertMText.js';

export type BadgeStatus = 'success' | 'processing' | 'default' | 'error' | 'warning';

export interface BadgeProps {
  count?: ReactNode;
  dot?: boolean;
  showZero?: boolean;
  overflowCount?: number;
  status?: BadgeStatus;
  text?: ReactNode;
  offset?: [number, number];
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const STATUS_COLOR: Record<BadgeStatus, string> = {
  success: 'var(--vertm-color-success)',
  processing: 'var(--vertm-color-primary)',
  default: 'var(--vertm-color-text-secondary)',
  error: 'var(--vertm-color-error)',
  warning: 'var(--vertm-color-warning)',
};

export function VertMBadge({
  count,
  dot = false,
  showZero = false,
  overflowCount = 99,
  status,
  text,
  offset,
  className = '',
  style,
  children,
}: BadgeProps) {
  const isVerticalWriting = useIsVertical();
  const hasCount = count != null && (showZero || count !== 0 && count !== '0');
  const showIndicator = dot || hasCount || status != null;

  let displayCount: ReactNode = count;
  if (typeof count === 'number' && count > overflowCount) {
    displayCount = `${overflowCount}+`;
  }

  const offsetStyle =
    offset != null
      ? ({
          '--vertm-badge-offset-x': `${offset[0]}px`,
          '--vertm-badge-offset-y': `${offset[1]}px`,
        } as CSSProperties)
      : undefined;

  if (!children && (status || text)) {
    return (
      <span
        className={`vertm-badge vertm-badge--standalone ${className}`.trim()}
        style={style}
        data-vertical-writing={isVerticalWriting || undefined}
      >
        {status && (
          <span
            className="vertm-badge__status-dot"
            style={{ background: STATUS_COLOR[status] }}
            aria-hidden
          />
        )}
        {text != null && (
          <span className="vertm-badge__status-text">
            {typeof text === 'string' ? <VertMText as="span" text={text} /> : text}
          </span>
        )}
      </span>
    );
  }

  return (
    <span
      className={`vertm-badge ${className}`.trim()}
      style={{ ...offsetStyle, ...style }}
      data-vertical-writing={isVerticalWriting || undefined}
    >
      {children}
      {showIndicator && (
        <sup
          className={[
            'vertm-badge__indicator',
            dot && 'vertm-badge__indicator--dot',
            status && 'vertm-badge__indicator--status',
          ]
            .filter(Boolean)
            .join(' ')}
          style={status ? { background: STATUS_COLOR[status] } : undefined}
        >
          {!dot && hasCount ? displayCount : null}
        </sup>
      )}
    </span>
  );
}
