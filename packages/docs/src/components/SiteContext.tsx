import { useCallback, useEffect, useMemo, useSyncExternalStore, type ReactNode } from 'react';
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

type ControlsSnapshot = { themeId: SiteThemeId; writingMode: WritingMode };

const SERVER_SNAPSHOT: ControlsSnapshot = { themeId: 'cobalt', writingMode: 'vertical-lr' };

type ControlsStore = {
  snapshot: ControlsSnapshot;
  listeners: Set<() => void>;
};

const STORE_KEY = '__VERTM_DOCS_CONTROLS__';

function getStore(): ControlsStore {
  const g = globalThis as typeof globalThis & { [STORE_KEY]?: ControlsStore };
  if (!g[STORE_KEY]) {
    g[STORE_KEY] = { snapshot: { ...SERVER_SNAPSHOT }, listeners: new Set() };
  }
  return g[STORE_KEY];
}

let cachedSnapshot: ControlsSnapshot = SERVER_SNAPSHOT;

function getSnapshot(): ControlsSnapshot {
  const next = getStore().snapshot;
  if (next.themeId !== cachedSnapshot.themeId || next.writingMode !== cachedSnapshot.writingMode) {
    cachedSnapshot = { themeId: next.themeId, writingMode: next.writingMode };
  }
  return cachedSnapshot;
}

function getServerSnapshot(): ControlsSnapshot {
  return SERVER_SNAPSHOT;
}

function subscribe(listener: () => void) {
  const store = getStore();
  store.listeners.add(listener);
  return () => store.listeners.delete(listener);
}

function publish(partial: Partial<ControlsSnapshot>) {
  const store = getStore();
  const next = { ...store.snapshot, ...partial };
  if (next.themeId === store.snapshot.themeId && next.writingMode === store.snapshot.writingMode) return;
  store.snapshot = next;
  store.listeners.forEach((listener) => listener());
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
  useEffect(() => {
    const stored = readStored();
    if (stored) publish(stored);
    return subscribe(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(getStore().snapshot));
      } catch {
        // ignore
      }
    });
  }, []);

  return children;
}

export function useSiteControls(): SiteControlsValue {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setThemeId = useCallback((id: SiteThemeId) => {
    publish({ themeId: id });
  }, []);
  const setWritingMode = useCallback((mode: WritingMode) => {
    publish({ writingMode: mode });
  }, []);

  return useMemo(() => {
    const resolved = resolveTheme(snapshot.themeId);
    return {
      themeId: snapshot.themeId,
      setThemeId,
      writingMode: snapshot.writingMode,
      setWritingMode,
      theme: resolved.theme,
      appearance: resolved.appearance,
    };
  }, [snapshot, setThemeId, setWritingMode]);
}
