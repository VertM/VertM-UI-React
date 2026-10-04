export interface VerticalSupportResult {
  verticalLrSupported: boolean;
  needsSafariFallback: boolean;
  browserEngine: 'blink' | 'gecko' | 'webkit' | 'unknown';
  recommendation: 'native' | 'fallback-css' | 'wasm';
}

function getBrowserEngine(): VerticalSupportResult['browserEngine'] {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'gecko';
  if (ua.includes('Chrome') || ua.includes('Edg')) return 'blink';
  if (ua.includes('Safari')) return 'webkit';
  return 'unknown';
}

function isSafariWebKit(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  return ua.includes('Safari') && !ua.includes('Chrome');
}

/**
 * Detect browser support for vertical-lr writing mode.
 * Aligns with W3C i18n-tests vertical text requirements.
 */
export function detectVerticalSupport(): VerticalSupportResult {
  if (typeof document === 'undefined') {
    return {
      verticalLrSupported: false,
      needsSafariFallback: false,
      browserEngine: 'unknown',
      recommendation: 'native',
    };
  }

  const el = document.createElement('div');
  el.style.writingMode = 'vertical-lr';
  document.body.appendChild(el);
  const verticalLrSupported = getComputedStyle(el).writingMode === 'vertical-lr';
  document.body.removeChild(el);

  const browserEngine = getBrowserEngine();
  const needsSafariFallback = isSafariWebKit();

  let recommendation: VerticalSupportResult['recommendation'] = 'native';
  if (!verticalLrSupported) {
    recommendation = 'wasm';
  } else if (needsSafariFallback) {
    recommendation = 'fallback-css';
  }

  return {
    verticalLrSupported,
    needsSafariFallback,
    browserEngine,
    recommendation,
  };
}

/**
 * CSS class names for vertical layout with browser fallbacks.
 */
export function getVerticalLayoutClasses(support: VerticalSupportResult): string[] {
  const classes = ['vertm-vertical'];
  if (support.needsSafariFallback) {
    classes.push('vertm-vertical--safari-fallback');
  }
  return classes;
}
