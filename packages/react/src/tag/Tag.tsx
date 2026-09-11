import {
  type MouseEvent,
  type KeyboardEvent,
  type ReactNode,
  type CSSProperties,
} from 'react';
import { Close } from '@vertm/icons';
import { useControlled } from '../hooks/useControlled.js';
import { useIsVertical } from '../config/context.js';
import { VertMText } from '../VertMText.js';

export type PresetTagColor =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'processing';

const PRESET_COLORS: PresetTagColor[] = [
  'default',
  'primary',
  'success',
  'warning',
  'error',
  'processing',
];

export interface TagProps {
  /** 标签内容 */
  children?: ReactNode;
  /** 颜色：预设名或自定义色值 @default 'default' */
  color?: PresetTagColor | string;
  /** 是否可关闭 @default false */
  closable?: boolean;
  /** 点击关闭按钮的回调 */
  onClose?: (e: MouseEvent<HTMLElement>) => void;
  /** 是否可勾选切换 @default false */
  checkable?: boolean;
  /** 受控勾选状态 */
  checked?: boolean;
  /** 非受控初始勾选状态 @default false */
  defaultChecked?: boolean;
  /** 勾选状态变化回调 */
  onChange?: (checked: boolean) => void;
  /** 标签前图标 */
  icon?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

function isPresetColor(color: string): color is PresetTagColor {
  return PRESET_COLORS.includes(color as PresetTagColor);
}

function resolveTagStyle(color: string, style?: CSSProperties): CSSProperties | undefined {
  return !isPresetColor(color) ? { ...style, background: color, borderColor: color } : style;
}

function resolveTagClasses(
  color: string,
  className: string,
  ...modifiers: (string | false | undefined)[]
): string {
  return [
    'vertm-tag',
    isPresetColor(color) ? `vertm-tag--${color}` : 'vertm-tag--custom',
    ...modifiers,
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

function TagBody({ icon, children }: { icon?: ReactNode; children?: ReactNode }) {
  return (
    <>
      {icon && <span className="vertm-tag__icon">{icon}</span>}
      {typeof children === 'string' ? (
        <VertMText as="span" text={children} className="vertm-tag__text" />
      ) : (
        children
      )}
    </>
  );
}

export function VertMTag({
  children,
  color = 'default',
  closable = false,
  onClose,
  checkable = false,
  checked,
  defaultChecked = false,
  onChange,
  icon,
  className = '',
  style,
}: TagProps) {
  const vertical = useIsVertical();
  const [isChecked, setChecked] = useControlled(
    checkable ? checked : undefined,
    checkable ? defaultChecked : false,
    checkable ? onChange : undefined
  );

  const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose?.(e);
  };

  const handleToggle = () => {
    if (!checkable) return;
    setChecked(!isChecked);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (!checkable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setChecked(!isChecked);
    }
  };

  return (
    <span
      className={resolveTagClasses(
        color,
        className,
        checkable && 'vertm-tag--checkable',
        checkable && isChecked && 'vertm-tag--checked'
      )}
      style={resolveTagStyle(color, style)}
      role={checkable ? 'button' : undefined}
      tabIndex={checkable ? 0 : undefined}
      aria-pressed={checkable ? isChecked : undefined}
      onClick={checkable ? handleToggle : undefined}
      onKeyDown={checkable ? handleKeyDown : undefined}
    >
      <TagBody icon={icon}>{children}</TagBody>
      {closable && !checkable && (
        <button type="button" className="vertm-tag__close" aria-label="Close" onClick={handleClose}>
          <Close size="small" vertical={vertical} rotateForVertical={false} />
        </button>
      )}
    </span>
  );
}

export type CheckableTagProps = Omit<TagProps, 'closable' | 'onClose' | 'checkable'>;

/** Toggle tag — also available as `VertMTag.Checkable`. */
export function CheckableTag(props: CheckableTagProps) {
  return <VertMTag checkable {...props} />;
}

VertMTag.Checkable = CheckableTag;
