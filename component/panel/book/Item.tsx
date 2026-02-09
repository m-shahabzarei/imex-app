"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface IItem {
  icon: string;
  children: React.ReactNode;
  link: string;
}

function Item(props: IItem) {
  const [hover, setHover] = useState(false);

  return (
    <Link href={props.link}>
<div
  onMouseEnter={() => setHover(true)}
  onMouseLeave={() => setHover(false)}
  className={`
    md:h-20 h-20 bg-white w-full
    shadow-[0_0_20px_rgba(0,0,0,0.12)] py-5 px-8
    rounded-xl relative flex items-center
    hover:cursor-pointer overflow-hidden
    justify-between  /* ✅ تغییر: برای فاصله انداختن یا چیدمان صحیح */
  `}
>
  {/* ✅ لایه گرادیانت (اصلاح نام کلاس گرادیانت) */}
  <div
    className={`
      absolute inset-0 rounded-xl
      bg-gradient-to-b from-[#5764EF] to-[#3E47AD]
      transition-opacity duration-500
      ${hover ? "opacity-100" : "opacity-0"}
    `}
  />

  {/* ✅ بخش متن و آیکون */}
  {/* برای اینکه مثل عکس اول شود، اگر پروژه RTL است، متن باید اول باشد و آیکون دوم */}
  
  <div className="flex items-center gap-x-3 w-full justify-end flex-row-reverse">
      <span
        className={`
          relative z-10 transition-colors duration-500
          text-[1rem] md:text-[0.9rem] font-bold
          ${hover ? "text-white" : "text-[#222fbb]"}
        `}
      >
        {props.children}
      </span>

      <Image
        src={props.icon}
        height={26}
        width={25}
        alt="icon"
        className={`
          relative z-10
          transition-all duration-500
          ${hover ? "md:invert md:brightness-0 md:contrast-200" : ""}
        `}
      />
  </div>
</div>
    </Link>
  );
}

export default Item;
