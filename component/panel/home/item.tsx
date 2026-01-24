"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface IItem {
  icon: string;
  children: React.ReactNode;
  link: string;
  variant: "primary" | "secondary";
}

function Item(props: IItem) {
  const [hover, setHover] = useState(false);

  if (props.variant == "primary") {
    return (
      <Link href={props.link}>
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            setHover(false);
          }}
          className={` ${
            hover ? "bg-linear-to-b  from-[#5764EF] to-[#3E47AD] " : "bg-white"
          } max-md:flex-col max-md:justify-around md:h-20 h-28 shadow-[0_0_20px_rgba(0,0,0,0.12)] md:py-1 p-3 md:px-14 rounded-xl relative flex items-center transition duration-500
            hover:cursor-pointer justify-start `}
        >
          <Image
            src={props.icon}
            height={30}
            width={30}
            alt="icon"
            className={`md:absolute right-4 transition-all duration-400 ${
              hover ? "md:invert md:brightness-0 md:contrast-200" : ""
            }`}/>
          <span
            className={`transition items-center text-center text-sm duration-500 max-md:mt-2 font-bold ${
              hover ? "text-white" : "text-[#5764EF]"
            }`}
          >
            {props.children}
          </span>
        </div>
      </Link>
    );
  } else if (props.variant == "secondary") {
    return (
      <Link href={props.link}>
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            setHover(false);
          }}
          className={` ${
            hover ? "bg-linear-to-b  from-[#5764EF] to-[#3E47AD] " : "bg-white"
          } h-20 shadow-[0_0_20px_rgba(0,0,0,0.12)] py-1 px-14 rounded-xl relative flex items-center transition duration-500
       hover:cursor-pointer justify-start `}
        >
          <Image
            src={props.icon}
            height={30}
            width={30}
            alt="icon"
            className={`absolute right-4 transition-all duration-400 ${
              hover ? "md:invert md:brightness-0 md:contrast-200" : ""
            }
`}
          />
          <span
            className={`transition duration-500 font-bold ${
              hover ? "text-white" : "text-[#5764EF]"
            }`}
          >
            {props.children}
          </span>
        </div>
      </Link>
    );
  }
}

export default Item;

{
  /* <Image
          src="/image/alt arrow left.svg"
          height={32}
          width={32}
          alt="icon"
          className="absolute left-2"
        /> */
}
