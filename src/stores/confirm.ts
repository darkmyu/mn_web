import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ConfirmState {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

interface ConfirmAction {
  openConfirm: (
    params: Pick<ConfirmState, 'title' | 'description' | 'onConfirm'> &
      Partial<Omit<ConfirmState, 'isOpen' | 'title' | 'description' | 'onConfirm'>>,
  ) => void;
  closeConfirm: () => void;
}

interface ConfirmStore extends ConfirmState, ConfirmAction {}

const initialState: ConfirmState = {
  isOpen: false,
  title: '제목',
  description: '설명',
  confirmText: '확인',
  cancelText: '취소',
  onConfirm: () => {},
  onCancel: () => {},
};

export const useConfirmStore = create<ConfirmStore>()(
  devtools((set) => ({
    ...initialState,
    openConfirm: (params) => set({ ...initialState, ...params, isOpen: true }),
    closeConfirm: () => set({ ...initialState }),
  })),
);
