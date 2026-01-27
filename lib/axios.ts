import axios from 'axios'
import { useAuthStore } from '@/stores/auth.store'

const api = axios.create({
  baseURL: '/users',
  withCredentials: true,
})

// اگر access token منقضی شد
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // گرفتن access جدید با refresh
        return api(originalRequest)
      } catch (err) {
        // refresh هم ناموفق بود → خروج
        useAuthStore.getState().logout()
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default api
