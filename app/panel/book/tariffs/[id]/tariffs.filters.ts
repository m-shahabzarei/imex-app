// filters/consultants.filters.ts
import { FilterConfig } from "@/component/panel/common/Filter/type";
import api from "@/lib/api";

export const TariffFilters: FilterConfig[] = [
  {
    key: "type",
    type: "multi-checkbox",
    label: "نوع",
    options: [
      {
        label: "واردات",
        value: "import",
      },
      {
        label : "صادرات",
        value : "export"
      }
    ],
  },
//   {
//     key: "start_date__gte",
//     type: "Date",
//     label: "تاریخ شروع",
//   },
//   {
//     key: "end_date__lte",
//     type: "Date",
//     label: "تاریخ پایان",
//   },
];

// export const getExhi = async (params: any) => {
//   const res = await api.get("/knowledge/exhibition/", {
//     params,
//     paramsSerializer: { indexes: false },
//   });

//   let nextPage: number | null = null;

//   if (res.data.next) {
//     try {
//       const url = new URL(res.data.next);
//       const page = url.searchParams.get("page");
//       nextPage = page ? Number(page) : null;
//     } catch {
//       nextPage = null;
//     }
//   }

//   return {
//     results: res.data.results,
//     next: nextPage,
//   };
// };
