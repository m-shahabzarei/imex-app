// "use client"

// import Item from '@/component/panel/book/tariffs/Item'
// import axios from 'axios';
// import Image from 'next/image'
// import Link from 'next/link'
// import { useEffect, useState } from 'react';

// function Page() {

//   const [data, setData] = useState();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get(`https://api.imexapp.ir/book/tariff/`)
//       .then((res) => setData(res.data.results))
//       .finally(() => setLoading(false));
//   }, []);

// console.log(data)

//   return (
//     <div className="grid gap-4 pb-7">
//         <Link href="/panel/book" className="gap-1 hover:gap-3 transition-all duration-300 flex w-fit hover:text-custom2 ">
//         <Image src="/image/Alt Arrow Left.svg" width={23} height={25} className="rotate-180" alt="arrow" />
//         <span>بازگشت</span>
//         </Link>
// <Item />
//         <Item />
//         <Item />
//         <Item />
//     </div>
//   )
// }

// export default Page

"use client";
import DataListWithFilters from "@/component/panel/common/DataListWithFilters";
import NoItem from "@/component/Error/no-item";
import api from "@/lib/api";
import Link from "next/link";
import Item from "@/component/panel/book/tariffs/Item";
import HighlightText from "@/component/panel/common/HighlightText";

const getTariffs = async (params: any) => {
  const res = await api.get("/book/tariff/", {
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

interface Iitem {
  name: string;
  code: string;
  product_group: [];
  customs_duty: string;
  id: number;
}

export default function ConsultantsPage() {
  return (
    <DataListWithFilters<Iitem>
      grid1
      queryKey="Tariffs"
      fetcher={getTariffs}
      searchPlaceholder="جستجو در تعرفه ها،ارزش ها و ..."
      emptyComponent={<NoItem />}
      renderItem={(item,search) => (
        <Link href={`panel/book/tariffs/${item.id}`} key={item.id}>
          <Item
            name={<HighlightText text={item.name} highlight={search} />}
            code={item.code}
            product_group={item.product_group}
            customs_duty={item.customs_duty}
          />
        </Link>
      )}
    />
  );
}
