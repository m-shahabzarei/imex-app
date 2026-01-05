import Link from "next/link";
import React from "react";

const menuItems = [
  { name: "خانه", url: "/" , icon:"" },
  { name: "تعرفه ها", url: "/" , icon:"" },
  { name: "آموزش", url: "/" , icon : ""},
  { name: "مقالات", url: "/" , icon : ""},
  { name: "پروفایل", url: "/" , icon : ""},
];

function Menu() {
  return (
    <nav className="mr-32 mt-12 shadow-xl drop-shadow-xl w-40 rounded-xl p-3">
      <ul className="flex flex-col justify-around gap-4">
        {menuItems.map((item, index) => (
          <Link href={item.url} key={index}>
            <li className="rounded-3xl text-sm items-center transition-colors duration-300 ease-in flex justify-start py-3 px-6 hover:text-white bg-linear-to-b  hover:from-[#5764EF] hover:to-[#3E47AD]">
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
