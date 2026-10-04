import { describe, expect, it } from 'vitest';
import { formatCountdown, formatFixed } from './format.js';

describe('formatCountdown', () => {
  it('formats hours, minutes, and seconds', () => {
    expect(formatCountdown(3661000)).toBe('01:01:01');
  });

  it('pads units to two digits', () => {
    expect(formatCountdown(5000)).toBe('00:00:05');
  });
});

describe('formatFixed', () => {
  it('formats with precision and passes through without it', () => {
    expect(formatFixed(1.2345, 2)).toBe('1.23');
    expect(formatFixed(7)).toBe(7);
  });
});
