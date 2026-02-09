"use client";
import { Iexhibition } from "@/component/panel/home/exhibition/type";
import Item from "@/component/panel/home/exhibition/Item";
import DataListWithFilters from "@/component/panel/common/DataListWithFilters";
import NoItem from "@/component/Error/no-item";
import HighlightText from "@/component/panel/common/HighlightText";
import { ExhibitionFilters, getExhi } from "./exhibition.filters";
import { useAuthStore } from "@/stores/auth.store";

export default function ConsultantsPage() {
  const user = useAuthStore((s) => s.user);



  
  return (
          user?.has_active_subscription ? 
    <DataListWithFilters<Iexhibition>
      queryKey="Exhibition"
      fetcher={getExhi}
      filtersConfig={ExhibitionFilters}
      searchPlaceholder="جستجو در دانستی و ..."
      emptyComponent={<NoItem />}
      renderItem={(item, search) => (
        <Item
          key={item.id}
          title={<HighlightText text={item.title} highlight={search} />}
          end_date={item.end_date}
          start_date={item.start_date}
          image={item.image}
          link={`/panel/home/exhibition/${item.id}`}
          location={item.location?.title}
          type={item.type}
          days_until_start={item.days_until_start}
        />
      )}
    /> : <NoItem />
  );
}
