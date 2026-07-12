import { describe, it, expect } from 'vitest';
import {
  splitStemSuffix,
  isKnownSuffix,
  segmentForLineBreak,
  countBreakOpportunities,
} from './line-break.js';
import { SUFFIXES } from './suffix.js';

const NNBSP = '\u202F';
const MVS = '\u180E';

describe('splitStemSuffix', () => {
  it('splits a stem and NNBSP-connected suffix', () => {
    const result = splitStemSuffix('\u182E\u1823\u1829' + NNBSP + '\u1824\u1828');
    expect(result.stem).toBe('\u182E\u1823\u1829');
    expect(result.suffixes).toEqual(['\u1824\u1828']);
  });

  it('splits on MVS connector too', () => {
    const result = splitStemSuffix('\u1820\u1828' + MVS + '\u1824\u1828');
    expect(result.stem).toBe('\u1820\u1828');
    expect(result.suffixes).toEqual(['\u1824\u1828']);
  });

  it('returns no suffixes for a bare stem', () => {
    const result = splitStemSuffix('\u182E\u1823\u1829');
    expect(result.suffixes).toEqual([]);
  });
});

describe('isKnownSuffix', () => {
  it('recognizes a full suffix constant (with MVS)', () => {
    expect(isKnownSuffix(SUFFIXES.YIN)).toBe(true);
  });

  it('recognizes a suffix body without its connector', () => {
    const body = SUFFIXES.UN.slice(1); // strip leading MVS
    expect(isKnownSuffix(body)).toBe(true);
  });

  it('rejects non-suffix text', () => {
    expect(isKnownSuffix('\u182E\u1823\u1829')).toBe(false);
  });
});

describe('segmentForLineBreak', () => {
  it('marks break opportunities at regular spaces', () => {
    const units = segmentForLineBreak('\u1820\u1828 \u1821\u1828 \u1822');
    expect(units).toHaveLength(3);
    expect(units[0].breakBefore).toBe(false);
    expect(units[1].breakBefore).toBe(true);
    expect(units[2].breakBefore).toBe(true);
  });

  it('does NOT break at NNBSP (suffix stays glued to stem)', () => {
    const text = '\u182E\u1823\u1829' + NNBSP + '\u1824\u1828';
    const units = segmentForLineBreak(text);
    expect(units).toHaveLength(1);
    expect(units[0].text).toBe(text);
  });

  it('flags trailing hanging punctuation', () => {
    const units = segmentForLineBreak('\u1820\u1828\u1803'); // ...full stop
    expect(units[0].hanging).toBe(true);
  });
});

describe('countBreakOpportunities', () => {
  it('counts spaces as break points', () => {
    expect(countBreakOpportunities('\u1820 \u1821 \u1822')).toBe(2);
  });

  it('ignores NNBSP-connected suffixes', () => {
    expect(countBreakOpportunities('\u1820' + NNBSP + '\u1824\u1828')).toBe(0);
  });
});
