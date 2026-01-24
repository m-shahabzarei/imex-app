/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */

"use client";
import { useEffect, useState } from "react";
import { ICourse } from "./type";

function Item(props: ICourse) {
  const [offline, setOffline] = useState(false);

  const check = () => {
    if (props.type == "offline") {
      setOffline(true);
    } else if (props.type == "hybrid") {
      setOffline(false);
    }
  };

  useEffect(() => {
    check();
  }, [check]);

  return (
    <a href={props.link}>
      <div
        key={props.id}
        className={`h-32 md:h-32 xl:h-28 shadow-[0_0_20px_rgba(0,0,0,0.12)] py-4 px-3 rounded-2xl relative flex items-center transition duration-500 bg-white
       hover:cursor-pointer justify-center`}
      >
        <div className="absolute right-2 w-[25%] h-[70%] overflow-hidden text-center items-center flex rounded-xl">
          <div className="w-full">
            <img
              src={props.image}
              alt={props.title}
              className="w-[120%] object-cover h-20 rounded-xl"
            />
          </div>
        </div>
        <div className="h-full flex flex-col pr-[35%] justify-between">
          <h1 className="text-[0.85rem] text-[#5764EF] font-bold">
            {props.title}
          </h1>
          <p className="line-clamp-1 text-xs text-gray-500">
            {props.description}
          </p>
          <div className="flex max-sm:gap-2 lg:gap-0 max-lg:gap-3 xl:gap-3 text-xs">
            <div className="bg-[#efd8571f] text-[#4a4a4bbb] inline p-1 rounded">
              {offline ? "ضبط شده" : "آنلاین"}
            </div>
            <div className="bg-[#5764ef34] text-[#5764EF] inline p-1 rounded">
              دانشگاه تهران
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-1 absolute md:bottom-3 bottom-4 left-2 max-sm:text-xs max-lg:text-sm lg:text-xs xl:text-sm">
          <span>تومان</span>
          <span>{props.price}</span>
        </div>
      </div>
    </a>
  );
}

export default Item;
