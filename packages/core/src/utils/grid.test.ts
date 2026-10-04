import { describe, expect, it } from 'vitest';
import { resolveGutter, spanToWidth } from './grid.js';

describe('resolveGutter', () => {
  it('returns zeros when gutter is omitted', () => {
    expect(resolveGutter(undefined, false)).toEqual({ row: 0, col: 0 });
  });

  it('splits a scalar gutter evenly', () => {
    expect(resolveGutter(16, false)).toEqual({ row: 8, col: 8 });
  });

  it('swaps tuple axes for vertical writing', () => {
    expect(resolveGutter([10, 20], true)).toEqual({ row: 20, col: 10 });
  });
});

describe('spanToWidth', () => {
  it('maps the 24-column grid to a percentage', () => {
    expect(spanToWidth(12)).toBe('50%');
    expect(spanToWidth(6)).toBe('25%');
  });
});
