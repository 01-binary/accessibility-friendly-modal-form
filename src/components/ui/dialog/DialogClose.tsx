import React, {
  forwardRef,
  useCallback,
  type ComponentPropsWithoutRef,
  type MouseEvent,
} from 'react';
import { useDialog } from '../../../hooks/useDialog';

// Dialog Close Component
interface DialogCloseProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ asChild = false, onClick, ...props }, forwardedRef) => {
    const { onOpenChange } = useDialog();

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        onOpenChange(false);
      },
      [onClick, onOpenChange]
    );

    if (asChild) {
      return React.isValidElement(props.children)
        ? React.cloneElement(props.children as React.ReactElement<any>, {
            ref: forwardedRef,
            onClick: handleClick,
          })
        : null;
    }

    return <button ref={forwardedRef} onClick={handleClick} {...props} />;
  }
);

DialogClose.displayName = 'Dialog.Close';
