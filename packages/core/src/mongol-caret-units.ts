import {
  isConsonant,
  isVowel,
  isMongolianBlock,
  isControlCharacter,
  NNBSP,
} from './mongol-letters.js';

function codeUnitLen(text: string, index: number): number {
  const cp = text.codePointAt(index)!;
  return cp > 0xffff ? 2 : 1;
}

function skipShapingControls(text: string, index: number): number {
  let i = index;
  while (i < text.length) {
    const cp = text.codePointAt(i)!;
    if (isControlCharacter(cp) || cp === NNBSP) {
      i += codeUnitLen(text, i);
      continue;
    }
    break;
  }
  return i;
}

/** End index (exclusive) of one vertical typographic unit starting at `start`. */
function readUnitEnd(text: string, start: number): number {
  if (text[start] === '\n') return start + 1;

  const cp = text.codePointAt(start)!;
  let end = start + codeUnitLen(text, start);
  end = skipShapingControls(text, end);

  if (isMongolianBlock(cp) && isConsonant(cp)) {
    let scan = end;
    scan = skipShapingControls(text, scan);
    if (scan < text.length) {
      const next = text.codePointAt(scan)!;
      if (isMongolianBlock(next) && isVowel(next)) {
        end = scan + codeUnitLen(text, scan);
        end = skipShapingControls(text, end);
      }
    }
  }

  return end;
}

/**
 * Caret indices that align with visible vertical rows in Mongolian text.
 * Consonant+vowel syllables and trailing FVS/MVS/NNBSP stay in one unit.
 */
export function segmentCaretBoundaries(text: string): number[] {
  const boundaries = [0];
  let i = 0;

  while (i < text.length) {
    const end = readUnitEnd(text, i);
    boundaries.push(end);
    i = end;
  }

  return boundaries;
}

/** Count vertical typographic units (not raw code points). */
export function countVerticalUnits(text: string): number {
  if (!text) return 0;
  return Math.max(0, segmentCaretBoundaries(text).length - 1);
}
