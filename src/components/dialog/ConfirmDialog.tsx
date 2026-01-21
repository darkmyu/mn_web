'use client';

import { useConfirmStore } from '@/stores/confirm';
import { Dialog } from '.';

function ConfirmDialog() {
  const { isOpen, title, description, confirmText, cancelText, onConfirm, onCancel, closeConfirm } = useConfirmStore();

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
    closeConfirm();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={closeConfirm}>
      <Dialog.Popup className="w-[20rem] p-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-bold">{title}</h1>
            <p className="text-sm whitespace-pre-wrap text-zinc-500 dark:text-zinc-400">{description}</p>
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="cursor-pointer rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
              onClick={handleCancel}
            >
              {cancelText}
            </button>
            <button
              className="cursor-pointer rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-emerald-50 transition-colors hover:bg-emerald-600/90 focus:outline-none dark:bg-emerald-800"
              onClick={handleConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </Dialog.Popup>
    </Dialog.Root>
  );
}

export default ConfirmDialog;
