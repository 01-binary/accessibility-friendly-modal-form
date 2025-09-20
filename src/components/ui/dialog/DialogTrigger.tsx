import React, {
  forwardRef,
  useCallback,
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type KeyboardEvent,
} from 'react';
import { useDialog } from '../../../hooks/useDialog';

// Dialog Trigger Component
interface DialogTriggerProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild = false, onClick, onKeyDown, ...props }, forwardedRef) => {
    const { onOpenChange, triggerRef } = useDialog();

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        onOpenChange(true);
      },
      [onClick, onOpenChange]
    );

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLButtonElement>) => {
        onKeyDown?.(event);
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpenChange(true);
        }
      },
      [onKeyDown, onOpenChange]
    );

    const ref = useCallback(
      (node: HTMLButtonElement | null) => {
        if (node) {
          triggerRef.current = node;
        }
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef, triggerRef]
    );

    if (asChild) {
      return React.isValidElement(props.children)
        ? React.cloneElement(props.children as React.ReactElement<any>, {
            ref,
            onClick: handleClick,
            onKeyDown: handleKeyDown,
            'aria-haspopup': 'dialog',
            'aria-expanded': undefined,
            'data-state': undefined,
          })
        : null;
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-haspopup="dialog"
        data-state={undefined}
        {...props}
      />
    );
  }
);

DialogTrigger.displayName = 'Dialog.Trigger';
