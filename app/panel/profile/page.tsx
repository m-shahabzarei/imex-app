"use client";

import { useState } from "react";
import Item from "@/component/panel/profile/Item";
import { useAuthStore } from "@/stores/auth.store";
import Button from "@/component/ui/Button";
import { logout, setName } from "@/services/auth";

function Profile() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const [isEditing, setIsEditing] = useState(false);
  const [lastName, setLastName] = useState(user?.last_name || "");

  if (!user) return null;

  const handleSaveName = async () => {
    const updatedUser = {
      ...user,
      last_name: lastName,
    };

    setUser(updatedUser);

    await setName(user.id, lastName);

    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      handleSaveName();
    }
  };

  const logoutHandle = async () => {
    await logout(useAuthStore.getState().refreshToken);
    useAuthStore.getState().logout();
    window.location.href = "/login";
    // useAuthStore.getState().setRefreshToken()
  };

  return (
    <div className="grid lg:grid-cols-2 gap-7 items-center">
      {/* پروفایل */}
      <Item
        variant="profile"
        onClick={() => setIsEditing(true)}
        phone={user.username}
      >
        {user.last_name}
      </Item>

      {isEditing && (
        <div
          className="fixed inset-0 z-2000 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-xs"
          onClick={() => setIsEditing(false)} 
        >
          <div
            className="
      w-full md:w-[420px]
      bg-white
      rounded-t-2xl md:rounded-2xl
      p-6
      animate-slideUp md:animate-fadeIn
    "
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center text-custom2 text-lg font-bold mb-4">
              ویرایش اطلاعات
            </h2>

            <label className="text-sm text-gray-600 mb-1 block">
              نام و نام خانوادگی
            </label>

            <input
              onKeyDown={handleKeyDown}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-lg p-3 focus:outline-none bg-gray-100 border-0"
            />

            <div className="flex gap-3 mt-6">
              <Button variant="glassy" onClick={() => setIsEditing(false)}>
                انصراف
              </Button>
              <Button variant="secondary" onClick={handleSaveName}>
                ذخیره
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* اشتراک */}
      <Item
        variant="subscribe"
        subscription={user.has_active_subscription}
        link="/panel/profile/subscribe"
        day={user.is_active_date}
      >
        {user.has_active_subscription ? "اشتراک فعال" : "فاقد اشتراک"}
      </Item>

      <Item
        link="/panel/profile/myMentor"
        variant="primary"
        icon="/image/messages-2.svg"
      >
        مشاوره های من
      </Item>

      <Item
        link="/panel/profile/myTariffs"
        variant="primary"
        icon="/image/bookmark-2.svg"
      >
        تعرفه های نشان شده
      </Item>

      <Item onClick={logoutHandle} variant="primary" icon="/image/exit.svg">
        خروج از حساب کاربری
      </Item>
    </div>
  );
}

export default Profile;
