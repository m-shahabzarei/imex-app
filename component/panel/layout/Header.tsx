"use client";
import Image from "next/image";
import Button from "@/component/ui/Button";
import { usePathname } from "next/navigation";
import Search from "../common/Search";
import { useState } from "react";
import { SEARCH_TARGETS, SearchTarget } from "@/app/panel/home/page";
import { useRouter } from "next/navigation";

function Header() {
    const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === "/panel/home/";


    const [searchText, setSearchText] = useState("");
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchTarget, setSearchTarget] = useState<SearchTarget>("zamem");
  
    const handleSearch = () => {
      if (!searchText) return;
  
      router.push(
        `${SEARCH_TARGETS[searchTarget]}?search=${encodeURIComponent(searchText)}`
      );
  
      setShowSearchModal(false);
    };

  function openChat(){
          window.location.href = "/panel/chat";

  }

  return (
    <div
      className={`w-full flex md:top-32 justify-center max-md:items-center md:mt-10 ${
        isActive ? "h-80" : "h-48"
      }`}
    >
      <header className="md:w-[83%] md:h-16 max-md:items-center max-md:pb-7 max-md:rounded-b-3xl max-md:gap-3 max-md:justify-end h-full w-full bg-linear-to-b  from-[#5764EF] to-[#3E47AD]  flex flex-col justify-center px-4 md:rounded-lg">
        <div className="w-full flex items-center h-fit justify-between">
          <div className="flex">
            <Image
              className="max-md:hidden"
              src="/image/Logo.svg"
              alt="test"
              width="36"
              height="36"
            />
            <div className="flex flex-col mr-3">
              <span className="max-md:text-2xl z-[1000] text-white text-lg">
                ایمکس
              </span>
              <span className="max-md:hidden -mt-[11px] text-lg w-fit mr-[3px] bg-clip-text text-transparent bg-linear-to-b from-[#FFFFFF00] from-25% to-[#FFFFFF] font-extrabold">
                IM EX
              </span>
            </div>
          </div>
          <Button onClick={openChat} variant="primary" icon="/image/AI.svg">
            دستیار هوش مصنوعی
          </Button>
        </div>

        {isActive && (
          <div className="w-full flex">
            <Image
              src="/image/search-normal.svg"
              alt="search icon"
              width="24"
              height="24"
              className="absolute mt-10 right-6"
            />
            <div className="w-full md:hidden ">
                      <Search
                      
                      placeholder="جستجو در تمام قابلیت های اپلیکیشن"
                        variant="primary"
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
          </div>
        )}

      </header>


      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-5000 bg-black/40 flex items-end md:items-center justify-center">
          <div className="bg-white w-full md:w-[420px] rounded-t-2xl md:rounded-2xl p-6 animate-slideUp">
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
                    onChange={() => setSearchTarget(item.key as SearchTarget)}
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

    </div>
  );
}

export default Header;
