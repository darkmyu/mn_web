import { ProfileResponse } from '@/api/index.schemas';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthState {
  profile: ProfileResponse | null;
}

interface AuthAction {
  setProfile: (profile: ProfileResponse | null) => void;
}

interface AuthStore extends AuthState, AuthAction {}

const initialState: AuthState = {
  profile: null,
};

export const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    ...initialState,
    setProfile: (profile) => set({ profile }),
  })),
);
