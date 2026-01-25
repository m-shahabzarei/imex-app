/* eslint-disable react-hooks/rules-of-hooks */

import Link from "next/link";

const data = [
  {
    id: 8,
    title: "بوسنی",
  },
  {
    id: 7,
    title: "کوبا",
  },
  {
    id: 6,
    title: "سوریه",
  },
  {
    id: 5,
    title: "تونس",
  },
  {
    id: 4,
    title: "پاکستان",
  },
  {
    id: 3,
    title: "اوراسیا",
  },
];

interface Item {
  id: number;
  title: string;
}





function page() {

  return (
    <div className="grid md:grid-cols-3 gap-5 md:pb-4">
      {data.map((item: Item) => {
        return (
          <Link href={`http://localhost:3000/panel/book/zamem/${item.id}`} key={item.id}>
            <div
              className={`bg-white h-18 shadow-[0_0_20px_rgba(0,0,0,0.12)] p-5 rounded-xl relative flex items-center transition duration-300
            hover:cursor-pointer justify-start hover:bg-custom hover:text-white`}
            >
              <span
                className={`transition items-center text-center text-[1rem] md:text-[1rem] duration-500 max-md:mt-2 font-bold`}
              >
                {item.title}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default page;
