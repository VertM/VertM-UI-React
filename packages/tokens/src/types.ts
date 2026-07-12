/** Component size preset aligned with antd convention. */
export type VertMSize = 'small' | 'middle' | 'large';

/** Vertical-layout specific design tokens. */
export interface VertMVerticalTokens {
  /** Default column width in px for vertical text blocks. */
  columnSize: number;
  /** Gap between columns in px. */
  columnGap: number;
  /** Line height ratio for vertical text flow. */
  verticalLineHeight: number;
  /** CSS hanging-punctuation value for Mongolian punctuation. */
  hangingPunctuation: string;
}

/** Full VertM UI theme token set. */
export interface VertMTheme {
  // ── Colors ──
  colorPrimary: string;
  colorSuccess: string;
  colorWarning: string;
  colorError: string;
  colorInfo: string;
  colorText: string;
  colorTextSecondary: string;
  colorTextDisabled: string;
  colorBgContainer: string;
  colorBgElevated: string;
  colorBgLayout: string;
  colorBorder: string;
  colorBorderSecondary: string;
  colorLink: string;
  colorLinkHover: string;

  // ── Spacing (px) ──
  paddingXS: number;
  paddingSM: number;
  padding: number;
  paddingLG: number;
  marginXS: number;
  marginSM: number;
  margin: number;
  marginLG: number;

  // ── Typography ──
  fontSize: number;
  fontSizeSM: number;
  fontSizeLG: number;
  fontSizeHeading1: number;
  fontSizeHeading2: number;
  fontSizeHeading3: number;
  fontSizeHeading4: number;
  fontSizeHeading5: number;
  lineHeight: number;
  fontFamily: string;

  // ── Border ──
  borderRadius: number;
  borderRadiusSM: number;
  borderRadiusLG: number;

  // ── Motion ──
  motionDurationFast: string;
  motionDurationMid: string;
  motionDurationSlow: string;

  // ── Shadow ──
  boxShadow: string;
  boxShadowSecondary: string;

  // ── Z-index ──
  zIndexPopup: number;
  zIndexModal: number;
  zIndexTooltip: number;

  // ── Vertical layout ──
  vertical: VertMVerticalTokens;

  // ── Component-specific ──
  caretColor: string;
  writingMode: string;
}
