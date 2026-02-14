/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Search from "@/component/panel/common/Search";
import Item from "@/component/panel/home/item";
import Button from "@/component/ui/Button";
import { useAuthStore } from "@/stores/auth.store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type SearchTarget =
  | "zamem"
  | "consultants"
  | "knowledge"
  | "exhibitions"
  | "ryzen"
  | "course";

export const SEARCH_TARGETS: Record<SearchTarget, string> = {
  zamem: "/panel/book/zamem",
  consultants: "/panel/home/mentors",
  knowledge: "/panel/blog/",
  exhibitions: "/panel/home/exhibition",
  ryzen: "/panel/home/ryzen",
  course: "/panel/course",
};

function Home() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  const [showSuggest, setShowSuggest] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchTarget, setSearchTarget] =
    useState<SearchTarget>("zamem");

 
  useEffect(() => {
    if (!user) return;

    const storageKey = `suggest_modal_seen_${user.id}`;
    const hasSeen = localStorage.getItem(storageKey);

    if (user.type_subscription === "free" && !hasSeen) {
      setShowSuggest(true);
    }
  }, [user]);

  const handleCloseSuggest = () => {
    if (!user) return;

    const storageKey = `suggest_modal_seen_${user.id}`;
    localStorage.setItem(storageKey, "true");
    setShowSuggest(false);
  };


  const handleSearch = () => {
    if (!searchText) return;

    router.push(
      `${SEARCH_TARGETS[searchTarget]}?search=${encodeURIComponent(
        searchText
      )}`
    );

    setShowSearchModal(false);
  };

  const renderSuggestModal = () => {
    if (user?.type_subscription !== "free" || !showSuggest)
      return null;

    return (
      <div className="fixed inset-0 z-5000 flex items-end md:items-center justify-center bg-black/40">
        <div className="w-full md:w-[420px] bg-white rounded-t-2xl md:rounded-2xl p-6 flex flex-col items-center text-center gap-3 animate-slideUp md:animate-fadeIn">
          <Image
            src="/image/image 1.png"
            width={180}
            height={100}
            alt="payment"
          />

          <h1 className="text-custom2 font-bold text-lg">
            ۱ روز اشتراک رایگان شما برای استفاده از کلیه سرویس های اپلیکیشن فعال
            شد.
          </h1>

          <p className="text-gray-600">
            برای ادامه استفاده در طول یک سال, به تمدید اشتراک نیاز است.
          </p>

          <div className="flex gap-3 mt-6 w-full">
            <Button onClick={handleCloseSuggest} variant="glassy">
              تایید
            </Button>

            <Link href="/panel/profile/subscribe" className="w-full">
              <Button variant="secondary">
                خرید اشتراک
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid gap-3 items-center md:pb-10">
      {/* Search + Banner */}
      <div className="grid md:grid-cols-2 gap-3">
        <div className="h-32 flex flex-col justify-between shadow-[0_0_20px_rgba(0,0,0,0.12)] py-4 px-3 rounded-xl max-md:hidden relative">
          <p className="text-[#5764EF] bg-white text-sm font-bold">
            جستجو بوسیله نام و یا کد تعرفه
          </p>

          <Image
            src="/image/search-normal.svg"
            alt="search icon"
            width={23}
            height={22}
            className="absolute mt-14 right-6 invert brightness-50 contrast-200"
          />

          <Search
            placeholder="جستجو در تمام قابلیت های اپلیکیشن"
            variant="secondary"
            value={searchText}
            onChange={(value) => setSearchText(value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchText) {
                setShowSearchModal(true);
              }
            }}
            home
          />
        </div>

        <div className="shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl h-32 overflow-hidden">
          <img
            src="https://webapp.imexapp.ir/media/sliders/1404.jpg"
            alt="banner"
            className="h-full w-full"
          />
        </div>
      </div>

      {/* Menu Items */}
      <div className="grid-cols-2 grid gap-3 w-full">
        <Item icon="/image/bookC.svg" link="/panel/book/rules" variant="primary">
          کتاب مقررات صادرات و واردات
        </Item>

        <Item icon="/image/shipC.svg" link="/panel/home/report" variant="primary">
          آمار و اطلاعات تجاری
        </Item>

        <Item icon="/image/messagesC.svg" link="/panel/home/mentors" variant="primary">
          مشاوره تجاری
        </Item>

        <Item icon="/image/teacher.svg" link="/panel/course" variant="primary">
          دوره های تخصصی
        </Item>

        <Item icon="/image/bookC.svg" link="/panel/home/exhibition" variant="primary">
          نمایشگاه های تجاری
        </Item>

        <Item icon="/image/message-questionC.svg" link="/panel/blog" variant="primary">
          دانستنی های تجاری
        </Item>

        <Item icon="/image/MoneyBagC.svg" link="/panel/home/ryzen" variant="primary">
          صفحه اختصاصی رایزن اقتصادی
        </Item>
      </div>

      {/* Search Modal */}
      {showSearchModal && (
        <div
          className="fixed inset-0 z-5000 bg-black/40 backdrop-blur-xs flex items-end md:items-center justify-center"
          onClick={() => setShowSearchModal(false)}
        >
          <div
            className="bg-white w-full md:w-[420px] rounded-t-2xl md:rounded-2xl p-6 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-custom2 font-bold text-lg mb-4 text-center">
              محدوده جستجو
            </h2>

            <div className="flex flex-col gap-3">
              {[
                { key: "zamem", label: "کتاب صادرات و واردات (تعرفه‌ها)" },
                { key: "consultants", label: "مشاوران" },
                { key: "knowledge", label: "دانستنی‌ها" },
                { key: "exhibitions", label: "نمایشگاه‌ها" },
                { key: "ryzen", label: "رایزن بازرگانی" },
                { key: "course", label: "دوره‌های آموزشی" },
              ].map((item) => (
                <label key={item.key} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={searchTarget === item.key}
                    onChange={() =>
                      setSearchTarget(item.key as SearchTarget)
                    }
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="glassy"
                onClick={() => setShowSearchModal(false)}
              >
                بازگشت
              </Button>

              <Button variant="secondary" onClick={handleSearch}>
                جستجو
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Suggest Modal */}
      {renderSuggestModal()}
    </div>
  );
}

export default Home;
