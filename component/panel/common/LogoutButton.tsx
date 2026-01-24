
"use client";

import { useAuthStore } from "@/stores/auth.store";
import { removeAuthCookie } from "@/utils/cookie";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = () => {
    // 1. پاک کردن Zustand
    logout();

    // 2. حذف Cookie
    removeAuthCookie();

    // 3. ریدایرکت
    router.replace("/Login");
  };

  return <button onClick={handleLogout}>خروج</button>;
}
