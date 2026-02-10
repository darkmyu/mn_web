import { Dialog } from '@base-ui/react/dialog';

export const Modal = {
  Root: Dialog.Root,
  Close: Dialog.Close,
  Trigger: Dialog.Trigger,
  Popup: DialogPopup,
};

function DialogPopup({ children, className, ...props }: Dialog.Popup.Props) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 z-20 min-h-dvh bg-black/10 backdrop-blur-xs" />
      <Dialog.Popup
        className={`animate-fade-up fixed top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 ${className}`}
        {...props}
      >
        {children}
      </Dialog.Popup>
    </Dialog.Portal>
  );
}
