"use client";

import { useEffect } from "react";
import { getMe } from "@/services/auth";
import { useAuthStore } from "@/stores/auth.store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getMe();
        login(res.data);
      } catch {
        logout();
      }
    };

    checkAuth();
  }, [login, logout]);

  return <>{children}</>;
}
