import { normalizeForSearch } from '../normalize.js';

export type SelectValue = string | string[];

/** Coerce a raw value to the shape required by `multiple`. */
export function normalizeSelectValue(multiple: boolean, raw: SelectValue | undefined): SelectValue {
  if (multiple) {
    if (Array.isArray(raw)) return raw;
    if (raw) return [raw];
    return [];
  }
  if (Array.isArray(raw)) return raw[0] ?? '';
  return raw ?? '';
}

/** Add `value` if absent, remove it if present. */
export function toggleSelectValue(current: readonly string[], value: string): string[] {
  return current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
}

/**
 * Filter options by a search keyword using Mongolian-aware normalization.
 * Returns `options` itself when the keyword is blank.
 */
export function filterOptionsBySearch<T>(
  options: readonly T[],
  search: string,
  getLabel: (option: T) => string
): readonly T[] {
  if (!search.trim()) return options;
  const key = normalizeForSearch(search);
  return options.filter((o) => normalizeForSearch(getLabel(o)).includes(key));
}
