/* eslint-disable react-hooks/immutability */
"use client";

import Search from "@/component/panel/common/Search";
import Item from "@/component/panel/home/item";
import Image from "next/image";
import { useEffect} from "react";

function Home() {

  useEffect(() => {
    showItems();
    console.log(screen.width)
  }, []);

  const showItems = () => {

    if(screen.width >= 1024){
    return (
      <>
        <Item icon="/image/bookC.svg" link="/panel/book/rules" variant="primary">
          کتاب مقررات صادرات و واردات
        </Item>
        <Item icon="/image/shipC.svg" link="/panel" variant="primary">
          اطلاعات تجاری
        </Item>
        <Item icon="/image/messagesC.svg" link="/panel/home/mentors" variant="primary">
          مشاوره تجاری
        </Item>
        <Item icon="/image/teacher.svg" link="/panel/course" variant="primary">
          دوره های تخصصی
        </Item>
        <Item icon="/image/bookC.svg" link="/" variant="primary">
          نمایشگاه های تجاری
        </Item>
        <Item icon="/image/message-questionC.svg" link="/panel/blog" variant="primary">
          دانستنی های تجاری
        </Item>
        </>
    );
  }else if(screen.width <= 1024){
    return (
      <div className="grid max-md:grid-cols-3 grid-cols-2 gap-3 items-center md:pb-10">
        <Item icon="/image/bookC.svg" link="/panel/book/rules" variant="primary">
          کتاب صادرات و واردات
        </Item>
        <Item icon="/image/shipC.svg" link="/" variant="primary">
          اطلاعات تجاری
        </Item>
        <Item icon="/image/messagesC.svg" link="/panel/home/mentors" variant="primary">
          مشاوره تجاری
        </Item>
        <Item icon="/image/teacher.svg" link="/panel/course" variant="primary">
          دوره های تخصصی
        </Item>
        <Item icon="/image/bookC.svg" link="/" variant="primary">
          نمایشگاه های تجاری
        </Item>
        <Item icon="/image/message-questionC.svg" link="/panel/home/blog" variant="primary">
          دانستنی های تجاری
        </Item>
      </div>
    );
  }
  };

  return (
    <div className="grid md:grid-cols-2 gap-7 items-center md:pb-10">
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

      {showItems()}
      <Item icon="/image/moneyBagC.svg" link="/" variant="secondary">
        صفحه اختصاصی رایزن اقتصادی
      </Item>
      <Item icon="/image/EarthC.svg" link="/" variant="secondary">
        صفحه اختصاصی کشور های مقصد
      </Item>
    </div>
  );
}

export default Home;

// "use client";

// import { useAuthStore } from "@/stores/auth.store";
// import { removeAuthCookie } from "@/utils/cookie";
// import { useRouter } from "next/navigation";

// export default function LogoutButton() {
//   const logout = useAuthStore((s) => s.logout);
//   const router = useRouter();

//   const handleLogout = () => {
//     // 1. پاک کردن Zustand
//     logout();

//     // 2. حذف Cookie
//     removeAuthCookie();

//     // 3. ریدایرکت
//     router.replace("/Login");
//   };

//   return <button onClick={handleLogout}>خروج</button>;
// }
