import { forwardRef, type ComponentPropsWithoutRef } from "react";

// Dialog Header Component
interface DialogHeaderProps extends ComponentPropsWithoutRef<"div"> {}

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  (props, forwardedRef) => {
    return <div ref={forwardedRef} {...props} />;
  }
);

DialogHeader.displayName = "Dialog.Header";