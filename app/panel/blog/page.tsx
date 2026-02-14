"use client";

import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import DataListWithFilters from "@/component/panel/common/DataListWithFilters";
import { BlogsFilters, getBlog } from "./blogs.filters";
import NoItem from "@/component/Error/no-item";
import Item from "@/component/panel/blog/Item";
import HighlightText from "@/component/panel/common/HighlightText";
import NoSub from "@/component/panel/profile/subscription/no-sub";


 export interface BlogItem {
  id: number;
  title: string;
  image?: string;
  description: string;
  category?: {
    title: string;
  };
}

export default function BlogsPage() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);

  if (!user?.has_active_subscription) {
    return <NoSub />;
  }

  return (
    <DataListWithFilters
      key={pathname} 
      queryKey={["blogs"]}
      fetcher={getBlog}
      filtersConfig={BlogsFilters}
      searchPlaceholder="جستجو در دانستی و ..."
      emptyComponent={<NoItem />}
      renderItem={(item, search) => (
        <Item
          key={item.id}
          image={item.image ?? ""}
          title={<HighlightText text={item.title} highlight={search} />}
          description={
            <HighlightText text={item.description} highlight={search} />
          }
          category={item.category?.title}
          link={`/panel/blog/${item.id}`}
        />
      )}
    />
  );
}
