import type { VertMTheme } from './types.js';
import { DEFAULT_FONT_FAMILY } from './fonts.js';

export const defaultTheme: VertMTheme = {
  colorPrimary: '#1266d9',
  colorSuccess: '#16a34a',
  colorWarning: '#d97706',
  colorError: '#dc2626',
  colorInfo: '#1266d9',
  colorText: '#1c1917',
  colorTextSecondary: '#78716c',
  colorTextDisabled: '#a8a29e',
  colorBgContainer: '#ffffff',
  colorBgElevated: '#ffffff',
  colorBgLayout: '#faf9f7',
  colorBorder: '#e7e5e4',
  colorBorderSecondary: '#f0efea',
  colorLink: '#1266d9',
  colorLinkHover: '#0b4ea8',

  paddingXS: 8,
  paddingSM: 12,
  padding: 16,
  paddingLG: 24,
  marginXS: 8,
  marginSM: 12,
  margin: 16,
  marginLG: 24,

  fontSize: 16,
  fontSizeSM: 14,
  fontSizeLG: 18,
  fontSizeHeading1: 38,
  fontSizeHeading2: 30,
  fontSizeHeading3: 24,
  fontSizeHeading4: 20,
  fontSizeHeading5: 16,
  lineHeight: 1.6,
  fontFamily: DEFAULT_FONT_FAMILY,

  borderRadius: 6,
  borderRadiusSM: 4,
  borderRadiusLG: 8,

  motionDurationFast: '0.1s',
  motionDurationMid: '0.2s',
  motionDurationSlow: '0.3s',

  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
  boxShadowSecondary: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',

  zIndexPopup: 1050,
  zIndexModal: 1000,
  zIndexTooltip: 1070,

  vertical: {
    columnSize: 32,
    columnGap: 16,
    verticalLineHeight: 1.6,
    hangingPunctuation: 'allow-end',
  },

  caretColor: '#1266d9',
  writingMode: 'vertical-lr',
};
