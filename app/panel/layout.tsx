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
  // const setUser = useAuthStore((s) => s.setUser);
  // const accessToken = useAuthStore().accessToken;

  // useEffect(() => {
  //   let isMounted = true;
  //   console.log(accessToken);
  //   const fetchMe = async () => {
  //     try {
  //       const res = await getMe();
  //       console.log(accessToken);

  //       if (isMounted) {
  //         setUser(res.data);
  //         console.log(accessToken);
  //       }
  //     } catch {
  //       setTimeout(async () => {
  //         try {
  //           const res = await getMe();
  //           console.log(accessToken);

  //           if (isMounted) {
  //             setUser(res.data);
  //             console.log(accessToken);
  //           }
  //         } catch {
  //           window.location.href = "/Login";
  //         }
  //       }, 500);
  //     }
  //   };

  //   fetchMe();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);



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
