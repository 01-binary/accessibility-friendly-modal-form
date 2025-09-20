import {
  useCallback,
  useMemo,
  useState,
  useRef,
  useId,
  type ReactNode,
} from 'react';
import { DialogContext } from '../../../hooks/useDialog';
import type { DialogContextType } from '../../../types/dialog';

// Dialog Root Component
interface DialogRootProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

export const DialogRoot = ({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  modal = true,
}: DialogRootProps) => {
  const [openState, setOpenState] = useState(defaultOpen);
  const open = openProp !== undefined ? openProp : openState;

  const titleId = useId();
  const descriptionId = useId();
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (openProp === undefined) {
        setOpenState(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [openProp, onOpenChange]
  );

  const contextValue = useMemo<DialogContextType>(
    () => ({
      open,
      onOpenChange: handleOpenChange,
      titleId,
      descriptionId,
      triggerRef,
      contentRef,
      modal,
    }),
    [open, handleOpenChange, titleId, descriptionId, modal]
  );

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
    </DialogContext.Provider>
  );
};
