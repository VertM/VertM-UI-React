/**
 * Keyboard contract (component-design-spec §3.1):
 * ArrowUp/ArrowDown move between peers in reading order (inline axis);
 * ArrowLeft/ArrowRight enter/leave levels or switch columns (block axis).
 */

export type SelectKeyAction = 'open' | 'prev' | 'next' | 'commit' | 'close';

export function resolveSelectKey(
  key: string,
  state: { open: boolean; vertical: boolean }
): SelectKeyAction | null {
  if (!state.open) {
    if (key === 'ArrowDown' || key === 'Enter') return 'open';
    if (state.vertical && key === 'ArrowRight') return 'open';
    return null;
  }

  if (key === 'ArrowDown') return 'next';
  if (key === 'ArrowUp') return 'prev';
  if (key === 'Enter') return 'commit';
  if (key === 'Escape') return 'close';

  if (state.vertical) {
    if (key === 'ArrowRight') return 'commit';
    if (key === 'ArrowLeft') return 'prev';
  } else {
    if (key === 'ArrowRight') return 'next';
    if (key === 'ArrowLeft') return 'prev';
  }

  return null;
}

export type MenuItemKeyAction = 'activate' | 'prev' | 'next' | 'exitToParent';

export function resolveMenuItemKey(key: string): MenuItemKeyAction | null {
  if (key === 'Enter' || key === ' ') return 'activate';
  if (key === 'ArrowDown') return 'next';
  if (key === 'ArrowUp') return 'prev';
  if (key === 'ArrowLeft') return 'exitToParent';
  return null;
}

export type SubMenuKeyAction = 'toggle' | 'prev' | 'next' | 'open' | 'close';

export function resolveSubMenuKey(key: string, state: { open: boolean }): SubMenuKeyAction | null {
  if (key === 'Enter' || key === ' ') return 'toggle';
  if (key === 'ArrowDown') return 'next';
  if (key === 'ArrowUp') return 'prev';
  if (key === 'ArrowRight' && !state.open) return 'open';
  if (key === 'ArrowLeft' && state.open) return 'close';
  return null;
}

export type TabsKeyAxis = 'horizontal' | 'vertical';
export type TabsKeyAction = 'activate' | 'prev' | 'next' | 'first' | 'last';

/** Vertical writing always treats tabs as peer columns (Left/Right). */
export function resolveTabsKeyAxis(isVerticalWriting: boolean, verticalBar: boolean): TabsKeyAxis {
  return isVerticalWriting || !verticalBar ? 'horizontal' : 'vertical';
}

export function resolveTabsKey(key: string, axis: TabsKeyAxis): TabsKeyAction | null {
  if (key === 'Enter' || key === ' ') return 'activate';
  if (axis === 'horizontal') {
    if (key === 'ArrowLeft') return 'prev';
    if (key === 'ArrowRight') return 'next';
  } else {
    if (key === 'ArrowUp') return 'prev';
    if (key === 'ArrowDown') return 'next';
  }
  if (key === 'Home') return 'first';
  if (key === 'End') return 'last';
  return null;
}

export type FieldKeyAction = 'caretPrev' | 'caretNext' | 'submit';

/** Single-line VertMTextField: the caret runs top→bottom inside one column. */
export function resolveFieldKey(key: string): FieldKeyAction | null {
  if (key === 'ArrowUp') return 'caretPrev';
  if (key === 'ArrowDown') return 'caretNext';
  if (key === 'Enter') return 'submit';
  return null;
}
