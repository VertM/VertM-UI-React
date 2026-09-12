import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  amberTheme,
  cinnabarTheme,
  createTheme,
  darkTheme,
  editorialTheme,
  frostTheme,
  slateTheme,
  steppeTheme,
  cobaltTheme,
  type VertMTheme,
} from '@vertm/tokens';
import type { VertMAppearance } from '@vertm/react';
import type { WritingMode } from '@vertm/core';

export type SiteThemeId =
  | 'default'
  | 'cobalt'
  | 'dark'
  | 'editorial'
  | 'cinnabar'
  | 'steppe'
  | 'amber'
  | 'slate'
  | 'frost';

export const SITE_THEME_IDS: SiteThemeId[] = [
  'cobalt',
  'default',
  'editorial',
  'dark',
  'cinnabar',
  'steppe',
  'amber',
  'slate',
  'frost',
];

const STORAGE_KEY = 'vertm-docs-controls';

export interface SiteControlsValue {
  themeId: SiteThemeId;
  setThemeId: (id: SiteThemeId) => void;
  writingMode: WritingMode;
  setWritingMode: (mode: WritingMode) => void;
  theme: VertMTheme;
  appearance: VertMAppearance;
}

const SiteControlsContext = createContext<SiteControlsValue | null>(null);

function isSiteThemeId(value: string | undefined): value is SiteThemeId {
  return !!value && (SITE_THEME_IDS as string[]).includes(value);
}

export function resolveTheme(id: SiteThemeId): {
  theme: VertMTheme;
  appearance: VertMAppearance;
} {
  switch (id) {
    case 'editorial':
      return { theme: editorialTheme, appearance: 'editorial' };
    case 'dark':
      return { theme: darkTheme, appearance: 'default' };
    case 'cobalt':
      return { theme: cobaltTheme, appearance: 'default' };
    case 'cinnabar':
      return { theme: cinnabarTheme, appearance: 'default' };
    case 'steppe':
      return { theme: steppeTheme, appearance: 'default' };
    case 'amber':
      return { theme: amberTheme, appearance: 'default' };
    case 'slate':
      return { theme: slateTheme, appearance: 'default' };
    case 'frost':
      return { theme: frostTheme, appearance: 'default' };
    case 'default':
    default:
      return { theme: createTheme(), appearance: 'default' };
  }
}

function readStored(): { themeId: SiteThemeId; writingMode: WritingMode } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      themeId?: string;
      writingMode?: string;
    };
    const rawThemeId = parsed.themeId === 'tengri' ? 'cobalt' : parsed.themeId;
    const themeId = isSiteThemeId(rawThemeId) ? rawThemeId : null;
    const writingMode =
      parsed.writingMode === 'vertical-lr' ||
      parsed.writingMode === 'vertical-rl' ||
      parsed.writingMode === 'horizontal-tb'
        ? parsed.writingMode
        : null;
    if (!themeId || !writingMode) return null;
    return { themeId, writingMode };
  } catch {
    return null;
  }
}

export function SiteControlsProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<SiteThemeId>('cobalt');
  const [writingMode, setWritingModeState] = useState<WritingMode>('vertical-lr');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStored();
    if (stored) {
      setThemeIdState(stored.themeId);
      setWritingModeState(stored.writingMode);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ themeId, writingMode }));
    } catch {
      // ignore
    }
  }, [themeId, writingMode, hydrated]);

  const setThemeId = useCallback((id: SiteThemeId) => setThemeIdState(id), []);
  const setWritingMode = useCallback((mode: WritingMode) => setWritingModeState(mode), []);

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
  }, [themeId, writingMode, setThemeId, setWritingMode]);

  return (
    <SiteControlsContext.Provider value={value}>{children}</SiteControlsContext.Provider>
  );
}

export function useSiteControls(): SiteControlsValue {
  const ctx = useContext(SiteControlsContext);
  if (!ctx) {
    const resolved = resolveTheme('cobalt');
    return {
      themeId: 'cobalt',
      setThemeId: () => undefined,
      writingMode: 'vertical-lr',
      setWritingMode: () => undefined,
      theme: resolved.theme,
      appearance: resolved.appearance,
    };
  }
  return ctx;
}
