// app/providers/AuthProvider.tsx
"use client";

import { useEffect } from "react";
import { getMe } from "@/services/me";
import { useAuthStore } from "@/stores/auth.store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    getMe()
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        logout();
      });
  }, []);

  return <>{children}</>;
}
