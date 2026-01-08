import Search from "@/component/panel/Search";
import Image from "next/image";

function Home() {
  return (
    <div className="w-[67%] h-fit top-0 mt-32 left-[8.5vw] absolute grid grid-cols-2 gap-7">
      <div className=" shadow-[0_0_20px_rgba(0,0,0,0.12)] py-7 px-3 rounded-3xl">
        <p className="text-[#5764EF] bg-white text-sm">
          جستجو بوسیله نام و یا کد تعرفه
        </p>
        <Image
          src="/image/search-normal.svg"
          alt="search icon"
          width="23"
          height="22"
          className="absolute mt-10 right-6 invert brightness-50 contrast-200"
        />
        <Search
          variant="secondary"
          text="جستجو در تعرفه‌ها، مقررات، آمار صادرات و واردات و ..."
        />
      </div>
      <div className=" shadow-[0_0_20px_rgba(0,0,0,0.12)] py-7 px-3 rounded-3xl">
        <Image src="/image/image5.png" alt="banner" width="60" height="30"/>
      </div>
      <div className=" shadow-[0_0_20px_rgba(0,0,0,0.12)] py-7 px-3 rounded-3xl">
        <p className="text-[#5764EF] bg-white">
          جستجو بوسیله نام و یا کد تعرفه
        </p>
        <Search
          variant="secondary"
          text="جستجو در تعرفه‌ها، مقررات، آمار صادرات و واردات و ..."
        />
      </div>
      <div className=" shadow-[0_0_20px_rgba(0,0,0,0.12)] py-7 px-3 rounded-3xl">
        <p className="text-[#5764EF] bg-white">
          جستجو بوسیله نام و یا کد تعرفه
        </p>
        <Search
          variant="secondary"
          text="جستجو در تعرفه‌ها، مقررات، آمار صادرات و واردات و ..."
        />
      </div>
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
