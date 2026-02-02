// filters/consultants.filters.ts
import api from "@/lib/api";
import { FilterConfig } from "../../../component/panel/common/Filter/type"


export const CoursesFilters: FilterConfig[] = [
  {
    key: "",
    type: "multi-checkbox",
    label: "نوع آموزش",
    options: [
      { label: "آنلاین", value: "2" },
      { label: "آفلاین", value: "3" },
      { label: "مراکز آموزشی", value: "3" },
    ],
  },
]

  

export const getCourse = async (params: any) => {
  const res = await api.get("/knowledge/course", {
    params,
    paramsSerializer: {
      indexes: false,
    },
  });

  return {
    results: res.data.results,
  };
};