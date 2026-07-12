import {
  useState,
  useCallback,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Copy, Check } from '@vertm/icons';
import { useIsVertical } from '../config/context.js';
import { VertMText } from '../VertMText.js';

export type TypographyType = 'secondary' | 'success' | 'warning' | 'danger';

export interface BaseTypographyProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Semantic color variant. */
  type?: TypographyType;
  /** Enable single/multi-line ellipsis truncation. */
  ellipsis?: boolean | { rows?: number };
  /** Show copy-to-clipboard button; copies original NFC text. */
  copyable?: boolean | { text?: string; onCopy?: () => void };
  /** Disable text normalization (render children as-is). */
  raw?: boolean;
}

function resolveEllipsisRows(ellipsis: BaseTypographyProps['ellipsis']): number | undefined {
  if (!ellipsis) return undefined;
  if (ellipsis === true) return 1;
  return ellipsis.rows ?? 1;
}

function CopyButton({ text, onCopy }: { text: string; onCopy?: () => void }) {
  const [copied, setCopied] = useState(false);
  const vertical = useIsVertical();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [text, onCopy]);

  const Icon = copied ? Check : Copy;

  return (
    <button
      type="button"
      className="vertm-typography-copy-btn"
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy'}
    >
      <Icon size="small" vertical={vertical} rotateForVertical={false} />
    </button>
  );
}

function buildTypographyClasses(
  base: string,
  type?: TypographyType,
  ellipsisRows?: number,
  extra?: string
): string {
  const classes = ['vertm-typography', base];
  if (type) classes.push(`vertm-typography-text--${type}`);
  if (ellipsisRows) {
    classes.push('vertm-typography-ellipsis');
    if (ellipsisRows === 1) classes.push('vertm-typography-ellipsis--single');
  }
  if (extra) classes.push(extra);
  return classes.filter(Boolean).join(' ');
}

function resolveCopyText(
  children: ReactNode,
  copyable: BaseTypographyProps['copyable']
): string | undefined {
  if (typeof children === 'string') return children;
  if (copyable && typeof copyable === 'object' && copyable.text) return copyable.text;
  return undefined;
}

// ── Title ──

export interface TitleProps extends BaseTypographyProps {
  level?: 1 | 2 | 3 | 4 | 5;
}

export function Title({
  level = 1,
  type,
  ellipsis,
  copyable,
  raw,
  children,
  className = '',
  style,
  ...rest
}: TitleProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  const ellipsisRows = resolveEllipsisRows(ellipsis);
  const copyText = resolveCopyText(children, copyable);

  if (typeof children !== 'string') {
    return (
      <Tag
        className={buildTypographyClasses(
          `vertm-typography-title vertm-typography-title--h${level}`,
          type,
          ellipsisRows,
          className
        )}
        style={style}
        {...rest}
      >
        {children}
        {copyable && copyText && (
          <CopyButton
            text={copyText}
            onCopy={typeof copyable === 'object' ? copyable.onCopy : undefined}
          />
        )}
      </Tag>
    );
  }

  return (
    <Tag
      className={buildTypographyClasses(
        `vertm-typography-title vertm-typography-title--h${level}`,
        type,
        ellipsisRows,
        className
      )}
      style={style}
      {...rest}
    >
      <VertMText
        as="span"
        text={children}
        raw={raw}
        maxLines={ellipsisRows}
      />
      {copyable && copyText && (
        <CopyButton
          text={copyText}
          onCopy={typeof copyable === 'object' ? copyable.onCopy : undefined}
        />
      )}
    </Tag>
  );
}

// ── Text ──

export interface TextProps extends BaseTypographyProps {
  /** Render as inline or block. */
  block?: boolean;
}

