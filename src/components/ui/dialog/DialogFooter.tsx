import { forwardRef, type ComponentPropsWithoutRef } from "react";

// Dialog Footer Component
interface DialogFooterProps extends ComponentPropsWithoutRef<"div"> {}

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  (props, forwardedRef) => {
    return <div ref={forwardedRef} {...props} />;
  }
);

DialogFooter.displayName = "Dialog.Footer";