"use client";
import { Iexhibition } from "@/component/panel/home/exhibition/type";
import Item from "@/component/panel/home/exhibition/Item";
import DataListWithFilters from "@/component/panel/common/DataListWithFilters";
import NoItem from "@/component/Error/no-item";
import HighlightText from "@/component/panel/common/HighlightText";
import { ExhibitionFilters, getExhi } from "./exhibition.filters";

export default function ConsultantsPage() {
  return (
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
        />
      )}
    />
  );
}
