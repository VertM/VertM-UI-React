import { normalizeMongolianText } from '../normalize.js';

export interface FieldSelection {
  start: number;
  end: number;
  direction: 'forward' | 'backward' | 'none';
}

/** Move (or extend) a selection by `delta` code units, clamped to [0, length]. */
export function moveSelection(args: {
  start: number;
  end: number;
  length: number;
  delta: number;
  extend: boolean;
}): FieldSelection {
  const { start, end, length, delta, extend } = args;
  const clamp = (n: number) => Math.max(0, Math.min(n, length));

  if (extend) {
    const anchor = start;
    const focus = clamp(end + delta);
    if (focus < anchor) {
      return { start: focus, end: anchor, direction: 'backward' };
    }
    return { start: anchor, end: focus, direction: 'forward' };
  }

  const next = clamp(start + delta);
  return { start: next, end: next, direction: 'none' };
}

/** Caret position after `sanitize` strips characters before the raw caret. */
export function mapCaretThroughSanitize(
  raw: string,
  rawCaret: number,
  sanitize: (v: string) => string
): number {
  return sanitize(raw.slice(0, rawCaret)).length;
}

/** Strip line breaks for single-line fields, then normalize. */
export function normalizeFieldValue(raw: string, multiline: boolean): string {
  return normalizeMongolianText(multiline ? raw : raw.replace(/[\r\n]/g, ''));
}
