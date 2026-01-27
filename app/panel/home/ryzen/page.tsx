"use client";
import Item from "@/component/panel/home/ryzen/item";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Item {
  id: number;
  name: string;
  image: string;
}

function Page() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.imexapp.ir/core/country/?is_ryzen=true&page=&search=`)
      .then((res) => setData(res.data.results))
      .finally(() => setLoading(false));
  }, []);

  console.log(data);

  return (
    <div className="grid max-md:grid-cols-3 grid-cols-4 gap-4 items-center justify-center pt-8">
      <Link
        href="/panel/home"
        className="gap-1 mb-4 hover:gap-3 transition-all duration-300 flex w-fit absolute hover:text-custom2 -top-1 max-md:top-51 max-md:right-7"
      >
        <Image
          src="/image/Alt Arrow Left.svg"
          width={23}
          height={25}
          className="rotate-180"
          alt="arrow"
        />
        <span>بازگشت</span>
      </Link>
      {data?.map((item: Item) => {
        return (
          <Item
            link={`/panel/home/ryzen/${item.id}`}
            key={item.id}
            name={item.name}
            image={item.image}
          />
        );
      })}
    </div>
  );
}

export default Page;
