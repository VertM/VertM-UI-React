import { useEffect, type RefObject } from 'react';
import { handleFocusTrapKeydown } from '@vertm/core/dom';

/**
 * Keep Tab focus inside `container` while `active`, so a modal surface cannot
 * hand focus back to the page behind it.
 */
export function useFocusTrap(container: RefObject<HTMLElement>, active: boolean): void {
  useEffect(() => {
    if (!active) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const root = container.current;
      if (!root) return;
      handleFocusTrapKeydown(event, root);
    };

    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [container, active]);
}
