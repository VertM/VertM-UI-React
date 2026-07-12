import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
  type CSSProperties,
  type ChangeEvent,
  type KeyboardEvent,
  type CompositionEvent,
  type MouseEvent,
  type WheelEvent,
  type RefObject,
} from 'react';
import {
  normalizeMongolianText,
  mapClickToIndex,
  getCaretPosition,
  countOverflowColumns,
  DEFAULT_VERTM_FONT_STACK,
  DEFAULT_WRITING_MODE,
  type WritingMode,
} from '@vertm/core';
import { VertMText } from './VertMText.js';

export type VertMTextFieldVariant = 'boxed' | 'bare';

export interface VertMTextFieldProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  /** Visible writing depth per column (line count); widens until maxColumns. Default 4. */
  columnDepth?: number;
  /** Max columns; Input/TextArea auto-widen until this limit. Default 1. */
  maxColumns?: number;
  autoFocus?: boolean;
  disabled?: boolean;
  fontFamily?: string;
  fontSize?: number;
  lineHeight?: number;
  writingMode?: WritingMode;
  className?: string;
  style?: CSSProperties;
  /** `boxed` = bordered field; `bare` = lightweight inline mirror input. */
  variant?: VertMTextFieldVariant;
  /** When true, visual layer shows bullets instead of actual text (password mode). */
  masked?: boolean;
  onBlur?: () => void;
  /** Strip disallowed characters before commit; also blocks single-char keydown when set. */
  sanitize?: (value: string) => string;
  /** Fired when input is rejected (illegal char or stripped from paste / IME). */
  onSanitizeReject?: () => void;
}

function fieldCssVars(
  fontSize: number,
  lineHeight: number,
  columnCount: number,
  neededColumnCount: number,
  columnDepth: number,
  fontFamily: string,
  writingMode: WritingMode,
  style?: CSSProperties
): CSSProperties {
  return {
    '--vertm-field-font-size': `${fontSize}px`,
    '--vertm-field-line-height': String(lineHeight),
    '--vertm-field-column-count': String(columnCount),
    '--vertm-field-needed-column-count': String(neededColumnCount),
    '--vertm-field-row-depth': String(columnDepth),
    '--vertm-field-font-family': fontFamily,
    '--vertm-field-writing-mode': writingMode,
    ...style,
  } as CSSProperties;
}

