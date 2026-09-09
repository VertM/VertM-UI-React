import {
  useMemo,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from '@vertm/icons';
import { useIsVertical } from '../config/context.js';
import { useControlled } from '../hooks/useControlled.js';
import { VertMButton } from '../button/Button.js';
import { VertMText } from '../VertMText.js';

export type PaginationLayout = 'horizontal' | 'vertical';

export interface PaginationProps {
  current?: number;
  defaultCurrent?: number;
  onChange?: (page: number, pageSize: number) => void;
  total?: number;
  pageSize?: number;
  defaultPageSize?: number;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  showQuickJumper?: boolean;
  /** Show first / last page controls (default on in vertical layout). */
  showFirstLast?: boolean;
  disabled?: boolean;
  /** Page list direction; default `vertical` (Mongolian column). `horizontal` uses classic row layout with English labels. */
  layout?: PaginationLayout;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

function buildPageList(current: number, totalPages: number): (number | 'ellipsis')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [1];
  const left = Math.max(current - 1, 2);
  const right = Math.min(current + 1, totalPages - 1);

  if (left > 2) pages.push('ellipsis');
  for (let i = left; i <= right; i += 1) pages.push(i);
  if (right < totalPages - 1) pages.push('ellipsis');
  pages.push(totalPages);
  return pages;
}

export function VertMPagination({
  current,
  defaultCurrent = 1,
  onChange,
  total = 0,
  pageSize,
  defaultPageSize = 10,
  showSizeChanger = false,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  showQuickJumper = false,
  showFirstLast,
  disabled = false,
  layout,
  className = '',
  style,
}: PaginationProps) {
  const isVerticalWriting = useIsVertical();
  const isHorizontalLayout = layout === 'horizontal';
  const showEdgePages = showFirstLast ?? !isHorizontalLayout;
  const [page, setPage] = useControlled(current, defaultCurrent);
  const [innerPageSize, setInnerPageSize] = useState(defaultPageSize);
  const [jumpValue, setJumpValue] = useState('');

  const resolvedPageSize = pageSize ?? innerPageSize;
  const totalPages = Math.max(1, Math.ceil(total / resolvedPageSize));

  const safePage = Math.min(Math.max(page, 1), totalPages);
  const pages = useMemo(
    () => buildPageList(safePage, totalPages),
    [safePage, totalPages]
  );

  const goTo = (next: number, size = resolvedPageSize) => {
    const clamped = Math.min(Math.max(next, 1), Math.max(1, Math.ceil(total / size) || 1));
    setPage(clamped);
    onChange?.(clamped, size);
  };

  const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const size = Number(e.target.value);
    if (pageSize == null) setInnerPageSize(size);
    goTo(1, size);
  };

  const handleJump = () => {
    if (jumpValue.trim() === '') return;
    const value = Number(jumpValue);
    if (!Number.isFinite(value)) return;
    goTo(value);
    setJumpValue('');
  };

  const handleJumpKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleJump();
    }
  };

  const pageList = (
    <ul className="vertm-pagination__list">
      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <li key={`ellipsis-${i}`} className="vertm-pagination__ellipsis" aria-hidden>
            …
          </li>
        ) : (
          <li key={p}>
            <button
              type="button"
              className={[
                'vertm-pagination__item',
                p === safePage && 'vertm-pagination__item--active',
              ]
                .filter(Boolean)
                .join(' ')}
              disabled={disabled}
              aria-current={p === safePage ? 'page' : undefined}
              onClick={() => goTo(p)}
            >
              {p}
            </button>
          </li>
        )
      )}
    </ul>
  );

  const sizeChanger = showSizeChanger && (
    <label className="vertm-pagination__size">
      {isHorizontalLayout ? (
        <span className="vertm-pagination__size-label">Items</span>
      ) : (
        <VertMText as="span" text="ᠨᠢᠭᠤᠷ ᠪᠦᠷᠢ" className="vertm-pagination__size-label" />
      )}
      <select
        value={resolvedPageSize}
        disabled={disabled}
        onChange={handleSizeChange}
        className="vertm-pagination__size-select"
      >
        {pageSizeOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {isHorizontalLayout && (
        <span className="vertm-pagination__size-suffix">/ page</span>
      )}
    </label>
  );

  const quickJumper = showQuickJumper && (
    <label className="vertm-pagination__jumper">
      {isHorizontalLayout ? (
        <span className="vertm-pagination__jumper-label">Go to</span>
      ) : (
        <VertMText as="span" text="ᠦᠰᠦᠷᠬᠦ " className="vertm-pagination__jumper-label" />
      )}
      <input
        type="number"
        min={1}
        max={totalPages}
        value={jumpValue}
        disabled={disabled}
        className="vertm-pagination__jumper-input"
        onChange={(e) => setJumpValue(e.target.value)}
        onKeyDown={handleJumpKeyDown}
        onBlur={handleJump}
      />
    </label>
  );

  const totalNode = (
    <span className="vertm-pagination__total">
      {isHorizontalLayout ? (
        <>
          <span className="vertm-pagination__total-label">Total</span>
          <span className="vertm-pagination__total-num">{total}</span>
          <span className="vertm-pagination__total-suffix">items</span>
        </>
      ) : (
        <>
          <VertMText as="span" text="ᠨᠡᠢᠲᠡ " className="vertm-pagination__total-label" />
          <span className="vertm-pagination__total-num">{total}</span>
          <VertMText as="span" text="ᠵᠤᠷᠪᠤᠰ  " className="vertm-pagination__total-label" />
        </>
      )}
    </span>
  );

  if (isHorizontalLayout) {
    return (
      <div
        className={['vertm-pagination', 'vertm-pagination--horizontal', className]
          .filter(Boolean)
          .join(' ')}
        style={style}
        aria-label="Pagination"
      >
        {showEdgePages && (
          <VertMButton
            type="default"
            size="small"
            disabled={disabled || safePage <= 1}
            className="vertm-pagination__first"
            aria-label="First page"
            onClick={() => goTo(1)}
          >
            First
          </VertMButton>
        )}
        <VertMButton
          type="default"
          size="small"
          disabled={disabled || safePage <= 1}
          className="vertm-pagination__prev"
          aria-label="Previous page"
          icon={
            <ChevronLeft vertical={false} rotateForVertical={false} size="small" />
          }
          onClick={() => goTo(safePage - 1)}
        />
        {pageList}
        <VertMButton
          type="default"
          size="small"
          disabled={disabled || safePage >= totalPages}
          className="vertm-pagination__next"
          aria-label="Next page"
          icon={
            <ChevronRight vertical={false} rotateForVertical={false} size="small" />
          }
          onClick={() => goTo(safePage + 1)}
        />
        {showEdgePages && (
          <VertMButton
            type="default"
            size="small"
            disabled={disabled || safePage >= totalPages}
            className="vertm-pagination__last"
            aria-label="Last page"
            onClick={() => goTo(totalPages)}
          >
            Last
          </VertMButton>
        )}
        {sizeChanger}
        {quickJumper}
        {totalNode}
      </div>
    );
  }

  return (
    <div
      className={['vertm-pagination', 'vertm-pagination--vertical', className]
        .filter(Boolean)
        .join(' ')}
      style={style}
      data-vertical-writing={isVerticalWriting || undefined}
      aria-label="Pagination"
    >
      {showEdgePages && (
        <VertMButton
          type="default"
          size="small"
          disabled={disabled || safePage <= 1}
          className="vertm-pagination__first"
          aria-label="First page"
          onClick={() => goTo(1)}
        >
          <VertMText as="span" text="ᠡᠬᠢᠨ ᠎ᠦ  ᠨᠢᠭᠤᠷ" className="vertm-pagination__edge-label" />
        </VertMButton>
      )}

      <VertMButton
        type="default"
        size="small"
        disabled={disabled || safePage <= 1}
        className="vertm-pagination__prev"
        aria-label="Previous page"
        icon={<ChevronUp vertical={false} rotateForVertical={false} size="small" />}
        onClick={() => goTo(safePage - 1)}
      />

      {pageList}

      <VertMButton
        type="default"
        size="small"
        disabled={disabled || safePage >= totalPages}
        className="vertm-pagination__next"
        aria-label="Next page"
        icon={<ChevronDown vertical={false} rotateForVertical={false} size="small" />}
        onClick={() => goTo(safePage + 1)}
      />

      {showEdgePages && (
        <VertMButton
          type="default"
          size="small"
          disabled={disabled || safePage >= totalPages}
          className="vertm-pagination__last"
          aria-label="Last page"
          onClick={() => goTo(totalPages)}
        >
          <VertMText as="span" text="ᠡᠴᠦᠰ ᠎ᠦᠨ ᠨᠢᠭᠦᠷ " className="vertm-pagination__edge-label" />
        </VertMButton>
      )}

      {sizeChanger}
      {quickJumper}
      {totalNode}
    </div>
  );
}
