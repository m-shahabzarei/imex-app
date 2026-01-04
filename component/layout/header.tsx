import Link from "next/link";
import Container from "./Container";
import Image from "next/image";

const menuItems=["جستجو","مزایا","راهنما","دانلود اپلیکیشن","سوالات متداول","آخرین مطلب","درباره ما"]

function Header() {
  return (
    <div className="w-[83%] h-[70px] items-center text-white flex justify-between fixed top-0" >
      <Link href="/" >
      <div className="flex" >
      <Image src="/image/Logo.svg" alt="test" width="45" height="45"/>
      <div className="flex flex-col mr-3">
        <span className="z-[1000] text-xl">ایمکس</span>
        <span className="-mt-[11px] text-lg w-fit mr-[3px] bg-clip-text text-transparent bg-linear-to-b from-[#FFFFFF00] from-25% to-[#FFFFFF] font-extrabold">IM EX</span>
      </div>
      </div>
      </Link>
      <nav>
        <ul className="flex justify-around gap-10">
            {menuItems.map(
                (item,index)=>(
                    <Link href={"/"} key={index}><li className="text-sm">{item}</li></Link>
                )
            )}
        </ul>
      </nav>
      <button>Click me!</button>
    </div>
  );
}

export default Header;
