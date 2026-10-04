import { describe, expect, it } from 'vitest';
import { BREAKPOINTS, resolveResponsiveValue } from './breakpoints.js';

describe('BREAKPOINTS', () => {
  it('keeps antd-compatible min-widths', () => {
    expect(BREAKPOINTS.md).toBe(768);
    expect(BREAKPOINTS.xxl).toBe(1600);
  });
});

describe('resolveResponsiveValue', () => {
  it('prefers the largest matching breakpoint', () => {
    expect(
      resolveResponsiveValue(4, { sm: 8, lg: 12 }, { sm: true, md: true, lg: true })
    ).toBe(12);
  });

  it('falls back to the base value', () => {
    expect(resolveResponsiveValue(4, { lg: 12 }, { sm: true })).toBe(4);
  });
});
