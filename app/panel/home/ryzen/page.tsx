// "use client";

// import CountryItem from "@/component/panel/home/ryzen/item"; // فرض کردم این همون کامپوننت Item شماست
// import LoadingSpinner from "@/component/ui/Loading";
// import api from "@/lib/api";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// interface Country {
//   id: number;
//   name: string;
//   image: string | null;
// }

// export default function RyzenCountriesPage() {
//   const [data, setData] = useState<Country[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api
//       .get("https://api.imexapp.ir/core/country/?is_ryzen=true&page=1&search=")
//       .then((res) => setData(res.data.results))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="relative pt-8">
//       {/* لینک بازگشت */}
//       <Link
//         href="/panel/home"
//         className="gap-1 mb-4 hover:gap-3 transition-all duration-300 flex w-fit absolute hover:text-custom2 -top-1 max-md:top-51 max-md:right-7"
//       >
//         <Image
//           src="/image/Alt Arrow Left.svg"
//           width={23}
//           height={25}
//           className="rotate-180"
//           alt="arrow"
//         />
//         <span>بازگشت</span>
//       </Link>

//       {/* محتوا */}
//       {loading ? (
//         <LoadingSpinner />
//       ) : data.length === 0 ? (
//         <LoadingSpinner error/>
//       ) : (
//         <div className="grid max-md:grid-cols-3 grid-cols-4 gap-4 items-center justify-center">
//           {data.map((item) => (
//             <CountryItem
//               key={item.id}
//               link={`/panel/home/ryzen/${item.id}`}
//               name={item.name}
//               image={item.image || "/image/default.png"} // اگر عکس null بود، یک placeholder بزاره
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import DataListWithFilters from "@/component/panel/common/DataListWithFilters";
import NoItem from "@/component/Error/no-item";
import HighlightText from "@/component/panel/common/HighlightText";
import Item from "@/component/panel/home/ryzen/item";
import api from "@/lib/api";

const getMentor = async (params: any) => {
  const res = await api.get("/core/country/?is_ryzen=true", {
    params,
    paramsSerializer: {
      indexes: false,
    },
  });

  let nextPage = null;

  if (res.data.next) {
    try {
      const url = new URL(res.data.next);
      nextPage = url.searchParams.get("page");
    } catch {
      nextPage = null;
    }
  }

  return {
    results: res.data.results,
    next: nextPage,
  };
};

interface Country {
  id: number;
  name: string;
  image: string | null;
}

export default function ConsultantsPage() {
  return (
    <DataListWithFilters<Country>
      grid4
      queryKey="Mentor"
      fetcher={getMentor}
      searchPlaceholder="جستجو در دانستی و ..."
      emptyComponent={<NoItem />}
      renderItem={(item, search) => (
        <Item
          key={item.id}
          link={`/panel/home/ryzen/${item.id}`}
          name={item.name}
          image={item.image || "/image/default.png"}
        />
      )}
    />
  );
}
