'use client';

import { ModalControllerProps } from '@/stores/modal';
import { Modal } from '.';

interface Props extends ModalControllerProps<boolean> {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

function ConfirmModal({ resolve, title, description, confirmText = '확인', cancelText = '취소' }: Props) {
  const handleOpenChange = (open: boolean) => {
    if (!open) resolve(false);
  };

  return (
    <Modal.Root open={true} onOpenChange={handleOpenChange}>
      <Modal.Popup className="w-[20rem] p-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-bold">{title}</h1>
            <p className="text-sm whitespace-pre-wrap text-zinc-500 dark:text-zinc-400">{description}</p>
          </div>
          <div className="flex justify-end gap-2">
            <Modal.Close
              render={
                <button className="cursor-pointer rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800">
                  {cancelText}
                </button>
              }
            />
            <button
              className="cursor-pointer rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-emerald-50 transition-colors hover:bg-emerald-600/90 focus:outline-none dark:bg-emerald-800"
              onClick={() => resolve(true)}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </Modal.Popup>
    </Modal.Root>
  );
}

export default ConfirmModal;
