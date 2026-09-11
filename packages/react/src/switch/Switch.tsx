import {
  useRef,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import { Loading } from '@vertm/icons';
import { normalizeMongolianText } from '@vertm/core';
import { useControlled } from '../hooks/useControlled.js';
import { useIsVertical } from '../config/context.js';

const HANDLE_SIZE = { default: 16, small: 10 } as const;
const HANDLE_INSET = 2;
const TEXT_INSET = 2;
const ZONE_GAP = 2;
/** Extra inline padding — Mongolian glyphs can extend past offsetWidth. */
const GLYPH_PAD = 3;

function measureLabel(el: HTMLElement | null): { w: number; h: number } {
  if (!el) return { w: 0, h: 0 };
  const label = el.querySelector<HTMLElement>('.vertm-switch__label') ?? el;
  const rect = label.getBoundingClientRect();
  return {
    w: Math.ceil(Math.max(rect.width, label.scrollWidth)),
    h: Math.ceil(Math.max(rect.height, label.scrollHeight)),
  };
}

export interface SwitchProps {
  /** 受控开关状态 */
  checked?: boolean;
  /** 非受控初始状态 @default false */
  defaultChecked?: boolean;
  /** 状态变化回调 */
  onChange?: (checked: boolean) => void;
  /** 载入中，禁用切换 @default false */
  loading?: boolean;
  /** 是否禁用 @default false */
  disabled?: boolean;
  /** 开关尺寸 @default 'default' */
  size?: 'small' | 'default';
  /** 打开时显示的内容 */
  checkedChildren?: ReactNode;
  /** 关闭时显示的内容 */
  unCheckedChildren?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

function renderSwitchLabel(node: ReactNode) {
  if (node == null) return null;
  if (typeof node === 'string') {
    return (
      <span className="vertm-switch__label">{normalizeMongolianText(node).trim()}</span>
    );
  }
  return node;
}

export function VertMSwitch({
  checked,
  defaultChecked = false,
  onChange,
  loading = false,
  disabled = false,
  size = 'default',
  checkedChildren,
  unCheckedChildren,
  className = '',
  style,
}: SwitchProps) {
  const vertical = useIsVertical();
  const [isChecked, setChecked] = useControlled(checked, defaultChecked, onChange);
  const isDisabled = disabled || loading;
  const hasText = checkedChildren != null || unCheckedChildren != null;
  const checkedRef = useRef<HTMLSpanElement>(null);
  const uncheckedRef = useRef<HTMLSpanElement>(null);
  const [metrics, setMetrics] = useState<{
    width: number;
    height: number;
    travel: number;
  } | null>(null);

  useLayoutEffect(() => {
    if (!hasText) {
      setMetrics(null);
      return;
    }

    const measure = () => {
      const handle = HANDLE_SIZE[size];
      const checked = measureLabel(checkedRef.current);
      const unchecked = measureLabel(uncheckedRef.current);
      const textW = Math.max(checked.w, unchecked.w);
      const textH = Math.max(checked.h, unchecked.h);

      if (textW === 0 && textH === 0) return;

      if (vertical) {
        const textZone = textH + TEXT_INSET * 2;
        const width = Math.max(textW + TEXT_INSET * 2 + GLYPH_PAD, handle + HANDLE_INSET * 2);
        const height = HANDLE_INSET + handle + ZONE_GAP + textZone + HANDLE_INSET;
        const travel = textZone + ZONE_GAP;
        setMetrics({ width, height, travel });
        return;
      }

      const textZone = textW + TEXT_INSET * 2;
      const height = Math.max(textH + TEXT_INSET * 2, handle + HANDLE_INSET * 2);
      const width = Math.max(
        HANDLE_INSET + handle + ZONE_GAP + textZone + HANDLE_INSET + GLYPH_PAD,
        handle + HANDLE_INSET * 2
      );
      const travel = textZone + ZONE_GAP;
      setMetrics({ width, height, travel });
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (checkedRef.current) observer.observe(checkedRef.current);
    if (uncheckedRef.current) observer.observe(uncheckedRef.current);

    return () => observer.disconnect();
  }, [hasText, vertical, size, checkedChildren, unCheckedChildren]);

  const switchStyle = useMemo<CSSProperties>(() => {
    if (!metrics) return style ?? {};

    return {
      ...style,
      width: metrics.width,
      minWidth: metrics.width,
      height: metrics.height,
      minHeight: metrics.height,
      borderRadius: vertical ? metrics.width / 2 : metrics.height / 2,
      ['--vertm-switch-travel' as string]: `${metrics.travel}px`,
      ['--vertm-switch-handle' as string]: `${HANDLE_SIZE[size]}px`,
    };
  }, [style, metrics, vertical]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setChecked(!isChecked);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={isDisabled}
      className={[
        'vertm-switch',
        vertical && 'vertm-switch--vertical',
        `vertm-switch--${size}`,
        isChecked && 'vertm-switch--checked',
        loading && 'vertm-switch--loading',
        hasText && 'vertm-switch--with-text',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={switchStyle}
      onClick={() => !isDisabled && setChecked(!isChecked)}
      onKeyDown={handleKeyDown}
    >
      {hasText && (
        <span className="vertm-switch__measure" aria-hidden>
          {checkedChildren != null && (
            <span ref={checkedRef} className="vertm-switch__measure-item">
              {renderSwitchLabel(checkedChildren)}
            </span>
          )}
          {unCheckedChildren != null && (
            <span ref={uncheckedRef} className="vertm-switch__measure-item">
              {renderSwitchLabel(unCheckedChildren)}
            </span>
          )}
        </span>
      )}
      <span className="vertm-switch__handle">
        {loading && <Loading spin size="small" vertical={vertical} />}
      </span>
      {(checkedChildren || unCheckedChildren) && (
        <span className="vertm-switch__inner" aria-hidden>
          <span className="vertm-switch__label-area">
            {checkedChildren != null && (
              <span className="vertm-switch__text vertm-switch__text--checked">
                {renderSwitchLabel(checkedChildren)}
              </span>
            )}
            {unCheckedChildren != null && (
              <span className="vertm-switch__text vertm-switch__text--unchecked">
                {renderSwitchLabel(unCheckedChildren)}
              </span>
            )}
          </span>
        </span>
      )}
    </button>
  );
}
