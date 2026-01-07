"use client";
import Image from "next/image";
import Button from "../ui/Button";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  const isActive = pathname === "/panel/home";

  return (
    <div className={`w-full flex fixed md:top-3 justify-center items-center mt-8 ${isActive ? "h-96" : "h-48"}`}>
      <header className="md:w-[83%] md:h-16 max-md:items-center max-md:pb-7 max-md:rounded-b-3xl max-md:justify-end h-full w-full bg-linear-to-b  from-[#5764EF] to-[#3E47AD]  flex flex-col justify-center px-4 rounded-lg">
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
        {
          isActive && (<div className="w-full flex">
          <Image src="/image/search-normal.svg" alt="search icon" width="24" height="24" className="absolute mt-10 right-6"/>
          <input className="bg-[rgba(255,255,255,0.06)] border-1 text-white border-white px-9 py-4 w-full rounded-2xl mt-6 placeholder:text-white placeholder:opacity-40 focus:outline-0" placeholder="جستجو در ایمکس ..." type="text" />
          <Image src="/image/setting-4.svg" alt="search icon" width="24" height="24" className="absolute mt-10 left-6 "/>
        </div>)
        }
      </header>
    </div>
  );
}

export default Header;
