import { forwardRef, useMemo, useState, useRef, useLayoutEffect, useEffect, useCallback, type ReactNode, type CSSProperties } from 'react';
import { Close, Search as SearchIcon, Eye, EyeInvisible } from '@vertm/icons';
import { useControlled } from '../hooks/useControlled.js';
import { useIsVertical } from '../config/context.js';
import { VertMTextField, type VertMTextFieldProps } from '../VertMTextField.js';
import { VertMText } from '../VertMText.js';
import { VertMButton } from '../button/Button.js';

export type InputStatus = 'error' | 'warning';

export interface InputProps extends Omit<VertMTextFieldProps, 'onChange'> {
  /** 受控值 */
  value?: string;
  /** 非受控初始值 @default '' */
  defaultValue?: string;
  /** 值变化回调，参数为 ChangeEvent */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 输入框前缀内容（行首侧） */
  prefix?: ReactNode;
  /** 输入框后缀内容（行尾侧） */
  suffix?: ReactNode;
  /** 前置标签，显示在输入框外侧前方 */
  addonBefore?: ReactNode;
  /** 后置标签，显示在输入框外侧后方 */
  addonAfter?: ReactNode;
  /** 有内容时显示清除按钮 */
  allowClear?: boolean;
  /** 最大输入字符数 */
  maxLength?: number;
  /** 校验状态样式（错误/警告） */
  status?: InputStatus;
  /** 是否显示字数统计 */
  showCount?: boolean;
  /** 提交前过滤输入值（如密码半角字符） */
  sanitize?: (value: string) => string;
  /** 非法输入被拒绝或剥离时触发 */
  onSanitizeReject?: () => void;
}

function extractChangeHandler(
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
) {
  return (value: string) => {
    onChange?.({
      target: { value },
    } as React.ChangeEvent<HTMLInputElement>);
  };
}

function useFieldWidth(enabled: boolean, deps: unknown[] = []) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [fieldWidth, setFieldWidth] = useState<number>();

  useLayoutEffect(() => {
    if (!enabled) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const field = wrap.querySelector<HTMLElement>('.vertm-input__field');
    if (!field) return;

    const sync = () => setFieldWidth(field.getBoundingClientRect().width);
    sync();

    const ro = new ResizeObserver(sync);
    ro.observe(field);
    return () => ro.disconnect();
  }, [enabled, ...deps]);

  const matchFieldStyle: CSSProperties | undefined =
    enabled && fieldWidth ? { width: fieldWidth, flexShrink: 0 } : undefined;

  return { wrapRef, matchFieldStyle };
}

