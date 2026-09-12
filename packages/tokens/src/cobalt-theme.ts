import { createTheme } from './create-theme.js';

/** 钴蓝 Cobalt — brand sky blue (docs chrome façade). */
export const cobaltTheme = createTheme({
  colorPrimary: '#0e2f74',
  colorInfo: '#3f7ce0',
  colorSuccess: '#247a55',
  colorWarning: '#d97706',
  colorError: '#d84a32',
  colorText: '#1e2740',
  colorTextSecondary: '#5b6478',
  colorTextDisabled: '#9aa2b4',
  colorBgContainer: '#ffffff',
  colorBgElevated: '#ffffff',
  colorBgLayout: '#eef0f4',
  colorBorder: '#dde1ea',
  colorBorderSecondary: '#e8ebf1',
  colorLink: '#2155d6',
  colorLinkHover: '#17408f',
  borderRadius: 6,
  borderRadiusSM: 4,
  borderRadiusLG: 8,
  caretColor: '#0e2f74',
  vertical: { columnSize: 32, columnGap: 16 },
});
