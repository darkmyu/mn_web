'use client';

import React, { useEffect, useState } from 'react';
import { useModals } from '@/stores/model';
import { createPortal } from 'react-dom';

function ModalProvider() {
  const { modals, close } = useModals();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {modals.map((modal) => {
        const { id, Component, props } = modal;

        return createPortal(
          <div key={id} className={'fixed top-0 right-0 bottom-0 left-0 z-50 flex flex-col items-center justify-center bg-black/30'}>
            <Component {...props} />
          </div>,
          document.body,
        );
      })}
    </>
  );
}

export default ModalProvider;
