import { Dialog as BaseDialog } from '@base-ui/react/dialog';

export const Dialog = {
  Root: BaseDialog.Root,
  Close: BaseDialog.Close,
  Trigger: BaseDialog.Trigger,
  Popup: DialogPopup,
};

function DialogPopup({ children, className, ...props }: BaseDialog.Popup.Props) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="fixed inset-0 min-h-dvh bg-black/10 backdrop-blur-xs" />
      <BaseDialog.Popup
        className={`animate-fade-up fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 ${className}`}
        {...props}
      >
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}