const VertMInputBase = forwardRef<HTMLDivElement, InputProps>(function VertMInput(
  {
    value,
    defaultValue = '',
    onChange,
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    allowClear,
    maxLength,
    status,
    showCount,
    sanitize,
    onSanitizeReject,
    disabled,
    rows = 1,
    className = '',
    style,
    ...fieldProps
  },
  ref
) {
  const vertical = useIsVertical();
  const [current, setCurrent] = useControlled(value, defaultValue);

  const showClear = !!(allowClear && current && !disabled);
  const needsWrap = !!(prefix || suffix || addonBefore || addonAfter || showCount || allowClear);
  const needsFieldMeasure = !!(suffix || allowClear);
  const { wrapRef, matchFieldStyle } = useFieldWidth(needsFieldMeasure, [
    rows,
    current,
    suffix,
    allowClear,
  ]);

  const handleChange = (next: string) => {
    if (maxLength !== undefined && next.length > maxLength) return;
    setCurrent(next);
    extractChangeHandler(onChange)(next);
  };

  const wrapperClass = [
    'vertm-input',
    vertical && 'vertm-input--vertical',
    rows <= 1 ? 'vertm-input--single' : 'vertm-input--multiline',
    status && `vertm-input--${status}`,
    disabled && 'vertm-input--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const affixSizeStyle = matchFieldStyle;

  const field = (
    <VertMTextField
      {...fieldProps}
      rows={rows}
      value={current}
      onChange={handleChange}
      disabled={disabled}
      sanitize={sanitize}
      onSanitizeReject={onSanitizeReject}
      className="vertm-input__field"
    />
  );

  return (
    <div ref={ref} className={wrapperClass} style={style}>
      {addonBefore && <span className="vertm-input__addon">{addonBefore}</span>}
      {needsWrap ? (
        <div ref={wrapRef} className="vertm-input__wrap">
          {prefix && <span className="vertm-input__affix">{prefix}</span>}
          {field}
          {allowClear && (
            <button
              type="button"
              className="vertm-input__clear"
              style={{
                ...affixSizeStyle,
                visibility: showClear ? 'visible' : 'hidden',
                pointerEvents: showClear ? 'auto' : 'none',
              }}
              aria-label="Clear"
              aria-hidden={!showClear}
              tabIndex={showClear ? 0 : -1}
              onClick={() => handleChange('')}
            >
              <Close size="small" vertical={vertical} rotateForVertical={false} />
            </button>
          )}
          {suffix && (
            <span
              className="vertm-input__affix vertm-input__affix--match-field"
              style={affixSizeStyle}
            >
              {suffix}
            </span>
          )}
        </div>
      ) : (
        field
      )}
      {addonAfter && <span className="vertm-input__addon">{addonAfter}</span>}
      {showCount && maxLength !== undefined && (
        <span className="vertm-input__count">
          {current.length}/{maxLength}
        </span>
      )}
    </div>
  );
});

// ── TextArea ──

export interface TextAreaProps extends InputProps {
  /** 自适应高度；对象可指定 minRows / maxRows */
  autoSize?: boolean | { minRows?: number; maxRows?: number };
}

function TextArea({ autoSize, rows = 3, columnDepth, ...rest }: TextAreaProps) {
  const resolvedRows = useMemo(() => {
    if (!autoSize) return rows;
    if (autoSize === true) return rows;
    return autoSize.minRows ?? rows;
  }, [autoSize, rows]);

  const resolvedDepth = useMemo(() => {
    if (columnDepth !== undefined) return columnDepth;
    if (typeof autoSize === 'object' && autoSize.maxRows != null) {
      return autoSize.maxRows;
    }
    return 4;
  }, [autoSize, columnDepth]);

  return (
    <VertMInputBase rows={resolvedRows} columnDepth={resolvedDepth} {...rest} />
  );
}

// ── Search ──

export interface SearchProps extends InputProps {
  /** 点击搜索或回车时触发 */
  onSearch?: (value: string) => void;
  /** 是否显示搜索按钮；可为自定义节点 */
  enterButton?: boolean | ReactNode;
}

function Search({ onSearch, enterButton, suffix, value, defaultValue = '', onChange, ...rest }: SearchProps) {
  const vertical = useIsVertical();
  const [uncontrolled, setUncontrolled] = useState(String(defaultValue ?? ''));
  const current = value !== undefined ? String(value) : uncontrolled;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setUncontrolled(e.target.value);
    onChange?.(e);
  };

  const fireSearch = () => onSearch?.(current);

  const searchSuffix = enterButton ? (
    typeof enterButton === 'boolean' ? (
      <VertMButton type="primary" block icon={<SearchIcon vertical={vertical} />} onClick={fireSearch} />
    ) : (
      enterButton
    )
  ) : (
    suffix ?? <SearchIcon vertical={vertical} />
  );

  return (
    <VertMInputBase
      {...rest}
      suffix={searchSuffix}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      onPressEnter={fireSearch}
    />
  );
}

// ── Password ──

/** Printable half-width (ASCII) characters: letters, digits, symbols, space. */
const PASSWORD_CHAR_PATTERN = /[^\u0020-\u007E]/g;

function sanitizePasswordInput(value: string): string {
  return value.replace(PASSWORD_CHAR_PATTERN, '');
}

export interface PasswordProps extends InputProps {
  /** 输入非法字符时的提示文案 */
  invalidCharMessage?: string;
}

const DEFAULT_PASSWORD_INVALID_MESSAGE =
  'Only half-width letters, numbers, and symbols are allowed';

function Password({
  invalidCharMessage = DEFAULT_PASSWORD_INVALID_MESSAGE,
  status,
  onSanitizeReject,
  ...props
}: PasswordProps) {
  const vertical = useIsVertical();
  const [visible, setVisible] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const hintTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const dismissHint = useCallback(() => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    hintTimerRef.current = setTimeout(() => setShowHint(false), 3000);
  }, []);

  const handleSanitizeReject = useCallback(() => {
    setShowHint(true);
    dismissHint();
    onSanitizeReject?.();
  }, [dismissHint, onSanitizeReject]);

  useEffect(() => {
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, []);

  return (
    <div className={`vertm-input-password${vertical ? ' vertm-input-password--vertical' : ''}`}>
      <VertMInputBase
        {...props}
        sanitize={sanitizePasswordInput}
        onSanitizeReject={handleSanitizeReject}
        status={showHint ? 'error' : status}
        masked={!visible}
        suffix={
          <button
            type="button"
            className="vertm-input__password-toggle"
            aria-label={visible ? 'Hide password' : 'Show password'}
            onClick={() => setVisible(!visible)}
          >
            {visible ? (
              <EyeInvisible vertical={vertical} />
            ) : (
              <Eye vertical={vertical} />
            )}
          </button>
        }
      />
      {showHint && (
        <div className="vertm-input__hint vertm-input__hint--error" role="alert">
          <VertMText
            as="span"
            text={invalidCharMessage}
            raw
            inheritTypography
          />
        </div>
      )}
    </div>
  );
}

export const VertMInput = Object.assign(VertMInputBase, {
  TextArea,
  Search,
  Password,
});

export const VertMSearch = Search;
