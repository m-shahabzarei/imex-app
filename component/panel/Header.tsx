import Image from "next/image";
import Button from "../ui/Button";

function Header() {
  return (
    <div className="w-full flex justify-center items-center mt-8">
      <header className=" bg-linear-to-b  from-[#5764EF] to-[#3E47AD] w-[83%] h-16 flex items-center justify-between px-4 rounded-lg">
        <div className="flex">
          <Image src="/image/Logo.svg" alt="test" width="36" height="36" />
          <div className="flex flex-col mr-3">
            <span className="z-[1000] text-white text-lg">ایمکس</span>
            <span className="-mt-[11px] text-lg w-fit mr-[3px] bg-clip-text text-transparent bg-linear-to-b from-[#FFFFFF00] from-25% to-[#FFFFFF] font-extrabold">
              IM EX
            </span>
          </div>
        </div>
        <Button variant="primary" icon="/image/AI.svg">
          دستیار هوش مصنوعی
        </Button>
      </header>
    </div>
  );
}

export default Header;
