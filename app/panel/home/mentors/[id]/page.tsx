"use client";
import InfoBox from "@/component/panel/book/tariffs/InfoBox";
import { IData } from "@/component/panel/home/mentors/[id]/Type";
import Button from "@/component/ui/Button";
import LoadingSpinner from "@/component/ui/Loading";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const [data, setData] = useState<IData>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!id) return;
    axios
      .get(`https://api.imexapp.ir/users/consultants/${id}`)
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [id]);


  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full lg:py-12 flex flex-col lg:px-24 p-4 items-end gap-8">

          {/* Top */}
          <div className="flex max-lg:flex-col gap-6 w-full h-fit justify-between">
            {/* Profile */}
            <div className="lg:w-3/5 shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl p-3 ">
              <h1 className="text-custom font-bold">{data?.full_name}</h1>
              <div className="flex w-full justify-evenly gap-3 pt-2">
                <Image
                  src={data?.image}
                  width={190}
                  height={302}
                  alt="profile"
                  className="rounded-xl"
                />
                <div className="w-full gap-2 flex flex-col ">
                  <InfoBox
                    label="گروه کالا"
                    value={data?.product_group.title}
                    variant={"single"}
                  />
                  <InfoBox
                    label="کشور"
                    value={data?.country.name}
                    variant={"single"}
                  />
                  <InfoBox
                    label="فرایند"
                    value={data?.process.title}
                    variant={"single"}
                  />
                </div>
              </div>
            </div>
            {/* Times */}
            <div className="lg:w-2/5 shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl p-3 flex flex-col gap-5">
              {data?.online_working_days && (
                <div>
                  <h1 className="text-custom font-bold text-sm">
                    ساعت کاری مشاورآنلاین
                  </h1>
                  <div className="flex flex-col gap-1 mt-3">
                    {data.online_working_days.map((day) => (
                      <p key={day.id} className="text-xs text-gray-600">
                        {day.day_name} :
                        {day.time_slots.map((time) => time.start_time)} الی{" "}
                        {day.time_slots.map((time) => time.end_time)}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {data?.offline_working_days && (
                <div>
                  <h1 className="text-custom font-bold text-sm">
                    ساعت کاری مشاوره حضوری
                  </h1>
                  <div className="flex flex-col gap-1 mt-3">
                    {data.offline_working_days.map((day) => (
                      <p key={day.id} className="text-xs text-gray-600">
                        {day.day_name} :{" "}
                        {day.time_slots.map((time) => time.start_time)}
                        {day.time_slots.map((time) => time.end_time)}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Price */}
            <div className="lg:w-2/5 shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl p-3 flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <h1 className="text-custom">تعرفه جلسات مشاوره</h1>
                <div className="flex gap-3 items-center">
                  <span>{data?.price} تومان</span>
                  <p className="text-xs text-gray-600">
                    به ازای هر ساعت مشاوره حضوری
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <span>{data?.price_for_offline} تومان</span>
                  <p className="text-xs text-gray-600">
                    به ازای هر ساعت مشاوره آفلاین
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="w-full shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl p-3 flex flex-col gap-3">
            <h1 className="text-custom text-sm font-bold">فرم درخواست</h1>
            <div>
              <div className="flex max-md:flex-col max-md:gap-4 justify-between">
                <label className="flex flex-col text-sm gap-1">
                  نام و نام خانوادگی
                  <input
                    className="bg-gray-100 px-1 py-2 rounded-lg placeholder:text-gray-300"
                    placeholder="امین محمدی"
                  />
                </label>
                <label className="flex flex-col text-sm gap-1">
                  شماره تماس
                  <input
                    className="bg-gray-100 px-1 py-2 rounded-lg placeholder:text-gray-300"
                    placeholder="09123456789"
                  />
                </label>
                <label className="flex flex-col text-sm gap-1">
                  تاریخ جلسه
                  <input
                    className="bg-gray-100 px-1 py-2 rounded-lg placeholder:text-gray-300"
                    placeholder="1404/02/02"
                  />
                </label>
                <label className="flex flex-col text-sm gap-1">
                  ساعت شروع
                  <input
                    className="bg-gray-100 px-1 py-2 rounded-lg placeholder:text-gray-300"
                    placeholder="1404/02/02"
                  />
                </label>
                <label className="flex flex-col text-sm gap-1">
                  ساعت پایان
                  <input
                    className="bg-gray-100 px-1 py-2 rounded-lg placeholder:text-gray-300"
                    placeholder="1404/02/02"
                  />
                </label>
              </div>
              <div className="flex justify-between mt-3">
                <label className="flex flex-col text-sm w-full gap-1">
                  آدرس مکان جلسه
                  <textarea className="w-full h-32 bg-gray-100 rounded-lg" />
                </label>
              </div>
              <div className="flex justify-between mt-3">
                <label className="flex flex-col text-sm w-full gap-1">
                  متن درخواست
                  <textarea className="w-full h-32 bg-gray-100 rounded-lg" />
                </label>
              </div>
            </div>
          </div>
          {/* Bottom */}
          <div className="flex lg:w-1/4 w-full gap-4 left-0">
            <Link
              href="/panel/home/mentors"
              className="bg-[#5764ef34] text-[#5764EF] w-full text-center justify-center max-md:py-[12px] max-md:text-lg px-[12px] py-[8px] rounded-[12px] text-sm font-medium cursor-pointer hover:opacity-90 transition-all duration-200 ease-in-out flex items-center gap-1"
            >
              <span>بازگشت</span>
            </Link>

            <Button variant="secondary">ارسال درخواست</Button>
          </div>
        </div>
      )}
    </>
  );
}

//   const { id } = useParams();
//   const [Data, setData] = useState<any | null>(null);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     if (!id) return;

//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`https://api.imexapp.ir/users/consultants/${id}`);
//         console.log("axios response:", res);
//         const payload = res?.data?.data ?? res?.data ?? null;
//         setData(payload);
//       } catch (err) {
//         console.error("fetch error:", err);
//         setError("error");
//       }
//     };

//     fetchData();
//   }, [id]);

//   console.log("Data:", Data, "error:", error);
