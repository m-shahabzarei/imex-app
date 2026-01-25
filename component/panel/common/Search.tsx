// components/Search.tsx
import React from "react";

interface ISearch {
  variant: "primary" | "secondary";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Search({
  variant,
  placeholder,
  value,
  onChange,
}: ISearch) {
  const baseClass =
    variant === "primary"
      ? "bg-[rgba(255,255,255,0.06)] border-1 text-white border-white px-9 py-4 w-full rounded-2xl mt-6 placeholder:text-white placeholder:opacity-40"
      : "bg-[rgba(255,255,255,0.06)] border-1 text-[#717171] border-[#E3E3E3] px-10 py-4 w-full rounded-2xl placeholder:text-[#717171] placeholder:opacity-60 placeholder:text-xs";

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${baseClass} focus:outline-0`}
    />
  );
}
