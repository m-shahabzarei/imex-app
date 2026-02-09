"use client";

import Item from "@/component/panel/course/Item";
import { ICourse } from "@/component/panel/course/type";
import NoItem from "@/component/Error/no-item";
import DataListWithFiltersSimple from "@/component/panel/common/DataListWithFiltersSimple";
import { CoursesFilters, getCourse } from "./courses.filters";
import api from "@/lib/api";
import DataListWithFilters from "@/component/panel/common/DataListWithFilters";
import HighlightText from "@/component/panel/common/HighlightText";


export default function Course() {
  return (
    <DataListWithFilters<ICourse>
       gridS
      queryKey="blogs"
      fetcher={getCourse}
      filtersConfig={CoursesFilters}
      searchPlaceholder="جستجو در دانستی و ..."
      emptyComponent={<NoItem />}
      renderItem={(item, search) => (
        <Item
          key={item.id}
          id={item.id}
          title={<HighlightText text={item.title} highlight={search} />}
          description={<HighlightText text={item.description} highlight={search} />}
          image={item.image}
          time={item.time}
          price={item.price}
          teacher={item.teacher}
          link={item.link}
          owner={item.owner}
          price_discount={item.price_discount}
          type={item.type}
        />
      )}
    />
  );
}
