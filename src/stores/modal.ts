/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentProps, ComponentType } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ModalControllerProps<T = any> {
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

export interface Modal<T extends ComponentType<any> = any, R = any> {
  key: string;
  component: T;
  props?: Omit<ComponentProps<T>, keyof ModalControllerProps<R>>;
  resolve: (value: R | PromiseLike<R>) => void;
  reject: (reason?: any) => void;
}

interface ModalState {
  modals: Modal[];
}

interface ModalAction {
  push: <T extends ComponentType<any> = any, R = any>(options: {
    key: string;
    component: T;
    props?: Omit<ComponentProps<T>, keyof ModalControllerProps<R>>;
  }) => Promise<R>;
  pop: (key: string) => void;
  clear: () => void;
}

interface ModalStore extends ModalState, ModalAction {}

export const useModalStore = create<ModalStore>()(
  devtools((set, get) => ({
    modals: [],
    push: ({ key, component, props }) => {
      return new Promise((resolve, reject) => {
        set((state) => ({
          modals: [
            ...state.modals,
            {
              key,
              component,
              props,
              resolve: (value) => {
                resolve(value);
                get().pop(key);
              },
              reject: (reason) => {
                reject(reason);
                get().pop(key);
              },
            },
          ],
        }));
      });
    },
    pop: (key) => {
      set((state) => ({
        modals: state.modals.filter((modal) => modal.key !== key),
      }));
    },
    clear: () => {
      set({ modals: [] });
    },
  })),
);
