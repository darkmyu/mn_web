import { Dialog, VisuallyHidden } from 'radix-ui';

export const Modal = {
  Root: Dialog.Root,
  Close: Dialog.Close,
  Trigger: Dialog.Trigger,
  Content: ModalContent,
};

function ModalContent({ children, ...props }: Dialog.DialogContentProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/10 backdrop-blur-xs">
        <Dialog.Content {...props}>
          <VisuallyHidden.Root>
            <Dialog.Title />
            <Dialog.Description />
          </VisuallyHidden.Root>
          {children}
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
