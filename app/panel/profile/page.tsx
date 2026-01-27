"use client";

import Item from "@/component/panel/profile/Item";
import { useAuthStore } from "@/stores/auth.store";
import { logoutRequest } from "@/services/auth";
import { getCookie } from "cookies-next";

function Profile() {
  const user = useAuthStore((s) => s.user);

  // const handleLogout = async () => {
  // try {
  //   const refreshToken = await getCookie('refresh_token')
  //   await logoutRequest(refreshToken);
  //   console.log(refreshToken)
  // } catch {
  //   // حتی اگر بک‌اند خطا بده
  // } finally {
  //   logout(); // zustand
  //   // window.location.href = "/Login";
  // }



  return (
    <div className="grid lg:grid-cols-2 gap-7 items-center">
      <Item variant="profile" phone={user?.phone}>
        {user?.name}
      </Item>

      <Item variant="subscribe" subscription={false}>
        نیما محمدپور
      </Item>

      <Item variant="primary" icon="/image/tr.svg">
        دوره های من
      </Item>

      <Item variant="primary" icon="/image/messages-2.svg">
        مشاوره های من
      </Item>

      <Item variant="primary" icon="/image/bookmark-2.svg">
        تعرفه های نشان شده
      </Item>

      {/* 🔴 Logout */}
      <Item variant="primary" icon="/image/exit.svg" >
        خروج از حساب کاربری
      </Item>
    </div>
  );
}

export default Profile;
