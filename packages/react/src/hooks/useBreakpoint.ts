import { useEffect, useState } from 'react';

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

function getBreakpointMap(): BreakpointMap {
  if (typeof window === 'undefined') return {};
  const map: BreakpointMap = {};
  for (const [key, min] of Object.entries(BREAKPOINTS)) {
    map[key as Breakpoint] = window.matchMedia(`(min-width: ${min}px)`).matches;
  }
  return map;
}

/** Subscribe to antd-style responsive breakpoints. */
export function useBreakpoint(): BreakpointMap {
  const [screens, setScreens] = useState<BreakpointMap>(getBreakpointMap);

  useEffect(() => {
    const mediaQueries = Object.entries(BREAKPOINTS).map(([key, min]) => ({
      key: key as Breakpoint,
      mq: window.matchMedia(`(min-width: ${min}px)`),
    }));

    const update = () => {
      const next: BreakpointMap = {};
      for (const { key, mq } of mediaQueries) {
        next[key] = mq.matches;
      }
      setScreens(next);
    };

    update();
    for (const { mq } of mediaQueries) {
      mq.addEventListener('change', update);
    }
    return () => {
      for (const { mq } of mediaQueries) {
        mq.removeEventListener('change', update);
      }
    };
  }, []);

  return screens;
}

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
