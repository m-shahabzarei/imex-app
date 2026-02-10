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

];

