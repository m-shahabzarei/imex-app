import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  username: string;
  has_active_subscription: boolean;
  is_active_date : number;
  [key: string]: any;
  type_subscription:string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;

  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

      setUser: (user) => set({ user }),
      setAccessToken: (token) => set({ accessToken: token }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
        }),
    }),
    {
      name: "auth-storage", // localStorage
    }
  )
);
