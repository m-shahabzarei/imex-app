"use client";

import Image from "next/image";
import React, { useState } from "react";
import Share from "./Share";

interface AccordionProps {
  title: string | undefined;
  defaultOpen?: boolean;
  className?: string;
  children: React.ReactNode;
  share?: boolean;
  isFilter?: boolean;
  shareText?: string; // <--- این پراپ اضافه شد
}

export default function Accordion({
  title,
  defaultOpen = false,
  children,
  isFilter = false,
  share = false,
  shareText = "", // مقدار پیش‌فرض
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`rounded-xl w-full h-fit ${isFilter ? "" : "shadow-[0_0_20px_rgba(0,0,0,0.12)] bg-white md:shadow-[0_0_20px_rgba(0,0,0,0.1)] p-3"}`}
    >
      {/* Header */}
      <div
        className={`flex justify-between items-center w-full ${isFilter ? "text-gray-500 text-sm" : "text-custom2"} font-bold cursor-pointer`}
        onClick={() => setOpen(!open)}
      >
        <h1>{title}</h1>
        <Image
          src="/image/Alt Arrow Left.svg"
          width={27}
          height={30}
          alt="arrow"
          className={`transition-transform duration-500 ${
            open ? "-rotate-90" : "rotate-0"
          }`}
        />
      </div>

      {/* Content */}
      {open && (
        <>
          <div className="mt-4">
            {children}
          </div>
          {/* اینجا متن را به کامپوننت شیر پاس می‌دهیم */}
          {share ? <Share text={shareText} /> : null}
        </>
      )}
    </div>
  );
}