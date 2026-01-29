"use client";

import { useEffect } from "react";
import { getMe } from "@/services/auth";
import { useAuthStore } from "@/stores/auth.store";
import NewLayout from "./newLayout";
import ReactQueryProvider from "@/providers/ReactQuery";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    let isMounted = true;

    const fetchMe = async () => {
      try {
        const res = await getMe();
        if (isMounted) {
          setUser(res.data);
        }
      } catch {
        setTimeout(async () => {
          try {
            const res = await getMe();
            if (isMounted) {
              setUser(res.data);
            }
          } catch {
            window.location.href = "/Login";
          }
        }, 500);
      }
    };

    fetchMe();

    return () => {
      isMounted = false;
    };
  }, []);

  return(
    <NewLayout>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </NewLayout>
  )
}
