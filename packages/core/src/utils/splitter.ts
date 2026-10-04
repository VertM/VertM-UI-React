export function computeSplitRatio(args: {
  x: number;
  y: number;
  rect: { top: number; left: number; width: number; height: number };
  axis: 'row' | 'column';
  min?: number;
  max?: number;
}): number {
  const { x, y, rect, axis, min = 0.15, max = 0.85 } = args;
  const next = axis === 'column' ? (x - rect.left) / rect.width : (y - rect.top) / rect.height;
  return Math.min(max, Math.max(min, next));
}
