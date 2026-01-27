/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


interface Item {
  id: number;
  title: string;
}





function page() {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.imexapp.ir/book/preferential-tariff-country/?page=1&search=`)
      .then((res) => setData(res.data.results))
      .finally(() => setLoading(false));
  }, []);

console.log(data)



  return (
    <div className="grid md:grid-cols-3 gap-5 md:pb-4">
      {data?.map((item: Item) => {
        return (
          <Link href={`/panel/book/zamem/${item.id}`} key={item.id}>
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
