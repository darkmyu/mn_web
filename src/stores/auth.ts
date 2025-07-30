import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthState {
  isAuth: boolean;
}

interface AuthAction {
  setIsAuth: (isAuth: boolean) => void;
}

interface AuthStore extends AuthState, AuthAction {}

const initialState: AuthState = {
  isAuth: false,
};

export const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    ...initialState,
    setIsAuth: (isAuth) => set(() => ({ isAuth })),
  })),
);
