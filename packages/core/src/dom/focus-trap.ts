export const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function isVisible(el: HTMLElement): boolean {
  // `offsetParent` is not usable here: it is null for anything inside a
  // position:fixed surface, which is exactly what modals render into.
  if (el.hasAttribute('hidden') || el.closest('[aria-hidden="true"]')) return false;
  const style = getComputedStyle(el);
  return style.display !== 'none' && style.visibility !== 'hidden';
}

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    isVisible
  );
}

/** Trap Tab navigation inside `root` (no-op for non-Tab keys). */
export function handleFocusTrapKeydown(event: KeyboardEvent, root: HTMLElement): void {
  if (event.key !== 'Tab') return;

  const focusable = getFocusableElements(root);
  if (focusable.length === 0) {
    // Nothing to land on: keep focus on the surface itself.
    event.preventDefault();
    root.focus();
    return;
  }

  const first = focusable[0]!;
  const last = focusable[focusable.length - 1]!;
  const activeEl = document.activeElement;

  if (!root.contains(activeEl)) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
    return;
  }

  if (event.shiftKey && activeEl === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && activeEl === last) {
    event.preventDefault();
    first.focus();
  }
}
