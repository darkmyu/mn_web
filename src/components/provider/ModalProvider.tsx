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
              <Dialog.Overlay className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70">
                <Dialog.Content className="z-50">
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
