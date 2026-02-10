import { usePublicStore } from "@/stores/public.store";
import Image from "next/image";
import React, { useState } from "react";

function DateFilter() {
  const [open, setOpen] = useState(true);
  const selectedYear = usePublicStore((res) => res.selectedYear);
  const setYear = usePublicStore((res) => res.setYear);

  const HandleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div
        onClick={HandleOpen}
        className="bg-blue-100 p-3 w-[120px] rounded-xl text-custom2 border-[1.5px] border-custom hover:cursor-pointer flex justify-center items-center gap-1"
      >
        {selectedYear}
        <Image
          src="/image/document11.svg"
          width={20}
          height={20}
          alt="document"
        />
      </div>

<div
  className={`${
    open ? "hidden" : ""
  } fixed inset-0 z-2000 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-xs`}
  onClick={HandleOpen} 
>
  <div
    className="
      w-full md:w-[340px]
      bg-white
      rounded-t-2xl md:rounded-2xl
      p-6
      animate-slideUp md:animate-fadeIn
      flex flex-col gap-5
    "
    onClick={(e) => e.stopPropagation()} 
  >
    <h2 className="text-center text-custom2 text-lg font-bold mb-4">
      انتخاب سال مندرج
    </h2>

    <div className="flex justify-evenly">
      <div
        onClick={() => {
          setYear(1404);
          HandleOpen();
        }}
        className="bg-blue-100 p-3 rounded-xl text-custom2 border-[1.5px] border-custom hover:cursor-pointer flex gap-1"
      >
        1404
      </div>

      <div
        onClick={() => {
          setYear(1403);
          HandleOpen();
        }}
        className="bg-blue-100 p-3 rounded-xl text-custom2 border-[1.5px] border-custom hover:cursor-pointer flex gap-1"
      >
        1403
      </div>
    </div>
  </div>
</div>

    </>
  );
}

export default DateFilter;
