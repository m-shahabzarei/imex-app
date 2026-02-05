/* eslint-disable react-hooks/immutability */
"use client";
import Search from "@/component/panel/common/Search";
import Item from "@/component/panel/home/item";
import Button from "@/component/ui/Button";
import { useAuthStore } from "@/stores/auth.store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Home() {
  const user = useAuthStore((s) => s.user);
  const [Show, setShow] = useState(true)



  function getSuggest() {
    
    if (user?.type_subscription === "free") {

      return (
        <div className={`${Show ? "" : "hidden"} fixed inset-0 z-5000 flex items-end md:items-center justify-center bg-black/40`}>
          <div
            className="
                  w-full md:w-[420px]
                  bg-white
                  rounded-t-2xl md:rounded-2xl
                  p-6
                  flex flex-col items-center  text-center gap-3
                  animate-slideUp md:animate-fadeIn
                "
          >

            <Image src="/image/image 1.png" width={180} height={100} alt="payment" />
            <h1 className="text-custom2 font-bold text-lg">۱ روز اشتراک رایگان شما برای استفاده از کلیه سرویس های اپلیکیشن فعال شد.</h1> 
            <p className="text-gray-600">برای ادامه استفاده در طول یک سال, به تمدید اشتراک نیاز است.</p>

            <div className="flex gap-3 mt-6 w-full">
              <Button onClick={()=>setShow(false)} variant="glassy">تایید</Button>
            <Link href="/panel/profile/subscribe" className="w-full">
              <Button variant="secondary"> خرید اشتراک</Button>
            </Link>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="grid gap-3 items-center md:pb-10">
      <div className="grid md:grid-cols-2 gap-3">
        <div className="h-32 flex flex-col justify-between shadow-[0_0_20px_rgba(0,0,0,0.12)] py-4 px-3 rounded-xl max-md:hidden">
          <p className="text-[#5764EF] bg-white text-sm font-bold">
            جستجو بوسیله نام و یا کد تعرفه
          </p>
          <Image
            src="/image/search-normal.svg"
            alt="search icon"
            width="23"
            height="22"
            className="absolute mt-14 right-6 invert brightness-50 contrast-200"
          />
          <Search
            variant="secondary"
            text="جستجو در تعرفه‌ها، مقررات، آمار صادرات و واردات و ..."
          />
        </div>
        <div className=" shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl h-32 overflow-hidden">
          <img
            src="https://webapp.imexapp.ir/media/sliders/1404.jpg"
            alt="banner"
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="grid-cols-2 grid gap-3 w-full">
        <Item
          icon="/image/bookC.svg"
          link="/panel/book/rules"
          variant="primary"
        >
          کتاب مقررات صادرات و واردات
        </Item>

        <Item
          icon="/image/messagesC.svg"
          link="/panel/home/mentors"
          variant="primary"
        >
          مشاوره تجاری
        </Item>
        <Item icon="/image/teacher.svg" link="/panel/course" variant="primary">
          دوره های تخصصی
        </Item>
        <Item
          icon="/image/bookC.svg"
          link="/panel/home/exhibition"
          variant="primary"
        >
          نمایشگاه های تجاری
        </Item>
        <Item
          icon="/image/message-questionC.svg"
          link="/panel/blog"
          variant="primary"
        >
          دانستنی های تجاری
        </Item>
        <Item
          icon="/image/moneyBagC.svg"
          link="/panel/home/ryzen"
          variant="primary"
        >
          صفحه اختصاصی رایزن اقتصادی
        </Item>
      </div>

      {getSuggest()}
    </div>
  );
}

export default Home;
