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
  text: string;
  /** Render as a different HTML element (default: span). Ignored when `href` is set. */
  as?: ElementType;
  /** When set, renders as `<a>` with link styles. */
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  fontFamily?: string;
  fontSize?: number;
  lineHeight?: number;
  maxLines?: number;
  writingMode?: WritingMode;
  /** When false, use upright orientation for Latin. Default true (mixed). */
  showLatin?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Skip NFC normalization (render raw text). */
  raw?: boolean;
  /** Read font-size / line-height / writing-mode from parent CSS variables. */
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
