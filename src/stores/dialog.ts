import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DialogState {
  isAuthDialogOpen: boolean;
}

interface DialogAction {
  setIsAuthDialogOpen: (open: boolean) => void;
}

interface DialogStore extends DialogState, DialogAction {}

const initialState: DialogState = {
  isAuthDialogOpen: false,
};

export const useDialogStore = create<DialogStore>()(
  devtools((set) => ({
    ...initialState,
    setIsAuthDialogOpen: (open) => set({ isAuthDialogOpen: open }),
  })),
);
