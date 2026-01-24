// store/useAuthStore.ts
import { create } from 'zustand'

export interface User {
  id: string
  phone: string
  name?: string
}

interface AuthState {
  [x: string]: any
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}))
