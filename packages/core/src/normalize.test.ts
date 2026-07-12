import { describe, it, expect } from 'vitest';
import {
  normalizeMongolianText,
  containsMongolianScript,
  buildVertMTextStyles,
  DEFAULT_WRITING_MODE,
} from './normalize.js';

describe('normalizeMongolianText', () => {
  it('normalizes to NFC', () => {
    const text = 'ᠮᠣᠩᠭᠣᠯ';
    expect(normalizeMongolianText(text)).toBe(text);
  });

  it('strips zero-width characters', () => {
    expect(normalizeMongolianText('ᠠ\u200Bᠡ')).toBe('ᠠᠡ');
  });

  it('normalizes line endings', () => {
    expect(normalizeMongolianText('a\r\nb')).toBe('a\nb');
  });
});

describe('containsMongolianScript', () => {
  it('detects Mongolian characters', () => {
    expect(containsMongolianScript('ᠮᠣᠩᠭᠣᠯ')).toBe(true);
  });

  it('returns false for Latin only', () => {
    expect(containsMongolianScript('hello')).toBe(false);
  });
});

describe('buildVertMTextStyles', () => {
  it('defaults to vertical-lr per W3C mlreq', () => {
    const styles = buildVertMTextStyles();
    expect(styles.writingMode).toBe('vertical-lr');
    expect(DEFAULT_WRITING_MODE).toBe('vertical-lr');
  });

  it('applies maxLines truncation', () => {
    const styles = buildVertMTextStyles({ maxLines: 3 });
    expect(styles.WebkitLineClamp).toBe(3);
  });
});
