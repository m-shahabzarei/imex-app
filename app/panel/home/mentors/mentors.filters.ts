// filters/consultants.filters.ts
import { FilterConfig } from "@/component/panel/common/Filter/type";
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
        label: item.title,          // 👈 از API
        value: String(item.id),    // 👈 از API
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
        label: item.name,          // 👈 از API
        value: String(item.id),    // 👈 از API
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
        label: item.title,          // 👈 از API
        value: String(item.id),    // 👈 از API
      })),
      next: res.data.next ? page + 1 : null,
    };
  },
}

];



export const getMentor = async (params: any) => {
  const res = await api.get("/users/consultants/", {
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


