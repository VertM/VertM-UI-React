import { useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent } from 'react';
import { useControlled } from '../hooks/useControlled.js';
import { VertMText } from '../VertMText.js';

export interface CheckboxProps {
  /** 受控选中状态 */
  checked?: boolean;
  /** 非受控初始选中状态 @default false */
  defaultChecked?: boolean;
  /** 选中状态变化回调 */
  onChange?: (checked: boolean) => void;
  /** 半选外观（不影响 checked） @default false */
  indeterminate?: boolean;
  /** 是否禁用 @default false */
  disabled?: boolean;
  /** 选项标签内容 */
  children?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

export function VertMCheckbox({
  checked,
  defaultChecked = false,
  onChange,
  indeterminate = false,
  disabled = false,
  children,
  className = '',
  style,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isChecked, setChecked] = useControlled(checked, defaultChecked, onChange);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate, isChecked]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <label
      className={`vertm-checkbox vertm-vertical ${disabled ? 'vertm-checkbox--disabled' : ''} ${className}`.trim()}
      style={style}
    >
      <input
        ref={inputRef}
        type="checkbox"
        className="vertm-checkbox__input"
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
      />
      <span className="vertm-checkbox__box" aria-hidden />
      {children && (
        <span className="vertm-checkbox__label">
          {typeof children === 'string' ? <VertMText as="span" text={children} /> : children}
        </span>
      )}
    </label>
  );
}

export interface CheckboxOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /** 选项列表 @default [] */
  options?: CheckboxOption[];
  /** 受控选中值数组 */
  value?: string[];
  /** 非受控初始选中值 @default [] */
  defaultValue?: string[];
  /** 选中值变化回调 */
  onChange?: (value: string[]) => void;
  /** 是否整组禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
}

export function CheckboxGroup({
  options = [],
  value,
  defaultValue = [],
  onChange,
  disabled,
  className = '',
}: CheckboxGroupProps) {
  const [selected, setSelected] = useControlled(value, defaultValue, onChange);

  const toggle = (val: string, nextChecked: boolean) => {
    const next = nextChecked
      ? selected.includes(val)
        ? selected
        : [...selected, val]
      : selected.filter((v) => v !== val);
    setSelected(next);
  };

  return (
    <div className={`vertm-checkbox-group vertm-vertical ${className}`.trim()} role="group">
      {options.map((opt) => (
        <VertMCheckbox
          key={opt.value}
          checked={selected.includes(opt.value)}
          disabled={disabled || opt.disabled}
          onChange={(nextChecked) => toggle(opt.value, nextChecked)}
        >
          {opt.label}
        </VertMCheckbox>
      ))}
    </div>
  );
}

VertMCheckbox.Group = CheckboxGroup;
