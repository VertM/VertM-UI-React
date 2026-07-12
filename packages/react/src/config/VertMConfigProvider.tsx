import {
  useMemo,
  type CSSProperties,
  type ReactNode,
} from 'react';
import type { VertMSize, VertMTheme } from '@vertm/tokens';
import { themeToCssVars } from '@vertm/tokens';
import type { WritingMode } from '@vertm/core';
import {
  VertMConfigContext,
  defaultVertMConfig,
  useVertMConfig,
  type VertMLocale,
  type VertMConfig,
} from './context.js';

export interface VertMConfigProviderProps {
  children: ReactNode;
  theme?: VertMTheme;
  writingMode?: WritingMode;
  direction?: 'ltr' | 'rtl';
  size?: VertMSize;
  fontFamily?: string;
  locale?: VertMLocale;
  getPopupContainer?: () => HTMLElement;
  className?: string;
  style?: CSSProperties;
}

export function VertMConfigProvider({
  children,
  theme,
  writingMode,
  direction,
  size,
  fontFamily,
  locale,
  getPopupContainer,
  className = '',
  style,
}: VertMConfigProviderProps) {
  const parentConfig = useVertMConfig();

  const mergedConfig = useMemo<VertMConfig>(() => {
    const mergedTheme = theme ?? parentConfig.theme;
    const next: VertMConfig = {
      theme: mergedTheme,
      writingMode: writingMode ?? parentConfig.writingMode,
      direction: direction ?? parentConfig.direction,
      size: size ?? parentConfig.size,
      // Font switch resolution order: explicit prop > theme.fontFamily > parent.
      fontFamily: fontFamily ?? mergedTheme.fontFamily ?? parentConfig.fontFamily,
      locale: locale ?? parentConfig.locale,
      getPopupContainer: getPopupContainer ?? parentConfig.getPopupContainer,
    };
    return next;
  }, [
    theme,
    writingMode,
    direction,
    size,
    fontFamily,
    locale,
    getPopupContainer,
    parentConfig,
  ]);

  const cssVars = useMemo(
    () => themeToCssVars(mergedConfig.theme) as CSSProperties,
    [mergedConfig.theme]
  );

  const rootStyle: CSSProperties = {
    ...cssVars,
    // Ensure the effective font (prop overrides theme) also drives every
    // CSS-variable-based component, not just inline `fontFamily` consumers.
    '--vertm-font-family': mergedConfig.fontFamily,
    ...style,
  } as CSSProperties;

  return (
    <VertMConfigContext.Provider value={mergedConfig}>
      <div
        className={`vertm-config-provider ${className}`.trim()}
        style={rootStyle}
        data-writing-mode={mergedConfig.writingMode}
        data-direction={mergedConfig.direction}
        data-size={mergedConfig.size}
      >
        {children}
      </div>
    </VertMConfigContext.Provider>
  );
}

/** Re-export default config for standalone usage without a provider. */
export { defaultVertMConfig };
