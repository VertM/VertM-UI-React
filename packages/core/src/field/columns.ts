import { countOverflowColumns } from '../count-overflow-columns.js';

export interface FieldColumnsInput {
  /** Normalized field text. */
  text: string;
  rows: number;
  columnDepth: number;
  maxColumns: number;
}

export interface FieldColumns {
  /** Columns the content needs. */
  needed: number;
  /** Columns actually rendered. */
  effective: number;
  /** Minimum columns (rows for multiline, otherwise 1). */
  min: number;
  /** Field auto-grows up to maxColumns. */
  autoColumns: boolean;
  /** Content exceeds maxColumns and scrolls along the block axis. */
  capped: boolean;
  /** Field grew beyond its minimum width. */
  wide: boolean;
}

export function computeFieldColumns(input: FieldColumnsInput): FieldColumns {
  const { text, rows, columnDepth, maxColumns } = input;
  const isMultiline = rows > 1;
  const min = isMultiline ? Math.max(1, rows) : 1;
  const content = countOverflowColumns(text, columnDepth);
  const needed = maxColumns <= 1 ? (isMultiline ? min : content) : Math.max(min, content);
  const effective = maxColumns <= 1 ? (isMultiline ? min : Math.min(1, needed)) : Math.min(maxColumns, needed);
  const autoColumns = maxColumns > 1;
  const capped = autoColumns && needed > maxColumns;
  const wide = autoColumns && effective > min;
  return { needed, effective, min, autoColumns, capped, wide };
}
