import { type CSSProperties, type ReactNode } from 'react';
import { useIsVertical } from '../config/context.js';
import { useControlled } from '../hooks/useControlled.js';
import { VertMText } from '../VertMText.js';

export interface SegmentedOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface SegmentedProps {
  /** 选项列表 @default [] */
  options?: SegmentedOption[];
  /** 受控选中值 */
  value?: string;
  /** 非受控初始值，默认取首项 */
  defaultValue?: string;
  /** 选中值变化回调 */
  onChange?: (value: string) => void;
  /** 是否撑满父容器宽度 @default false */
  block?: boolean;
  /** 是否禁用 @default false */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

function renderLabel(node: ReactNode): ReactNode {
  return typeof node === 'string' ? <VertMText as="span" text={node} className="vertm-segmented__text" /> : node;
}

export function VertMSegmented({
  options = [],
  value,
  defaultValue = options[0]?.value ?? '',
  onChange,
  block = false,
  disabled = false,
  className = '',
  style,
}: SegmentedProps) {
  const isVerticalWriting = useIsVertical();
  const [selected, setSelected] = useControlled(value, defaultValue, onChange);
  const activeIndex = Math.max(0, options.findIndex((o) => o.value === selected));

  return (
    <div
      className={[
        'vertm-segmented',
        block && 'vertm-segmented--block',
        disabled && 'vertm-segmented--disabled',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      role="tablist"
      data-vertical-writing={isVerticalWriting || undefined}
    >
      <div
        className="vertm-segmented__thumb"
        style={{ '--vertm-segmented-index': activeIndex, '--vertm-segmented-count': options.length } as CSSProperties}
        aria-hidden
      />
      {options.map((opt) => {
        const active = opt.value === selected;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={disabled || opt.disabled}
            className={[
              'vertm-segmented__item',
              active && 'vertm-segmented__item--active',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => setSelected(opt.value)}
          >
            {opt.icon && <span className="vertm-segmented__icon">{opt.icon}</span>}
            {renderLabel(opt.label)}
          </button>
        );
      })}
    </div>
  );
}
