"use client";

import Image from "next/image";
import React, { useState } from "react";
import Share from "./Share";

interface AccordionProps {
  title: string;
  defaultOpen?: boolean;
  className?: string;
  children: React.ReactNode;
  share?: boolean;
}

export default function Accordion({
  title,
  defaultOpen = false,
  children,
  share = false,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`p-3 bg-white rounded-xl w-full h-fit shadow-[0_0_20px_rgba(0,0,0,0.12)] md:shadow-[0_0_20px_rgba(0,0,0,0.1)] `}
    >
      {/* Header */}
      <div
        className="flex justify-between items-center w-full text-custom2 font-bold cursor-pointer"
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
          {share ? <Share /> : null}
        </>
      )}
    </div>
  );
}
