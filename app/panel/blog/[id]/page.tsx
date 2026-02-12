"use client";
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

  const getDate = (Data: string | undefined) => {
    return Data?.slice(0, 10);
  };

  const getLink = ()=>{
    if(data?.title == "دانستنی"){
    return(
                <div className="w-full border border-gray-100 rounded-2xl p-4 mt-2 mb-2 bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)]">
            <h1 className="text-right text-blue-900 font-bold mb-4 ">
              لینک ارجاع
            </h1>

            <Link href={data?.link || "#"} target="_blank">
              <div className="w-full bg-[#EEF2FF] hover:bg-[#E0E7FF] transition-colors rounded-xl py-3 flex justify-center items-center gap-2 text-blue-600 font-medium cursor-pointer">
                <span>خرید کتاب</span>

                <div
                  className="w-5 h-5 bg-blue-600"
                  style={{
                    maskImage: "url('/image/Export.svg')",
                    WebkitMaskImage: "url('/image/Export.svg')",
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                  }}
                />
              </div>
            </Link>
          </div>
    )
  }
  }


  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className=" shadow-[0_0_20px_rgba(0,0,0,0.12)] h-fit rounded-xl p-3">
            <div className="flex gap-4 mb-4 max-md:flex-col">
              <div className="w-fit h-fit max-md:w-full">
                {data?.image && (
                  <Image src={data.image} width={220} height={20} alt="blog" />
                )}
              </div>

              <h1 className="text-custom font-bold text-sm max-md:text-[1rem]">
                {data?.title}
              </h1>

              <div className="md:absolute max-md:justify-between top-4 left-3 flex gap-3">
                <div className="bg-[#efd8571f] text-[#4a4a4bbb] inline p-1 rounded text-xs">
                  {data?.category.title}
                </div>
                <div className="bg-[#5764ef34] text-custom p-1  rounded text-xs flex gap-2">
                  {getDate(data?.created_at)}
                  <div
                    className="w-[15px] h-[15px] bg-custom" 
                    style={{
                      maskImage: "url('/image/calendar.svg')",
                      WebkitMaskImage: "url('/image/calendar.svg')",
                      maskRepeat: "no-repeat",
                      maskSize: "contain",
                    }}
                  />
                </div>
              </div>
            </div>

            <p className="text-sm whitespace-pre-line">{data?.description}</p>
          </div>
                    {getLink()}
        </div>
      )}
    </>
  );
}

export default Page;
