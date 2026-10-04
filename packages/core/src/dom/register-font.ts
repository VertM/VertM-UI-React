export interface RegisterFontOptions {
  /** Font-family name to expose (use this exact name in `fontFamily`). */
  family: string;
  /**
   * Font source. Either a ready CSS `src` value (e.g.
   * `url(/fonts/x.woff2) format('woff2')`) or a bare URL string, which is
   * wrapped automatically.
   */
  src: string;
  weight?: string | number;
  style?: string;
  display?: FontDisplay;
  /** Defaults to the Mongolian block + shaping controls. */
  unicodeRange?: string;
}

const DEFAULT_UNICODE_RANGE = 'U+1800-18AF, U+202F, U+2060, U+180B-180F';

/**
 * Register a custom Mongolian font at runtime — the "bring your own font" hook.
 *
 * Bundled webfonts (Noto Sans Mongolian) load via `@vertm/styles`. For a
 * proprietary/licensed font you self-host, call this once at startup, then pass
 * the same `family` to `VertMConfigProvider`'s `fontFamily` (or a component's
 * `fontFamily` prop):
 *
 * ```ts
 * await registerFont({ family: 'Qagan', src: '/fonts/Qagan.woff2' });
 * // <VertMConfigProvider fontFamily='"Qagan", sans-serif'>
 * ```
 *
 * Returns a cleanup function that removes the registered face.
 */
export async function registerFont(
  options: RegisterFontOptions
): Promise<() => void> {
  if (typeof document === 'undefined' || !('fonts' in document)) {
    return () => {};
  }
  const {
    family,
    src,
    weight = 400,
    style = 'normal',
    display = 'swap',
    unicodeRange = DEFAULT_UNICODE_RANGE,
  } = options;

  const source = /\b(url|local)\(/.test(src) ? src : `url(${src})`;
  const face = new FontFace(family, source, {
    weight: String(weight),
    style,
    display,
    unicodeRange,
  });

  await face.load();
  document.fonts.add(face);

  return () => {
    try {
      document.fonts.delete(face);
    } catch {
      /* face may already be gone */
    }
  };
}
