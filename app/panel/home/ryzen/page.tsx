
"use client";
import DataListWithFilters from "@/component/panel/common/DataListWithFilters";
import NoItem from "@/component/Error/no-item";
import Item from "@/component/panel/home/ryzen/item";
import api from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";

export const getCountry = async (
  params: any
): Promise<{ results: Country[]; next: number | null }> => {
  const res = await api.get("/core/country/?is_ryzen=true", {
    params,
    paramsSerializer: { indexes: false },
  });

  let nextPage: number | null = null;

  if (res.data.next) {
    try {
      const url = new URL(res.data.next);
      const pageParam = url.searchParams.get("page");
      nextPage = pageParam ? Number(pageParam) : null;
      if (nextPage !== null && isNaN(nextPage)) nextPage = null;
    } catch {
      nextPage = null;
    }
  }

  return {
    results: Array.isArray(res.data.results) ? res.data.results : [],
    next: nextPage,
  };
};


interface Country {
  id: number;
  name: string;
  image: string | null;
}



export default function ConsultantsPage() {

  const user = useAuthStore((s) => s.user);


  return (
    user?.has_active_subscription ? 
    <DataListWithFilters<Country>
      NoFilter
      grid4
      queryKey="Mentor"
      fetcher={getCountry}
      searchPlaceholder="جستجو در دانستی و ..."
      emptyComponent={<NoItem />}
      renderItem={(item, search) => (
        <Item
          key={item.id}
          link={`/panel/home/ryzen/${item.id}`}
          name={item.name}
          image={item.image || "/image/default.png"}
        />
      )}
    />:<NoItem />
  );
}
