import { createContext, useContext } from 'react';
import type { VertMSize, VertMTheme } from '@vertm/tokens';
import { defaultTheme } from '@vertm/tokens';
import type { WritingMode } from '@vertm/core';

export interface VertMLocale {
  locale: string;
}

export interface VertMConfig {
  theme: VertMTheme;
  writingMode: WritingMode;
  direction: 'ltr' | 'rtl';
  size: VertMSize;
  fontFamily: string;
  locale: VertMLocale;
  getPopupContainer?: () => HTMLElement;
}

const defaultLocale: VertMLocale = { locale: 'mn-MN' };

export const defaultVertMConfig: VertMConfig = {
  theme: defaultTheme,
  writingMode: 'vertical-lr',
  direction: 'ltr',
  size: 'middle',
  fontFamily: defaultTheme.fontFamily,
  locale: defaultLocale,
};

export const VertMConfigContext = createContext<VertMConfig>(defaultVertMConfig);

export function useVertMConfig(): VertMConfig {
  return useContext(VertMConfigContext);
}

/** Whether the current writing mode is vertical. */
export function useIsVertical(): boolean {
  const { writingMode } = useVertMConfig();
  return writingMode.startsWith('vertical');
}