export function Text({
  type,
  ellipsis,
  copyable,
  raw,
  block,
  children,
  className = '',
  style,
  ...rest
}: TextProps) {
  const ellipsisRows = resolveEllipsisRows(ellipsis);
  const copyText = resolveCopyText(children, copyable);

  if (typeof children !== 'string') {
    return (
      <span
        className={buildTypographyClasses('vertm-typography-text', type, ellipsisRows, className)}
        style={{ display: block ? 'block' : undefined, ...style }}
        {...rest}
      >
        {children}
        {copyable && copyText && (
          <CopyButton
            text={copyText}
            onCopy={typeof copyable === 'object' ? copyable.onCopy : undefined}
          />
        )}
      </span>
    );
  }

  return (
    <span
      className={buildTypographyClasses('vertm-typography-text', type, ellipsisRows, className)}
      style={{ display: block ? 'block' : 'inline', ...style }}
      {...rest}
    >
      <VertMText
        as="span"
        text={children}
        raw={raw}
        maxLines={ellipsisRows}
      />
      {copyable && copyText && (
        <CopyButton
          text={copyText}
          onCopy={typeof copyable === 'object' ? copyable.onCopy : undefined}
        />
      )}
    </span>
  );
}

// ── Paragraph ──

export type ParagraphProps = BaseTypographyProps;

export function Paragraph({
  type,
  ellipsis,
  copyable,
  raw,
  children,
  className = '',
  style,
  ...rest
}: ParagraphProps) {
  const ellipsisRows = resolveEllipsisRows(ellipsis);
  const copyText = resolveCopyText(children, copyable);

  if (typeof children !== 'string') {
    return (
      <p
        className={buildTypographyClasses('vertm-typography-paragraph', type, ellipsisRows, className)}
        style={{ margin: 0, ...style }}
        {...rest}
      >
        {children}
        {copyable && copyText && (
          <CopyButton
            text={copyText}
            onCopy={typeof copyable === 'object' ? copyable.onCopy : undefined}
          />
        )}
      </p>
    );
  }

  return (
    <p
      className={buildTypographyClasses('vertm-typography-paragraph', type, ellipsisRows, className)}
      style={{ margin: 0, ...style }}
      {...rest}
    >
      <VertMText
        as="span"
        text={children}
        raw={raw}
        maxLines={ellipsisRows}
      />
      {copyable && copyText && (
        <CopyButton
          text={copyText}
          onCopy={typeof copyable === 'object' ? copyable.onCopy : undefined}
        />
      )}
    </p>
  );
}

// ── Link ──

export interface LinkProps extends BaseTypographyProps {
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
}

export function Link({
  type,
  ellipsis,
  copyable,
  raw,
  href,
  target,
  rel,
  disabled,
  children,
  className = '',
  style,
  onClick,
  ...rest
}: LinkProps) {
  const ellipsisRows = resolveEllipsisRows(ellipsis);
  const copyText = resolveCopyText(children, copyable);

  if (typeof children !== 'string') {
    return (
      <a
        href={disabled ? undefined : href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={buildTypographyClasses('vertm-typography-link', type, ellipsisRows, className)}
        style={{
          pointerEvents: disabled ? 'none' : undefined,
          opacity: disabled ? 0.5 : undefined,
          ...style,
        }}
        aria-disabled={disabled || undefined}
        onClick={disabled ? undefined : onClick}
        {...rest}
      >
        {children}
        {copyable && copyText && (
          <CopyButton
            text={copyText}
            onCopy={typeof copyable === 'object' ? copyable.onCopy : undefined}
          />
        )}
      </a>
    );
  }

  return (
    <>
      <VertMText
        href={disabled ? undefined : href}
        target={target}
        rel={rel}
        disabled={disabled}
        text={children}
        raw={raw}
        maxLines={ellipsisRows}
        className={buildTypographyClasses('vertm-typography-link', type, ellipsisRows, className)}
        style={style}
        onClick={disabled ? undefined : onClick}
        {...rest}
      />
      {copyable && copyText && (
        <CopyButton
          text={copyText}
          onCopy={typeof copyable === 'object' ? copyable.onCopy : undefined}
        />
      )}
    </>
  );
}

// ── Compound export ──

export const Typography = {
  Title,
  Text,
  Paragraph,
  Link,
};

export type { TitleProps as TypographyTitleProps };
export type { TextProps as TypographyTextProps };
export type { ParagraphProps as TypographyParagraphProps };
export type { LinkProps as TypographyLinkProps };
