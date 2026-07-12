import { describe, it, expect } from 'vitest';
import { buildVerticalCaretLayout, moveVerticalCaret } from './vertical-caret-nav.js';

describe('buildVerticalCaretLayout', () => {
  it('lays out wrapped columns by depth', () => {
    const slots = buildVerticalCaretLayout('abcde', 2);
    expect(slots).toEqual([
      { index: 0, col: 0, row: 0 },
      { index: 1, col: 0, row: 1 },
      { index: 2, col: 0, row: 2 },
      { index: 3, col: 1, row: 1 },
      { index: 4, col: 1, row: 2 },
      { index: 5, col: 2, row: 1 },
    ]);
  });

  it('treats newlines as hard column breaks', () => {
    const slots = buildVerticalCaretLayout('ab\ncd', 4);
    expect(slots[2]).toEqual({ index: 2, col: 0, row: 2 });
    expect(slots[3]).toEqual({ index: 3, col: 1, row: 0 });
    expect(slots[5]).toEqual({ index: 5, col: 1, row: 2 });
  });

  it('counts consonant+vowel as one vertical row', () => {
    const slots = buildVerticalCaretLayout('\u1828\u1820', 4);
    expect(slots).toEqual([
      { index: 0, col: 0, row: 0 },
      { index: 2, col: 0, row: 1 },
    ]);
  });
});

describe('moveVerticalCaret', () => {
  it('moves up and down within a column', () => {
    expect(moveVerticalCaret('abcde', 2, 2, 'up')).toBe(1);
    expect(moveVerticalCaret('abcde', 2, 1, 'down')).toBe(2);
    expect(moveVerticalCaret('abcde', 2, 2, 'down')).toBe(2);
  });

  it('moves up from end-of-text within the same column', () => {
    expect(moveVerticalCaret('ab\ncde\nfgh', 4, 10, 'up')).toBe(9);
    expect(moveVerticalCaret('ab\ncd', 4, 5, 'up')).toBe(4);
  });

  it('moves up by syllable unit for consonant+vowel Mongolian', () => {
    const na = '\u1828\u1820'; // ᠨᠠ
    expect(moveVerticalCaret(na, 4, 2, 'up')).toBe(0);
    expect(moveVerticalCaret(na, 4, 1, 'up')).toBe(0);
    expect(moveVerticalCaret(na, 4, 0, 'down')).toBe(2);
  });

  it('moves left and right between columns', () => {
    expect(moveVerticalCaret('abcde', 2, 2, 'right')).toBe(4);
    expect(moveVerticalCaret('abcde', 2, 4, 'left')).toBe(2);
    expect(moveVerticalCaret('ab\ncd', 4, 3, 'left')).toBe(0);
    expect(moveVerticalCaret('ab\ncd', 4, 1, 'right')).toBe(4);
  });
});
