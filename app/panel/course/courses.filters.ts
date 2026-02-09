// filters/consultants.filters.ts
import api from "@/lib/api";
import { FilterConfig } from "../../../component/panel/common/Filter/type"
import { ICourse } from "@/component/panel/course/type";


export const CoursesFilters: FilterConfig[] = [
  {
    key: "",
    type: "multi-checkbox",
    label: "نوع آموزش",
    options: [
      { label: "آنلاین", value: "2" },
      { label: "آفلاین", value: "3" },
      { label: "مراکز آموزشی", value: "4" },
    ],
  },
]

  


export const getCourse = async (params: any): Promise<{ results: ICourse[]; next: number | null }> => {
  const res = await api.get("/knowledge/course", {
    params,
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
