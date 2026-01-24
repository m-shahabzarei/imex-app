"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";



interface IItem {
  icon: string;
  children: React.ReactNode;
  link: string;
}


function Item(props:IItem) {
  const [hover, setHover] = useState(false);

  return (
    <Link href={props.link}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {setHover(false);}}
        className={` ${
          hover ? "bg-linear-to-b  from-[#5764EF] to-[#3E47AD] " : "bg-white"
        }  md:h-20 h-20 shadow-[0_0_20px_rgba(0,0,0,0.12)] py-5 px-14 rounded-xl relative flex items-center transition duration-500
            hover:cursor-pointer justify-start `}
      >
        <Image
          src={props.icon}
          height={26}
          width={25}
          alt="icon"
          className={`absolute right-4 transition-all duration-400 ${
            hover ? "md:invert md:brightness-0 md:contrast-200" : ""
          }`}
        />
        <span
          className={`transition items-center text-center text-[1rem] md:text-[0.9rem] duration-500 max-md:mt-2 font-bold ${
            hover ? "text-white" : "text-[#222fbb]"
          }`}
        >
            {props.children}
        </span>
      </div>
    </Link>
  );
}

export default Item;
