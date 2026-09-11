import {
  useMemo,
  createElement,
  type CSSProperties,
  type HTMLAttributes,
  type ElementType,
} from 'react';
import {
  normalizeMongolianText,
  type WritingMode,
} from '@vertm/core';
import { useVertMConfig } from './config/context.js';

export interface VertMTextProps extends HTMLAttributes<HTMLElement> {
  /** 要渲染的文本内容 */
  text: string;
  /** 渲染为的 HTML 元素 @default 'span'；设置 href 时忽略 */
  as?: ElementType;
  /** 有值时渲染为带链接样式的 `<a>` */
  href?: string;
  /** 链接打开方式 */
  target?: string;
  /** 链接 rel 属性 */
  rel?: string;
  /** 是否禁用交互 @default false */
  disabled?: boolean;
  /** 字体族，覆盖 ConfigProvider */
  fontFamily?: string;
  /** 字号（px） */
  fontSize?: number;
  /** 行高倍数 */
  lineHeight?: number;
  /** 最大显示行数，超出截断 */
  maxLines?: number;
  /** 书写模式，覆盖 ConfigProvider */
  writingMode?: WritingMode;
  /** 是否对拉丁字母使用 mixed 朝向 @default true */
  showLatin?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 跳过 NFC 规范化，直接渲染原文 @default false */
  raw?: boolean;
  /** 从父级 CSS 变量继承字号/行高/书写模式 @default false */
  inheritTypography?: boolean;
}

/**
 * Core vertical Mongolian text renderer.
 *
 * Layout tokens (writing-mode, font-family, line-height, text-orientation)
 * come from CSS classes + VertMConfigProvider variables. Only pass fontSize /
 * lineHeight / writingMode props when you need to override the context defaults.
 */
export function VertMText({
  text,
  as: asProp = 'span',
  href,
  target,
  rel,
  disabled = false,
  fontFamily,
  fontSize,
  lineHeight,
  maxLines,
  writingMode,
  showLatin = true,
  raw = false,
  inheritTypography = false,
  className = '',
  style,
  onClick,
  ...rest
}: VertMTextProps) {
  const config = useVertMConfig();

  const normalizedText = useMemo(
    () => (raw ? text : normalizeMongolianText(text)),
    [text, raw]
  );

  const isLink = Boolean(href);
  const Component = isLink ? 'a' : asProp;

  const computedStyle = useMemo<CSSProperties>(() => {
    const s: CSSProperties = {};

    if (!inheritTypography) {
      s.fontFamily = fontFamily ?? config.fontFamily;
      if (fontSize !== undefined) s.fontSize = `${fontSize}px`;
      if (lineHeight !== undefined) s.lineHeight = lineHeight;
      if (writingMode !== undefined) s.writingMode = writingMode;
    }

    if (!showLatin) s.textOrientation = 'upright';

    if (maxLines !== undefined && maxLines > 0) {
      s.overflow = 'hidden';
      s.display = '-webkit-box';
      s.WebkitBoxOrient = 'vertical';
      s.WebkitLineClamp = maxLines;
    }

    if (isLink && disabled) {
      s.pointerEvents = 'none';
      s.opacity = 0.5;
    }

    return { ...s, ...style };
  }, [
    fontFamily,
    fontSize,
    lineHeight,
    writingMode,
    showLatin,
    maxLines,
    style,
    config.fontFamily,
    inheritTypography,
    isLink,
    disabled,
  ]);

  const classNames = [
    'vertm-vertical',
    'vertm-text',
    isLink && 'vertm-typography-link',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const elementProps = {
    className: classNames,
    style: computedStyle,
    ...rest,
    ...(isLink
      ? {
          href: disabled ? undefined : href,
          target,
          rel: rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined),
          'aria-disabled': disabled ? true : undefined,
          onClick: disabled ? undefined : onClick,
        }
      : onClick
        ? { onClick }
        : {}),
  };

  return createElement(Component, elementProps, normalizedText);
}
