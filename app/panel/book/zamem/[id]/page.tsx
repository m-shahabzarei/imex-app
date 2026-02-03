// "use client";
// import { Iitem } from "@/component/panel/book/zamem/[id]/type";
// import LoadingSpinner from "@/component/ui/Loading";
// import axios from "axios";
// import Image from "next/image";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function Page() {
//   const { id } = useParams();
//   const [data, setData] = useState();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;
//     axios
//       .get(
//         `https://api.imexapp.ir/book/preferential-tariff/?page=1&search=&date_after=2025-03-21&date_before=2026-03-20&country=${id}`
//       )
//       .then((res) => setData(res.data.results))
//       .finally(() => setLoading(false));
//   }, [id]);

//   console.log(data);

//   return (
//     <>
//       {loading ? (
//         <LoadingSpinner />
//       ) : (
//         <div className="grid md:grid-cols-2 gap-4 pt-8">
//           <Link
//             href="/panel/book/zamem"
//             className="gap-1 hover:gap-3 transition-all duration-300 flex w-fit hover:text-custom2 absolute top-0 max-md:top-51 max-md:right-7"
//           >
//             <Image
//               src="/image/Alt Arrow Left.svg"
//               width={23}
//               height={25}
//               className="rotate-180"
//               alt="arrow"
//             />
//             <span>بازگشت</span>
//           </Link>

//           {data?.map((item: Iitem) => {
//             return (
//               <Link href={""} key={item.id}>
//                 <div
//                   className={`bg-white h-38 shadow-[0_0_20px_rgba(0,0,0,0.12)] p-5 rounded-xl relative flex flex-col  transition duration-300
//             hover:cursor-pointer justify-between`}
//                 >
//                   <h1 className="text-custom2 text-[0.9rem] line-clamp-1">
//                     {item.tariff.name}
//                   </h1>
//                   <div className="grid grid-cols-2 gap-5 w-full">
//                     <div className="w-full text-sm flex flex-row-reverse justify-between">
//                       <span className="text-gray-500">{item.tariff.code}</span>
//                       <span className="text-gray-400">شماره تعریف:</span>
//                     </div>
//                     <div className="w-full text-sm flex flex-row-reverse justify-between">
//                       <span className="text-gray-500">
//                         {item.country.title}
//                       </span>
//                       <span className="text-gray-400">کشور:</span>
//                     </div>
//                     <div className="w-full text-sm flex flex-row-reverse justify-between">
//                       <span className="text-gray-500">واردات</span>
//                       <span className="text-gray-400">نوع:</span>
//                     </div>
//                     <div className="w-full text-sm flex flex-row-reverse justify-between">
//                       <span className="text-gray-500">
//                         {item.tariff_reduction_percent}
//                       </span>
//                       <span className="text-gray-400">مقدار کاهش تعرفه:</span>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       )}
//     </>
//   );
// }

// "use client";
// import DataListWithFilters from "@/component/panel/common/DataListWithFilters";
// import NoItem from "@/component/Error/no-item";
// import api from "@/lib/api";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { Iitem } from "@/component/panel/book/zamem/[id]/type";

// const getTariff = async (params: any ) => {
//   const res = await api.get(`book/preferential-tariff/?page=1&search=&date_after=2025-03-21&date_before=2026-03-20&country=4`, {
//     params,
//     paramsSerializer: {
//       indexes: false,
//     },
//   });

//   let nextPage = null;

//   if (res.data.next) {
//     try {
//       const url = new URL(res.data.next);
//       nextPage = url.searchParams.get("page");
//     } catch {
//       nextPage = null;
//     }
//   }

//   return {
//     results: res.data.results,
//     next: nextPage,
//   };
// };

// export default function ConsultantsPage() {
//     const { id } = useParams();

