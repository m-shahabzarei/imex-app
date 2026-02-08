"use client";

import Item from "@/component/panel/book/Item";
import DateFilter from "@/component/panel/common/DateFilter/DateFilter";
import NoSub from "@/component/panel/profile/subscription/no-sub";
import { useAuthStore } from "@/stores/auth.store";

function Book() {

    const user = useAuthStore((s) => s.user);


  return (
   user?.has_active_subscription ?  
   <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-500 ">سال اطلاعات مندرج:</span>
        <div>
          <DateFilter />
        </div>
      </div>
      <Item icon="/image/bill1.svg" link="/panel/book/rules">
        مقررات و آیین نامه ها
      </Item>
      <Item icon="/image/Ticket_20Sale.svg" link="/panel/book/tariffs">
        تعرفه ها
      </Item>
      <Item icon="/image/document11.svg" link="/panel/book/zamem">
        ضمائم
      </Item>
    </div> : <><NoSub /></>
  );
}

export default Book;
