/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Header from "@/component/panel/layout/Header";
import Menu from "@/component/panel/layout/Menu";
import { usePathname } from "next/navigation";

export default function NewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // normalize pathname (remove trailing slash)
  const normalizedPathname =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  const ROOT_ROUTES = [
    "/panel/home",
    "/panel/book",
    "/panel/profile",
    "/panel/blog",
    "/panel/course",
  ];

  const showMenu = ROOT_ROUTES.includes(normalizedPathname);

  if(pathname.includes("/panel/chat")){
    return (
          <>
          {children}
          </>
  );
  }else{
      return (
    <div className="debug-screens">
      <Header />

      <div>
        {showMenu && <Menu />}

        <div
          className={` h-fit
            ${
              showMenu
                ? "md:w-[60%] lg:w-[63%] xl:w-[67%] h-fit top-0 md:mt-32 left-[8.5vw] md:absolute max-md:m-3 max-md:pb-[14vh]"
                : "lg:w-[80%] xl:w-[80%] h-fit p-3 absolute md:top-32 max-lg:w-[80%] lg:right-[10vw] max-lg:right-[10vw] max-md:w-[90%] max-md:right-[4vw]"
            }`}
        >

          {children}
        </div>
      </div>
    </div>
  );
  }
}
