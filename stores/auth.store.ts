import { create } from 'zustand'

interface User {
  id: number
  username: string
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

  setUser: (user) => {
    set({
      user,
      isAuthenticated: true,
    })
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    })
  },
}))
