'use client'

import { ReactNode } from 'react'
import { useAuthStore } from '@/stores/auth.store' 

export default function AuthGuard({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (!isAuthenticated) {
    return <div>لطفاً لاگین کنید</div>
  }

  return <>{children}</>
}
