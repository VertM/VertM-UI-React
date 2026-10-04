import type { OverlayRect } from '../overlay/placement.js';

/** Current layout viewport; falls back to 1024×768 outside the browser. */
export function getViewportRect(): OverlayRect {
  if (typeof window === 'undefined') return { top: 0, left: 0, width: 1024, height: 768 };
  return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
}
