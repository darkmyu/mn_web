import { useState } from 'react';
import { ModalContext } from './context';

interface Props {
  children: React.ReactNode;
}

function ModalRoot({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return <ModalContext.Provider value={{ isOpen, open, close }}>{children}</ModalContext.Provider>;
}

export default ModalRoot;
