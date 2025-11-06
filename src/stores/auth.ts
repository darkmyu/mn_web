import { AnimalResponse, UserResponse } from '@/api/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthState {
  user: UserResponse | null;
  animals: AnimalResponse[];
}

interface AuthAction {
  setUser: (user: UserResponse | null) => void;
  setAnimals: (animals: AnimalResponse[]) => void;
}

interface AuthStore extends AuthState, AuthAction {}

const initialState: AuthState = {
  user: null,
  animals: [],
};

export const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    ...initialState,
    setUser: (user) => set(() => ({ user })),
    setAnimals: (animals) => set(() => ({ animals })),
  })),
);
