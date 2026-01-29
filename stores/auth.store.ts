import { create } from "zustand";

export interface User {
  id: number;
  name: string;
  phone: string;
  has_active_subscription: boolean;
  [key: string]: any; 
}

interface AuthState {
  user: User | null;
  accessToken: string | null;

  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;

  setUserSubscription: (active: boolean) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  setUser: (user) => set({ user }),

  setAccessToken: (token) => set({ accessToken: token }),

  setUserSubscription: (active) =>
    set((state) => {
      if (!state.user) return state;
      return {
        user: { ...state.user, has_active_subscription: active },
      };
    }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
    }),
}));
