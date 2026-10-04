import { DEFAULT_VERTM_FONT_STACK } from '../normalize.js';

export interface FontDetectResult {
  available: boolean;
  loadedFonts: string[];
  recommendation: string;
}

const MONGOL_FONTS = [
  'Noto Sans Mongolian',
  'Mongolian Baiti',
  'Menksoft Qagan',
];

/**
 * Detect which Mongolian fonts are available in the current environment.
 */
export async function detectMongolFonts(): Promise<FontDetectResult> {
  if (typeof document === 'undefined' || !document.fonts?.check) {
    return {
      available: false,
      loadedFonts: [],
      recommendation: 'Load Noto Sans Mongolian via Web Font or system font',
    };
  }

  await document.fonts.ready;

  const loadedFonts = MONGOL_FONTS.filter((font) =>
    document.fonts.check(`16px "${font}"`)
  );

  return {
    available: loadedFonts.length > 0,
    loadedFonts,
    recommendation:
      loadedFonts.length > 0
        ? `Using ${loadedFonts[0]}`
        : 'Import @vertm/styles (bundled Noto Sans Mongolian) or add a self-hosted @font-face',
  };
}

/**
 * Check if a specific font family is loaded.
 */
export function isFontLoaded(fontFamily: string, size = 16): boolean {
  if (typeof document === 'undefined' || !document.fonts?.check) {
    return false;
  }
  return document.fonts.check(`${size}px "${fontFamily}"`);
}

export { DEFAULT_VERTM_FONT_STACK };
