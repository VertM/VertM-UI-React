import type { VertMTheme } from './types.js';

/** Map a theme object to CSS custom properties with `--vertm-*` naming. */
export function themeToCssVars(theme: VertMTheme): Record<string, string> {
  const v = theme.vertical;
  return {
    '--vertm-color-primary': theme.colorPrimary,
    '--vertm-color-success': theme.colorSuccess,
    '--vertm-color-warning': theme.colorWarning,
    '--vertm-color-error': theme.colorError,
    '--vertm-color-info': theme.colorInfo,
    '--vertm-color-text': theme.colorText,
    '--vertm-color-text-secondary': theme.colorTextSecondary,
    '--vertm-color-text-disabled': theme.colorTextDisabled,
    '--vertm-color-bg-container': theme.colorBgContainer,
    '--vertm-color-bg-elevated': theme.colorBgElevated,
    '--vertm-color-bg-layout': theme.colorBgLayout,
    '--vertm-color-border': theme.colorBorder,
    '--vertm-color-border-secondary': theme.colorBorderSecondary,
    '--vertm-color-link': theme.colorLink,
    '--vertm-color-link-hover': theme.colorLinkHover,

    '--vertm-padding-xs': `${theme.paddingXS}px`,
    '--vertm-padding-sm': `${theme.paddingSM}px`,
    '--vertm-padding': `${theme.padding}px`,
    '--vertm-padding-lg': `${theme.paddingLG}px`,
    '--vertm-margin-xs': `${theme.marginXS}px`,
    '--vertm-margin-sm': `${theme.marginSM}px`,
    '--vertm-margin': `${theme.margin}px`,
    '--vertm-margin-lg': `${theme.marginLG}px`,

    '--vertm-font-size': `${theme.fontSize}px`,
    '--vertm-font-size-sm': `${theme.fontSizeSM}px`,
    '--vertm-font-size-lg': `${theme.fontSizeLG}px`,
    '--vertm-font-size-heading-1': `${theme.fontSizeHeading1}px`,
    '--vertm-font-size-heading-2': `${theme.fontSizeHeading2}px`,
    '--vertm-font-size-heading-3': `${theme.fontSizeHeading3}px`,
    '--vertm-font-size-heading-4': `${theme.fontSizeHeading4}px`,
    '--vertm-font-size-heading-5': `${theme.fontSizeHeading5}px`,
    '--vertm-line-height': String(theme.lineHeight),
    '--vertm-font-family': theme.fontFamily,

    '--vertm-border-radius': `${theme.borderRadius}px`,
    '--vertm-border-radius-sm': `${theme.borderRadiusSM}px`,
    '--vertm-border-radius-lg': `${theme.borderRadiusLG}px`,

    '--vertm-motion-duration-fast': theme.motionDurationFast,
    '--vertm-motion-duration-mid': theme.motionDurationMid,
    '--vertm-motion-duration-slow': theme.motionDurationSlow,

    '--vertm-box-shadow': theme.boxShadow,
    '--vertm-box-shadow-secondary': theme.boxShadowSecondary,

    '--vertm-z-index-popup': String(theme.zIndexPopup),
    '--vertm-z-index-modal': String(theme.zIndexModal),
    '--vertm-z-index-tooltip': String(theme.zIndexTooltip),

    '--vertm-column-size': `${v.columnSize}px`,
    '--vertm-column-gap': `${v.columnGap}px`,
    '--vertm-vertical-line-height': String(v.verticalLineHeight),
    '--vertm-hanging-punctuation': v.hangingPunctuation,

    '--vertm-caret-color': theme.caretColor,
    '--vertm-writing-mode': theme.writingMode,
  };
}

/** Serialize CSS variables to a `:root { ... }` block string. */
export function themeToCssString(theme: VertMTheme): string {
  const vars = themeToCssVars(theme);
  const lines = Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
  return `:root {\n${lines}\n}`;
}
