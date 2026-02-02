"use client";

import Image from "next/image";
import Link from "next/link";
import { Iitem } from "./type";
import Button from "@/component/ui/Button";
import { gregorianToJalali } from "@/utils/date";


function Item(props: Iitem) {
  return (
    <Link href={props.link}>
      <div className="bg-white max-md:w-full h-42 max-md:h-fit shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl flex gap-3 p-4 max-md:p-2 hover:cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]">
        
        <div className="w-fit h-full items-center justify-center flex overflow-hidden rounded-xl">
          <Image
            src={props.image}
            width={160}
            height={50}
            alt="icon"
            className="object-cover rounded-lg"
          />
        </div>

        <div className="h-full justify-between flex flex-col w-full">
            <h1 className="text-custom2 text-[0.92rem]">{props.title}</h1>
            <div className="w-full my-1 flex justify-between"><span className="text-[0.7rem] text-gray-400">مکان</span><p className="text-[0.75rem] text-gray-500">{props?.location}</p></div>
            <div className="w-full mb-1 flex justify-between"><span className="text-[0.7rem] text-gray-400">تاریخ شروع</span><p className="text-[0.75rem] text-gray-500">{gregorianToJalali(props.start_date)}</p></div>
            <div className="w-full flex justify-between"><span className="text-[0.7rem] text-gray-400">تاریخ پایان</span><p className="text-[0.75rem] text-gray-500">{gregorianToJalali(props.end_date)}</p></div>
          <Button variant="glassy" >درحال برگزاری</Button>
        </div>


      </div>
    </Link>
  );
}

export default Item;
