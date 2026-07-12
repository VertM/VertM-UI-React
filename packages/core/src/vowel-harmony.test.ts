import { describe, it, expect } from 'vitest';
import { genderOfString } from './vowel-harmony.js';
import { normalizeForSearch } from './normalize.js';

describe('genderOfString', () => {
  it('detects masculine words (contains a/o/u)', () => {
    // ᠮᠣᠩᠭᠣᠯ (mongɣol) contains O -> masculine
    expect(genderOfString('\u182E\u1823\u1829\u182D\u1823\u182F')).toBe('masculine');
  });

  it('detects feminine words (contains e/oe/ue/ee)', () => {
    // ᠡᠬᠡ contains E -> feminine
    expect(genderOfString('\u1821\u182C\u1821')).toBe('feminine');
  });

  it('returns neuter when no vowels present', () => {
    expect(genderOfString('\u1828\u182D')).toBe('neuter');
  });
});

describe('normalizeForSearch', () => {
  it('folds O/U to the same key', () => {
    const withO = '\u182E\u1823\u1829'; // ...O...
    const withU = '\u182E\u1824\u1829'; // ...U...
    expect(normalizeForSearch(withO)).toBe(normalizeForSearch(withU));
  });

  it('folds OE/UE to the same key', () => {
    const withOE = '\u182E\u1825';
    const withUE = '\u182E\u1826';
    expect(normalizeForSearch(withOE)).toBe(normalizeForSearch(withUE));
  });

  it('strips FVS/MVS control characters', () => {
    const withFvs = '\u1820\u180B\u1828'; // A + FVS1 + NA
    expect(normalizeForSearch(withFvs)).toBe('\u1820\u1828');
  });

  it('treats NNBSP as a normal space', () => {
    expect(normalizeForSearch('\u1820\u202F\u1828')).toBe('\u1820 \u1828');
  });

  it('does not mutate the original for storage (distinct from NFC normalize)', () => {
    const input = '\u1823'; // O
    expect(normalizeForSearch(input)).toBe('\u1824'); // folded to U
    expect(input).toBe('\u1823'); // original untouched
  });
});
