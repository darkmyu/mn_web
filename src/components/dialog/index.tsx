import { Dialog as BaseDialog } from '@base-ui/react/dialog';

export const Dialog = {
  Root: BaseDialog.Root,
  Close: BaseDialog.Close,
  Trigger: BaseDialog.Trigger,
  Popup: DialogPopup,
};

function DialogPopup({ children, ...props }: BaseDialog.Popup.Props) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/10 backdrop-blur-xs">
        <BaseDialog.Popup {...props}>{children}</BaseDialog.Popup>
      </BaseDialog.Backdrop>
    </BaseDialog.Portal>
  );
}
