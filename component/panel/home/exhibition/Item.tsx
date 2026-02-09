"use client";

import Image from "next/image";
import Link from "next/link";
import { Iitem } from "./type";
import Button from "@/component/ui/Button";
import { gregorianToJalali } from "@/utils/date";

function Item(props: Iitem) {
  const getName = () => {
    if (props.type === "end") {
      return (
        <div
          className={`px-[12px] py-[8px] rounded-[12px] text-sm font-medium cursor-pointer hover:opacity-90 transition-all duration-200 ease-in-out flex items-center gap-1 bg-gray-200 text-[#94949b] w-full text-center justify-center `}
        >
          خاتمه یافته
        </div>
      );
    } else if (props.type === "wait") {
      return (
        <div
          className={`px-[12px] py-[8px] rounded-[12px] text-sm font-medium cursor-pointer hover:opacity-90 transition-all duration-200 ease-in-out flex items-center gap-1 bg-gray-200 text-[#94949b] w-full text-center justify-center `}
        >
          {props.days_until_start} روز تا شروع
        </div>
      );
    } else {
      return (
        <div
          className={`px-[12px] py-[8px] rounded-[12px] text-sm font-medium cursor-pointer hover:opacity-90 transition-all duration-200 ease-in-out flex items-center gap-1 bg-[#5764ef34] text-[#5764EF] w-full text-center justify-center `}
        >
          درحال برگزاری
        </div>
      );
    }
  };

  return (
    <Link href={props.link} className="block h-full">
      <div className="bg-white w-full h-45 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] rounded-xl flex gap-3 p-3 hover:cursor-pointer transition-all duration-300 border border-transparent hover:border-gray-100 relative overflow-hidden">
        {/* بخش عکس */}
        <div className="w-fit shrink-0 flex items-center justify-center overflow-hidden rounded-xl bg-gray-50">
          <Image
            src={props.image}
            width={160}
            height={50}
            alt="icon"
            className="object-cover rounded-lg h-full max-md:w-28 md:w-[160px]" // کمی عرض عکس را در موبایل کمتر کردم تا فضا برای متن باز شود
          />
        </div>

        {/* بخش محتوا - اضافه شدن min-w-0 برای کار کردن truncate */}
        <div className="flex flex-col flex-1 justify-between py-1 min-w-0">
          {/* گروه عنوان و اطلاعات */}
          <div className="flex flex-col gap-2">
            <h1
              className="text-custom2 font-bold text-[0.85rem] leading-snug line-clamp-2 pl-1"
            >
              {props.title}
            </h1>

            <div className="flex flex-col gap-1.5">
              {/* بخش مکان - اصلاح شده */}
              <div className="w-full flex justify-between items-center border-b border-gray-50 pb-1">
                <span className="text-[0.7rem] text-gray-400 font-medium shrink-0 ml-2">
                  مکان
                </span>
                {/* 
                    تغییر مهم: حذف w-fit و اضافه کردن max-w-[65%]
                    این باعث می‌شود متن مکان نهایتا 65 درصد عرض را بگیرد و اگر بیشتر بود سه نقطه شود
                */}
                <p className="text-[0.75rem] text-gray-600 truncate text-left max-w-[65%]">
                  {props?.location}
                </p>
              </div>

              <div className="w-full flex justify-between items-center">
                <span className="text-[0.7rem] text-gray-400 font-medium shrink-0">
                  تاریخ شروع
                </span>
                <p className="text-[0.75rem] text-gray-600 font-mono">
                  {gregorianToJalali(props.start_date)}
                </p>
              </div>

              <div className="w-full flex justify-between items-center">
                <span className="text-[0.7rem] text-gray-400 font-medium shrink-0">
                  تاریخ پایان
                </span>
                <p className="text-[0.75rem] text-gray-600 font-mono">
                  {gregorianToJalali(props.end_date)}
                </p>
              </div>
            </div>
          </div>

          {/* دکمه */}
          <div className="mt-2">{getName()}</div>
        </div>
      </div>
    </Link>
  );
}

export default Item;
