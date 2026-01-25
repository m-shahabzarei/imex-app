'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth.store'
import { mockUser } from '@/mock/mockUser'

export default function MockAutoLogin() {
  const setUser = useAuthStore((s) => s.setUser)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_MOCK_AUTH === 'true' &&
      !isAuthenticated
    ) {
      setUser(mockUser)
    }
  }, [isAuthenticated, setUser])

  return null
}
