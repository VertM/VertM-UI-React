import { useEffect } from 'react';
import { registerFont, type RegisterFontOptions } from '@vertm/core/dom';

export { registerFont, type RegisterFontOptions };

/** React hook wrapper: registers `options.family` for the component's lifetime. */
export function useRegisterFont(options: RegisterFontOptions | null): void {
  const key = options
    ? `${options.family}|${options.src}|${options.weight ?? ''}`
    : '';
  useEffect(() => {
    if (!options) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    registerFont(options).then((c) => {
      if (cancelled) c();
      else cleanup = c;
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
