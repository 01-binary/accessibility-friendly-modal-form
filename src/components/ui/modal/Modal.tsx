import type { ReactNode } from 'react';
import { Dialog } from '../dialog';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}

export const Modal = ({ open, onOpenChange, children, className }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 motion-safe:transition-opacity motion-safe:duration-200" />
        <Dialog.Content className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out ${className || ''}`}>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

Modal.Header = Dialog.Header;
Modal.Title = Dialog.Title;
Modal.Description = Dialog.Description;
Modal.Footer = Dialog.Footer;
Modal.Close = Dialog.Close;