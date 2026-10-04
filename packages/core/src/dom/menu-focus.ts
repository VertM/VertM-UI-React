/**
 * Focus the previous/next enabled control inside a menu list.
 * Menu items use `role="menuitem"`; submenu titles use `role="button"` with
 * `aria-haspopup="menu"`.
 */
export function focusSiblingMenuControl(
  current: HTMLElement,
  direction: 1 | -1
): HTMLElement | null {
  const list = current.closest('.vertm-menu__list');
  if (!list) return null;

  const controls = Array.from(
    list.querySelectorAll<HTMLElement>(
      '[role="menuitem"]:not([aria-disabled="true"]), .vertm-submenu__title[role="button"]:not([tabindex="-1"])'
    )
  ).filter((el) => {
    // A submenu title lives inside an li; skip the outer li if it somehow matches.
    if (el.classList.contains('vertm-submenu')) return false;
    return true;
  });

  const index = controls.indexOf(current);
  if (index === -1) return null;

  const next = controls[(index + direction + controls.length) % controls.length];
  next?.focus();
  return next ?? null;
}

/** First focusable control in a menu list (used after opening a submenu). */
export function focusFirstMenuControl(root: ParentNode | null): HTMLElement | null {
  if (!root) return null;
  const first = root.querySelector<HTMLElement>(
    '[role="menuitem"]:not([aria-disabled="true"]), .vertm-submenu__title[role="button"]:not([tabindex="-1"])'
  );
  first?.focus();
  return first;
}

/** Focus the title of the submenu identified by `key` (used when leaving a nested level). */
export function focusSubmenuTitle(key: string, root: ParentNode = document): HTMLElement | null {
  const title = root.querySelector<HTMLElement>(
    `.vertm-submenu[data-menu-key="${CSS.escape(key)}"] > .vertm-submenu__title`
  );
  title?.focus();
  return title;
}