export function VertMTextField({
  value: controlledValue,
  defaultValue = '',
  onChange,
  placeholder = '',
  rows = 1,
  columnDepth = 4,
  maxColumns = 1,
  autoFocus = false,
  disabled = false,
  fontFamily = DEFAULT_VERTM_FONT_STACK,
  fontSize = 16,
  lineHeight = 1.6,
  writingMode = DEFAULT_WRITING_MODE,
  className = '',
  style,
  variant = 'boxed',
  masked = false,
  onBlur,
  sanitize,
  onSanitizeReject,
}: VertMTextFieldProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : internalValue;

  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLSpanElement>(null);
  const textWrapRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const isComposingRef = useRef(false);
  const skipSyncRef = useRef(false);

  const isMultiline = rows > 1;

  const normalizedValue = useMemo(() => {
    const normalized = normalizeMongolianText(value);
    return isMultiline ? normalized : normalized.replace(/[\r\n]/g, '');
  }, [value, isMultiline]);

  const visibleText =
    masked && normalizedValue ? '•'.repeat([...normalizedValue].length) : normalizedValue;
  const displayText = visibleText || placeholder;
  const isShowingPlaceholder = !normalizedValue && !!placeholder;

  const updateValue = useCallback(
    (newValue: string) => {
      const raw = isMultiline ? newValue : newValue.replace(/[\r\n]/g, '');
      const normalized = normalizeMongolianText(raw);
      if (!isControlled) setInternalValue(normalized);
      onChange?.(normalized);
    },
    [isControlled, onChange, isMultiline]
  );

  const neededColumns = useMemo(() => {
    const contentColumns = countOverflowColumns(normalizedValue, columnDepth);
    const minColumns = isMultiline ? Math.max(1, rows) : 1;
    if (maxColumns <= 1) {
      return isMultiline ? minColumns : contentColumns;
    }
    return Math.max(minColumns, contentColumns);
  }, [isMultiline, rows, normalizedValue, columnDepth, maxColumns]);

  const effectiveColumnCount = useMemo(() => {
    const minColumns = isMultiline ? Math.max(1, rows) : 1;
    if (maxColumns <= 1) {
      return isMultiline ? minColumns : Math.min(1, neededColumns);
    }
    return Math.min(maxColumns, neededColumns);
  }, [isMultiline, rows, neededColumns, maxColumns]);

  const useAutoColumns = maxColumns > 1;
  const minColumnCount = isMultiline ? Math.max(1, rows) : 1;
  const isColumnCapped = useAutoColumns && neededColumns > maxColumns;
  const isWideField = useAutoColumns && effectiveColumnCount > minColumnCount;

  const resolveNeededColumns = useCallback(
    (text: string) => {
      const contentColumns = countOverflowColumns(text, columnDepth);
      const minColumns = isMultiline ? Math.max(1, rows) : 1;
      if (maxColumns <= 1) {
        return isMultiline ? minColumns : contentColumns;
      }
      return Math.max(minColumns, contentColumns);
    },
    [isMultiline, rows, columnDepth, maxColumns]
  );

  /** Clamp / reset horizontal scroll from layout math (no DOM measure). */
  const reconcileHorizontalScroll = useCallback(
    (text: string) => {
      const visual = visualRef.current;
      if (!visual) return;

      const needed = resolveNeededColumns(text);
      const capped = maxColumns > 1 && needed > maxColumns;
      const columnWidth = fontSize * lineHeight;
      const maxScrollLeft = capped
        ? Math.max(0, needed * columnWidth - visual.clientWidth)
        : 0;

      if (!capped || maxScrollLeft === 0) {
        visual.scrollLeft = 0;
        return;
      }

      if (visual.scrollLeft > maxScrollLeft) {
        visual.scrollLeft = maxScrollLeft;
      }
    },
    [resolveNeededColumns, maxColumns, fontSize, lineHeight]
  );

  const syncNativeScrollFromVisual = useCallback(() => {
    const el = inputRef.current;
    const visual = visualRef.current;
    if (!el || !visual) return;
    el.scrollTop = visual.scrollTop;
    el.scrollLeft = visual.scrollLeft;
  }, []);

  const scrollSingleLineCaretIntoView = useCallback(() => {
    if (isMultiline) return;

    const el = inputRef.current;
    const visual = visualRef.current;
    if (!el || !visual) return;

    const caretIndex = el.selectionStart ?? 0;
    const positioningParent = textWrapRef.current ?? visual;
    const pos = getCaretPosition(visual, caretIndex, positioningParent);

    if (isColumnCapped && normalizedValue.length > 0) {
      const textNode = visual.querySelector('.vertm-field__text')?.firstChild;
      if (textNode && textNode.nodeType === Node.TEXT_NODE) {
        const text = normalizedValue;
        let measureIndex = caretIndex > 0 ? caretIndex - 1 : 0;
        if (caretIndex >= text.length && text.length > 0) {
          measureIndex = text.length - 1;
        }
        while (measureIndex >= 0 && text[measureIndex] === '\n') {
          measureIndex -= 1;
        }
        if (measureIndex >= 0) {
          const range = document.createRange();
          range.setStart(textNode, measureIndex);
          range.setEnd(textNode, measureIndex + 1);
          const rects = range.getClientRects();
          const glyphRect = rects.length > 0 ? rects[0] : range.getBoundingClientRect();
          if (glyphRect.width || glyphRect.height) {
            const pad = 4;
            const visualRect = visual.getBoundingClientRect();
            const columnWidth = fontSize * lineHeight;
            const needed = resolveNeededColumns(text);
            const maxScrollLeft = Math.max(0, needed * columnWidth - visual.clientWidth);
            const contentLeft = glyphRect.left - visualRect.left + visual.scrollLeft;
            const contentRight = contentLeft + Math.max(glyphRect.width, columnWidth);
            const scrollLeft = visual.scrollLeft;
            const viewW = visual.clientWidth;

            if (contentLeft < scrollLeft + pad) {
              visual.scrollLeft = Math.max(0, contentLeft - pad);
            } else if (contentRight > scrollLeft + viewW - pad) {
              visual.scrollLeft = Math.min(contentRight - viewW + pad, maxScrollLeft);
            }
          }
        }
      }
    }

    if (pos) {
      const maxScrollTop = Math.max(0, visual.scrollHeight - visual.clientHeight);
      if (visual.scrollTop > maxScrollTop) {
        visual.scrollTop = maxScrollTop;
      }

      const pad = 4;
      const viewH = visual.clientHeight;
      const scrollTop = visual.scrollTop;
      const caretTop = pos.top;
      const caretBottom = pos.top + pos.height;

      if (caretTop < scrollTop + pad) {
        visual.scrollTop = Math.max(0, caretTop - pad);
      } else if (caretBottom > scrollTop + viewH - pad) {
        visual.scrollTop = Math.min(caretBottom - viewH + pad, maxScrollTop);
      }

      if (isColumnCapped) {
        const maxScrollLeft = Math.max(0, visual.scrollWidth - visual.clientWidth);
        const viewW = visual.clientWidth;
        const scrollLeft = visual.scrollLeft;
        const caretLeft = pos.left;
        const caretRight = pos.left + pos.width;

        if (caretLeft < scrollLeft + pad) {
          visual.scrollLeft = Math.max(0, caretLeft - pad);
        } else if (caretRight > scrollLeft + viewW - pad) {
          visual.scrollLeft = Math.min(caretRight - viewW + pad, maxScrollLeft);
        }
      }
    }

    syncNativeScrollFromVisual();
  }, [
    isMultiline,
    isColumnCapped,
    normalizedValue,
    fontSize,
    lineHeight,
    resolveNeededColumns,
    syncNativeScrollFromVisual,
  ]);

  useLayoutEffect(() => {
    reconcileHorizontalScroll(normalizedValue);

    const el = inputRef.current;
    const visual = visualRef.current;
    if (!el || !visual) return;

    if (isMultiline) {
      visual.scrollTop = el.scrollTop;
      visual.scrollLeft = el.scrollLeft;
      return;
    }

    scrollSingleLineCaretIntoView();
  }, [
    normalizedValue,
    isMultiline,
    reconcileHorizontalScroll,
    scrollSingleLineCaretIntoView,
  ]);

  useEffect(() => {
    const el = inputRef.current;
    if (!el || isComposingRef.current) return;
    if (el.value === normalizedValue) {
      skipSyncRef.current = false;
      return;
    }
    if (skipSyncRef.current) return;

    const start = el.selectionStart ?? normalizedValue.length;
    const end = el.selectionEnd ?? start;
    el.value = normalizedValue;
    try {
      el.setSelectionRange(
        Math.min(start, normalizedValue.length),
        Math.min(end, normalizedValue.length)
      );
    } catch {
      /* setSelectionRange can throw on unfocused/detached nodes */
    }
  }, [normalizedValue]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    const el = inputRef.current;
    const visual = visualRef.current;
    if (!el || !visual) return;
    const canScrollY = el.scrollHeight > el.clientHeight;
    const canScrollX = el.scrollWidth > el.clientWidth;
    if (!canScrollY && !canScrollX) return;
    e.preventDefault();
    if (canScrollY) {
      el.scrollTop += e.deltaY;
    } else if (canScrollX) {
      el.scrollLeft += e.deltaY;
    }
    if (canScrollX && e.deltaX) el.scrollLeft += e.deltaX;
    syncVisualScroll();
  };

  const normalizeFieldValue = useCallback(
    (newValue: string) => {
      const raw = isMultiline ? newValue : newValue.replace(/[\r\n]/g, '');
      return normalizeMongolianText(raw);
    },
    [isMultiline]
  );

  const commitInputFromNative = useCallback(
    (el: HTMLInputElement | HTMLTextAreaElement, raw: string) => {
      const stripped = sanitize ? sanitize(raw) : raw;
      const rejected = !!sanitize && stripped !== raw;
      const normalized = normalizeFieldValue(stripped);

      skipSyncRef.current = true;

      if (rejected) {
        onSanitizeReject?.();
        const rawCaret = el.selectionStart ?? stripped.length;
        const nextCaret = sanitize!(raw.slice(0, rawCaret)).length;
        el.value = normalized;
        try {
          el.setSelectionRange(nextCaret, nextCaret);
        } catch {
          /* setSelectionRange can throw on unfocused/detached nodes */
        }
      }

      updateValue(stripped);
      reconcileHorizontalScroll(normalized);
    },
    [sanitize, onSanitizeReject, normalizeFieldValue, updateValue, reconcileHorizontalScroll]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (isComposingRef.current) return;
    commitInputFromNative(e.target, e.target.value);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (isMultiline) return;
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      scrollSingleLineCaretIntoView();
    }
  };

  const handleSelect = () => {
    if (!isMultiline) scrollSingleLineCaretIntoView();
  };

  const syncVisualScroll = useCallback(() => {
    const el = inputRef.current;
    const visual = visualRef.current;
    if (!el || !visual) return;
    visual.scrollTop = el.scrollTop;
    visual.scrollLeft = el.scrollLeft;
  }, []);

  const handleNativeScroll = () => {
    syncVisualScroll();
  };

  const moveSingleLineCaret = useCallback(
    (delta: number, extend: boolean) => {
      const el = inputRef.current as HTMLInputElement | null;
      if (!el || isMultiline) return;

      const len = normalizedValue.length;
      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? start;

      if (extend) {
        const anchor = start;
        const focus = Math.max(0, Math.min(end + delta, len));
        if (focus < anchor) {
          el.setSelectionRange(focus, anchor, 'backward');
        } else {
          el.setSelectionRange(anchor, focus, 'forward');
        }
        return;
      }

      const next = Math.max(0, Math.min(start + delta, len));
      el.setSelectionRange(next, next);
    },
    [isMultiline, normalizedValue.length]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (isComposingRef.current || isMultiline) return;

    if (
      sanitize &&
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      sanitize(e.key) !== e.key
    ) {
      e.preventDefault();
      onSanitizeReject?.();
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveSingleLineCaret(-1, e.shiftKey);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveSingleLineCaret(1, e.shiftKey);
    }
  };

  const handleCompositionStart = (_e: CompositionEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (e: CompositionEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    isComposingRef.current = false;
    commitInputFromNative(e.currentTarget, e.currentTarget.value);
  };

  const handleVisualClick = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled || !visualRef.current || !inputRef.current) return;
    // Let native input handle focus when the click lands on it directly.
    if (e.target !== e.currentTarget) return;
    const index = mapClickToIndex(
      visualRef.current,
      e.clientX,
      e.clientY,
      normalizedValue.length
    );
    inputRef.current.focus();
    inputRef.current.setSelectionRange(index, index);
  };

  const fieldClassName = useMemo(
    () =>
      [
        'vertm-field',
        variant === 'bare' ? 'vertm-field--bare' : 'vertm-field--boxed',
        rows <= 1 ? 'vertm-field--single' : 'vertm-field--multi',
        isWideField && 'vertm-field--wide',
        isColumnCapped && 'vertm-field--capped',
        disabled && 'vertm-field--disabled',
        className,
      ]
        .filter(Boolean)
        .join(' '),
    [variant, rows, disabled, className, isWideField, isColumnCapped]
  );

  const fieldStyle = fieldCssVars(
    fontSize,
    lineHeight,
    effectiveColumnCount,
    neededColumns,
    columnDepth,
    fontFamily,
    writingMode,
    style
  );

  const sharedInputProps = {
    defaultValue: normalizedValue,
    onChange: handleChange,
    onSelect: handleSelect,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    onBlur: () => {
      onBlur?.();
    },
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
    disabled,
    'aria-label': placeholder || 'Mongolian text input',
  };

  return (
    <div
      ref={containerRef}
      className={fieldClassName}
      style={fieldStyle}
      onClick={handleVisualClick}
      onWheel={handleWheel}
    >
      <span
        ref={visualRef}
        className={`vertm-field__visual${isShowingPlaceholder ? ' vertm-field__visual--placeholder' : ''}`}
        aria-hidden="true"
      >
        <span ref={textWrapRef} className="vertm-field__text-wrap">
          <VertMText text={displayText} inheritTypography className="vertm-field__text" />
        </span>
      </span>

      {isMultiline ? (
        <textarea
          ref={inputRef as RefObject<HTMLTextAreaElement>}
          className="vertm-field__input vertm-field__input--textarea"
          rows={rows}
          onScroll={handleNativeScroll}
          {...sharedInputProps}
        />
      ) : (
        <input
          ref={inputRef as RefObject<HTMLInputElement>}
          type="text"
          className="vertm-field__input vertm-field__input--native"
          onScroll={handleNativeScroll}
          {...sharedInputProps}
        />
      )}

    </div>
  );
}

/** Lightweight mirror input without border/background for inline editing. */
export function VertMTextFieldBare(
  props: Omit<VertMTextFieldProps, 'variant'>
) {
  return <VertMTextField variant="bare" {...props} />;
}
