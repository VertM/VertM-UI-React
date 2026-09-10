import {
  useState,
  useRef,
  useMemo,
  useEffect,
  useLayoutEffect,
  useCallback,
  type ReactNode,
  type KeyboardEvent,
  type MouseEvent,
  type CSSProperties,
} from 'react';
import { normalizeForSearch } from '@vertm/core';
import { ChevronRight, Close, Search, Check } from '@vertm/icons';
import { computeOverlayPosition, type Placement } from '../overlay/placement.js';
import { Portal } from '../overlay/Portal.js';
import { useVertMConfig, useIsVertical } from '../config/context.js';
import { VertMText } from '../VertMText.js';

export interface SelectOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  options?: SelectOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  showSearch?: boolean;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Trigger height (px or CSS length). Default `160px` via `--vertm-select-height`. */
  height?: number | string;
  /** Dropdown panel height. Defaults to `height`. */
  listHeight?: number | string;
  /** Dropdown list viewport width; extra options scroll horizontally. */
  listWidth?: number | string;
  /** Popup placement relative to trigger. Default `rightTop` for vertical Select. */
  placement?: Placement;
}

function toCssLength(value?: number | string): string | undefined {
  if (value == null) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

function optionLabel(opt: SelectOption): string {
  return typeof opt.label === 'string' ? opt.label : opt.value;
}

function normalizeCurrent(
  multiple: boolean,
  raw: string | string[] | undefined
): string | string[] {
  if (multiple) {
    if (Array.isArray(raw)) return raw;
    if (raw) return [raw];
    return [];
  }
  if (Array.isArray(raw)) return raw[0] ?? '';
  return raw ?? '';
}

export function VertMSelect({
  options = [],
  value,
  defaultValue = '',
  onChange,
  multiple = false,
  showSearch = false,
  placeholder = 'Please select',
  disabled = false,
  allowClear = false,
  className = '',
  style,
  height,
  listHeight,
  listWidth,
  placement = 'rightTop',
}: SelectProps) {
  const config = useVertMConfig();
  const vertical = useIsVertical();
  const editorial = config.appearance === 'editorial';
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlight, setHighlight] = useState(0);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const inlineSearchRef = useRef<HTMLInputElement>(null);
  const suppressBlurDismissRef = useRef(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const [selected, setSelected] = useState<string | string[]>(() =>
    normalizeCurrent(multiple, defaultValue as string | string[])
  );

  const isControlled = value !== undefined;
  const current = normalizeCurrent(
    multiple,
    isControlled ? value : selected
  );

  const updateSelected = (next: string | string[]) => {
    const normalized = normalizeCurrent(multiple, next);
    if (!isControlled) setSelected(normalized);
    onChange?.(normalized);
  };

  const filtered = useMemo(() => {
    if (!showSearch || !search.trim()) return options;
    const key = normalizeForSearch(search);
    return options.filter((o) => normalizeForSearch(optionLabel(o)).includes(key));
  }, [options, search, showSearch]);

  const selectedOptions = useMemo(() => {
    if (multiple) {
      const values = current as string[];
      return values
        .map((v) => options.find((o) => o.value === v))
        .filter((o): o is SelectOption => o != null);
    }
    const val = current as string;
    const opt = options.find((o) => o.value === val);
    return opt ? [opt] : [];
  }, [current, options, multiple]);

  const hasSelection = multiple
    ? (current as string[]).length > 0
    : Boolean(current);

  const isOptionSelected = (val: string) => {
    if (multiple) return (current as string[]).includes(val);
    return current === val;
  };

  const updatePos = useCallback(() => {
    const t = triggerRef.current?.getBoundingClientRect();
    const p = popupRef.current?.getBoundingClientRect();
    if (!t || !p) return;
    const result = computeOverlayPosition(
      { top: t.top, left: t.left, width: t.width, height: t.height },
      { top: 0, left: 0, width: p.width || t.width, height: p.height || t.height },
      placement
    );
    setPos(result);
  }, [placement]);

  const selectionKey = multiple
    ? (current as string[]).join('\u0000')
    : String(current);

  useLayoutEffect(() => {
    if (!open) return;
    updatePos();
    const raf = requestAnimationFrame(() => updatePos());
    return () => cancelAnimationFrame(raf);
  }, [open, selectionKey, updatePos]);

  useEffect(() => {
    if (!open) return;
    updatePos();
    const focusTarget = multiple && showSearch ? inlineSearchRef : searchInputRef;
    focusTarget.current?.focus();
    const onReflow = () => updatePos();
    window.addEventListener('resize', onReflow);
    window.addEventListener('scroll', onReflow, true);

    const observed = [triggerRef.current, multiple ? tagsRef.current : null].filter(
      (el): el is HTMLDivElement => el != null
    );
    const resizeObserver =
      observed.length > 0 && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => updatePos())
        : null;
    observed.forEach((el) => resizeObserver?.observe(el));

    return () => {
      window.removeEventListener('resize', onReflow);
      window.removeEventListener('scroll', onReflow, true);
      resizeObserver?.disconnect();
    };
  }, [open, filtered.length, placement, showSearch, multiple, updatePos, selectionKey]);

  useEffect(() => {
    if (!open) {
      setSearch('');
      return;
    }
    const firstEnabled = filtered.findIndex((o) => !o.disabled);
    setHighlight(firstEnabled === -1 ? 0 : firstEnabled);
    // `filtered` is intentionally read only at open time; live filtering keeps
    // its own highlight reset in the search handler.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const dismissOpen = useCallback(() => {
    setOpen(false);
  }, []);

  const scheduleDismissIfBlurred = useCallback(() => {
    if (suppressBlurDismissRef.current) return;
    window.setTimeout(() => {
      const active = document.activeElement;
      if (
        triggerRef.current?.contains(active) ||
        popupRef.current?.contains(active)
      ) {
        return;
      }
      dismissOpen();
    }, 0);
  }, [dismissOpen]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: globalThis.MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        popupRef.current?.contains(target)
      ) {
        return;
      }
      dismissOpen();
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open, dismissOpen]);

  const handleSelectorMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    suppressBlurDismissRef.current = true;
    window.setTimeout(() => {
      suppressBlurDismissRef.current = false;
    }, 0);
    if (disabled) return;
    if ((e.target as HTMLElement).closest('.vertm-select__tag-remove, .vertm-select__clear')) {
      return;
    }
  };

  const selectOption = (val: string) => {
    if (multiple) {
      const values = current as string[];
      const next = values.includes(val)
        ? values.filter((v) => v !== val)
        : [...values, val];
      updateSelected(next);
    } else {
      updateSelected(val);
      setOpen(false);
    }
    setSearch('');
  };

  const removeTag = (val: string, e: MouseEvent) => {
    e.stopPropagation();
    if (!multiple) return;
    updateSelected((current as string[]).filter((v) => v !== val));
  };

  /** Step to the next enabled option, staying put when none is available. */
  const stepHighlight = useCallback(
    (from: number, step: number) => {
      for (let i = from + step; i >= 0 && i < filtered.length; i += step) {
        if (!filtered[i]!.disabled) return i;
      }
      return from;
    },
    [filtered]
  );

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || (editorial && e.key === 'ArrowRight')) {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => stepHighlight(h, 1));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => stepHighlight(h, -1));
      return;
    }

    // Editorial: options are peer columns; ArrowRight commits the highlight.
    // Default keeps Left/Right as alternate navigation for the horizontal list.
    if (editorial) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const opt = filtered[highlight];
        if (opt && !opt.disabled) selectOption(opt.value);
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setHighlight((h) => stepHighlight(h, -1));
        return;
      }
    } else {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setHighlight((h) => stepHighlight(h, 1));
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setHighlight((h) => stepHighlight(h, -1));
        return;
      }
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const opt = filtered[highlight];
      if (opt && !opt.disabled) selectOption(opt.value);
    }
    if (e.key === 'Escape') setOpen(false);
  };

  const renderOptionLabel = (opt: SelectOption) =>
    typeof opt.label === 'string' ? (
      <VertMText as="span" text={opt.label} className="vertm-select__option-label" />
    ) : (
      opt.label
    );

  const inlineSearch =
    multiple && showSearch && open ? (
      <span
        className="vertm-select__inline-search"
        onClick={(e) => {
          e.stopPropagation();
          inlineSearchRef.current?.focus();
        }}
      >
        <Search
          className="vertm-select__inline-search-icon"
          size="small"
          vertical={vertical}
          rotateForVertical={false}
        />
        <input
          ref={inlineSearchRef}
          className="vertm-select__inline-search-input"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setHighlight(0);
          }}
          onKeyDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          onBlur={scheduleDismissIfBlurred}
          aria-label="Search"
        />
      </span>
    ) : null;

  const arrowIcon = (
    <ChevronRight
      className={['vertm-select__arrow', open && 'vertm-select__arrow--open']
        .filter(Boolean)
        .join(' ')}
      vertical={vertical}
      rotateForVertical={false}
    />
  );

  const clearButton =
    !multiple && allowClear && hasSelection && !disabled ? (
      <button
        type="button"
        className="vertm-select__clear"
        aria-label="Clear"
        onClick={(e) => {
          e.stopPropagation();
          updateSelected('');
        }}
      >
        <Close size="small" vertical={vertical} rotateForVertical={false} />
      </button>
    ) : null;

  const suffix = (
    <span className="vertm-select__suffix">
      {arrowIcon}
    </span>
  );

  const rootStyle = {
    ...(toCssLength(height) ? { '--vertm-select-height': toCssLength(height) } : {}),
    ...style,
  } as CSSProperties;

  const dropdownHeight = toCssLength(listHeight ?? height);
  const dropdownWidth = toCssLength(listWidth);

  return (
    <div
      ref={triggerRef}
      className={[
        'vertm-select',
        'vertm-vertical',
        multiple ? 'vertm-select--multiple' : 'vertm-select--single',
        open && 'vertm-select--open',
        disabled && 'vertm-select--disabled',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={rootStyle}
    >
      <div
        className="vertm-select__selector"
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={open}
        aria-multiselectable={multiple || undefined}
        onClick={() => !disabled && setOpen(!open)}
        onMouseDown={handleSelectorMouseDown}
        onBlur={scheduleDismissIfBlurred}
        onKeyDown={handleKeyDown}
      >
        <div className="vertm-select__body">
          <div className="vertm-select__value">
            {multiple ? (
              <>
                <div ref={tagsRef} className="vertm-select__tags">
                  {selectedOptions.map((opt) => (
                    <span key={opt.value} className="vertm-select__tag">
                      <VertMText
                        as="span"
                        text={optionLabel(opt)}
                        className="vertm-select__tag-text"
                      />
                      {!disabled && (
                        <button
                          type="button"
                          className="vertm-select__tag-remove"
                          aria-label={`Remove ${optionLabel(opt)}`}
                          onClick={(e) => removeTag(opt.value, e)}
                        >
                          <Close size="small" vertical={vertical} rotateForVertical={false} />
                        </button>
                      )}
                    </span>
                  ))}
                  {!hasSelection && (
                    <span className="vertm-select__placeholder">{placeholder}</span>
                  )}
                </div>
                <div className="vertm-select__controls">
                  {inlineSearch}
                  {suffix}
                </div>
              </>
            ) : (
              <>
                {hasSelection ? (
                  <VertMText
                    as="span"
                    text={optionLabel(selectedOptions[0]!)}
                    className="vertm-select__value-text"
                  />
                ) : (
                  <span className="vertm-select__placeholder">{placeholder}</span>
                )}
                <div className="vertm-select__value-footer">
                  {clearButton}
                  {arrowIcon}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {open && (
        <Portal container={config.getPopupContainer}>
          <div
            ref={popupRef}
            className="vertm-select__dropdown"
            onMouseDown={(e) => e.preventDefault()}
            style={{
              position: 'fixed',
              top: pos.top,
              left: pos.left,
              zIndex: config.theme.zIndexPopup,
              ...(dropdownHeight ? { '--vertm-select-list-height': dropdownHeight } : {}),
              ...(dropdownWidth ? { '--vertm-select-list-width': dropdownWidth } : {}),
            }}
          >
            {showSearch && !multiple && (
              <div
                className="vertm-select__search"
                onClick={(e) => {
                  e.stopPropagation();
                  searchInputRef.current?.focus();
                }}
              >
                <Search
                  className="vertm-select__search-icon"
                  size="small"
                  vertical={vertical}
                  rotateForVertical={false}
                />
                <input
                  ref={searchInputRef}
                  className="vertm-select__search-input vertm-vertical"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setHighlight(0);
                  }}
                  onKeyDown={(e) => e.stopPropagation()}
                  onBlur={scheduleDismissIfBlurred}
                  aria-label="Search"
                />
              </div>
            )}
            <ul
              className="vertm-select__list"
              role="listbox"
              aria-multiselectable={multiple || undefined}
            >
              {filtered.map((opt, i) => {
                const isSelected = isOptionSelected(opt.value);
                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    className={[
                      'vertm-select__option',
                      isSelected && 'vertm-select__option--selected',
                      i === highlight && 'vertm-select__option--active',
                      opt.disabled && 'vertm-select__option--disabled',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!opt.disabled) selectOption(opt.value);
                    }}
                  >
                    {renderOptionLabel(opt)}
                    {isSelected && (
                      <Check
                        className="vertm-select__option-check"
                        size="small"
                        vertical={vertical}
                        rotateForVertical={false}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Portal>
      )}
    </div>
  );
}

// AutoComplete reuses Select with showSearch always on
export function VertMAutoComplete(props: Omit<SelectProps, 'showSearch'>) {
  return <VertMSelect {...props} showSearch />;
}

VertMSelect.AutoComplete = VertMAutoComplete;
