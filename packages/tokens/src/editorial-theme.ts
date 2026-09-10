import type { VertMTheme } from './types.js';
import { createTheme } from './create-theme.js';
import { DEFAULT_FONT_FAMILY } from './fonts.js';

/**
 * Vertical Editorial preset — mapped from `design/vertical-editorial`.
 *
 * Design contract:
 * - Primary fills use ink (`#171a18`), not brand blue.
 * - Cobalt (`#2155d6`) is reserved for links and caret only.
 *   Selected markers / checkbox fills use ink so the UI does not read as blue.
 */
export const editorialTheme: VertMTheme = createTheme({
  colorPrimary: '#171a18',
  colorSuccess: '#247a55',
  colorWarning: '#d97706',
  colorError: '#d84a32',
  colorInfo: '#2155d6',
  colorText: '#171a18',
  colorTextSecondary: '#686b66',
  colorTextDisabled: '#a9aaa5',
  colorBgContainer: '#fbfaf6',
  colorBgElevated: '#fbfaf6',
  colorBgLayout: '#f3f1ea',
  colorBorder: '#c8c6bd',
  colorBorderSecondary: '#dedcd4',
  colorLink: '#2155d6',
  colorLinkHover: '#1a44ad',

  borderRadius: 3,
  borderRadiusSM: 2,
  borderRadiusLG: 4,

  motionDurationFast: '0.14s',
  motionDurationMid: '0.16s',
  motionDurationSlow: '0.2s',

  // Editorial surfaces prefer a flat paper feel over soft elevation.
  boxShadow: 'none',
  boxShadowSecondary: '10px 12px 0 rgba(23, 26, 24, 0.08)',

  fontFamily: DEFAULT_FONT_FAMILY,
  caretColor: '#2155d6',

  vertical: {
    columnSize: 40,
    columnGap: 12,
    verticalLineHeight: 1.55,
  },
});
