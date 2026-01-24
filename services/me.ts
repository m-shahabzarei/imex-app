// services/me.ts
import { api } from '@/lib/axios'

export const getMe = () => {
  return api.get('users/users/me/')
}
