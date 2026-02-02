"use client"
import Accordion from "@/component/panel/book/tariffs/Accordion";
import LoadingSpinner from "@/component/ui/Loading";
import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IData{
  id:number;
  rule_text:string;
  search_text:string;
}

function Item() {
  const [data, setData] = useState<IData[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get(`https://api.imexapp.ir/book/rule/`)
      .then((res) => setData(res.data.results))
      .finally(() => setLoading(false));
  }, []);
console.log(data)


  return (
    <>
    {loading ? <LoadingSpinner /> : (
      <div className=" flex flex-col gap-6 pb-4">
      <Link
        href="/panel/book"
        className="gap-1 hover:gap-3 transition-all duration-300 flex w-fit hover:text-custom2 "
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

      {data?.map((item) => (
      <Accordion key={item.id} title={item.rule_text} >
        <div className="overflow-hidden ">
          <p className="text-[0.9rem] p-3 opacity-80 text-gray-700">
            {item.search_text}
          </p>
        </div>
      </Accordion>
))}
    </div>)}
    </>
  );
}

export default Item;
