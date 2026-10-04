import { describe, expect, it } from 'vitest';
import {
  resolveFieldKey,
  resolveMenuItemKey,
  resolveSelectKey,
  resolveSubMenuKey,
  resolveTabsKey,
  resolveTabsKeyAxis,
} from './keymap.js';

describe('resolveSelectKey', () => {
  it.each([
    ['ArrowDown', { open: false, vertical: false }, 'open'],
    ['Enter', { open: false, vertical: false }, 'open'],
    ['ArrowRight', { open: false, vertical: true }, 'open'],
    ['ArrowRight', { open: false, vertical: false }, null],
    ['ArrowDown', { open: true, vertical: false }, 'next'],
    ['ArrowUp', { open: true, vertical: false }, 'prev'],
    ['ArrowRight', { open: true, vertical: true }, 'commit'],
    ['ArrowLeft', { open: true, vertical: true }, 'prev'],
    ['ArrowRight', { open: true, vertical: false }, 'next'],
    ['ArrowLeft', { open: true, vertical: false }, 'prev'],
    ['Enter', { open: true, vertical: false }, 'commit'],
    ['Escape', { open: true, vertical: false }, 'close'],
    ['Tab', { open: true, vertical: false }, null],
  ] as const)('%s + %j → %s', (key, state, expected) => {
    expect(resolveSelectKey(key, state)).toBe(expected);
  });
});

describe('resolveMenuItemKey', () => {
  it.each([
    ['Enter', 'activate'],
    [' ', 'activate'],
    ['ArrowDown', 'next'],
    ['ArrowUp', 'prev'],
    ['ArrowLeft', 'exitToParent'],
    ['Escape', null],
  ] as const)('%s → %s', (key, expected) => {
    expect(resolveMenuItemKey(key)).toBe(expected);
  });
});

describe('resolveSubMenuKey', () => {
  it.each([
    ['Enter', { open: false }, 'toggle'],
    [' ', { open: true }, 'toggle'],
    ['ArrowDown', { open: false }, 'next'],
    ['ArrowUp', { open: false }, 'prev'],
    ['ArrowRight', { open: false }, 'open'],
    ['ArrowRight', { open: true }, null],
    ['ArrowLeft', { open: true }, 'close'],
    ['ArrowLeft', { open: false }, null],
    ['Tab', { open: false }, null],
  ] as const)('%s + %j → %s', (key, state, expected) => {
    expect(resolveSubMenuKey(key, state)).toBe(expected);
  });
});

describe('resolveTabsKeyAxis / resolveTabsKey', () => {
  it.each([
    [true, true, 'horizontal'],
    [true, false, 'horizontal'],
    [false, false, 'horizontal'],
    [false, true, 'vertical'],
  ] as const)('writing=%s verticalBar=%s → %s', (writing, bar, expected) => {
    expect(resolveTabsKeyAxis(writing, bar)).toBe(expected);
  });

  it.each([
    ['Enter', 'horizontal', 'activate'],
    [' ', 'vertical', 'activate'],
    ['ArrowLeft', 'horizontal', 'prev'],
    ['ArrowRight', 'horizontal', 'next'],
    ['ArrowUp', 'vertical', 'prev'],
    ['ArrowDown', 'vertical', 'next'],
    ['ArrowUp', 'horizontal', null],
    ['Home', 'horizontal', 'first'],
    ['End', 'vertical', 'last'],
    ['Tab', 'horizontal', null],
  ] as const)('%s on %s → %s', (key, axis, expected) => {
    expect(resolveTabsKey(key, axis)).toBe(expected);
  });
});

describe('resolveFieldKey', () => {
  it.each([
    ['ArrowUp', 'caretPrev'],
    ['ArrowDown', 'caretNext'],
    ['Enter', 'submit'],
    ['ArrowLeft', null],
  ] as const)('%s → %s', (key, expected) => {
    expect(resolveFieldKey(key)).toBe(expected);
  });
});
