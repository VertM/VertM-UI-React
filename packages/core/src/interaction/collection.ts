export interface NavigableItem {
  disabled?: boolean;
}

/**
 * Index of the next enabled item stepping from `from` (exclusive).
 * `from` may be -1 or `items.length` to search from either end.
 * Returns -1 when no enabled item is reachable.
 * With `loop`, the search wraps around and may return `from` itself
 * when it is the only enabled item.
 */
export function stepEnabledIndex(
  items: readonly NavigableItem[],
  from: number,
  step: 1 | -1,
  options?: { loop?: boolean }
): number {
  const total = items.length;
  if (total === 0) return -1;

  if (options?.loop) {
    for (let i = 1; i <= total; i += 1) {
      const index = (from + step * i + total * i) % total;
      if (!items[index]?.disabled) return index;
    }
    return -1;
  }

  for (let i = from + step; i >= 0 && i < total; i += step) {
    if (!items[i]!.disabled) return i;
  }
  return -1;
}

/** First enabled index, or -1. Equivalent to stepEnabledIndex(items, -1, 1). */
export function firstEnabledIndex(items: readonly NavigableItem[]): number {
  return stepEnabledIndex(items, -1, 1);
}
