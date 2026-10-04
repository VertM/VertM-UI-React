import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const SRC_DIR = fileURLToPath(new URL('.', import.meta.url));

const DOM_GLOBALS =
  /\b(document|window|navigator|HTMLElement|Element|getComputedStyle|requestAnimationFrame|cancelAnimationFrame|FontFace|ResizeObserver|IntersectionObserver)\b/;

function collectPureTsFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === 'dom') continue;
      collectPureTsFiles(full, out);
      continue;
    }
    if (!entry.endsWith('.ts') || entry.endsWith('.test.ts')) continue;
    out.push(full);
  }
  return out;
}

describe('core purity guard', () => {
  it('keeps non-dom modules free of browser globals', () => {
    const offenders = collectPureTsFiles(SRC_DIR)
      .filter((file) => DOM_GLOBALS.test(readFileSync(file, 'utf8')))
      .map((file) => file.slice(SRC_DIR.length));

    expect(offenders, `DOM globals found in pure modules:\n${offenders.join('\n')}`).toEqual([]);
  });
});
