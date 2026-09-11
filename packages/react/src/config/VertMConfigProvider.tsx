import {
  useMemo,
  type CSSProperties,
  type ReactNode,
} from 'react';
import type { VertMSize, VertMTheme } from '@vertm/tokens';
import { editorialTheme, themeToCssVars } from '@vertm/tokens';
import type { WritingMode } from '@vertm/core';
import {
  VertMConfigContext,
  defaultVertMConfig,
  useVertMConfig,
  type VertMAppearance,
  type VertMLocale,
  type VertMConfig,
} from './context.js';

export interface VertMConfigProviderProps {
  /** 子树内容 */
  children: ReactNode;
  /** 主题 token；editorial appearance 且未指定时自动用 editorialTheme */
  theme?: VertMTheme;
  /**
   * 结构皮肤，叠在主题 token 之上。
   * `editorial` 开启栏目边线与墨色主按钮等 Vertical Editorial 样式。
   */
  appearance?: VertMAppearance;
  /** 书写模式（竖排/横排） */
  writingMode?: WritingMode;
  /** 文本方向 @default 'ltr' */
  direction?: 'ltr' | 'rtl';
  /** 组件默认尺寸 */
  size?: VertMSize;
  /** 默认字体族 */
  fontFamily?: string;
  /** 文案与区域设置 */
  locale?: VertMLocale;
  /** 弹出层挂载容器 */
  getPopupContainer?: () => HTMLElement;
  /** 根节点自定义类名 */
  className?: string;
  /** 根节点自定义样式 */
  style?: CSSProperties;
}

export function VertMConfigProvider({
  children,
  theme,
  appearance,
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
    const resolvedAppearance = appearance ?? parentConfig.appearance;
    // First editorial provider without an explicit theme picks up the preset.
    const resolvedTheme =
      theme ??
      (appearance === 'editorial' && parentConfig.appearance !== 'editorial'
        ? editorialTheme
        : parentConfig.theme);
    const next: VertMConfig = {
      theme: resolvedTheme,
      appearance: resolvedAppearance,
      writingMode: writingMode ?? parentConfig.writingMode,
      direction: direction ?? parentConfig.direction,
      size: size ?? parentConfig.size,
      // Font switch resolution order: explicit prop > theme.fontFamily > parent.
      fontFamily: fontFamily ?? resolvedTheme.fontFamily ?? parentConfig.fontFamily,
      locale: locale ?? parentConfig.locale,
      getPopupContainer: getPopupContainer ?? parentConfig.getPopupContainer,
    };
    return next;
  }, [
    theme,
    appearance,
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
        data-appearance={mergedConfig.appearance}
      >
        {children}
      </div>
    </VertMConfigContext.Provider>
  );
}

/** Re-export default config for standalone usage without a provider. */
export { defaultVertMConfig };
