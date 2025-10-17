import { Dialog, VisuallyHidden } from 'radix-ui';
import { useModalContext } from './context';

interface Props {
  children: React.ReactNode;
}

function ModalContent({ children }: Props) {
  const { isOpen, close } = useModalContext();

  return (
    <Dialog.Root open={isOpen} onOpenChange={() => close()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80">
          <Dialog.Content className="z-50">
            <VisuallyHidden.Root>
              <Dialog.Title />
              <Dialog.Description />
            </VisuallyHidden.Root>
            {children}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ModalContent;
