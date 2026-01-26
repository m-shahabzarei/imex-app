"use client";

import Image from "next/image";
import Link from "next/link";

interface IItem {
  image: string;
  title: string;
  description: string;
  link: string;
  category:string;
}

function Item(props: IItem) {
  return (
    <Link href={props.link}>
      <div className="bg-white w-full h-32 max-md:h-fit shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl flex gap-2 p-4 max-md:p-2 hover:cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]">
        <div className="w-fit h-full overflow-hidden flex justify-center items-center rounded-xl">
          <Image
            src={props.image}
            width={200}
            height={140}
            alt="icon"
            className="object-cover rounded-xl"
          />
        </div>

        <div className="h-full flex flex-col w-full justify-start">
          <h1 className="text-[0.9rem] text-[#5764EF] font-bold mb-2 line-clamp-1">
            {props.title}
          </h1>
          <p className="line-clamp-2 text-[0.8rem] text-gray-500">
            {props.description}
          </p>

          <div className="mt-1 flex gap-3">
            <div className="bg-[#efd8571f] text-[#4a4a4bbb] inline p-1 rounded text-xs">
              {props.category}
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
}

export default Item;
