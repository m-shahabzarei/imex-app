"use client";

import { useEffect } from "react";
import { getMe } from "@/services/auth";
import { useAuthStore } from "@/stores/auth.store";
import ReactQueryProvider from "@/providers/ReactQuery";
import NewLayout from "./newLayout";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    if (!user) {
      getMe()
        .then((res) => setUser(res.data))
    }
  }, []);


  return (
    <NewLayout>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </NewLayout>
  );
}
