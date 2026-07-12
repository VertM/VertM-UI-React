/**
 * Normalize Mongolian text to NFC Unicode form.
 * Strips zero-width characters and normalizes whitespace.
 */
export function normalizeMongolianText(text: string): string {
  if (!text) return '';

  return text
    .normalize('NFC')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');
}

/**
 * Check if a string contains Mongolian script characters (U+1800–U+18AF).
 */
export function containsMongolianScript(text: string): boolean {
  return /[\u1800-\u18AF]/.test(text);
}

/**
 * Normalize Mongolian text for search / indexing.
 *
 * Traditional Mongolian has vowels that look identical in most positions but
 * carry distinct code points (the classic O/U and OE/UE ambiguity described in
 * the Unicode Mongolian layout debates). Users routinely type the "wrong" one,
 * so exact-code-point matching fails. This folds visually-equivalent vowels to
 * a single representative and strips shaping-only control characters, producing
 * a stable key for lookup. It is NOT meant for storage or display — store the
 * original NFC text and only use this for comparison / indexing.
 */
export function normalizeForSearch(text: string): string {
  if (!text) return '';

  let out = normalizeMongolianText(text);

  // Strip shaping-only control characters: FVS1–4, MVS, NIRUGU (U+180A–U+180F).
  out = out.replace(/[\u180A-\u180F]/g, '');

  // Treat NNBSP (suffix connector) as a normal space for matching.
  out = out.replace(/\u202F/g, ' ');

  // Fold visually-equivalent vowels:
  //   O (U+1823) -> U (U+1824)
  //   OE (U+1825) -> UE (U+1826)
  out = out
    .replace(/\u1823/g, '\u1824')
    .replace(/\u1825/g, '\u1826');

  return out;
}

/**
 * Default font stack for Mongolian text.
 */
export const DEFAULT_VERTM_FONT_STACK =
  '"Noto Sans Mongolian", "Mongolian Baiti", "Menksoft Qagan", sans-serif';

export type WritingMode = 'vertical-lr' | 'vertical-rl';

export const DEFAULT_WRITING_MODE: WritingMode = 'vertical-lr';

export interface VertMTextStyleOptions {
  fontFamily?: string;
  fontSize?: number;
  lineHeight?: number;
  writingMode?: WritingMode;
  maxLines?: number;
}

/**
 * Build inline CSS style object for vertical Mongolian text.
 */
export function buildVertMTextStyles(options: VertMTextStyleOptions = {}): Record<string, string | number> {
  const {
    fontFamily = DEFAULT_VERTM_FONT_STACK,
    fontSize = 16,
    lineHeight = 1.6,
    writingMode = DEFAULT_WRITING_MODE,
    maxLines,
  } = options;

  const styles: Record<string, string | number> = {
    writingMode,
    fontFamily,
    fontSize: `${fontSize}px`,
    lineHeight,
    // `sideways` lays the run out with the (mature) horizontal shaper and
    // rotates it 90°, which yields more reliable Mongolian shaping than
    // `mixed` across browsers (matches how mt.onon.cn renders).
    textOrientation: 'sideways',
    // Preserve explicit newlines (Enter in the input) as forced column breaks
    // while still allowing normal wrapping.
    whiteSpace: 'pre-wrap',
  };

  if (maxLines !== undefined && maxLines > 0) {
    styles.overflow = 'hidden';
    styles.display = '-webkit-box';
    styles.WebkitBoxOrient = 'vertical';
    styles.WebkitLineClamp = maxLines;
  }

  return styles;
}
