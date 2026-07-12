/**
 * Traditional Mongolian line breaking and suffix segmentation.
 *
 * Mongolian is written vertically with lines flowing left-to-right. Line breaks
 * occur at word boundaries (regular spaces), while a suffix attached to its stem
 * via the Narrow No-Break Space (NNBSP, U+202F) must stay on the same line and
 * still trigger stem-final shaping. Punctuation is expected to hang rather than
 * start a new line. This module provides framework-agnostic helpers that the UI
 * components (line wrapping, hanging punctuation) build on.
 *
 * References: W3C Mongolian Layout Requirements (mlreq), UAX #14 line breaking.
 * Suffix data adapted from suragch/mongol_code (CC0-1.0, GB/T 25914-2023).
 */
import { ALL_SUFFIXES } from './suffix.js';
import { MVS, NNBSP } from './mongol-letters.js';

const NNBSP_CHAR = String.fromCharCode(NNBSP); // U+202F
const MVS_CHAR = String.fromCharCode(MVS); // U+180E

/** Trailing punctuation that should hang at the end of a line, not wrap alone. */
const HANGING_PUNCTUATION = new Set([
  '\u1802', // Mongolian comma
  '\u1803', // Mongolian full stop
  '\u1804', // Mongolian colon
  '\u1805', // Mongolian four dots
  ',',
  '.',
  '\u3001', // ideographic comma
  '\u3002', // ideographic full stop
]);

const SUFFIX_SET = new Set(ALL_SUFFIXES);
// Suffix bodies without the leading MVS, for matching NNBSP-connected forms.
const SUFFIX_BODY_SET = new Set(
  ALL_SUFFIXES.map((s) => (s.startsWith(MVS_CHAR) ? s.slice(1) : s))
);

export interface StemSuffix {
  stem: string;
  suffixes: string[];
}

/**
 * Split a word into its stem and any attached suffixes.
 * Suffixes are connected by NNBSP (U+202F) or MVS (U+180E).
 */
export function splitStemSuffix(word: string): StemSuffix {
  if (!word) return { stem: '', suffixes: [] };

  const parts = word.split(new RegExp(`[${NNBSP_CHAR}${MVS_CHAR}]`));
  const [stem, ...suffixes] = parts;
  return {
    stem,
    suffixes: suffixes.filter((s) => s.length > 0),
  };
}

/**
 * Check whether a string matches a known standard suffix
 * (with or without its leading MVS/NNBSP connector).
 */
export function isKnownSuffix(candidate: string): boolean {
  if (!candidate) return false;
  if (SUFFIX_SET.has(candidate)) return true;
  const body = candidate.replace(new RegExp(`^[${NNBSP_CHAR}${MVS_CHAR}]`), '');
  return SUFFIX_BODY_SET.has(body);
}

export interface BreakUnit {
  /** The text of this segment. */
  text: string;
  /** Whether a line break is allowed before this unit. */
  breakBefore: boolean;
  /** Whether this unit is trailing punctuation that should hang. */
  hanging: boolean;
}

/**
 * Segment text into line-break units for vertical Mongolian layout.
 *
 * - Regular spaces (U+0020) are break opportunities and are attached as leading
 *   whitespace to the following unit (breakBefore = true).
 * - NNBSP (U+202F) does NOT create a break opportunity: the suffix stays glued
 *   to its stem within the same unit.
 * - Trailing hanging punctuation is flagged so callers can keep it on the line.
 */
export function segmentForLineBreak(text: string): BreakUnit[] {
  if (!text) return [];

  const units: BreakUnit[] = [];
  // Split on breakable whitespace only. Note: JS "\s" also matches NNBSP
  // (U+202F), so we use an explicit class that EXCLUDES NNBSP to keep suffixes
  // glued to their stems.
  const rawParts = text.split(/([ \t\n\r\f]+)/);

  let pendingBreak = false;
  for (const part of rawParts) {
    if (part === '') continue;

    if (/^[ \t\n\r\f]+$/.test(part)) {
      // Regular whitespace = break opportunity before the next unit.
      pendingBreak = true;
      continue;
    }

    const lastChar = part[part.length - 1];
    units.push({
      text: part,
      breakBefore: pendingBreak,
      hanging: HANGING_PUNCTUATION.has(lastChar),
    });
    pendingBreak = false;
  }

  return units;
}

/**
 * Return the count of break opportunities in a text run.
 * Useful for testing / diagnostics.
 */
export function countBreakOpportunities(text: string): number {
  return segmentForLineBreak(text).filter((u) => u.breakBefore).length;
}
