import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  username: string;
  has_active_subscription: boolean;
  is_active_date : number;
  [key: string]: any;
  type_subscription:string;
  last_name : string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      setUser: (user) => set({ user }),
      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken:null
        }),
    }),
    {
      name: "auth-storage", // localStorage
    }
  )
);
