import { createContext, useContext } from 'react';
import type { DialogContextType } from '../types/dialog';

export const DialogContext = createContext<DialogContextType | null>(null);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within a Dialog.Root");
  }
  return context;
};