import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { useDialog } from '../../../hooks/useDialog';

// Dialog Title Component
interface DialogTitleProps extends ComponentPropsWithoutRef<'h2'> {}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  (props, forwardedRef) => {
    const { titleId } = useDialog();

    return (
      <h2
        ref={forwardedRef}
        id={titleId}
        data-autofocus
        tabIndex={-1}
        style={{ outline: 'none' }}
        {...props}
      />
    );
  }
);

DialogTitle.displayName = 'Dialog.Title';
