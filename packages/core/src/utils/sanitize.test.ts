import { describe, expect, it } from 'vitest';
import { stripNonPrintableAscii } from './sanitize.js';

describe('stripNonPrintableAscii', () => {
  it('keeps printable ASCII', () => {
    expect(stripNonPrintableAscii('Ab1! ')).toBe('Ab1! ');
  });

  it('strips non-ASCII and control characters', () => {
    expect(stripNonPrintableAscii('a蒙\nb')).toBe('ab');
  });

  it('returns an empty string when nothing remains', () => {
    expect(stripNonPrintableAscii('ᠮᠣᠩᠭᠣᠯ')).toBe('');
  });
});
