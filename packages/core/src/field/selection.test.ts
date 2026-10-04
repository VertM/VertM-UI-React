import { describe, expect, it } from 'vitest';
import { mapCaretThroughSanitize, moveSelection, normalizeFieldValue } from './selection.js';

describe('moveSelection', () => {
  it('moves and clamps without extending', () => {
    expect(moveSelection({ start: 2, end: 2, length: 5, delta: -10, extend: false })).toEqual({
      start: 0,
      end: 0,
      direction: 'none',
    });
  });

  it('extends forward from the anchor', () => {
    expect(moveSelection({ start: 2, end: 2, length: 5, delta: 2, extend: true })).toEqual({
      start: 2,
      end: 4,
      direction: 'forward',
    });
  });

  it('extends backward when focus moves before the anchor', () => {
    expect(moveSelection({ start: 3, end: 3, length: 5, delta: -2, extend: true })).toEqual({
      start: 1,
      end: 3,
      direction: 'backward',
    });
  });
});

describe('mapCaretThroughSanitize / normalizeFieldValue', () => {
  it('maps caret through stripped characters before the caret', () => {
    const sanitize = (v: string) => v.replace(/x/g, '');
    expect(mapCaretThroughSanitize('axbx', 3, sanitize)).toBe(2);
  });

  it('strips line breaks for single-line values', () => {
    expect(normalizeFieldValue('a\nb', false)).toBe('ab');
    expect(normalizeFieldValue('a\nb', true)).toContain('\n');
  });
});
