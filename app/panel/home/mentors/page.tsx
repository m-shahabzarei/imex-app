"use client"
import Item from "@/component/panel/home/mentors/Item";
import { Imentor } from "@/component/panel/home/mentors/type";
import DataListWithFilters from "@/component/panel/common/DataListWithFilters";
import { getMentor, MentorsFilters } from "./mentors.filters";
import NoItem from "@/component/Error/no-item";
import HighlightText from "@/component/panel/common/HighlightText";

export default function ConsultantsPage() {


  return (
    <DataListWithFilters<Imentor>
      queryKey="blogs"
      fetcher={getMentor}
      filtersConfig={MentorsFilters}
      searchPlaceholder="جستجو در دانستی و ..."
      emptyComponent={<NoItem />}
      renderItem={(item, search) => (
        <Item
          key={item.id}
          image={item.image}
          name={<HighlightText text={item.full_name} highlight={search} />}
          group={item.product_group?.title}
          progress={item.process.title}
          country={item.country.name}
          link={`/panel/home/mentors/${item.id}`}
        />
      )}
    />
  );
}
