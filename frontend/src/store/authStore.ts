import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setToken as setLocalToken, removeToken } from '../utils/token';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (token, user) => {
        setLocalToken(token);
        set({ token, user });
      },
      logout: () => {
        removeToken();
        set({ token: null, user: null });
      },
    }),
    {
      name: 'fruit-shop-auth',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
