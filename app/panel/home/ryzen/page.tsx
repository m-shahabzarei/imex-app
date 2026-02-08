

"use client";
import DataListWithFilters from "@/component/panel/common/DataListWithFilters";
import NoItem from "@/component/Error/no-item";
import HighlightText from "@/component/panel/common/HighlightText";
import Item from "@/component/panel/home/ryzen/item";
import api from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";

const getMentor = async (params: any) => {
  const res = await api.get("/core/country/?is_ryzen=true", {
    params,
    paramsSerializer: {
      indexes: false,
    },
  });

  let nextPage = null;

  if (res.data.next) {
    try {
      const url = new URL(res.data.next);
      nextPage = url.searchParams.get("page");
    } catch {
      nextPage = null;
    }
  }

  return {
    results: res.data.results,
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
      fetcher={getMentor}
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
