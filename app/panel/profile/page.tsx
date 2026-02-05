"use client";

import { useState } from "react";
import Item from "@/component/panel/profile/Item";
import { useAuthStore } from "@/stores/auth.store";

function Profile() {
  const user = useAuthStore((s) => s.user);
  const setUserName = useAuthStore((s) => s.setUserName);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");

  if (!user) return null;

  const fullName =
    firstName || lastName ? `${firstName} ${lastName}` : "نام وارد نشده";

  const handleSaveName = () => {
    setUserName(firstName, lastName);
    setIsEditing(false);
  };



  console.log(user.has_active_subscription)
  return (
    <div className="grid lg:grid-cols-2 gap-7 items-center">

      <Item
        variant="profile"
        phone={user.username}
      >
        {fullName}
      </Item>

      {isEditing && (
        <div className="flex flex-col gap-3 col-span-2">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="نام"
            className="p-3 rounded-lg border"
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="نام خانوادگی"
            className="p-3 rounded-lg border"
          />

          <button
            onClick={handleSaveName}
            className="bg-blue-600 text-white rounded-lg py-2"
          >
            ذخیره
          </button>
        </div>
      )}

      <Item
        variant="subscribe"
        subscription={user.has_active_subscription}
        link="/panel/profile/subscribe"
        day={user.is_active_date}
      >
        {user.has_active_subscription
          ? "اشتراک فعال"
          : "فاقد اشتراک"}
      </Item>

      <Item link="/panel/profile/myCourses" variant="primary" icon="/image/messages-2.svg">
        مشاوره های من
      </Item>

      <Item link="/panel/profile/myTariffs" variant="primary" icon="/image/bookmark-2.svg">
        تعرفه های نشان شده
      </Item>

      <Item variant="primary" icon="/image/exit.svg">
        خروج از حساب کاربری
      </Item>
    </div>
  );
}

export default Profile;
