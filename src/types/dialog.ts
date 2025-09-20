import type { RefObject, KeyboardEvent, FocusEvent } from 'react';

// Dialog Context Type
export interface DialogContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  triggerRef: RefObject<HTMLElement>;
  contentRef: RefObject<HTMLElement>;
  modal: boolean;
  onPointerDownOutside?: (event: PointerEvent) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onOpenAutoFocus?: (event: FocusEvent) => void;
  onCloseAutoFocus?: (event: FocusEvent) => void;
}
