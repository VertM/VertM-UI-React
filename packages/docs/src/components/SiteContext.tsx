import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  createTheme,
  darkTheme,
  editorialTheme,
  type VertMTheme,
} from '@vertm/tokens';
import type { VertMAppearance } from '@vertm/react';
import type { WritingMode } from '@vertm/core';

export type SiteThemeId = 'default' | 'dark' | 'editorial';

export interface SiteControlsValue {
  themeId: SiteThemeId;
  setThemeId: (id: SiteThemeId) => void;
  writingMode: WritingMode;
  setWritingMode: (mode: WritingMode) => void;
  theme: VertMTheme;
  appearance: VertMAppearance;
}

const SiteControlsContext = createContext<SiteControlsValue | null>(null);

function resolveTheme(id: SiteThemeId): { theme: VertMTheme; appearance: VertMAppearance } {
  if (id === 'editorial') {
    return { theme: editorialTheme, appearance: 'editorial' };
  }
  if (id === 'dark') {
    return { theme: darkTheme, appearance: 'default' };
  }
  return { theme: createTheme(), appearance: 'default' };
}

export function SiteControlsProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<SiteThemeId>('default');
  const [writingMode, setWritingMode] = useState<WritingMode>('vertical-lr');

  const value = useMemo<SiteControlsValue>(() => {
    const resolved = resolveTheme(themeId);
    return {
      themeId,
      setThemeId,
      writingMode,
      setWritingMode,
      theme: resolved.theme,
      appearance: resolved.appearance,
    };
  }, [themeId, writingMode]);

  return (
    <SiteControlsContext.Provider value={value}>{children}</SiteControlsContext.Provider>
  );
}

export function useSiteControls(): SiteControlsValue {
  const ctx = useContext(SiteControlsContext);
  if (!ctx) {
    // Docs pages outside the provider still get a sensible default.
    const resolved = resolveTheme('default');
    return {
      themeId: 'default',
      setThemeId: () => undefined,
      writingMode: 'vertical-lr',
      setWritingMode: () => undefined,
      theme: resolved.theme,
      appearance: resolved.appearance,
    };
  }
  return ctx;
}
