"use client";
import InfoBox from "@/component/panel/book/tariffs/InfoBox";
import { Iexhibition } from "@/component/panel/home/exhibition/type";
import LoadingSpinner from "@/component/ui/Loading";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [data, setData] = useState<Iexhibition>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!id) return;
    axios
      .get(`https://api.imexapp.ir/knowledge/exhibition/${id}`)
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  console.log(data);

  function getFax() {
    if (data?.fax !== null) {
      return (
        <>
          <InfoBox variant="single" value={data?.fax} label="فکس" />
          <InfoBox variant="single" value={data?.site} label="وبسایت" />
        </>
      );
    }
  }

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full flex flex-col items-center justify-between gap-3">
          {/* Top */}
          <div className="flex max-lg:flex-col max-lg:items-center gap-4 w-full">
            {/* Image */}
            <div className="shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl max-lg:w-full max-lg:flex justify-center h-fit p-3">
              <Image
                src={data?.image}
                width={180}
                height={32}
                alt="profile"
                className="rounded-xl"
              />
            </div>

            {/* Info */}
            <div className="w-full">
              <div className="gap-6 justify-evenly flex flex-col w-full shadow-[0_0_20px_rgba(0,0,0,0.12)] p-3 rounded-xl">
                <div>
                  <h1 className="text-custom2 text-[0.92rem]">{data?.title}</h1>
                </div>
                <div className="w-full my-1 flex justify-between">
                  <span className="text-[0.7rem] text-gray-400">مکان</span>
                  <p className="text-[0.75rem] text-gray-500">
                    {data?.location.title}
                  </p>
                </div>

                <div className="w-full flex justify-between">
                  <span className="text-[0.7rem] text-gray-400">
                    ساعت بازدید
                  </span>
                  <p className="text-[0.75rem] text-gray-500">
                    {data?.visiting_hour}
                  </p>
                </div>

                <div className="w-full mb-1 flex justify-between">
                  <span className="text-[0.7rem] text-gray-400">
                    تاریخ شروع
                  </span>
                  <p className="text-[0.75rem] text-gray-500">
                    {data?.start_date}
                  </p>
                </div>

                <div className="w-full flex justify-between">
                  <span className="text-[0.7rem] text-gray-400">
                    تاریخ پایان
                  </span>
                  <p className="text-[0.75rem] text-gray-500">
                    {data?.end_date}
                  </p>
                </div>

                {data?.supervising_manager && (
                  <InfoBox
                    variant={"single"}
                    value={data.supervising_manager}
                    label="مدیر ناظر"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="gap-3 flex flex-col w-full">
            {/*  */}
            <div className="shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl p-3 ">
              <h1>مجری</h1>
              <div className="flex flex-col gap-3 mt-3">
                {getFax()}
                {data?.presenter && (
                  <InfoBox
                    variant="single"
                    value={data.presenter}
                    label="نام مجری"
                  />
                )}
                {data?.phone[0] && (
                  <InfoBox
                    variant="single"
                    value={
                      <a
                        href={`tel:${data.phone}`}
                        className="text-blue-700 underline"
                      >
                        {data.phone}
                      </a>
                    }
                    label="تلفن"
                  />
                )}
                <InfoBox variant="single" value={data?.address} label="آدرس" />
              </div>
            </div>

            <div className="shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl p-3 h-fit w-full">
              <h1 className="text-custom2 text-[0.92rem]">توضیحات</h1>
              <h1>{data?.head}</h1>
              <p className="text-sm text-gray-600">{data?.description}</p>
            </div>
          </div>

          <div className="flex justify-end lg:w-full w-full gap-4 left-0">
            <Link
              href="/panel/home/exhibition"
              className="bg-[#5764ef34] text-[#5764EF] w-1/5 text-center justify-center max-md:py-[12px] max-md:text-lg px-[12px] py-[8px] rounded-[12px] text-sm font-medium cursor-pointer hover:opacity-90 transition-all duration-200 ease-in-out flex items-center gap-1"
            >
              <span>بازگشت</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
