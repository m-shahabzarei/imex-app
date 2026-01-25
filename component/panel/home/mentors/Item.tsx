"use client";

import Image from "next/image";
import Link from "next/link";

interface IItem {
  image: string;
  name: string;
  group: string;
  progress: string;
  country: string;
}

function Item(props: IItem) {
  return (
    <Link href={"/"}>
      <div className="bg-white w-1/2 max-md:w-full h-32 max-md:h-fit shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl flex gap-3 p-4 max-md:p-2 hover:cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]">
        <div className="w-fit h-full items-center justify-center flex">
          <Image
            src={props.image}
            width={160}
            height={50}
            alt="icon"
            className="object-cover rounded-lg"
          />
        </div>

        <div className="h-full flex flex-col w-full">
            <h1 className="text-custom2">{props.name}</h1>
            <div className="w-full my-1 flex justify-between"><span className="text-xs text-gray-400">گروه کالا</span><p className="text-[0.85rem] text-gray-500">{props.group}</p></div>
            <div className="w-full mb-1 flex justify-between"><span className="text-xs text-gray-400">فرایند</span><p className="text-[0.85rem] text-gray-500">{props.progress}</p></div>
            <div className="w-full flex justify-between"><span className="text-xs text-gray-400">کشور</span><p className="text-[0.85rem] text-gray-500">{props.country}</p></div>
        </div>

      </div>
    </Link>
  );
}

export default Item;
