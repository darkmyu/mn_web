'use client';

import { useModalStore } from '@/stores/modal';
import { Dialog, VisuallyHidden } from 'radix-ui';

function ModalProvider() {
  const { modals, close } = useModalStore();

  return (
    <>
      {modals.map((modal) => {
        const { id, Component, props } = modal;

        return (
          <Dialog.Root key={id} open={true} onOpenChange={() => close(id)}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80">
                <Dialog.Content className="z-50">
                  <VisuallyHidden.Root>
                    <Dialog.Title />
                    <Dialog.Description />
                  </VisuallyHidden.Root>
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
