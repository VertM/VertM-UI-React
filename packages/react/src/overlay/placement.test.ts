import { describe, expect, it } from 'vitest';
import { computeOverlayPosition, type Placement } from './placement.js';

const viewport = { top: 0, left: 0, width: 400, height: 300 };
const trigger = { top: 100, left: 100, width: 40, height: 40 };
const popup = { top: 0, left: 0, width: 80, height: 60 };

const PLACEMENTS: Placement[] = [
  'top',
  'topLeft',
  'topRight',
  'bottom',
  'bottomLeft',
  'bottomRight',
  'left',
  'leftTop',
  'leftBottom',
  'right',
  'rightTop',
  'rightBottom',
];

describe('computeOverlayPosition', () => {
  it('returns finite coordinates for all 12 placements', () => {
    for (const placement of PLACEMENTS) {
      const result = computeOverlayPosition(trigger, popup, placement, viewport);
      expect(Number.isFinite(result.top)).toBe(true);
      expect(Number.isFinite(result.left)).toBe(true);
      expect(result.placement).toBeTruthy();
    }
  });

  it('flips top to bottom when trigger is near viewport top', () => {
    const nearTop = { top: 2, left: 100, width: 40, height: 40 };
    const result = computeOverlayPosition(nearTop, popup, 'top', viewport);
    expect(result.placement).toBe('bottom');
    expect(result.top).toBeGreaterThan(nearTop.top + nearTop.height);
  });

  it('flips left to right when popup would overflow left edge', () => {
    const nearLeft = { top: 100, left: 2, width: 40, height: 40 };
    const widePopup = { top: 0, left: 0, width: 120, height: 60 };
    const result = computeOverlayPosition(nearLeft, widePopup, 'left', viewport);
    expect(result.placement).toBe('right');
    expect(result.left).toBeGreaterThan(nearLeft.left + nearLeft.width);
  });

  it('clamps position inside viewport as last resort', () => {
    const hugePopup = { top: 0, left: 0, width: 380, height: 280 };
    const result = computeOverlayPosition(trigger, hugePopup, 'top', viewport);
    expect(result.top).toBeGreaterThanOrEqual(4);
    expect(result.left).toBeGreaterThanOrEqual(4);
    expect(result.top + hugePopup.height).toBeLessThanOrEqual(viewport.height - 4);
    expect(result.left + hugePopup.width).toBeLessThanOrEqual(viewport.width - 4);
  });
});
