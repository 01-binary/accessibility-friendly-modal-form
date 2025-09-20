import { useIsomorphicLayoutEffect, canUseDOM } from '../utils/dom';

// Body scroll lock
export const useBodyScrollLock = (enabled: boolean) => {
  useIsomorphicLayoutEffect(() => {
    if (!enabled || !canUseDOM) return;

    const originalStyle = window.getComputedStyle(document.body);
    const originalOverflow = originalStyle.overflow;
    const originalPaddingRight = originalStyle.paddingRight;

    // Get scrollbar width
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Lock scroll
    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [enabled]);
};