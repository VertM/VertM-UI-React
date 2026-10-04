import {
  computeOverlayPosition as computeCorePosition,
  type OverlayPosition,
  type OverlayRect,
  type Placement,
} from '@vertm/core';
import { getViewportRect } from '@vertm/core/dom';

export type { Placement, OverlayPosition };
export type Rect = OverlayRect;

export function computeOverlayPosition(
  trigger: OverlayRect,
  popup: OverlayRect,
  preferred: Placement,
  viewport: OverlayRect = getViewportRect()
): OverlayPosition {
  return computeCorePosition(trigger, popup, preferred, viewport);
}
