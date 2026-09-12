import { describe, expect, it } from 'vitest';
import {
  amberTheme,
  cinnabarTheme,
  contrastRatio,
  frostTheme,
  slateTheme,
  steppeTheme,
  cobaltTheme,
  WCAG_AA_LARGE,
  WCAG_AA_NORMAL,
  type VertMTheme,
} from '../src/index.js';

const PRESETS: { name: string; theme: VertMTheme }[] = [
  { name: 'cobalt', theme: cobaltTheme },
  { name: 'cinnabar', theme: cinnabarTheme },
  { name: 'steppe', theme: steppeTheme },
  { name: 'amber', theme: amberTheme },
  { name: 'slate', theme: slateTheme },
  { name: 'frost', theme: frostTheme },
];

describe('native theme presets', () => {
  for (const { name, theme } of PRESETS) {
    describe(name, () => {
      it('keeps caretColor aligned with colorPrimary', () => {
        expect(theme.caretColor).toBe(theme.colorPrimary);
      });

      it('white-on-primary meets AA large (≥ 3)', () => {
        expect(contrastRatio('#ffffff', theme.colorPrimary)).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
      });

      it('body text on container meets AA normal (≥ 4.5)', () => {
        expect(contrastRatio(theme.colorText, theme.colorBgContainer)).toBeGreaterThanOrEqual(
          WCAG_AA_NORMAL
        );
      });

      it('secondary text on container meets AA normal (≥ 4.5)', () => {
        expect(
          contrastRatio(theme.colorTextSecondary, theme.colorBgContainer)
        ).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
      });

      it('link on container meets AA normal (≥ 4.5)', () => {
        expect(contrastRatio(theme.colorLink, theme.colorBgContainer)).toBeGreaterThanOrEqual(
          WCAG_AA_NORMAL
        );
      });
    });
  }
});
