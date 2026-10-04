import { describe, expect, it } from 'vitest';
import { buildPageList } from './pagination.js';

describe('buildPageList', () => {
  it('lists every page when totalPages ≤ 7', () => {
    expect(buildPageList(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('keeps the window near the start', () => {
    expect(buildPageList(2, 20)).toEqual([1, 2, 3, 'ellipsis', 20]);
  });

  it('keeps the window in the middle', () => {
    expect(buildPageList(10, 20)).toEqual([1, 'ellipsis', 9, 10, 11, 'ellipsis', 20]);
  });

  it('keeps the window near the end', () => {
    expect(buildPageList(19, 20)).toEqual([1, 'ellipsis', 18, 19, 20]);
  });
});
