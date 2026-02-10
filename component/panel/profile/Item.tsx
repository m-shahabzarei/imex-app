"use client";

import { ArrowLeft, Star, StarOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Iitem {
  variant: "primary" | "profile" | "subscribe";
  phone?: string;
  icon?: string;
  children: string | number | undefined;
  subscription?: boolean;
  link?:string | undefined;
  day?:number;
  onClick?: () => void;
}
const variants = {
  primary: "text-black text-[1rem] font-bold flex flex-row-reverse gap-3",
  profile: "text-[1.05rem] font-bold flex flex-row-reverse gap-3 ",
  subscribe: "bg-tarnsparent",
};
const baseStyle =
  "h-20 shadow-[0_0_20px_rgba(0,0,0,0.12)] py-7 px-3 rounded-2xl relative flex items-center transition duration-500";

function Item({
  variant,
  icon,
  children,
  link = "",
  phone,
  subscription,
  onClick,
  day,
}: Iitem) {
  const [hover, setHover] = useState(false);

  if (variant === "primary") {
    return (
      <Link href={link}>
<div
  onMouseEnter={() => setHover(true)}
  onMouseLeave={() => setHover(false)}
  onClick={onClick}
  className={`${baseStyle} bg-white relative overflow-hidden hover:cursor-pointer justify-center`}
>
  <div
    className={`
      absolute inset-0 rounded-[inherit]
      bg-linear-to-b from-[#5764EF] to-[#3E47AD]
      transition-opacity duration-500
      ${hover ? "opacity-100" : "opacity-0"}
    `}
  />

  <p
    className={`${variants[variant]} relative z-10 transition-colors duration-500
      ${hover ? "text-white" : "text-gray-600"}
    `}
  >
    {children}
    {icon && (
      <div
        className={`relative z-10 transition-all duration-500
          ${hover
            ? "invert brightness-0 contrast-200"
            : "invert brightness-180 contrast-200"
          }
        `}
      >
        <Image src={icon} alt="icon" width="23" height="22" />
      </div>
    )}
  </p>

  <div
    className={`left-[4%] absolute z-10 transition-all duration-500
      ${hover ? "invert brightness-0 contrast-200" : ""}
    `}
  >
    <Image src="/image/Alt Arrow Left.svg" alt="arrow left" width={29} height={24} />
  </div>
</div>
      </Link>
    );
  } else if (variant === "profile") {
    return (
      <div>
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            setHover(false);
          }}
          onClick={onClick}
          className={`${baseStyle} ${
            hover ? "bg-linear-to-b  from-[#5764EF] to-[#3E47AD] " : "bg-white"
          } hover:cursor-pointer pr-6 `}
        >
          <div className="text-black text-[1rem] font-bold flex flex-col gap-1 items-start ">
            <p
              className={`transition duration-500 ${variants[variant]} ${
                hover ? "text-white" : "text-[#5764EF]"
              }`}
            >
              {children}
            </p>
            <span
              className={` text-[0.8rem] transition duration-500 ${
                hover ? "text-white" : "text-gray-500"
              } `}
            >
              {phone}
            </span>
          </div>

          <div
            className={`left-[5%] absolute ${
              hover ? "invert brightness-0 contrast-200" : ""
            }  `}
          >
            <Image src="/image/edit.svg" alt="edit" width="22" height="22" />
          </div>
        </div>
      </div>
    );
  } else if (variant === "subscribe") {
    return (
      <div >
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            setHover(false);
          }}
          onClick={onClick}
          className={!subscription?`${baseStyle} ${
            hover ? "bg-linear-to-b  from-[#5764EF] to-[#3E47AD] " : "bg-white"
          } hover:cursor-pointer pr-6 ` : `${baseStyle} bg-linear-to-b  from-[#3C9024] to-[#2C6A1B] text-white `}
        >
          <div className="w-full flex justify-between pl-3 pr-16 text-sm items-center">
            <span className={subscription ? "" : `${hover ? "text-white" : "text-black"}`}>
              اشتراک
            </span>
            <span className= {subscription ? "" : "text-xs text-gray-400"}>
              {subscription ? `${day} روز باقی مانده ` : "شما اشتراکی ندارید"}
            </span>
          </div>

          <div
            className={`right-[10%] absolute ${
              hover ? "invert brightness-0 contrast-200" : ""
            }  `}
          >
            {subscription ? <Star /> : <StarOff />}
          </div>
          <div>
            {subscription ? (
              <></>
            ) : (
              <div className="text-white bg-[#4c6d00] text-xs px-2 py-1 rounded-lg flex items-center justify-between ">
                <div className="left-[5%] absolute">
                  {/* <ArrowLeft color={`${hover ? "white" : "black"}`} /> */}
                </div>
                <Link href={link}>خرید</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Item;

