import React, { cloneElement } from 'react';
import { useModalContext } from './context';

interface Props {
  children: React.ReactElement<{ onClick?: React.MouseEventHandler<HTMLElement> }>;
}

function ModalClose({ children }: Props) {
  const { close } = useModalContext();

  return cloneElement(children, {
    onClick: (e) => {
      children.props.onClick?.(e);
      close();
    },
  });
}

export default ModalClose;
