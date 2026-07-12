import type { VertMTheme } from './types.js';
import { defaultTheme } from './default-theme.js';

export const darkTheme: VertMTheme = {
  ...defaultTheme,
  colorPrimary: '#2d77db',
  colorSuccess: '#22c55e',
  colorWarning: '#fbbf24',
  colorError: '#ef4444',
  colorInfo: '#2d77db',
  colorText: '#fafaf9',
  colorTextSecondary: '#a8a29e',
  colorTextDisabled: '#78716c',
  colorBgContainer: '#1c1917',
  colorBgElevated: '#292524',
  colorBgLayout: '#0c0a09',
  colorBorder: '#44403c',
  colorBorderSecondary: '#292524',
  colorLink: '#2d77db',
  colorLinkHover: '#4d94eb',
  caretColor: '#2d77db',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.48), 0 1px 6px -1px rgba(0, 0, 0, 0.36), 0 2px 4px 0 rgba(0, 0, 0, 0.24)',
  boxShadowSecondary: '0 6px 16px 0 rgba(0, 0, 0, 0.32), 0 3px 6px -4px rgba(0, 0, 0, 0.48), 0 9px 28px 8px rgba(0, 0, 0, 0.2)',
};
