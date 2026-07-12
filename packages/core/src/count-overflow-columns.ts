import { countVerticalUnits } from './mongol-caret-units.js';

/**
 * Estimate column count when vertical text overflows columnDepth per column.
 * Newlines start a new column segment (TextArea); used for auto-widen up to maxColumns.
 */
export function countOverflowColumns(text: string, columnDepth: number): number {
  const depth = Math.max(1, columnDepth);
  if (!text) return 1;

  if (!text.includes('\n')) {
    return Math.max(1, Math.ceil(countVerticalUnits(text) / depth));
  }

  return text.split('\n').reduce((sum, segment) => {
    const units = countVerticalUnits(segment);
    return sum + Math.max(1, Math.ceil(units / depth));
  }, 0);
}
