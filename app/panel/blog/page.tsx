
"use client";

import Item from "@/component/panel/blog/Item";
import NoItem from "@/component/Error/no-item";
import HighlightText from "@/component/panel/common/HighlightText";
import DataListWithFilters from "@/component/panel/common/DataListWithFilters";
import { BlogsFilters , getBlog, loadBlogsFilterOptions } from "./blogs.filters";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import NoSub from "@/component/panel/profile/subscription/no-sub";

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

    const user = useAuthStore((s) => s.user);
  

useEffect(() => {
  loadBlogsFilterOptions();
}, []);


 return (
  user?.has_active_subscription ? 
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
    : <><NoSub /></>
  );
 
 
}
