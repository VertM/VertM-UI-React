import { describe, it, expect } from 'vitest';
import { countOverflowColumns } from './count-overflow-columns.js';

describe('countOverflowColumns', () => {
  it('returns 1 for empty text', () => {
    expect(countOverflowColumns('', 4)).toBe(1);
  });

  it('counts columns from overflow depth using syllable units', () => {
    expect(countOverflowColumns('ᠠᠪᠴ', 4)).toBe(1);
    expect(countOverflowColumns('ᠠᠪᠴᠤ', 4)).toBe(1);
    expect(countOverflowColumns('ᠠᠪᠴᠤᠨ', 4)).toBe(1);
    expect(countOverflowColumns('ᠠᠪᠴᠤᠨᠭᠡ', 4)).toBe(2);
    expect(countOverflowColumns('ᠠᠪᠴᠤᠨᠭᠡᠪ', 4)).toBe(2);
    expect(countOverflowColumns('ᠠᠪᠴᠤᠨᠭᠡᠪᠣ', 4)).toBe(2);
  });

  it('counts newline segments as separate columns', () => {
    expect(countOverflowColumns('ᠠ\nᠪ', 4)).toBe(2);
    expect(countOverflowColumns('ᠠᠪᠴᠤ\nᠨᠭᠡ', 4)).toBe(2);
    expect(countOverflowColumns('ᠠᠪᠴᠤᠨᠭᠡᠪᠣ\nᠠᠪ', 4)).toBe(3);
  });
});
