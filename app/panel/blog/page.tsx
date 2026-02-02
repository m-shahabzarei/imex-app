// "use client";

// import NoItem from "@/component/Error/no-item";
// import Item from "@/component/panel/blog/Item";
// import Filters from "@/component/panel/common/Filter/Filter";
// import InfiniteLoader from "@/component/panel/common/InfiniteLoader";
// import InfiniteScrollTrigger from "@/component/panel/common/InfiniteLoader";
// import Search from "@/component/panel/common/Search";
// import LoadingSpinner from "@/component/ui/Loading";
// import { useInfiniteDataList } from "@/hooks/useInfiniteDataList";
// import { useInfiniteSearchList } from "@/hooks/useInfiniteSearchList";
// import api from "@/lib/api";
// import { useState } from "react";
// import { BlogsFilters } from "./blogs.filters";

// interface Iitem {
//   id: number;
//   title: string;
//   image: string;
//   description: string;
//   category: {
//     title: string;
//   };
// }

// const getUsersInfinite = async ({
//   search,
//   page,
// }: {
//   search: string;
//   page: number;
// }) => {
//   const res = await api.get("/knowledge/business-knowledge/", {
//     params: {
//       search,
//       page,
//     },
//   });

//   return {
//     results: res.data.results,
//     next: res.data.next, // number | null
//   };
// };

// export default function Page() {
//   const {
//     data,
//     params,
//     fetchNextPage,
//     hasNextPage,
//     setParams,
//     isFetchingNextPage,
//   } = useInfiniteDataList("consultants", getBlogs);

//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   const allResults = data?.pages.flatMap((page) => page.results) || [];

//   return (
    // <div className="max-md:pb-4">
    //   <Search
    //     variant="secondary"
    //     placeholder="جستجوی مشاور..."
    //     value={params.search || ""}
    //     onChange={(value) => setParams({ search: value })}
    //     onClick={() => setIsFilterOpen(true)}
    //   />

    //   <Filters
    //     config={BlogsFilters}
    //     open={isFilterOpen}
    //     onClose={() => setIsFilterOpen(false)}
    //   />
    //               <div>
    //     {isLoading ? (
    //       <LoadingSpinner />
    //     ) : (
    //       allResults.length == 0 ? <NoItem />
    //       : (
    //         <div className="grid lg:grid-cols-2 gap-8 pb-6 mt-4">
    //         {data?.pages.flatMap((page) =>
    //           page.results.map((item: any) => (
    //             <Item
    //               key={item.id}
    //               image={item.image}
    //               title={item.title}
    //               description={item.description}
    //               category={item.category?.title}
    //               link={`/panel/blog/${item.id}`}
    //               query={query}
    //             />
    //           ))
    //         )}
    //       </div>
    //       )
    //     )
    //     }

    //     {isFetchingNextPage && (
    //       <LoadingSpinner />
    //     )}

    //     <InfiniteLoader
    //       onLoadMore={fetchNextPage}
    //       hasNextPage={hasNextPage}
    //       isFetchingNextPage={isFetchingNextPage}
    //     />

    //   </div>

    // </div>
//   );
// }

"use client";

import Item from "@/component/panel/blog/Item";
import NoItem from "@/component/Error/no-item";
import HighlightText from "@/component/panel/common/HighlightText";
import DataListWithFilters from "@/component/panel/common/DataListWithFilters";
import { BlogsFilters , getBlog, loadBlogsFilterOptions } from "./blogs.filters";
import { useEffect } from "react";

interface BlogItem {
  id: number;
  title: string;
  image: string;
  description: string;
  category?: {
    title: string;
  };
}


export default function BlogsPage() {

useEffect(() => {
  loadBlogsFilterOptions();
}, []);

  return (
    <DataListWithFilters<BlogItem>
      queryKey="blogs"
      fetcher={getBlog}
      filtersConfig={BlogsFilters}
      searchPlaceholder="جستجو در دانستی و ..."
      emptyComponent={<NoItem />}
      renderItem={(item, search) => (
        <Item
          key={item.id}
          image={item.image}
          title={<HighlightText text={item.title} highlight={search} />}
          description={<HighlightText text={item.description} highlight={search} />}
          category={item.category?.title}
          link={`/panel/blog/${item.id}`}
        />
      )}
    />
  );
}
