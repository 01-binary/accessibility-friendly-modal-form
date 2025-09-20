import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import { useDialog } from '../../../hooks/useDialog';
import { canUseDOM, isDev } from '../../../utils/dom';

// Dialog Portal Component
interface DialogPortalProps {
  children: ReactNode;
  container?: Element | DocumentFragment;
  forceMount?: boolean;
}

export const DialogPortal = ({
  children,
  container,
  forceMount,
}: DialogPortalProps) => {
  const { open } = useDialog();

  if (!forceMount && !open) return null;
  if (!canUseDOM) return null;

  const portalContainer = container || globalThis?.document?.body;

  if (!portalContainer) {
    if (isDev()) {
      console.warn('[Dialog.Portal] Cannot render portal: no container found');
    }
    return null;
  }

  return createPortal(children, portalContainer);
};

DialogPortal.displayName = 'Dialog.Portal';
