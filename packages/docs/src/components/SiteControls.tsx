import { useEffect, useId, useRef, useState } from 'react';
import { useSiteControls, type SiteThemeId } from './SiteContext';
import type { WritingMode } from '@vertm/core';

const THEMES: { id: SiteThemeId; label: string }[] = [
  { id: 'cobalt', label: '钴蓝' },
  { id: 'default', label: 'Default' },
  { id: 'editorial', label: '墨' },
  { id: 'dark', label: '夜' },
  { id: 'cinnabar', label: '朱砂' },
  { id: 'steppe', label: '草原' },
  { id: 'amber', label: '鎏金' },
  { id: 'slate', label: '黛青' },
  { id: 'frost', label: '霜' },
];

const MODES: { id: WritingMode; label: string }[] = [
  { id: 'vertical-lr', label: '竖排' },
  { id: 'horizontal-tb', label: '横排' },
];

/** Compact header dropdown — left of dumi search. */
export function SiteControls() {
  const { themeId, setThemeId, writingMode, setWritingMode } = useSiteControls();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const themeLabel = THEMES.find((t) => t.id === themeId)?.label ?? themeId;
  const modeLabel = MODES.find((m) => m.id === writingMode)?.label ?? writingMode;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className="vertm-site-controls" ref={rootRef}>
      <button
        type="button"
        className="vertm-site-controls__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label="主题与书写模式"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="vertm-site-controls__trigger-text">
          {themeLabel}
          <span className="vertm-site-controls__sep" aria-hidden>
            ·
          </span>
          {modeLabel}
        </span>
        <span className="vertm-site-controls__chevron" aria-hidden data-open={open || undefined}>
          ▾
        </span>
      </button>

      {open && (
        <div className="vertm-site-controls__menu" id={menuId} role="menu">
          <div className="vertm-site-controls__section" role="group" aria-label="主题">
            <div className="vertm-site-controls__heading">主题</div>
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                role="menuitemradio"
                aria-checked={themeId === t.id}
                className={
                  themeId === t.id
                    ? 'vertm-site-controls__item vertm-site-controls__item--active'
                    : 'vertm-site-controls__item'
                }
                onClick={() => {
                  setThemeId(t.id);
                  setOpen(false);
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="vertm-site-controls__section" role="group" aria-label="书写模式">
            <div className="vertm-site-controls__heading">书写</div>
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                role="menuitemradio"
                aria-checked={writingMode === m.id}
                className={
                  writingMode === m.id
                    ? 'vertm-site-controls__item vertm-site-controls__item--active'
                    : 'vertm-site-controls__item'
                }
                onClick={() => {
                  setWritingMode(m.id);
                  setOpen(false);
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
