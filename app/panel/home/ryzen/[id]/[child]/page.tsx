"use client";
import InfoBox from "@/component/panel/book/tariffs/InfoBox";
import LoadingSpinner from "@/component/ui/Loading";
import api from "@/lib/api";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface IData {
  id: number;
  image: string;
  title: string;
  description: string;
  phone1: string;
  phone2: string;
  email: string;
  site_address: string;
  published_at: any;
  head: string;
  html_text: string;
  file: any;
  category: Category;
  type: string;
  country: number;
  link: any;
  title_link: any;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  title: string;
  type: string;
}

export default function Page() {
  const { child } = useParams();
  const [data, setData] = useState<IData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!child) return;
    // اصلاح: استفاده از child به جای id در آدرس و وابستگی
    api
      .get(`https://api.imexapp.ir/knowledge/business-knowledge/${child}/`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [child]);

  if (loading) return <LoadingSpinner />;

  if (!data) return <div className="text-center py-10">اطلاعاتی یافت نشد</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* کانتینر اصلی گرید - در موبایل تک ستون، در دسکتاپ دو ستون */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ستون اول: کارت پروفایل (تصویر ۱) */}
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-lg border border-gray-100 p-6 flex flex-col ">
            {/* تصویر پرچم/عکس */}
            <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden rounded-2xl shadow-sm">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
              />
            </div>

            {/* عنوان (نام) */}
            <h1 className="text-xl sm:text-xl font-bold text-blue-800 mb-2 text-right">
              {data.title}
            </h1>

            {/* دسته‌بندی (مثلا: رایزن) */}
            <span className="text-gray-400 text-sm mb-2 font-medium">
              {data.category?.title}
            </span>

            {/* توضیحات کوتاه (مثلا: رایزن کشور ارمنستان) */}
            <h1 className="text-xl text-gray-800 mb-2 text-right ">
              {data.head}
            </h1>

            {/* بخش آدرس - طبق عکس انگلیسی و چپ‌چین است */}
            <div className="w-full pt-2 border-t border-gray-100">
              <div
                className="text-gray-500 text-xs text-right whitespace-pre-line"
                dir="ltr"
              >
                {data.description}
              </div>
            </div>
          </div>

          {/* ستون دوم: اطلاعات تماس (تصویر ۲) */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-6 text-right border-b pb-4 border-gray-100">
              اطلاعات تماس
            </h3>

            <div className="flex flex-col gap-4">
              {/* شماره تماس ۱ */}
              {data.phone1 && (
                <InfoBox
                  label="تلفن"
                  // استفاده از پروتکل tel: برای باز کردن شماره‌گیر
                  value={
                    <a
                      href={`tel:${data.phone1}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors block text-left"
                      dir="ltr"
                    >
                      {data.phone1}
                    </a>
                  }
                  variant={"single"}
                />
              )}

              {/* شماره تماس ۲ */}
              {data.phone2 && (
                <InfoBox
                  label="تلفن"
                  value={
                    <a
                      href={`tel:${data.phone2}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors block text-left"
                      dir="ltr"
                    >
                      {data.phone2}
                    </a>
                  }
                  variant={"single"}
                />
              )}

              {/* ایمیل */}
              {data.email && (
                <InfoBox
                  label="ایمیل"
                  // استفاده از پروتکل mailto: برای باز کردن برنامه ایمیل
                  value={
                    <a
                      href={`mailto:${data.email}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors block text-left break-all"
                      dir="ltr"
                    >
                      {data.email}
                    </a>
                  }
                  variant={"single"}
                />
              )}

              {/* وب‌سایت */}
              {data.site_address && (
                <InfoBox
                  label="وبسایت"
                  value={
                    <a
                      // بررسی می‌کنیم اگر آدرس با http شروع نشده، به آن اضافه شود
                      href={
                        data.site_address.startsWith("http")
                          ? data.site_address
                          : `https://${data.site_address}`
                      }
                      target="_blank" // باز شدن در تب جدید
                      rel="noopener noreferrer" // مسائل امنیتی
                      className="text-blue-600 hover:text-blue-800 transition-colors block text-left break-all"
                      dir="ltr"
                    >
                      {data.site_address}
                    </a>
                  }
                  variant={"single"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
