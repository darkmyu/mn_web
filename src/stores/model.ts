import { create } from 'zustand/react';
import React from 'react';
import { nanoid } from 'nanoid';
import { devtools } from 'zustand/middleware';

type OpenArgs<P> = object extends P ? [Component: React.ComponentType<P>, props?: P] : [Component: React.ComponentType<P>, props: P];

interface Modal<P = object> {
  id: string;
  Component: React.ComponentType<P>;
  props: P;
}

interface ModalState {
  modals: Modal[];
}

interface ModalAction {
  open: <P extends object>(...args: OpenArgs<P>) => string;
  close: (id?: string) => void;
}

interface ModalStore extends ModalState, ModalAction {}

const initialState: ModalState = {
  modals: [],
};

const useModalStore = create<ModalStore>()(
  devtools((set) => ({
    ...initialState,
    open: (Component, props) => {
      const id = nanoid();

      set((state) => ({
        modals: [...state.modals, { id, Component, props } as Modal],
      }));

      return id;
    },
    close: (id) => {
      set((state) => ({
        modals: id ? state.modals.filter((modal) => modal.id !== id) : state.modals.slice(0, -1),
      }));
    },
  })),
);

export const useModals = () => {
  const modals = useModalStore((state) => state.modals);
  const open = useModalStore((state) => state.open);
  const close = useModalStore((state) => state.close);

  return { modals, open, close };
};
