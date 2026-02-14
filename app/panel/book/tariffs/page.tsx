/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import DataListWithFilters from "@/component/panel/common/DataListWithFilters";
import NoItem from "@/component/Error/no-item";
import api from "@/lib/api";
import Item from "@/component/panel/book/tariffs/Item";
import HighlightText from "@/component/panel/common/HighlightText";
import { usePublicStore } from "@/stores/public.store";
import { getDateRangeByYear } from "@/utils/date";
import { useEffect, useState } from "react";

interface Iitem {
  name: string;
  code: string;
  product_group: [];
  customs_duty: string;
  id: number;
  mark: {
    is_mark: boolean;
    id: number;
  };
}

export default function Page() {
  const selectedYear = usePublicStore((state) => state.selectedYear);
  const [count, setCount] = useState(null);

  useEffect(() => {
    api.get("/book/tariff").then((res) => setCount(res.data.count));
  }, []);

  const getTariffs = async (
    params: any
  ): Promise<{ results: Iitem[]; next: number | null }> => {
    const finalParams: any = { ...params };

    if (selectedYear === 1403) {
      Object.assign(finalParams, getDateRangeByYear(1403));
    }

    const res = await api.get("/book/tariff/", {
      params: finalParams,
      paramsSerializer: { indexes: false },
    });

    let nextPage: number | null = null;

    if (res.data.next) {
      try {
        const url = new URL(res.data.next);
        const pageParam = url.searchParams.get("page");
        nextPage = pageParam ? Number(pageParam) : null;
        if (nextPage !== null && isNaN(nextPage)) nextPage = null;
      } catch {
        nextPage = null;
      }
    }

    return {
      results: Array.isArray(res.data.results) ? res.data.results : [],
      next: nextPage,
    };
  };

  return (
    <div>
      <DataListWithFilters<Iitem>
        count={count}
        NoFilter
        grid1
        Date
        queryKey={["Tariffs", selectedYear]} 
        fetcher={getTariffs}
        searchPlaceholder="جستجو در تعرفه ها،ارزش ها و ..."
        emptyComponent={<NoItem />}
        renderItem={(item, search) => (
          <Item
            key={item.id}
            name={<HighlightText text={item.name} highlight={search} />}
            code={item.code}
            product_group={item.product_group}
            customs_duty={item.customs_duty}
            isSaved={item.mark.is_mark}
            id={item.id}
            markID={item.mark.id}
          />
        )}
      />
    </div>
  );
}
