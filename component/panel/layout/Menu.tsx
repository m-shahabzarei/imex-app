"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  {name: "خانه",url: "/panel/home/",icon: "/image/home.svg",},
  {name: "کتاب",url: "/panel/book/",icon: "/image/document.svg",subPages: {"/panel/book/tariffs": "تعرفه ها","/panel/book/categories": "دسته‌بندی‌ها","/panel/book/author": "نویسندگان",},},
  {name: "آموزش",url: "/panel/course/",icon: "/image/tr.svg",},
  {name: "دانستنی",url: "/panel/blog/",icon: "/image/document-text.svg",},
  {name: "پروفایل",url: "/panel/profile/",icon: "/image/user.svg",},
];

function Menu() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <div className="max-md:fixed max-md:bottom-6 max-md:w-full max-md:flex max-md:justify-center md:absolute md:top-32 md:right-[9vw] z-[1000]">
      <nav className="md:w-40 max-md:py-2 max-md:px-0 w-[90%] rounded-3xl bg-white px-3 py-5 shadow-[0_0_20px_rgba(0,0,0,0.12)]">
        <ul className="flex justify-around md:flex-col md:gap-4">
          {menuItems.map((item, index) => {
            const isSubPageActive = item.subPages
              ? Object.keys(item.subPages).some((subUrl) =>
                  pathname.startsWith(subUrl)
                )
              : false;
            const displayName = isSubPageActive
              ? item.subPages![pathname]
              : item.name;
            const isActive =
              pathname === item.url ||
              (item.url === "/panel/book" && isSubPageActive) ||
              (item.subPages && Object.keys(item.subPages).includes(pathname));
              
            const isHovered = hoveredIndex === index;
            return (
              <Link href={item.url} key={item.url}>
                <li
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                  className={`
                    flex items-center rounded-4xl text-lg md:text-sm transition-all duration-300
                    md:py-3 md:pl-6 max-md:h-[60px]
                    ${
                      isActive
                        ? "bg-gradient-to-b from-[#5764EF] to-[#3E47AD] text-white md:pr-16 max-md:w-fit max-md:px-2"
                        : ""
                    }
                    ${
                      isHovered
                        ? "md:bg-gradient-to-b from-[#5764EF] to-[#3E47AD] md:text-white md:pr-16"
                        : "text-gray-500 md:pr-12"
                    }
                  `}
                >
                  <Image
                    src={item.icon}
                    width={20}
                    height={20}
                    alt="icon"
                    className={`
                      md:absolute md:right-[2vw] max-md:w-7
                      ${isActive ? "invert brightness-0 contrast-200" : ""} 
                      ${
                        isHovered
                          ? "md:invert md:brightness-0 md:contrast-200"
                          : ""
                      }
                    `}
                  />
                  <span className="max-md:hidden font-bold">{displayName}</span>
                  {isActive && <span className="mr-2 md:hidden">{displayName}</span>}
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
export default Menu;
