import { UserResponse } from '@/api/index.schemas';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthState {
  user: UserResponse | null;
}

interface AuthAction {
  setUser: (user: UserResponse | null) => void;
}

interface AuthStore extends AuthState, AuthAction {}

const initialState: AuthState = {
  user: null,
};

export const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    ...initialState,
    setUser: (user) => set({ user }),
  })),
);
