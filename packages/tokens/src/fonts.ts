/**
 * Font presets — the single source of truth for switchable Mongolian fonts.
 *
 * Licensing note: only fonts under a redistributable license (e.g. OFL) are
 * shipped as webfonts by `@vertm/styles` (`bundled: true`). Proprietary fonts
 * such as Menksoft Qagan / Delehi / Onon are referenced by family name only —
 * they render if the user's OS has them, or the user can self-host their own
 * licensed copy and register it at runtime via `registerFont()`.
 */
export interface FontPreset {
  /** Stable id used by APIs and UI. */
  id: string;
  /** Human-readable label. */
  label: string;
  /** CSS `font-family` stack applied when this preset is selected. */
  fontFamily: string;
  /** True when `@vertm/styles` bundles this font as a webfont. */
  bundled: boolean;
}

export const FONT_PRESETS = {
  /** Bundled, OFL-1.1, complete OpenType shaping. Default. */
  notoSansMongolian: {
    id: 'notoSansMongolian',
    label: 'Noto Sans Mongolian',
    fontFamily:
      '"Noto Sans Mongolian", "Mongolian Baiti", "Menksoft Qagan", sans-serif',
    bundled: true,
  },
  /** Whatever Mongolian font the OS provides (not bundled). */
  system: {
    id: 'system',
    label: 'System Mongolian font',
    fontFamily: '"Mongolian Baiti", "Menksoft Qagan", "Noto Sans Mongolian", sans-serif',
    bundled: false,
  },
} satisfies Record<string, FontPreset>;

export type FontPresetId = keyof typeof FONT_PRESETS;

/** Default font-family stack (Noto Sans Mongolian first). */
export const DEFAULT_FONT_FAMILY = FONT_PRESETS.notoSansMongolian.fontFamily;

/** Resolve a preset id (or a raw font-family string) to a font-family stack. */
export function resolveFontFamily(font: FontPresetId | string): string {
  if (font in FONT_PRESETS) {
    return FONT_PRESETS[font as FontPresetId].fontFamily;
  }
  return font;
}
