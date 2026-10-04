import { describe, expect, it } from 'vitest';
import { firstEnabledIndex, stepEnabledIndex } from './collection.js';

const mixed = [{}, { disabled: true }, {}];

describe('stepEnabledIndex', () => {
  it('steps forward/backward without looping', () => {
    expect(stepEnabledIndex(mixed, 0, 1)).toBe(2);
    expect(stepEnabledIndex(mixed, 2, 1)).toBe(-1);
    expect(stepEnabledIndex(mixed, 2, -1)).toBe(0);
  });

  it('returns -1 when every item is disabled', () => {
    expect(stepEnabledIndex([{ disabled: true }, { disabled: true }], 0, 1)).toBe(-1);
    expect(firstEnabledIndex([{ disabled: true }])).toBe(-1);
  });

  it('wraps with loop and supports end sentinels', () => {
    expect(stepEnabledIndex(mixed, 2, 1, { loop: true })).toBe(0);
    expect(stepEnabledIndex(mixed, 0, -1, { loop: true })).toBe(2);
    expect(stepEnabledIndex(mixed, -1, 1, { loop: true })).toBe(0);
    expect(stepEnabledIndex(mixed, mixed.length, -1, { loop: true })).toBe(2);
  });

  it('returns from when it is the only enabled item under loop', () => {
    const alone = [{ disabled: true }, {}, { disabled: true }];
    expect(stepEnabledIndex(alone, 1, 1, { loop: true })).toBe(1);
  });

  it('returns -1 for an empty list', () => {
    expect(stepEnabledIndex([], 0, 1)).toBe(-1);
    expect(firstEnabledIndex([])).toBe(-1);
  });
});
