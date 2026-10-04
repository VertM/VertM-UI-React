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
  DEFAULT_VERTM_FONT_STACK,
  DEFAULT_WRITING_MODE,
  resolveFieldKey,
  computeFieldColumns,
  computeScrollToReveal,
  reconcileColumnScroll,
  maxColumnScroll,
  moveSelection,
  mapCaretThroughSanitize,
  normalizeFieldValue,
  type WritingMode,
} from '@vertm/core';
import { mapClickToIndex, getCaretPosition } from '@vertm/core/dom';
import { VertMText } from './VertMText.js';

export type VertMTextFieldVariant = 'boxed' | 'bare';

export interface VertMTextFieldProps {
  /** 受控值 */
  value?: string;
  /** 非受控初始值 @default '' */
  defaultValue?: string;
  /** 值变化回调 */
  onChange?: (value: string) => void;
  /** 占位文案 @default '' */
  placeholder?: string;
  /** 可视行数（多行时） @default 1 */
  rows?: number;
  /** 竖排时每列可见书写深度（行数），超出扩列 @default 4 */
  columnDepth?: number;
  /** 最大列数，输入区可自动扩宽至此 @default 1 */
  maxColumns?: number;
  /** 是否自动聚焦 @default false */
  autoFocus?: boolean;
  /** 是否禁用 @default false */
  disabled?: boolean;
  /** 字体族 */
  fontFamily?: string;
  /** 字号（px） @default 16 */
  fontSize?: number;
  /** 行高倍数 @default 1.6 */
  lineHeight?: number;
  /** 书写模式 */
  writingMode?: WritingMode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 外观：边框输入框或轻量内联 @default 'boxed' */
  variant?: VertMTextFieldVariant;
  /** 是否以圆点掩码显示（密码模式） @default false */
  masked?: boolean;
  /** 失焦回调 */
  onBlur?: () => void;
  /** 提交前过滤非法字符；设置后也会拦截单字符按键 */
  sanitize?: (value: string) => string;
  /** 输入被拒绝（非法字符或粘贴/IME 剥离）时触发 */
  onSanitizeReject?: () => void;
  /** 单行模式下按下 Enter（已 preventDefault）时触发 */
  onPressEnter?: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
  onPressEnter,
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
      const normalized = normalizeFieldValue(newValue, isMultiline);
      if (!isControlled) setInternalValue(normalized);
      onChange?.(normalized);
    },
    [isControlled, onChange, isMultiline]
  );

  const columns = useMemo(
    () => computeFieldColumns({ text: normalizedValue, rows, columnDepth, maxColumns }),
    [normalizedValue, rows, columnDepth, maxColumns]
  );
  const neededColumns = columns.needed;
  const effectiveColumnCount = columns.effective;
  const isColumnCapped = columns.capped;
  const isWideField = columns.wide;

  const resolveNeededColumns = useCallback(
    (text: string) => computeFieldColumns({ text, rows, columnDepth, maxColumns }).needed,
    [rows, columnDepth, maxColumns]
  );

  /** Clamp / reset horizontal scroll from layout math (no DOM measure). */
  const reconcileHorizontalScroll = useCallback(
    (text: string) => {
      const visual = visualRef.current;
      if (!visual) return;

      const next = reconcileColumnScroll({
        needed: resolveNeededColumns(text),
        maxColumns,
        columnWidth: fontSize * lineHeight,
        clientWidth: visual.clientWidth,
        scrollLeft: visual.scrollLeft,
      });
      if (visual.scrollLeft !== next) {
        visual.scrollLeft = next;
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
            const visualRect = visual.getBoundingClientRect();
            const columnWidth = fontSize * lineHeight;
            const needed = resolveNeededColumns(text);
            const maxScrollLeft = maxColumnScroll(needed, columnWidth, visual.clientWidth);
            const contentLeft = glyphRect.left - visualRect.left + visual.scrollLeft;
            visual.scrollLeft = computeScrollToReveal({
              start: contentLeft,
              end: contentLeft + Math.max(glyphRect.width, columnWidth),
              scroll: visual.scrollLeft,
              viewport: visual.clientWidth,
              max: maxScrollLeft,
            });
          }
        }
      }
    }

    if (pos) {
      const maxScrollTop = Math.max(0, visual.scrollHeight - visual.clientHeight);
      if (visual.scrollTop > maxScrollTop) {
        visual.scrollTop = maxScrollTop;
      }

      visual.scrollTop = computeScrollToReveal({
        start: pos.top,
        end: pos.top + pos.height,
        scroll: visual.scrollTop,
        viewport: visual.clientHeight,
        max: maxScrollTop,
      });

      if (isColumnCapped) {
        const maxScrollLeft = Math.max(0, visual.scrollWidth - visual.clientWidth);
        visual.scrollLeft = computeScrollToReveal({
          start: pos.left,
          end: pos.left + pos.width,
          scroll: visual.scrollLeft,
          viewport: visual.clientWidth,
          max: maxScrollLeft,
        });
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

  const commitInputFromNative = useCallback(
    (el: HTMLInputElement | HTMLTextAreaElement, raw: string) => {
      const stripped = sanitize ? sanitize(raw) : raw;
      const rejected = !!sanitize && stripped !== raw;
      const normalized = normalizeFieldValue(stripped, isMultiline);

      skipSyncRef.current = true;

      if (rejected) {
        onSanitizeReject?.();
        const rawCaret = el.selectionStart ?? stripped.length;
        const nextCaret = mapCaretThroughSanitize(raw, rawCaret, sanitize!);
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
    [sanitize, onSanitizeReject, isMultiline, updateValue, reconcileHorizontalScroll]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (isComposingRef.current) return;
    commitInputFromNative(e.target, e.target.value);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (isMultiline) return;
    const action = resolveFieldKey(e.key);
    if (action === 'caretPrev' || action === 'caretNext') {
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

      const next = moveSelection({
        start: el.selectionStart ?? 0,
        end: el.selectionEnd ?? el.selectionStart ?? 0,
        length: normalizedValue.length,
        delta,
        extend,
      });
      if (next.direction === 'none') {
        el.setSelectionRange(next.start, next.end);
      } else {
        el.setSelectionRange(next.start, next.end, next.direction);
      }
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

    const action = resolveFieldKey(e.key);
    if (!action) return;
    e.preventDefault();
    switch (action) {
      case 'submit':
        onPressEnter?.(e);
        return;
      case 'caretPrev':
        moveSingleLineCaret(-1, e.shiftKey);
        return;
      case 'caretNext':
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
