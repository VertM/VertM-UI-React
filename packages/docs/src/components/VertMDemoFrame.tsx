import type { CSSProperties, ReactNode } from 'react';
import { VertMConfigProvider } from '@vertm/react';
import { SiteControls } from './SiteControls';
import { SiteControlsProvider, useSiteControls } from './SiteContext';

export interface VertMDemoFrameProps {
  children: ReactNode;
  /** Hide the local theme/writing-mode toolbar. */
  hideControls?: boolean;
  minHeight?: number | string;
  className?: string;
  style?: CSSProperties;
}

function DemoStage({
  children,
  hideControls,
  minHeight,
  className,
  style,
}: VertMDemoFrameProps) {
  const { theme, appearance, writingMode } = useSiteControls();
  const vertical = writingMode === 'vertical-lr' || writingMode === 'vertical-rl';

  return (
    <div className={`vertm-demo-frame ${className ?? ''}`.trim()} style={style}>
      {!hideControls && (
        <div className="vertm-demo-frame__toolbar">
          <SiteControls />
        </div>
      )}
      <VertMConfigProvider theme={theme} appearance={appearance} writingMode={writingMode}>
        <div
          className={
            vertical
              ? 'vertm-demo-frame__stage vertm-demo-frame__stage--vertical'
              : 'vertm-demo-frame__stage vertm-demo-frame__stage--horizontal'
          }
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

/**
 * Unified live-demo shell. Each frame owns theme/writing-mode state so demos
 * work without a global layout provider.
 */
export function VertMDemoFrame(props: VertMDemoFrameProps) {
  return (
    <SiteControlsProvider>
      <DemoStage {...props} />
    </SiteControlsProvider>
  );
}

export default VertMDemoFrame;
