

"use client";

import DataListWithFilters from "@/component/panel/common/DataListWithFilters";
import HighlightText from "@/component/panel/common/HighlightText";
import { getBlog } from "../../blog/blogs.filters"
import { BlogsFilters } from "../../blog/blogs.filters";

export default function BlogsPage() {
  const fetchBlogs = async (params: any) => {
    return getBlog(params);
  };

  return (
    <DataListWithFilters
      queryKey="blogs"
      fetcher={fetchBlogs}
      filtersConfig={BlogsFilters}
      searchPlaceholder="جستجوی مقاله..."
      renderItem={(item: any, search) => (
        <div key={item.id}>
          <HighlightText
            text={item.title}
            highlight={search}
          />
        </div>
      )}
    />
  );
}
