// filters/consultants.filters.ts
import { FilterConfig } from "@/component/panel/common/Filter/type";
import { Imentor } from "@/component/panel/home/mentors/type";
import api from "@/lib/api";

export const MentorsFilters: FilterConfig[] = [
 {
  key: "product_group",
  type: "multi-checkbox-remote",
  label: "گروه محصولات",
  fetcher: async ({ search = "", page = 1 }) => {
    const res = await api.get("/users/consultant-product-groups/", {
      params: {
        search,
        page,
      },
    });

    return {
      results: res.data.results.map((item: any) => ({
        label: item.title,          
        value: String(item.id),    
      })),
      next: res.data.next ? page + 1 : null,
    };
  },
},
{
  key: "country",
  type: "multi-checkbox-remote",
  label: "کشور",
  fetcher: async ({ search = "", page = 1 }) => {
    const res = await api.get("/core/country/", {
      params: {
        search,
        page,
      },
    });

    return {
      results: res.data.results.map((item: any) => ({
        label: item.name,          
        value: String(item.id),    
      })),
      next: res.data.next ? page + 1 : null,
    };
  },
},
{
  key: "process",
  type: "multi-checkbox-remote",
  label: "فرایند",
  fetcher: async ({ search = "", page = 1 }) => {
    const res = await api.get("/users/consultant-processes/", {
      params: {
        search,
        page,
      },
    });

    return {
      results: res.data.results.map((item: any) => ({
        label: item.title,         
        value: String(item.id),    
      })),
      next: res.data.next ? page + 1 : null,
    };
  },
}

];


export const getMentor = async (params: any): Promise<{ results: Imentor[]; next: number | null }> => {
  const res = await api.get("/users/consultants/", {
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
