import { useEffect } from 'react';

import type { RefObject } from 'react';

type UseSidebarCloseProps = {
  panelRef: RefObject<HTMLElement | null>;
  arrowRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  onClose: () => void;
};

export const useSidebarClose = ({
  panelRef,
  arrowRef,
  isOpen,
  onClose,
}: UseSidebarCloseProps): void => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleMouseDown = (event: MouseEvent): void => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!panelRef.current?.contains(target) && !arrowRef.current?.contains(target)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return (): void => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [panelRef, arrowRef, isOpen, onClose]);
};
