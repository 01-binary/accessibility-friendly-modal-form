import {
  forwardRef,
  useCallback,
  useEffect,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type FocusEvent,
} from 'react';
import { useDialog } from '../../../hooks/useDialog';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';
import { getNextZIndex } from '../../../utils/z-index';

// Dialog Content Component
interface DialogContentProps extends ComponentPropsWithoutRef<'div'> {
  forceMount?: boolean;
  onOpenAutoFocus?: (event: FocusEvent) => void;
  onCloseAutoFocus?: (event: FocusEvent) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: PointerEvent) => void;
  onInteractOutside?: (event: PointerEvent | FocusEvent) => void;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      forceMount,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      onInteractOutside,
      onKeyDown,
      ...props
    },
    forwardedRef
  ) => {
    const { open, onOpenChange, titleId, descriptionId, contentRef, modal } =
      useDialog();

    if (!forceMount && !open) return null;

    const ref = useCallback(
      (node: HTMLDivElement | null) => {
        if (node) {
          contentRef.current = node;
        }
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef, contentRef]
    );

    // Focus trap
    useFocusTrap(contentRef, open && modal);

    // Body scroll lock
    useBodyScrollLock(open && modal);

    // Escape key handler
    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
        if (event.key === 'Escape') {
          event.preventDefault();
          onEscapeKeyDown?.(event);
          if (!event.defaultPrevented) {
            onOpenChange(false);
          }
        }
      },
      [onKeyDown, onEscapeKeyDown, onOpenChange]
    );

    // Click outside handler
    useEffect(() => {
      if (!open || !modal) return;

      const handlePointerDown = (event: globalThis.PointerEvent) => {
        const target = event.target as HTMLElement;
        if (contentRef.current && !contentRef.current.contains(target)) {
          onPointerDownOutside?.(event);
          onInteractOutside?.(event);
          if (!event.defaultPrevented) {
            onOpenChange(false);
          }
        }
      };

      document.addEventListener('pointerdown', handlePointerDown);
      return () =>
        document.removeEventListener('pointerdown', handlePointerDown);
    }, [open, modal, onPointerDownOutside, onInteractOutside, onOpenChange]);

    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal={modal}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        data-state={open ? 'open' : 'closed'}
        onKeyDown={handleKeyDown}
        style={{
          position: 'fixed',
          zIndex: getNextZIndex(),
        }}
        {...props}
      />
    );
  }
);

DialogContent.displayName = 'Dialog.Content';
