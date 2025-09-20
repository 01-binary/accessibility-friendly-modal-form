import { useEffect, type RefObject } from 'react';
import { useIsomorphicLayoutEffect } from '../utils/dom';
import {
  getFocusableElements,
  focusElement,
  isElementFocused,
} from '../utils/focus';

// Focus trap implementation
export const useFocusTrap = (
  containerRef: RefObject<HTMLElement>,
  enabled: boolean
) => {
  useIsomorphicLayoutEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    let restoreFocus: HTMLElement | null = null;

    // Store current focused element
    if (document.activeElement instanceof HTMLElement) {
      restoreFocus = document.activeElement;
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements(container);
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (!firstFocusable && !lastFocusable) {
        event.preventDefault();
        return;
      }

      if (event.shiftKey) {
        if (isElementFocused(firstFocusable)) {
          event.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (isElementFocused(lastFocusable)) {
          event.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    // Set initial focus
    setTimeout(() => focusElement(container), 0);

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus when unmounting
      restoreFocus?.focus();
    };
  }, [enabled, containerRef]);
};
