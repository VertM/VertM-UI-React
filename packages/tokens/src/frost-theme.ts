import { createTheme } from './create-theme.js';

/** 霜 Frost — cool cobalt (clearer default-blue variant). */
export const frostTheme = createTheme({
  colorPrimary: '#2155d6',
  colorInfo: '#2155d6',
  colorSuccess: '#247a55',
  colorWarning: '#d97706',
  colorError: '#d84a32',
  colorText: '#132140',
  colorTextSecondary: '#566a8f',
  colorTextDisabled: '#9aa6c2',
  colorBgContainer: '#ffffff',
  colorBgElevated: '#ffffff',
  colorBgLayout: '#e7eefb',
  colorBorder: '#cfdcf3',
  colorBorderSecondary: '#e0e9f9',
  colorLink: '#2155d6',
  colorLinkHover: '#17408f',
  borderRadius: 8,
  borderRadiusSM: 5,
  borderRadiusLG: 10,
  caretColor: '#2155d6',
  vertical: { columnSize: 32, columnGap: 16 },
});
