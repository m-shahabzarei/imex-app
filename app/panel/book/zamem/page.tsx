
"use client";
import DataListWithFilters from "@/component/panel/common/DataListWithFilters";
import NoItem from "@/component/Error/no-item";
import Item from "@/component/panel/home/ryzen/item";
import api from "@/lib/api";
import Link from "next/link";

const getZamem = async (params: any) => {
  const res = await api.get("/book/preferential-tariff-country/", {
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

interface Item {
  id: number;
  title: string;
}

export default function ConsultantsPage() {
  return (
    <DataListWithFilters<Item>
      Date
      grid4
      queryKey="Zamem"
      fetcher={getZamem}
      searchPlaceholder="جستجو در کشور ..."
      emptyComponent={<NoItem />}
      renderItem={(item) => (
        <Link href={`/panel/book/zamem/${item.id}`} key={item.id}>
          <div
            className={`bg-white h-18 shadow-[0_0_20px_rgba(0,0,0,0.12)] p-5 rounded-xl relative flex items-center transition duration-300
            hover:cursor-pointer justify-start hover:bg-custom hover:text-white`}
          >
            <span
              className={`transition items-center text-center text-[1rem] md:text-[1rem] duration-500 max-md:mt-2 font-bold`}
            >
              {item.title}
            </span>
          </div>
        </Link>
      )}
    />
  );
}