//   return (
//     <DataListWithFilters<Iitem>
//       queryKey="Zamem"
//       fetcher={getTariff}
//       searchPlaceholder="جستجو در کشور ..."
//       emptyComponent={<NoItem />}
//       renderItem={(item) => (
//            <Link href={""} key={item.id}>
//                 <div
//                   className={`bg-white h-38 shadow-[0_0_20px_rgba(0,0,0,0.12)] p-5 rounded-xl relative flex flex-col  transition duration-300
//             hover:cursor-pointer justify-between`}
//                 >
//                   <h1 className="text-custom2 text-[0.9rem] line-clamp-1">
//                     {item.tariff.name}
//                   </h1>
//                   <div className="grid grid-cols-2 gap-5 w-full">
//                     <div className="w-full text-sm flex flex-row-reverse justify-between">
//                       <span className="text-gray-500">{item.tariff.code}</span>
//                       <span className="text-gray-400">شماره تعریف:</span>
//                     </div>
//                     <div className="w-full text-sm flex flex-row-reverse justify-between">
//                       <span className="text-gray-500">
//                         {item.country.title}
//                       </span>
//                       <span className="text-gray-400">کشور:</span>
//                     </div>
//                     <div className="w-full text-sm flex flex-row-reverse justify-between">
//                       <span className="text-gray-500">واردات</span>
//                       <span className="text-gray-400">نوع:</span>
//                     </div>
//                     <div className="w-full text-sm flex flex-row-reverse justify-between">
//                       <span className="text-gray-500">
//                         {item.tariff_reduction_percent}
//                       </span>
//                       <span className="text-gray-400">مقدار کاهش تعرفه:</span>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//       )}
//     />
//   );
// }

"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import DataListWithFilters from "@/component/panel/common/DataListWithFilters";
import LoadingSpinner from "@/component/ui/Loading";
import NoItem from "@/component/Error/no-item";

import { Iitem } from "@/component/panel/book/zamem/[id]/type";

// preferentialTariff.filters.ts
import api from "@/lib/api";
import HighlightText from "@/component/panel/common/HighlightText";

export const getPreferentialTariff = async ({
  pageParam = 1,
  filters,
}: {
  pageParam?: number;
  filters?: Record<string, any>;
}) => {
  const res = await api.get("/book/preferential-tariff/", {
    params: {
      page: pageParam,
      search: "",
      ...filters,
    },
  });

  let nextPage = null;

  if (res.data.next) {
    try {
      const url = new URL(res.data.next);
      nextPage = Number(url.searchParams.get("page"));
    } catch {
      nextPage = null;
    }
  }

  return {
    results: res.data.results,
    next: nextPage,
  };
};


export default function Page() {
  const { id } = useParams();

  return (
    <>
      <Link
        href="/panel/book/zamem"
        className="gap-1 hover:gap-3 transition-all duration-300 flex w-fit hover:text-custom2 absolute -top-4 max-md:top-51 max-md:right-7"
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

      <DataListWithFilters<Iitem>
        queryKey={["preferentialTariff", id]}
        fetcher={(params) =>
          getPreferentialTariff({ ...params,filters: {...params.filters,country: id,date_after: "2025-03-21",date_before: "2026-03-20",},})
        }
        emptyComponent={<NoItem />}
        loadingComponent={<LoadingSpinner />}
        renderItem={(item, search) => (
          <Link href={`/panel/book/zamem/${id}/${item?.id}`} key={item?.id}>
            <div
              className={`bg-white h-38 shadow-[0_0_20px_rgba(0,0,0,0.12)] p-5 rounded-xl relative flex flex-col transition duration-300
              hover:cursor-pointer justify-between`}
            >
              <h1 className="text-custom2 text-[0.9rem] line-clamp-1">
                <HighlightText text={item?.tariff.name} highlight={search} />
              </h1>

              <div className="grid grid-cols-2 gap-5 w-full">
                <div className="w-full text-sm flex flex-row-reverse justify-between">
                  <span className="text-gray-500">{item?.tariff.code}</span>
                  <span className="text-gray-400">شماره تعریف:</span>
                </div>

                <div className="w-full text-sm flex flex-row-reverse justify-between">
                  <span className="text-gray-500">{item?.country.title}</span>
                  <span className="text-gray-400">کشور:</span>
                </div>

                <div className="w-full text-sm flex flex-row-reverse justify-between">
                  <span className="text-gray-500">واردات</span>
                  <span className="text-gray-400">نوع:</span>
                </div>

                <div className="w-full text-sm flex flex-row-reverse justify-between">
                  <span className="text-gray-500">
                    {item?.tariff_reduction_percent}
                  </span>
                  <span className="text-gray-400">مقدار کاهش تعرفه:</span>
                </div>
              </div>
            </div>
          </Link>
        )}
      />
    </>
  );
}
