import { describe, expect, it } from 'vitest';
import { computeSplitRatio } from './splitter.js';

const rect = { top: 0, left: 0, width: 100, height: 200 };

describe('computeSplitRatio', () => {
  it('uses the x axis for column splits', () => {
    expect(computeSplitRatio({ x: 40, y: 0, rect, axis: 'column' })).toBe(0.4);
  });

  it('uses the y axis for row splits', () => {
    expect(computeSplitRatio({ x: 0, y: 100, rect, axis: 'row' })).toBe(0.5);
  });

  it('clamps to the default min/max band', () => {
    expect(computeSplitRatio({ x: 0, y: 0, rect, axis: 'column' })).toBe(0.15);
    expect(computeSplitRatio({ x: 100, y: 0, rect, axis: 'column' })).toBe(0.85);
  });
});
