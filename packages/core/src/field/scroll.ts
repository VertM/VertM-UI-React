/**
 * Scroll offset that brings [start, end] into a viewport of `viewport` length,
 * keeping `pad` px of breathing room. Returns `scroll` unchanged when already visible.
 */
export function computeScrollToReveal(args: {
  start: number;
  end: number;
  scroll: number;
  viewport: number;
  max: number;
  pad?: number;
}): number {
  const { start, end, scroll, viewport, max, pad = 4 } = args;
  if (start < scroll + pad) return Math.max(0, start - pad);
  if (end > scroll + viewport - pad) return Math.min(end - viewport + pad, max);
  return scroll;
}

/** Max horizontal scroll for a capped field: needed columns × column width − visible width. */
export function maxColumnScroll(needed: number, columnWidth: number, clientWidth: number): number {
  return Math.max(0, needed * columnWidth - clientWidth);
}

/** Clamp/reset the block-axis scroll after the text changes (no DOM measurement). */
export function reconcileColumnScroll(args: {
  needed: number;
  maxColumns: number;
  columnWidth: number;
  clientWidth: number;
  scrollLeft: number;
}): number {
  const { needed, maxColumns, columnWidth, clientWidth, scrollLeft } = args;
  const capped = maxColumns > 1 && needed > maxColumns;
  const max = capped ? maxColumnScroll(needed, columnWidth, clientWidth) : 0;
  if (!capped || max === 0) return 0;
  return scrollLeft > max ? max : scrollLeft;
}
