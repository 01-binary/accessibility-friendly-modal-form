// Import all components
import { DialogRoot } from './DialogRoot';
import { DialogTrigger } from './DialogTrigger';
import { DialogPortal } from './DialogPortal';
import { DialogOverlay } from './DialogOverlay';
import { DialogContent } from './DialogContent';
import { DialogHeader } from './DialogHeader';
import { DialogTitle } from './DialogTitle';
import { DialogDescription } from './DialogDescription';
import { DialogFooter } from './DialogFooter';
import { DialogClose } from './DialogClose';

// Compound component export
export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Close: DialogClose,
};

// Default exports for convenience
export {
  DialogRoot as Root,
  DialogTrigger as Trigger,
  DialogPortal as Portal,
  DialogOverlay as Overlay,
  DialogContent as Content,
  DialogHeader as Header,
  DialogTitle as Title,
  DialogDescription as Description,
  DialogFooter as Footer,
  DialogClose as Close,
};

// Individual component exports
export { DialogRoot } from './DialogRoot';
export { DialogTrigger } from './DialogTrigger';
export { DialogPortal } from './DialogPortal';
export { DialogOverlay } from './DialogOverlay';
export { DialogContent } from './DialogContent';
export { DialogHeader } from './DialogHeader';
export { DialogTitle } from './DialogTitle';
export { DialogDescription } from './DialogDescription';
export { DialogFooter } from './DialogFooter';
export { DialogClose } from './DialogClose';

// Re-export types
export type { DialogContextType } from '../../../types/dialog';
