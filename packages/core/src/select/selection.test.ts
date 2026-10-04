import { describe, expect, it } from 'vitest';
import { filterOptionsBySearch, normalizeSelectValue, toggleSelectValue } from './selection.js';

describe('normalizeSelectValue', () => {
  it.each([
    [false, undefined, ''],
    [false, 'a', 'a'],
    [false, ['a', 'b'], 'a'],
    [true, undefined, []],
    [true, 'a', ['a']],
    [true, ['a', 'b'], ['a', 'b']],
  ] as const)('multiple=%s raw=%j → %j', (multiple, raw, expected) => {
    expect(normalizeSelectValue(multiple, raw as string | string[] | undefined)).toEqual(expected);
  });
});

describe('toggleSelectValue', () => {
  it('adds a missing value and removes an existing one', () => {
    expect(toggleSelectValue(['a'], 'b')).toEqual(['a', 'b']);
    expect(toggleSelectValue(['a', 'b'], 'a')).toEqual(['b']);
  });
});

describe('filterOptionsBySearch', () => {
  const options = [
    { label: 'alpha', value: '1' },
    { label: 'beta', value: '2' },
  ];

  it('returns the original array reference for a blank keyword', () => {
    expect(filterOptionsBySearch(options, '  ', (o) => o.label)).toBe(options);
  });

  it('matches labels with Mongolian-aware normalization', () => {
    expect(filterOptionsBySearch(options, 'alp', (o) => o.label)).toEqual([options[0]]);
  });

  it('returns an empty array when nothing matches', () => {
    expect(filterOptionsBySearch(options, 'zzz', (o) => o.label)).toEqual([]);
  });
});
