"use client"
import { IData } from "@/component/panel/blog/[id]/type";
import LoadingSpinner from "@/component/ui/Loading";
import { useFetch } from "@/hooks/useFetch";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const { id } = useParams();
  const [data, setData] = useState<IData>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!id) return;
    axios
      .get(`https://api.imexapp.ir/knowledge/business-knowledge/${id}`)
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [id]);

 
  const getDate = (Data:string | undefined) =>{
   return Data?.slice(0,10)
  }

console.log(data)


  return (
    <>
    {loading ? <LoadingSpinner /> : ( <div className="md:pb-6">
      <Link
        href="/panel/blog"
        className="gap-1 mb-4 hover:gap-3 transition-all duration-300 flex w-fit hover:text-custom2 max-md:top-51 max-md:right-7"
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

      <div className=" shadow-[0_0_20px_rgba(0,0,0,0.12)] h-fit rounded-xl p-3">
        <div className="flex gap-4 mb-4 max-md:flex-col">
          <div className="w-fit h-fit max-md:w-full">
            <Image
              src={data?.image}
              width={220}
              height={20}
              alt="blog"
              className="rounded-lg h-fit max-md:w-full"
            />
          </div>

          <h1 className="text-custom font-bold text-sm max-md:text-[1rem]">
            {data?.title}
          </h1>

          <div className="md:absolute max-md:justify-between top-14 left-3 flex gap-3">
            <div className="bg-[#efd8571f] text-[#4a4a4bbb] inline p-1 rounded text-xs">
            </div>
            <div className="bg-[#5764ef34] text-[#5764EF] p-1 rounded text-xs flex gap-2">
              {getDate(data?.created_at)}
              <Image
                src="/image/calendar.svg"
                width={15}
                height={15}
                alt="calendar"
              />
            </div>
          </div>
        </div>

        <p className="text-sm">
         {data?.description}
        </p>
      </div>
    </div>)}
   </>
  );
}

export default Page;
