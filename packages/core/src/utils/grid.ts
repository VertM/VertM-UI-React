export function resolveGutter(
  gutter: number | [number, number] | undefined,
  isVertical: boolean
): { row: number; col: number } {
  if (gutter == null) return { row: 0, col: 0 };
  if (Array.isArray(gutter)) {
    const [h, v] = gutter;
    return isVertical ? { row: v, col: h } : { row: h, col: v };
  }
  return { row: gutter / 2, col: gutter / 2 };
}

export function spanToWidth(span: number): string {
  return `${(span / 24) * 100}%`;
}
