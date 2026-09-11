import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
  type CSSProperties,
} from 'react';
import { Loading } from '@vertm/icons';
import { useVertMConfig, useIsVertical } from '../config/context.js';
import { VertMText } from '../VertMText.js';

export type ButtonType = 'primary' | 'default' | 'dashed' | 'text' | 'link';
export type ButtonSize = 'small' | 'middle' | 'large';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** 按钮类型 @default 'default' */
  type?: ButtonType;
  /** 按钮尺寸，未设时跟随 ConfigProvider */
  size?: ButtonSize;
  /** 载入中，禁用点击并显示 spinner @default false */
  loading?: boolean;
  /** 危险态，用于删除等破坏性操作 @default false */
  danger?: boolean;
  /** 按钮图标，显示在文字前 */
  icon?: ReactNode;
  /** 是否撑满父容器宽度 @default false */
  block?: boolean;
  /** 竖排时单列最大行数，超出换到下一列 */
  columnDepth?: number;
  /** 原生 button 的 type @default 'button' */
  htmlType?: 'button' | 'submit' | 'reset';
}

const VertMButtonBase = forwardRef<HTMLButtonElement, ButtonProps>(function VertMButton(
  {
    type = 'default',
    size,
    loading = false,
    danger = false,
    icon,
    block = false,
    columnDepth,
    disabled,
    children,
    className = '',
    style,
    onClick,
    onKeyDown,
    htmlType = 'button',
    ...rest
  },
  ref
) {
  const config = useVertMConfig();
  const vertical = useIsVertical();
  const resolvedSize = size ?? config.size;

  const isDisabled = disabled || loading;
  const label = typeof children === 'string' ? children : null;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    onClick?.(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.currentTarget.click();
    }
    onKeyDown?.(e);
  };

  const classes = [
    'vertm-btn',
    `vertm-btn--${type}`,
    `vertm-btn--${resolvedSize}`,
    danger && 'vertm-btn--danger',
    block && 'vertm-btn--block',
    loading && 'vertm-btn--loading',
    columnDepth != null && 'vertm-btn--wrap',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const wrapStyle =
    columnDepth != null
      ? ({ '--vertm-btn-column-depth': String(columnDepth) } as CSSProperties)
      : undefined;

  return (
    <button
      ref={ref}
      type={htmlType}
      className={classes}
      style={wrapStyle ? { ...wrapStyle, ...style } : style}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {loading && <Loading spin size="small" vertical={vertical} className="vertm-btn__icon" />}
      {!loading && icon && <span className="vertm-btn__icon">{icon}</span>}
      {label ? <VertMText as="span" text={label} className="vertm-btn__text" /> : children}
    </button>
  );
});

export interface ButtonGroupProps {
  /** 按钮组成员 */
  children: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 组内按钮统一尺寸 */
  size?: ButtonSize;
}

function ButtonGroup({ children, className = '', size }: ButtonGroupProps) {
  return (
    <div
      className={`vertm-btn-group ${className}`.trim()}
      data-size={size}
      role="group"
    >
      {children}
    </div>
  );
}

export const VertMButton = Object.assign(VertMButtonBase, { Group: ButtonGroup });
