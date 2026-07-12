import { describe, it, expect } from 'vitest';
import { MONGOLIAN_WORD_BANK } from './__fixtures__/word-bank.js';
import { normalizeForSearch, normalizeMongolianText, containsMongolianScript } from './normalize.js';
import { genderOfString } from './vowel-harmony.js';
import { splitStemSuffix } from './line-break.js';

describe('word bank regression (210 real Unicode words, CC0 suragch/mongol_code)', () => {
  it('has a non-trivial fixture set', () => {
    expect(MONGOLIAN_WORD_BANK.length).toBeGreaterThan(150);
  });

  it('every fixture is Mongolian script', () => {
    for (const word of MONGOLIAN_WORD_BANK) {
      expect(containsMongolianScript(word)).toBe(true);
    }
  });

  it('normalizeForSearch is idempotent across the bank', () => {
    for (const word of MONGOLIAN_WORD_BANK) {
      const once = normalizeForSearch(word);
      expect(normalizeForSearch(once)).toBe(once);
    }
  });

  it('normalizeForSearch never lengthens the string', () => {
    for (const word of MONGOLIAN_WORD_BANK) {
      expect(normalizeForSearch(word).length).toBeLessThanOrEqual(
        normalizeMongolianText(word).length
      );
    }
  });

  it('genderOf returns a valid class for every word', () => {
    const valid = new Set(['masculine', 'feminine', 'neuter']);
    for (const word of MONGOLIAN_WORD_BANK) {
      expect(valid.has(genderOfString(word))).toBe(true);
    }
  });

  it('splitStemSuffix round-trips (stem is a prefix of the word)', () => {
    for (const word of MONGOLIAN_WORD_BANK) {
      const { stem } = splitStemSuffix(word);
      expect(word.startsWith(stem)).toBe(true);
    }
  });
});
