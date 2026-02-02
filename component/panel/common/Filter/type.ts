
// components/filters/types.ts

export type FilterType =
  | "select"
  | "checkbox"
  | "multi-checkbox"
  | "multi-checkbox-remote"
  | "Date";

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface FilterConfig {
  key: string;                 // query param key
  label?: string;
  type: FilterType;
  options?: FilterOption[];    // برای multi-checkbox
  separator?: "," | null;      // اگر backend comma-separated می‌خواد
    // فقط برای remote
  fetcher?: (params: {
    search?: string;
    page?: number;
  }) => Promise<{
    results: { label: string; value: string }[];
    next: number | null;
  }>;

}

export interface FilterConfig {
  key: string;          // query param key
  label?: string;
  type: FilterType;
  options?: FilterOption[];

  /** فقط برای date-range */
  fromKey?: string;     // start_date
  toKey?: string;       // end_date
}


export interface ConsultantFiltersValue {
  location?: string;
  start_date?: string;
  end_date?: string;
  consultant_id?: number;
}
