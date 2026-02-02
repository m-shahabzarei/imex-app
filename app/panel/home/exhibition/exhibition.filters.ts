// filters/consultants.filters.ts
import { FilterConfig } from "@/component/panel/common/Filter/type";
import api from "@/lib/api";

export const ExhibitionFilters: FilterConfig[] = [
  {
    key: "location",
    type: "multi-checkbox-remote",
    label: "مکان",
    fetcher: async ({ search = "", page = 1 }) => {
      const res = await api.get("/knowledge/location/", {
        params: {
          search,
          page,
        },
      });

      return {
        results: res.data.results.map((item: any) => ({
          label: item.title, // 👈 از API
          value: String(item.id), // 👈 از API
        })),
        next: res.data.next ? page + 1 : null,
      };
    },
  },
  {
    key: "start_date__gte",
    type: "Date",
    label: "تاریخ شروع",
  },
  {
    key: "end_date__lte",
    type: "Date",
    label: "تاریخ پایان",
  },
];

import { jalaliToGregorian } from "@/utils/date";

export const getExhi = async (params: any) => {
  const res = await api.get("/knowledge/exhibition/", {
    params,
    paramsSerializer: { indexes: false },
  });

  let nextPage: number | null = null;

  if (res.data.next) {
    try {
      const url = new URL(res.data.next);
      const page = url.searchParams.get("page");
      nextPage = page ? Number(page) : null;
    } catch {
      nextPage = null;
    }
  }

  return {
    results: res.data.results,
    next: nextPage,
  };
};
