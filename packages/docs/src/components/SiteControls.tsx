import { useSiteControls, type SiteThemeId } from './SiteContext';
import type { WritingMode } from '@vertm/core';

const THEMES: { id: SiteThemeId; label: string }[] = [
  { id: 'default', label: 'Default' },
  { id: 'dark', label: 'Dark' },
  { id: 'editorial', label: 'Editorial' },
];

const MODES: { id: WritingMode; label: string }[] = [
  { id: 'vertical-lr', label: '竖排' },
  { id: 'horizontal-tb', label: '横排' },
];

export function SiteControls() {
  const { themeId, setThemeId, writingMode, setWritingMode } = useSiteControls();

  return (
    <div className="vertm-site-controls" role="group" aria-label="文档站主题与书写模式">
      <div className="vertm-site-controls__group">
        <span className="vertm-site-controls__label">主题</span>
        {THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            className={
              themeId === t.id
                ? 'vertm-site-controls__btn vertm-site-controls__btn--active'
                : 'vertm-site-controls__btn'
            }
            onClick={() => setThemeId(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="vertm-site-controls__group">
        <span className="vertm-site-controls__label">书写</span>
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            className={
              writingMode === m.id
                ? 'vertm-site-controls__btn vertm-site-controls__btn--active'
                : 'vertm-site-controls__btn'
            }
            onClick={() => setWritingMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}
