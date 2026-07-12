import { describe, it, expect } from 'vitest';
import { segmentCaretBoundaries, countVerticalUnits } from './mongol-caret-units.js';
import { NA, A, GA, O } from './mongol-letters.js';

describe('segmentCaretBoundaries', () => {
  it('keeps ASCII as one unit per character', () => {
    expect(segmentCaretBoundaries('ab')).toEqual([0, 1, 2]);
  });

  it('merges consonant+vowel into one unit', () => {
    const na = String.fromCharCode(NA, A);
    expect(segmentCaretBoundaries(na)).toEqual([0, 2]);
    expect(countVerticalUnits(na)).toBe(1);
  });

  it('merges consonant+MVS+vowel suffix glue', () => {
    const go = String.fromCharCode(GA, 0x180e, O);
    expect(segmentCaretBoundaries(go)).toEqual([0, 3]);
    expect(countVerticalUnits(go)).toBe(1);
  });

  it('treats newline as its own boundary', () => {
    expect(segmentCaretBoundaries('a\nb')).toEqual([0, 1, 2, 3]);
  });
});
