// filters/consultants.filters.ts
import api from "@/lib/api";
import { FilterConfig } from "../../../component/panel/common/Filter/type"


export const BlogsFilters: FilterConfig[] = [
  {
    key: "category_id",
    type: "multi-checkbox",
    label: "نوع",
    options: [
      // { label: "اخبار", value: "2" },
      // { label: "خلاصه کتاب", value: "3" },
    ],
  }
];


export const loadBlogsFilterOptions = async () => {
  const res = await api.get("/knowledge/category/?search=&page=1&type=business");

  const categories = res.data.results.map((item: any) => ({
    label: item.title,
    value: String(item.id),
  }));

  const categoryFilter = BlogsFilters.find(
    (f) => f.key === "category_id"
  );

  if (categoryFilter) {
    categoryFilter.options = categories;
  }
};


export const getBlog = async (params: any) => {
  const res = await api.get("/knowledge/business-knowledge", {
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


