import React, { cloneElement } from 'react';
import { useModalContext } from './context';

interface Props {
  children: React.ReactElement<{ onClick?: React.MouseEventHandler<HTMLElement> }>;
}

function ModalTrigger({ children }: Props) {
  const { open } = useModalContext();

  return cloneElement(children, {
    onClick: (e) => {
      children.props.onClick?.(e);
      open();
    },
  });
}

export default ModalTrigger;
