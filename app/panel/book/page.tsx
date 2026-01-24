"use client";

import Item from "@/component/panel/book/Item";

function Book() {
  return (
    <div className="flex flex-col gap-4">
      <Item icon="/image/bill1.svg" link="/panel/book/rules">
        مقررات و آیین نامه ها
      </Item>
      <Item icon="/image/Ticket_20Sale.svg" link="/panel/book/tariffs">
        تعرفه ها
      </Item>
      <Item icon="/image/document11.svg" link="/panel/book/zamem">
        ضمائم
      </Item>
    </div>
  );
}

export default Book;
