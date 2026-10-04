import type { WritingMode } from '../normalize.js';

/** 12 placement positions (antd-compatible naming). */
export type Placement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom';

export interface OverlayRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface OverlayPosition {
  top: number;
  left: number;
  placement: Placement;
}

export type OverlayKind = 'dropdown' | 'select' | 'submenu' | 'menubarSubmenu';

/**
 * Default popup placement per component, following component-design-spec §1.3:
 * submenus and Select open toward block-end (right) regardless of writing mode;
 * Dropdown opens right in vertical writing and below in horizontal writing.
 */
export function resolveDefaultPlacement(kind: OverlayKind, writingMode: WritingMode): Placement {
  const vertical = writingMode.startsWith('vertical');
  switch (kind) {
    case 'dropdown':
      return vertical ? 'rightTop' : 'bottomLeft';
    case 'select':
    case 'submenu':
      return 'rightTop';
    case 'menubarSubmenu':
      return 'bottomLeft';
  }
}

const FLIP_MAP: Partial<Record<Placement, Placement>> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
  topLeft: 'bottomLeft',
  topRight: 'bottomRight',
  bottomLeft: 'topLeft',
  bottomRight: 'topRight',
  leftTop: 'rightTop',
  leftBottom: 'rightBottom',
  rightTop: 'leftTop',
  rightBottom: 'leftBottom',
};

const OFFSET = 8;

function alignMain(
  placement: Placement,
  trigger: OverlayRect,
  popup: OverlayRect
): { top: number; left: number } {
  const cx = trigger.left + trigger.width / 2;
  const cy = trigger.top + trigger.height / 2;

  switch (placement) {
    case 'top':
      return {
        top: trigger.top - popup.height - OFFSET,
        left: cx - popup.width / 2,
      };
    case 'topLeft':
      return { top: trigger.top - popup.height - OFFSET, left: trigger.left };
    case 'topRight':
      return {
        top: trigger.top - popup.height - OFFSET,
        left: trigger.left + trigger.width - popup.width,
      };
    case 'bottom':
      return {
        top: trigger.top + trigger.height + OFFSET,
        left: cx - popup.width / 2,
      };
    case 'bottomLeft':
      return { top: trigger.top + trigger.height + OFFSET, left: trigger.left };
    case 'bottomRight':
      return {
        top: trigger.top + trigger.height + OFFSET,
        left: trigger.left + trigger.width - popup.width,
      };
    case 'left':
      return {
        top: cy - popup.height / 2,
        left: trigger.left - popup.width - OFFSET,
      };
    case 'leftTop':
      return { top: trigger.top, left: trigger.left - popup.width - OFFSET };
    case 'leftBottom':
      return {
        top: trigger.top + trigger.height - popup.height,
        left: trigger.left - popup.width - OFFSET,
      };
    case 'right':
      return {
        top: cy - popup.height / 2,
        left: trigger.left + trigger.width + OFFSET,
      };
    case 'rightTop':
      return { top: trigger.top, left: trigger.left + trigger.width + OFFSET };
    case 'rightBottom':
      return {
        top: trigger.top + trigger.height - popup.height,
        left: trigger.left + trigger.width + OFFSET,
      };
    default:
      return { top: 0, left: 0 };
  }
}

function fitsViewport(
  pos: { top: number; left: number },
  popup: OverlayRect,
  viewport: OverlayRect,
  margin = 4
): boolean {
  return (
    pos.top >= viewport.top + margin &&
    pos.left >= viewport.left + margin &&
    pos.top + popup.height <= viewport.top + viewport.height - margin &&
    pos.left + popup.width <= viewport.left + viewport.width - margin
  );
}

/** Compute overlay position with viewport flip fallback. */
export function computeOverlayPosition(
  trigger: OverlayRect,
  popup: OverlayRect,
  preferred: Placement,
  viewport: OverlayRect
): OverlayPosition {
  const primary = alignMain(preferred, trigger, popup);
  if (fitsViewport(primary, popup, viewport)) {
    return { ...primary, placement: preferred };
  }

  const flipped = FLIP_MAP[preferred];
  if (flipped) {
    const alt = alignMain(flipped, trigger, popup);
    if (fitsViewport(alt, popup, viewport)) {
      return { ...alt, placement: flipped };
    }
  }

  // Clamp to viewport as last resort.
  const clamped = {
    top: Math.min(
      Math.max(primary.top, viewport.top + 4),
      viewport.top + viewport.height - popup.height - 4
    ),
    left: Math.min(
      Math.max(primary.left, viewport.left + 4),
      viewport.left + viewport.width - popup.width - 4
    ),
  };
  return { ...clamped, placement: preferred };
}
