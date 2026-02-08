/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import DataListWithFilters from "@/component/panel/common/DataListWithFilters";
import NoItem from "@/component/Error/no-item";
import api from "@/lib/api";
import Item from "@/component/panel/book/tariffs/Item";
import HighlightText from "@/component/panel/common/HighlightText";
import { usePublicStore } from "@/stores/public.store";
import { getDateRangeByYear } from "@/utils/date";
import { useEffect } from "react";

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

  const getTariffs = async (params: any) => {
    const finalParams: any = { ...params };

    // 👇 فقط اگر 1403 بود پارامتر تاریخ بفرست
    if (selectedYear === 1403) {
      Object.assign(finalParams, getDateRangeByYear(1403));
    }

    const res = await api.get("/book/tariff/", {
      params: finalParams,
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


  return (
    <DataListWithFilters<Iitem>
      NoFilter
      grid1
      Date
      queryKey={["Tariffs", selectedYear]} // 👈 مهم برای refetch
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
  );
}
