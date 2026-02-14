"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

import DataListWithFilters from "@/component/panel/common/DataListWithFilters";
import LoadingSpinner from "@/component/ui/Loading";
import NoItem from "@/component/Error/no-item";
import HighlightText from "@/component/panel/common/HighlightText";

import { Iitem } from "@/component/panel/book/zamem/[id]/type";
import api from "@/lib/api";

import { useEffect, useState } from "react";
import { usePublicStore } from "@/stores/public.store";
import { getDateRangeByYear } from "@/utils/date";


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
  const [count, setCount] = useState<number | null>(null);

  const selectedYear = usePublicStore((state) => state.selectedYear);

  useEffect(() => {
    api
      .get(`/book/preferential-tariff/?country=${id}`, {
        params:
          selectedYear === 1403
            ? getDateRangeByYear(1403)
            : undefined,
      })
      .then((res) => setCount(res.data.count));
  }, [selectedYear]);

  return (
    <DataListWithFilters<Iitem>
      count={count}
      Date
      queryKey={["preferentialTariff", selectedYear]}
      fetcher={(params) => {
        const finalFilters: any = {
          ...params.filters,
          country: id,
        };

        if (selectedYear === 1403) {
          Object.assign(finalFilters, getDateRangeByYear(1403));
        }

        return getPreferentialTariff({
          ...params,
          filters: finalFilters,
        });
      }}
      emptyComponent={<NoItem />}
      renderItem={(item, search) => (
        <Link href={`/panel/book/zamem/${id}/${item?.id}`} key={item?.id}>
          <div className="bg-white h-38 shadow-[0_0_20px_rgba(0,0,0,0.12)] p-5 rounded-xl relative flex flex-col transition duration-300 hover:cursor-pointer justify-between">
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
  );
}
