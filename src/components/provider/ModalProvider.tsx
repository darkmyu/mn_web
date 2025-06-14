'use client';

import { useModals } from '@/stores/modal';
import { Dialog } from 'radix-ui';
import { useEffect, useState } from 'react';

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

        return (
          <Dialog.Root key={id} open={true} onOpenChange={() => close(id)}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center overflow-y-auto bg-black/30">
                <Dialog.Content>
                  <Component {...props} />
                </Dialog.Content>
              </Dialog.Overlay>
            </Dialog.Portal>
          </Dialog.Root>
        );
      })}
    </>
  );
}

export default ModalProvider;
