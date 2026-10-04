import { useEffect, useState } from 'react';
import {
  BREAKPOINTS,
  resolveResponsiveValue,
  type Breakpoint,
  type BreakpointMap,
} from '@vertm/core';

export { BREAKPOINTS, resolveResponsiveValue, type Breakpoint, type BreakpointMap };

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
