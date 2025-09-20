import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { useDialog } from '../../../hooks/useDialog';

// Dialog Description Component
interface DialogDescriptionProps extends ComponentPropsWithoutRef<'p'> {}

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>((props, forwardedRef) => {
  const { descriptionId } = useDialog();

  return <p ref={forwardedRef} id={descriptionId} {...props} />;
});

DialogDescription.displayName = 'Dialog.Description';
