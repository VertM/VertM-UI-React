import { type ReactNode, type CSSProperties, type ChangeEvent } from 'react';
import { useControlled } from '../hooks/useControlled.js';
import { VertMText } from '../VertMText.js';

export interface RadioProps {
  checked?: boolean;
  defaultChecked?: boolean;
  value?: string;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function VertMRadio({
  checked,
  defaultChecked = false,
  value,
  disabled = false,
  children,
  className = '',
  style,
  onChange,
}: RadioProps) {
  return (
    <label
      className={`vertm-radio vertm-vertical ${disabled ? 'vertm-radio--disabled' : ''} ${className}`.trim()}
      style={style}
    >
      <input
        type="radio"
        className="vertm-radio__input"
        {...(checked !== undefined
          ? { checked }
          : { defaultChecked })}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
      <span className="vertm-radio__dot" aria-hidden />
      {children && (
        <span className="vertm-radio__label">
          {typeof children === 'string' ? <VertMText as="span" text={children} /> : children}
        </span>
      )}
    </label>
  );
}

export interface RadioOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options?: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  optionType?: 'default' | 'button';
  className?: string;
}

export function RadioGroup({
  options = [],
  value,
  defaultValue = '',
  onChange,
  disabled,
  optionType = 'default',
  className = '',
}: RadioGroupProps) {
  const [selected, setSelected] = useControlled(value, defaultValue, onChange);

  if (optionType === 'button') {
    return (
      <div className={`vertm-radio-group vertm-radio-group--button vertm-vertical ${className}`.trim()} role="radiogroup">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected === opt.value}
            disabled={disabled || opt.disabled}
            className={`vertm-radio-button ${selected === opt.value ? 'vertm-radio-button--checked' : ''}`}
            onClick={() => setSelected(opt.value)}
          >
            {typeof opt.label === 'string' ? <VertMText as="span" text={opt.label} /> : opt.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`vertm-radio-group vertm-vertical ${className}`.trim()} role="radiogroup">
      {options.map((opt) => (
        <VertMRadio
          key={opt.value}
          value={opt.value}
          checked={selected === opt.value}
          disabled={disabled || opt.disabled}
          onChange={() => setSelected(opt.value)}
        >
          {opt.label}
        </VertMRadio>
      ))}
    </div>
  );
}

VertMRadio.Group = RadioGroup;
VertMRadio.Button = function RadioButton() {
  return null; // marker — use Radio.Group optionType="button"
};
