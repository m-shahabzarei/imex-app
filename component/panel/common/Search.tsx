// components/Search.tsx
import Image from "next/image";
import React from "react";

interface ISearch {
  variant: "primary" | "secondary";
  placeholder: string;
  value: string;
  onClick : () => void;
  onChange: (value: string) => void;
}

export default function Search({
  variant,
  placeholder,
  value,
  onClick,
  onChange,
}: ISearch) {
  const baseClass =
    variant === "primary"
      ? "bg-[rgba(255,255,255,0.06)] border text-white border-white px-9 py-4 w-full rounded-2xl mt-6 placeholder:text-white placeholder:opacity-40"
      : "bg-[rgba(255,255,255,0.06)] border text-[#717171] border-[#E3E3E3] px-10 py-4 w-full rounded-2xl placeholder:text-[#717171] placeholder:opacity-60 placeholder:text-xs";

  return (
    <div>
      <Image src="/image/search-normal.svg" width={25} height={25} alt="search icon" className="invert brightness-40 absolute max-md:top-4 max-md:right-3 top-4 right-2" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${baseClass} focus:outline-0`}
      />
      <Image onClick={onClick} src="/image/setting-4.svg" width={25} height={25} alt="setting icon" className="cursor-pointer invert brightness-40 absolute max-md:top-4 max-md:left-3 top-4 left-2" />
    </div>
  );
}
