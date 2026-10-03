import type { CSSProperties, ReactNode } from 'react';
import { VertMConfigProvider } from '@vertm/react';
import type { WritingMode } from '@vertm/core';
import {
  resolveTheme,
  useSiteControls,
  type SiteThemeId,
} from './SiteContext';

export interface VertMDemoFrameProps {
  children: ReactNode;
  minHeight?: number | string;
  className?: string;
  style?: CSSProperties;
  /** Shown in the frame chrome title bar (e.g. `Button / basic.tsx`). */
  title?: string;
  /** Override global theme for this demo only (e.g. editorial showcase). */
  forceTheme?: SiteThemeId;
  /** Override global writing mode for this demo only. */
  forceWritingMode?: WritingMode;
}

/**
 * Live-demo shell. Reads theme/writing-mode from the global SiteControlsProvider
 * (see `.dumi/app.tsx`). Optional force* props pin a demo to a specific skin.
 * Chrome follows `design/mockups/demo-frame.html`.
 */
export function VertMDemoFrame({
  children,
  minHeight = 220,
  className = '',
  style,
  title,
  forceTheme,
  forceWritingMode,
}: VertMDemoFrameProps) {
  const global = useSiteControls();
  const themeId = forceTheme ?? global.themeId;
  const writingMode = forceWritingMode ?? global.writingMode;
  const resolved = forceTheme ? resolveTheme(forceTheme) : global;
  const theme = forceTheme ? resolved.theme : global.theme;
  const appearance = forceTheme ? resolved.appearance : global.appearance;
  const vertical = writingMode === 'vertical-lr' || writingMode === 'vertical-rl';

  return (
    <div
      className={[
        'vertm-demo-frame',
        appearance === 'editorial' && 'vertm-demo-frame--editorial',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      data-docs-theme={themeId}
    >
      <div className="vertm-demo-frame__bar">
        <span className="vertm-demo-frame__dot" aria-hidden />
        <span className="vertm-demo-frame__title">{title ?? 'demo'}</span>
        <span className="vertm-demo-frame__badge">{writingMode}</span>
      </div>
      <VertMConfigProvider theme={theme} appearance={appearance} writingMode={writingMode}>
        {/* Stage is flex-only; writing-mode lives on child controls via ConfigProvider. */}
        <div
          className={
            vertical
              ? 'vertm-demo-frame__stage vertm-demo-frame__stage--vertical'
              : 'vertm-demo-frame__stage vertm-demo-frame__stage--horizontal'
          }
          style={{
            minHeight,
            background: theme.colorBgLayout,
            color: theme.colorText,
          }}
        >
          {children}
        </div>
      </VertMConfigProvider>
    </div>
  );
}

export default VertMDemoFrame;
