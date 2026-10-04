import { describe, expect, it } from 'vitest';
import { computeScrollToReveal, maxColumnScroll, reconcileColumnScroll } from './scroll.js';

describe('computeScrollToReveal', () => {
  it('keeps scroll when the range is already visible', () => {
    expect(
      computeScrollToReveal({ start: 20, end: 40, scroll: 10, viewport: 100, max: 200 })
    ).toBe(10);
  });

  it('scrolls backward when the range starts before the padded viewport', () => {
    expect(
      computeScrollToReveal({ start: 5, end: 20, scroll: 20, viewport: 100, max: 200 })
    ).toBe(1);
  });

  it('scrolls forward and clamps to max', () => {
    expect(
      computeScrollToReveal({ start: 80, end: 120, scroll: 0, viewport: 100, max: 20 })
    ).toBe(20);
    expect(
      computeScrollToReveal({ start: 80, end: 120, scroll: 0, viewport: 100, max: 200 })
    ).toBe(24);
  });
});

describe('reconcileColumnScroll / maxColumnScroll', () => {
  it('computes max column scroll', () => {
    expect(maxColumnScroll(4, 20, 50)).toBe(30);
  });

  it('resets scroll when content is not capped', () => {
    expect(
      reconcileColumnScroll({
        needed: 2,
        maxColumns: 3,
        columnWidth: 20,
        clientWidth: 40,
        scrollLeft: 12,
      })
    ).toBe(0);
  });

  it('clamps scroll when capped content shrinks', () => {
    expect(
      reconcileColumnScroll({
        needed: 5,
        maxColumns: 3,
        columnWidth: 20,
        clientWidth: 40,
        scrollLeft: 100,
      })
    ).toBe(60);
  });
});
