import type { VertMTheme, VertMVerticalTokens } from './types.js';
import { defaultTheme } from './default-theme.js';

function mergeVertical(
  base: VertMVerticalTokens,
  overrides?: Partial<VertMVerticalTokens>
): VertMVerticalTokens {
  if (!overrides) return base;
  return { ...base, ...overrides };
}

/**
 * Create a custom theme by shallow-merging overrides onto the default theme.
 * Nested `vertical` tokens are deep-merged.
 */
export function createTheme(
  overrides: Partial<Omit<VertMTheme, 'vertical'>> & {
    vertical?: Partial<VertMVerticalTokens>;
  } = {}
): VertMTheme {
  const { vertical: verticalOverrides, ...rest } = overrides;
  return {
    ...defaultTheme,
    ...rest,
    vertical: mergeVertical(defaultTheme.vertical, verticalOverrides),
  };
}
