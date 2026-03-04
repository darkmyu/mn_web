/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentProps, ComponentType } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ModalControllerProps<T> {
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

interface Modal<T extends ComponentType<any> = any, R = any> extends ModalControllerProps<R> {
  key: string;
  component: T;
  props?: Omit<ComponentProps<T>, keyof ModalControllerProps<R>>;
}

type ExtractModalResult<T extends ComponentType<any>> =
  ComponentProps<T> extends ModalControllerProps<infer R> ? R : any;

interface ModalState {
  modals: Modal[];
}

interface ModalAction {
  push: <T extends ComponentType<any>>(options: {
    key: string;
    component: T;
    props?: Omit<ComponentProps<T>, keyof ModalControllerProps<any>>;
  }) => Promise<ExtractModalResult<T>>;
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
