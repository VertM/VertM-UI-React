import { type CSSProperties } from 'react';
import { useIsVertical } from '../config/context.js';
import { VertMText } from '../VertMText.js';

export type ProgressStatus = 'success' | 'exception' | 'normal' | 'active';

export interface ProgressProps {
  /** 进度百分比 0–100 @default 0 */
  percent?: number;
  /** 进度条类型 @default 'line' */
  type?: 'line' | 'circle';
  /** 状态样式 @default 'normal' */
  status?: ProgressStatus;
  /** 分段进度条的段数 */
  steps?: number;
  /** 是否显示进度数值 @default true */
  showInfo?: boolean;
  /** 进度条颜色 */
  strokeColor?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

export function VertMProgress({
  percent = 0,
  type = 'line',
  status = 'normal',
  steps,
  showInfo = true,
  strokeColor,
  className = '',
  style,
}: ProgressProps) {
  const isVertical = useIsVertical();
  const clamped = Math.min(100, Math.max(0, percent));

  if (type === 'circle') {
    const r = 40;
    const c = 2 * Math.PI * r;
    const offset = c - (clamped / 100) * c;
    return (
      <div className={`vertm-progress vertm-progress--circle ${className}`.trim()} style={style}>
        <svg viewBox="0 0 100 100" className="vertm-progress__svg">
          <circle cx="50" cy="50" r={r} className="vertm-progress__track" />
          <circle
            cx="50"
            cy="50"
            r={r}
            className={`vertm-progress__bar vertm-progress__bar--${status}`}
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={strokeColor ? { stroke: strokeColor } : undefined}
          />
        </svg>
        {showInfo && <span className="vertm-progress__text">{clamped}%</span>}
      </div>
    );
  }

  if (steps) {
    const stepPct = 100 / steps;
    return (
      <div className={`vertm-progress vertm-progress--steps vertm-vertical ${className}`.trim()} style={style}>
        {Array.from({ length: steps }, (_, i) => (
          <span
            key={i}
            className={`vertm-progress__step ${clamped >= (i + 1) * stepPct ? 'vertm-progress__step--active' : ''}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`vertm-progress vertm-progress--line ${isVertical ? 'vertm-progress--vertical' : ''} ${className}`.trim()}
      style={style}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="vertm-progress__outer">
        <div
          className={`vertm-progress__inner vertm-progress__inner--${status}`}
          style={{ [isVertical ? 'height' : 'width']: `${clamped}%`, background: strokeColor }}
        />
      </div>
      {showInfo && (
        <span className="vertm-progress__text">
          <VertMText as="span" text={`${clamped}%`} />
        </span>
      )}
    </div>
  );
}
