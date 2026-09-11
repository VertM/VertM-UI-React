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
  /** Override global theme for this demo only (e.g. editorial showcase). */
  forceTheme?: SiteThemeId;
  /** Override global writing mode for this demo only. */
  forceWritingMode?: WritingMode;
}

/**
 * Live-demo shell. Reads theme/writing-mode from the global SiteControlsProvider
 * (see `.dumi/app.tsx`). Optional force* props pin a demo to a specific skin.
 */
export function VertMDemoFrame({
  children,
  minHeight = 220,
  className = '',
  style,
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
    <div className={`vertm-demo-frame ${className}`.trim()} style={style}>
      <VertMConfigProvider theme={theme} appearance={appearance} writingMode={writingMode}>
        <div
          className={
            vertical
              ? 'vertm-demo-frame__stage vertm-demo-frame__stage--vertical'
              : 'vertm-demo-frame__stage vertm-demo-frame__stage--horizontal'
          }
          data-docs-theme={themeId}
          style={{
            minHeight,
            writingMode,
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
