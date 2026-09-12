import type { ReactNode } from 'react';
import { SiteControlsProvider } from '../src/components/SiteContext';

/** Wrap the whole dumi app so every demo shares one theme / writing-mode switcher. */
export function rootContainer(last: ReactNode) {
  return <SiteControlsProvider>{last}</SiteControlsProvider>;
}
