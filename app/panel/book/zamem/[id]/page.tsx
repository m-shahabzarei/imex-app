"use client";
import { Iitem } from "@/component/panel/book/zamem/[id]/type";
import LoadingSpinner from "@/component/ui/Loading";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios
      .get(
        `https://api.imexapp.ir/book/preferential-tariff/?page=1&search=&date_after=2025-03-21&date_before=2026-03-20&country=${id}`
      )
      .then((res) => setData(res.data.results))
      .finally(() => setLoading(false));
  }, [id]);

  console.log(data);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid md:grid-cols-2 gap-4 pt-8">
          <Link
            href="/panel/book/zamem"
            className="gap-1 hover:gap-3 transition-all duration-300 flex w-fit hover:text-custom2 absolute top-0 max-md:top-51 max-md:right-7"
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

          {data?.map((item: Iitem) => {
            return (
              <Link href={""} key={item.id}>
                <div
                  className={`bg-white h-38 shadow-[0_0_20px_rgba(0,0,0,0.12)] p-5 rounded-xl relative flex flex-col  transition duration-300
            hover:cursor-pointer justify-between`}
                >
                  <h1 className="text-custom2 text-[0.9rem] line-clamp-1">
                    {item.tariff.name}
                  </h1>
                  <div className="grid grid-cols-2 gap-5 w-full">
                    <div className="w-full text-sm flex flex-row-reverse justify-between">
                      <span className="text-gray-500">{item.tariff.code}</span>
                      <span className="text-gray-400">شماره تعریف:</span>
                    </div>
                    <div className="w-full text-sm flex flex-row-reverse justify-between">
                      <span className="text-gray-500">
                        {item.country.title}
                      </span>
                      <span className="text-gray-400">کشور:</span>
                    </div>
                    <div className="w-full text-sm flex flex-row-reverse justify-between">
                      <span className="text-gray-500">واردات</span>
                      <span className="text-gray-400">نوع:</span>
                    </div>
                    <div className="w-full text-sm flex flex-row-reverse justify-between">
                      <span className="text-gray-500">
                        {item.tariff_reduction_percent}
                      </span>
                      <span className="text-gray-400">مقدار کاهش تعرفه:</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
