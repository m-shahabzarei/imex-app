import { addToMarket, removeFromMarket } from "@/services/mark";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, useState } from "react";

interface Iitem {
  name: ReactElement | string;
  code: string;
  product_group: [];
  customs_duty: string;
  id: number;
  isSaved: boolean;
  markID: number;
}

function Item(props: Iitem) {
  const [isSaved, setIsSaved] = useState(props.isSaved);
  const [markID, setMarkID] = useState<number | null>(props.markID);

  const toggleSave = async () => {
    try {
      if (isSaved && markID) {
        await removeFromMarket(markID);
        setIsSaved(false);
        setMarkID(null);
      } else {
        const res = await addToMarket(props.id);
        setIsSaved(true);
        setMarkID(res.data.id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Link href={`/panel/book/tariffs/${props.id}`}  className="w-full">
      <div className="relative bg-white shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl flex flex-col md:flex-row items-center justify-between p-4 md:py-6 md:px-8 gap-4 hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all duration-300">
        
        {/* بخش راست: عنوان و مشخصات */}
        <div className="flex flex-col justify-between w-full md:w-5/12 gap-4 md:gap-6 h-full">
          <div className="flex justify-between items-center w-full">
            <div className="text-sm md:text-base font-bold text-custom2 block">
              {props.name}
            </div>
            {/* آیکون بوک‌مارک فقط برای موبایل در اینجا */}
            <Image
              src={isSaved ? "/image/bookmark.svg" : "/image/bookmark2.svg"}
              width={20}
              height={20}
              alt="bookmark"
              onClick={toggleSave}
              className={`hover:cursor-pointer md:hidden ${isSaved ? "w-6" : ""}`}
            />
          </div>

          <div className="flex text-xs md:text-sm text-gray-400 justify-between items-center">
            <div className="flex gap-1">
              <span className="font-light">شماره تعرفه:</span>
              <span className="font-medium text-gray-500">{props.code}</span>
            </div>
            {props.customs_duty && (
              <div className="flex gap-1">
                <span className="font-light">حقوق ورودی:</span>
                <span className="font-medium text-gray-500">{props.customs_duty}%</span>
              </div>
            )}
          </div>
        </div>

        {/* خط جداکننده عمودی برای دسکتاپ */}
        <div className="hidden md:block w-[1px] h-16 bg-gray-200 mx-2"></div>

        {/* خط جداکننده افقی برای موبایل */}
        <hr className="md:hidden w-full text-gray-200" />

        {/* بخش چپ: توضیحات سلسله مراتبی */}
        <div className="w-full md:w-5/12">
          <div className="flex flex-col gap-2 text-gray-400 text-xs md:text-right">
            {props.product_group.map(
              (
                {
                  tariffCode,
                  faDescription,
                }: { tariffCode: string; faDescription: string },
                index
              ) => (
                <span key={index} className="line-clamp-1">
                  {tariffCode} {faDescription}
                </span>
              )
            )}
          </div>
        </div>

        {/* آیکون بوک‌مارک برای دسکتاپ (سمت چپ مطلق) */}
        <div className="hidden md:flex justify-end items-center md:absolute md:left-6 md:top-1/2 md:-translate-y-1/2">
             <Image
              src={isSaved ? "/image/bookmark.svg" : "/image/bookmark2.svg"}
              width={24} // سایز کمی بزرگتر برای دسکتاپ
              height={24}
              alt="bookmark"
              onClick={(e) => {
                e.preventDefault(); // جلوگیری از کلیک روی لینک والد اگر وجود داشته باشد
                toggleSave();
              }}
              className={`hover:cursor-pointer transition-all ${isSaved ? "scale-110" : ""}`}
            />
        </div>

      </div>
    </Link>
  );
}

export default Item;