"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IData {
  id: number;
  image: string;
  description: string;
  category:{
    title:string;
  }
  title: string;
}

function Page() {
  const { id } = useParams();
  const [data, setData] = useState<IData>();
  useEffect(() => {
    if (!id) return;
    axios
      .get(
        `https://api.imexapp.ir/knowledge/business-knowledge/?type=ryzen&country_id=${id}&search=&page=1&/`
      )
      .then((res) => setData(res.data.results));
  }, [id]);

  console.log(data);

  return (
    <div className="pt-7">
      <Link
        href="/panel/home/ryzen"
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
      {data?.map((item: IData) => {
        return (
          <div
            key={item.id}
            className="bg-white w-full h-32 max-md:h-fit shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl flex gap-2 p-4 max-md:p-2 hover:cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]"
          >
            <div className="w-fit h-full overflow-hidden flex justify-center items-center rounded-xl">
              <Image
                src={item.image}
                width={200}
                height={140}
                alt="icon"
                className="object-cover rounded-xl"
              />
            </div>

            <div className="h-full flex flex-col w-full justify-between">
              <h1 className="text-[1rem] text-[#5764EF] font-bold mb-2 line-clamp-1">
                {item.title}
              </h1>
              <p className="line-clamp-2 text-[0.8rem] text-gray-500">
                {item.description}
              </p>

              <div className="mt-1 flex gap-3">
                <div className="bg-[#efd8571f] text-[#4a4a4bbb] inline p-1 rounded text-xs">
                  {item.category.title}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Page;
