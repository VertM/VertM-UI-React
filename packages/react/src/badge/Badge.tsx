import { type CSSProperties, type ReactNode } from 'react';
import { useIsVertical } from '../config/context.js';
import { VertMText } from '../VertMText.js';

export type BadgeStatus = 'success' | 'processing' | 'default' | 'error' | 'warning';

export interface BadgeProps {
  /** 展示的数字或自定义节点 */
  count?: ReactNode;
  /** 不展示数字，仅显示小红点 @default false */
  dot?: boolean;
  /** 为 0 时是否显示数字 @default false */
  showZero?: boolean;
  /** 封顶数字，超出显示为 `${overflowCount}+` @default 99 */
  overflowCount?: number;
  /** 状态点类型（独立使用时） */
  status?: BadgeStatus;
  /** 状态点旁的文字 */
  text?: ReactNode;
  /** 徽标相对位置偏移 [x, y] */
  offset?: [number, number];
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 被包裹的子元素 */
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
