import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { useIsVertical } from '../config/context.js';
import { VertMText } from '../VertMText.js';

export interface StatisticProps {
  /** 统计标题 */
  title?: ReactNode;
  /** 统计数值 */
  value?: ReactNode;
  /** 数值前缀 */
  prefix?: ReactNode;
  /** 数值后缀 */
  suffix?: ReactNode;
  /** 数值精度（小数位数） */
  precision?: number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

export interface CountdownProps {
  /** 目标时间戳或 Date */
  value: number | Date;
  /** 倒计时格式 */
  format?: string;
  /** 倒计时结束回调 */
  onFinish?: () => void;
  /** 数值前缀 */
  prefix?: ReactNode;
  /** 数值后缀 */
  suffix?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

function renderNode(node: ReactNode, className: string): ReactNode {
  return typeof node === 'string' ? <VertMText as="span" text={node} className={className} /> : node;
}

function formatValue(value: ReactNode, precision?: number): ReactNode {
  if (typeof value === 'number' && precision != null) {
    return value.toFixed(precision);
  }
  return value;
}

function StatisticBase({
  title,
  value,
  prefix,
  suffix,
  precision,
  className = '',
  style,
}: StatisticProps) {
  const isVerticalWriting = useIsVertical();
  const display = formatValue(value ?? 0, precision);

  return (
    <div
      className={`vertm-statistic ${className}`.trim()}
      style={style}
      data-vertical-writing={isVerticalWriting || undefined}
    >
      {title != null && (
        <div className="vertm-statistic__title">{renderNode(title, 'vertm-statistic__text')}</div>
      )}
      <div className="vertm-statistic__content">
        {prefix && <span className="vertm-statistic__prefix">{prefix}</span>}
        <span className="vertm-statistic__value">
          {typeof display === 'number' || typeof display === 'string' ? (
            <VertMText as="span" text={String(display)} className="vertm-statistic__text" raw />
          ) : (
            display
          )}
        </span>
        {suffix && <span className="vertm-statistic__suffix">{suffix}</span>}
      </div>
    </div>
  );
}

function Countdown({
  value,
  onFinish,
  prefix,
  suffix,
  className = '',
  style,
}: CountdownProps) {
  const isVerticalWriting = useIsVertical();
  const target = value instanceof Date ? value.getTime() : value;
  const [remaining, setRemaining] = useState(() => Math.max(0, target - Date.now()));

  useEffect(() => {
    const tick = () => {
      const next = Math.max(0, target - Date.now());
      setRemaining(next);
      if (next <= 0) onFinish?.();
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target, onFinish]);

  const totalSec = Math.ceil(remaining / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const text = [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');

  return (
    <div
      className={`vertm-statistic vertm-statistic--countdown ${className}`.trim()}
      style={style}
      data-vertical-writing={isVerticalWriting || undefined}
    >
      <div className="vertm-statistic__content">
        {prefix && <span className="vertm-statistic__prefix">{prefix}</span>}
        <span className="vertm-statistic__value">
          <VertMText as="span" text={text} className="vertm-statistic__text" raw />
        </span>
        {suffix && <span className="vertm-statistic__suffix">{suffix}</span>}
      </div>
    </div>
  );
}

export const VertMStatistic = Object.assign(StatisticBase, { Countdown });
