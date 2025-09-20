import {
  forwardRef,
  useCallback,
  useState,
  type ComponentPropsWithoutRef,
  type MouseEvent,
} from 'react';
import { useDialog } from '../../../hooks/useDialog';
import { getNextZIndex } from '../../../utils/z-index';

// Dialog Overlay Component
interface DialogOverlayProps extends ComponentPropsWithoutRef<'div'> {
  forceMount?: boolean;
}

export const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ forceMount, ...props }, forwardedRef) => {
    const { open, onOpenChange, modal } = useDialog();

    // z-index를 한 번만 생성
    const [zIndex] = useState(() => getNextZIndex());

    if (!forceMount && !open) return null;

    const handlePointerDown = useCallback(
      (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget && modal) {
          event.preventDefault();
          onOpenChange(false);
        }
      },
      [onOpenChange, modal]
    );

    return (
      <div
        ref={forwardedRef}
        data-state={open ? 'open' : 'closed'}
        onPointerDown={handlePointerDown}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: zIndex,
        }}
        {...props}
      />
    );
  }
);

DialogOverlay.displayName = 'Dialog.Overlay';
