import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ScrollState {
  scrollPositions: Record<string, number>;
}

interface ScrollAction {
  setScrollPosition: (key: string, position: number) => void;
  getScrollPosition: (key: string) => number;
}

interface ScrollStore extends ScrollState, ScrollAction {}

export const useScrollStore = create<ScrollStore>()(
  devtools((set, get) => ({
    scrollPositions: {},
    setScrollPosition: (key, position) =>
      set((state) => ({
        scrollPositions: {
          ...state.scrollPositions,
          [key]: position,
        },
      })),
    getScrollPosition: (key) => get().scrollPositions[key] ?? 0,
  })),
);
