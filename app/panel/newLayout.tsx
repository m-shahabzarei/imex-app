/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Header from "@/component/panel/layout/Header";
import Menu from "@/component/panel/layout/Menu";
import { useParams, usePathname } from "next/navigation";
// ...existing code...
export default function NewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const showLayout = () => {
    // use the pathname string and ensure id is present in it
    if (id && pathname?.includes(`/panel/book/tariffs/${id}`) || id && pathname?.includes(`/panel/home/mentors/${id}`)) {
      return (
        <>
          <div className="md:hidden">
            <Header />
          </div>
          {children}
        </>
      );
    } else if (pathname?.includes(`/panel/book/tariffs`)) {
      return (
        <>
          <Header />
          <div className="md:w-[60%] lg:w-[63%] xl:w-[67%] h-fit max-md:m-3 absolute md:top-32 max-md:right-[10%] md:right-[17%]">
            {children}
          </div>
        </>
      );
    } else {
      return (
        <>
          <Header />
          <div>
            <Menu />
            <div className="md:w-[60%] lg:w-[63%] xl:w-[67%] h-fit top-0 md:mt-32 left-[8.5vw] md:absolute max-md:m-3">
              {children}
            </div>
          </div>
        </>
      );
    }
  };

  return <div className="debug-screens">{showLayout()}</div>;
}
