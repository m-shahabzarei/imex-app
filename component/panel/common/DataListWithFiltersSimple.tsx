"use client";

import { ReactNode, useState } from "react";
import Search from "@/component/panel/common/Search";
import Filters from "@/component/panel/common/Filter/Filter";
import LoadingSpinner from "@/component/ui/Loading";
import { useQueryParams } from "@/hooks/useQueryParams";
import { FilterConfig } from "@/component/panel/common/Filter/type";

interface Props<T> {
  fetcher: (params: any) => Promise<T[]>;
  filtersConfig?: FilterConfig[];
  searchPlaceholder?: string;
  renderItem: (item: T, search?: string) => ReactNode;
  emptyComponent?: ReactNode;
  gird4?:boolean;
}

export default function DataListWithFiltersSimple<T>({
  fetcher,
  filtersConfig = [],
  searchPlaceholder = "جستجو...",
  renderItem,
  emptyComponent,
  gird4,
}: Props<T>) {
  const { params, setParams } = useQueryParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data, isLoading, error } = fetcher(params) as any;

  return (
    <div className="max-md:pb-4 relative">
      {/* Search */}
      <Search
        variant="secondary"
        placeholder={searchPlaceholder}
        value={params.search || ""}
        onChange={(value) => setParams({ search: value })}
        onClick={() => setIsFilterOpen(true)}
      />

      {/* Filters */}
      {filtersConfig.length > 0 && (
        <Filters
          config={filtersConfig}
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      )}

      {/* Content */}
      <div className="mt-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <LoadingSpinner error={error} />
        ) : !data || data.length === 0 ? (
          emptyComponent ?? null
        ) : (
          <div className={`grid lg:grid-cols-2 gap-7 md:pb-4`}>
            {data.map((item: T) =>
              renderItem(item, params.search)
            )}
          </div>
        )}
      </div>
    </div>
  );
}
