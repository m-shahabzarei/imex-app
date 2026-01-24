"use client";
import Image from "next/image";
import Button from "@/component/ui/Button";
import { usePathname } from "next/navigation";
import Search from "../common/Search";

function Header() {
  const pathname = usePathname();
  const isActive = pathname === "/panel/home";

  return (
    <div
      className={`w-full flex md:top-32 justify-center max-md:items-center md:mt-10 ${
        isActive ? "h-80" : "h-48"
      }`}
    >
      <header className="md:w-[83%] md:h-16 max-md:items-center max-md:pb-7 max-md:rounded-b-3xl max-md:justify-end h-full w-full bg-linear-to-b  from-[#5764EF] to-[#3E47AD]  flex flex-col justify-center px-4 md:rounded-lg">
        <div className="w-full flex items-center h-fit justify-between">
          <div className="flex">
            <Image
              className="max-md:hidden"
              src="/image/Logo.svg"
              alt="test"
              width="36"
              height="36"
            />
            <div className="flex flex-col mr-3">
              <span className="max-md:text-2xl z-[1000] text-white text-lg">
                ایمکس
              </span>
              <span className="max-md:hidden -mt-[11px] text-lg w-fit mr-[3px] bg-clip-text text-transparent bg-linear-to-b from-[#FFFFFF00] from-25% to-[#FFFFFF] font-extrabold">
                IM EX
              </span>
            </div>
          </div>
          <Button variant="primary" icon="/image/AI.svg">
            دستیار هوش مصنوعی
          </Button>
        </div>
        {isActive && (
          <div className="w-full flex">
            <Image
              src="/image/search-normal.svg"
              alt="search icon"
              width="24"
              height="24"
              className="absolute mt-10 right-6"
            />
            <div className="w-full md:hidden">
            <Search variant="primary" text="جستجو در ایمکس ..." />
            </div>
            <Image
              src="/image/setting-4.svg"
              alt="search icon"
              width="24"
              height="24"
              className="absolute mt-10 left-6 "
            />
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
