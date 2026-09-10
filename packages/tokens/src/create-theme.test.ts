import { describe, it, expect } from 'vitest';
import {
  createTheme,
  defaultTheme,
  darkTheme,
  editorialTheme,
  themeToCssVars,
} from '../src/index.js';

describe('createTheme', () => {
  it('returns default theme when no overrides', () => {
    const theme = createTheme();
    expect(theme.colorPrimary).toBe(defaultTheme.colorPrimary);
    expect(theme.vertical.columnSize).toBe(defaultTheme.vertical.columnSize);
  });

  it('merges top-level overrides', () => {
    const theme = createTheme({ colorPrimary: '#ff0000' });
    expect(theme.colorPrimary).toBe('#ff0000');
    expect(theme.colorSuccess).toBe(defaultTheme.colorSuccess);
  });

  it('deep-merges vertical tokens', () => {
    const theme = createTheme({ vertical: { columnGap: 24 } });
    expect(theme.vertical.columnGap).toBe(24);
    expect(theme.vertical.columnSize).toBe(defaultTheme.vertical.columnSize);
  });
});

describe('themeToCssVars', () => {
  it('maps theme to --vertm-* CSS variables', () => {
    const vars = themeToCssVars(defaultTheme);
    expect(vars['--vertm-color-primary']).toBe('#1266d9');
    expect(vars['--vertm-column-size']).toBe('32px');
    expect(vars['--vertm-writing-mode']).toBe('vertical-lr');
  });

  it('dark theme has different text color', () => {
    const vars = themeToCssVars(darkTheme);
    expect(vars['--vertm-color-text']).toBe('#fafaf9');
  });

  it('editorial theme maps the Vertical Editorial palette', () => {
    const vars = themeToCssVars(editorialTheme);
    expect(vars['--vertm-color-primary']).toBe('#171a18');
    expect(vars['--vertm-color-info']).toBe('#2155d6');
    expect(vars['--vertm-color-bg-layout']).toBe('#f3f1ea');
    expect(vars['--vertm-color-text']).toBe('#171a18');
    expect(vars['--vertm-border-radius']).toBe('3px');
    expect(vars['--vertm-column-size']).toBe('40px');
    expect(vars['--vertm-column-gap']).toBe('12px');
  });
});
