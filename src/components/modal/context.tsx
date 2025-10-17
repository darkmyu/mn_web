import { createContext, useContext } from 'react';

interface ModalContext {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const ModalContext = createContext<ModalContext | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('modal context error');
  }
  return context;
};
