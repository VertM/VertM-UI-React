/** Ant Design compatible breakpoints (min-width). */
export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export type BreakpointMap = Partial<Record<Breakpoint, boolean>>;

/** Pick the value for the largest matching breakpoint (antd Col semantics). */
export function resolveResponsiveValue(
  base: number | undefined,
  responsive: Partial<Record<Breakpoint, number>>,
  screens: BreakpointMap
): number | undefined {
  const order: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
  for (const bp of order) {
    if (screens[bp] && responsive[bp] != null) {
      return responsive[bp];
    }
  }
  return base;
}
