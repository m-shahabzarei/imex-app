"use client";

import { ReactNode, useState } from "react";
import Search from "@/component/panel/common/Search";
import Filters from "@/component/panel/common/Filter/Filter";
import InfiniteLoader from "@/component/panel/common/InfiniteLoader";
import LoadingSpinner from "@/component/ui/Loading";
import { useInfiniteDataList } from "@/hooks/useInfiniteDataList";
import { FilterConfig } from "@/component/panel/common/Filter/type";

interface Props<T> {
  queryKey: string;
  fetcher: (params: any) => Promise<{
    results: T[];
    next: number | null;
  }>;
  filtersConfig?: FilterConfig[];
  searchPlaceholder?: string;
  renderItem: (item: T, search?: string) => ReactNode;
  emptyComponent?: ReactNode;
  grid4?:boolean;
  grid1?:boolean;
}

export default function DataListWithFilters<T>({
  queryKey,
  fetcher,
  filtersConfig = [],
  searchPlaceholder = "جستجو...",
  renderItem,
  grid4,
  grid1,
  emptyComponent,
}: Props<T>) {
  const {
    data,
    params,
    setParams,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteDataList(queryKey, fetcher);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const allResults = data?.pages.flatMap((p) => p.results) || [];

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
        ) : allResults.length === 0 ? (
          emptyComponent ?? null
        ) : (
          <div className={`grid ${grid4 ? "lg:grid-cols-4 max-md:grid-cols-3" : grid1 ? "" : "md:grid-cols-2"} gap-7 md:pb-4`}>
            {allResults.map((item: T) =>
              renderItem(item, params.search)
            )}
          </div>
        )}

        {/* Fetching next page */}
        {isFetchingNextPage && <LoadingSpinner />}

        {/* Infinite loader */}
        <InfiniteLoader
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
}
