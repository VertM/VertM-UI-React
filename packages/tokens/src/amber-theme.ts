import { createTheme } from './create-theme.js';

/**
 * 鎏金 Amber — bronze warm gold.
 * Primary is deepened for white-on-primary ≥ AA (decorative gilt `#e0aa4e` is not a token role).
 */
export const amberTheme = createTheme({
  colorPrimary: '#a26a1f',
  colorInfo: '#a26a1f',
  colorSuccess: '#5f7a2e',
  colorWarning: '#c88a1f',
  colorError: '#b04a2a',
  colorText: '#2a2114',
  colorTextSecondary: '#77664a',
  colorTextDisabled: '#b6a988',
  colorBgContainer: '#fbf8f1',
  colorBgElevated: '#fbf8f1',
  colorBgLayout: '#f2ecdf',
  colorBorder: '#e3d8c2',
  colorBorderSecondary: '#ece3d2',
  colorLink: '#83551a',
  colorLinkHover: '#6a4515',
  borderRadius: 6,
  borderRadiusSM: 4,
  borderRadiusLG: 8,
  caretColor: '#a26a1f',
  vertical: { columnSize: 32, columnGap: 16 },
});
