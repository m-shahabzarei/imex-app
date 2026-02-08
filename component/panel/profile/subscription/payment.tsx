"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SubscriptionService } from "@/services/auth";

function Payment() {
  const [basePrice, setBasePrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [validCoupon, setValidCoupon] = useState(false);

  useEffect(() => {
    SubscriptionService.getLast().then((res) => {
      setBasePrice(res.data.detail.price);
      // setFinalPrice(res.data.final_price);
    });
  }, []);

  const applyCoupon = async () => {
    if (!coupon) return;

    setCouponLoading(true);
    setCouponError(null);

    try {
      const res = await SubscriptionService.validateCoupon(coupon);

      setBasePrice(res.data.detail);

      setCoupon(coupon);
      setValidCoupon(true);
      setIsCouponOpen(false);
    } catch {
      setCouponError("کد تخفیف نامعتبر است");
      setValidCoupon(false);
    } finally {
      setCouponLoading(false);
    }
  };

  const payHandler = async () => {
    setLoading(true);
    const res = await SubscriptionService.createSubscription(
      validCoupon ? coupon : undefined
    );

    window.location.href = res.data.url;
  };

  console.log(basePrice);

  return (
    <div className="bg-linear-to-b from-[#5764EF] to-[#3E47AD] w-screen h-screen flex max-md:flex-col items-center justify-center gap-11">
      {/* سمت چپ */}
      <div className="flex flex-col items-center gap-3">
        <Image src="/image/image 1.png" width={220} height={200} alt="image" />
        <h1 className="text-white text-3xl">اشتراک سالانه ایمکس</h1>
        <h1 className="text-white text-lg opacity-80">
          از امروز تا پایان سال جاری
        </h1>
      </div>

      {/* سمت راست */}
      <div>
        <div className="w-90 border-white p-3 text-white border-[0.5px] rounded-xl">
          <h1 className="text-center mb-2 text-white">مزایای اشتراک ایمکس</h1>
          <p className="text-xs opacity-60 text-white">
            <ul>
              <li>
                دسترسی آسان و سریع به تعرفه های کتاب مقررات صادرات و واردات سال
                ۱۴۰۴ و سال‌های گذشته
              </li>
              <li>
                جستجوی آسان و پیشرفته بر اساس قسمتی از عنوان تعرفه، کد و یا دسته
                بندی کالا
              </li>
              <li>
                به روز بودن نرخ تعرفه‌ها و اعلام زمان تغییر نرخ تعرفه‌ها و سایر
                تغییرات مرتبط
              </li>
              <li>
                دسترسی به آخرین نسخه به روز ، از قوانین ،دستور العمل‌ها و
                آیین‌نامه‌های تجاری{" "}
              </li>
              <li>
                مشاهده همزمان اطلاعات تجاری هر کد کالای منتخب اعم از میزان
                صادرات و واردات همچنین ارزش صادرات و واردات و میانگین ارزش
                تقریبی آن
              </li>
              <li>
                بررسی بازارهای هدف صادراتی، برای صادرات کالای مد نظر و کشورهایی
                که امکان واردات آن‌کالا از آنها میسر بوده است{" "}
              </li>
            </ul>
          </p>
        </div>

        <div className="mt-3 w-full flex gap-3">
          <button
            onClick={payHandler}
            disabled={loading}
            className="bg-white text-[#5764EF] w-2/3 rounded p-2 text-center flex items-center justify-evenly disabled:opacity-50"
          >
            <span>پرداخت</span>
            {basePrice}
          </button>

          <span
            onClick={() => setIsCouponOpen(true)}
            className="w-1/3 bg-[#5764ef34] p-2 focus:outline-none text-center text-white placeholder:text-[#5764EF] border-[#5764EF] rounded"
          >
            کدتخفیف
          </span>
        </div>

        {error && <p className="text-red-300 text-sm mt-2">{error}</p>}

        {isCouponOpen && (
 <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40">
            <div
              className="
        w-full md:w-[420px]
        bg-white
        rounded-t-2xl md:rounded-2xl
        p-6
        animate-slideUp md:animate-fadeIn
      "
            >
              <h2 className="text-center text-custom2 text-lg font-bold mb-4">
                افزودن کد تخفیف
              </h2>

              <label className="text-sm text-gray-600 mb-1 block">
                کد تخفیف
              </label>

              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="w-full border rounded-lg p-3 focus:outline-none bg-gray-100 border-0"
                placeholder="کد تخفیف را وارد کنید"
              />

              {couponError && (
                <p className="text-red-500 text-sm mt-2">{couponError}</p>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsCouponOpen(false)}
                  className="flex-1 bg-gray-100 rounded-lg py-3"
                >
                  بازگشت
                </button>
                <button
                  onClick={applyCoupon}
                  disabled={couponLoading}
                  className="flex-1 bg-indigo-600 text-white rounded-lg py-3 disabled:opacity-50"
                >
                  اعمال
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
