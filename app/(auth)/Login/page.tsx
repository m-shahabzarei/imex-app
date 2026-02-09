"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/component/ui/Button";
import { getMe, sendOtp, verifyOtp } from "@/services/auth";
import { useAuthStore } from "@/stores/auth.store";

const OTP_LENGTH = 5;
const TIMER_START = 120; // زمان تایمر به ثانیه (مثلا 2 دقیقه)

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const phoneRef = useRef<HTMLInputElement>(null);
  const otpRef = useRef<HTMLInputElement>(null);
  const [timer, setTimer] = useState(TIMER_START);

  /* ---------------- validation ---------------- */
  const isValidPhone = () => {
    if (phone.length !== 11 || !phone.startsWith("09")) {
      setError("شماره موبایل معتبر نیست");
      return false;
    }
    return true;
  };

  const isValidOtp = () => {
    if (otp.some((d) => d === "")) {
      setError("کد تایید اشتباه است");
      return false;
    }
    return true;
  };

  /* ---------------- handlers ---------------- */
  const handleSendOtp = async () => {
    if (!isValidPhone()) return;

    try {
      setLoading(true);
      await sendOtp(phone);
      setStep("otp");
      setTimer(TIMER_START); // ریست کردن تایمر هنگام رفتن به مرحله بعد

      setError("");
    } catch {
      setError("خطا در ارسال کد");
    } finally {
      setLoading(false);
    }
  };

    // --- اضافه شده: تابع ارسال مجدد کد ---
  const handleResendOtp = async () => {
    if (timer > 0) return; // اگر تایمر هنوز تمام نشده، کاری نکن

    try {
      setLoading(true);
      await sendOtp(phone); // استفاده از همان تابع ارسال کد
      setTimer(TIMER_START); // شروع مجدد تایمر
      setOtp(Array(OTP_LENGTH).fill("")); // پاک کردن اینپوت‌ها (اختیاری)
      setError("");
    } catch {
      setError("خطا در ارسال مجدد کد");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (inputOtp?: string) => {
    // اگر کد به صورت دستی پاس داده شده بود (حالت اتوماتیک) یا از استیت خوانده شود (حالت دکمه)
    const codeToCheck = typeof inputOtp === "string" ? inputOtp : otp.join("");

    // اعتبارسنجی ساده برای طول کد

    try {
      setLoading(true); // بهتر است لودینگ را فعال کنید
      const res = await verifyOtp(phone, codeToCheck);

      useAuthStore.getState().setAccessToken(res.data.access_token);
      useAuthStore.getState().setRefreshToken(res.data.refresh_token);

      const me = await getMe();
      useAuthStore.getState().setUser(me.data);

      window.location.href = "/panel/home";
    } catch (err) {
      setError("کد وارد شده صحیح نیست");
    isValidOtp();
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // اگر عدد وارد شده بود و ایندکس کمتر از آخری بود، برو بعدی
    if (value && index < OTP_LENGTH - 1) {
      (e.target.nextElementSibling as HTMLInputElement)?.focus();
    }

    // ---------------- تغییر جدید: ارسال خودکار ----------------
    // اگر عدد وارد شده بود و این آخرین خانه بود
    if (value && index === OTP_LENGTH - 1) {
      // کیبورد را در موبایل می‌بندیم (اختیاری)
      (e.target as HTMLInputElement).blur();
      // کد جدید را ساخته و مستقیماً ارسال می‌کنیم
      handleVerifyOtp(newOtp.join(""));
    }
    // ---------------------------------------------------------
  };

  const handleOtpBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      (e.currentTarget.previousElementSibling as HTMLInputElement)?.focus();
    }
  };

  const resetPhone = () => {
    setStep("phone");
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && step === "phone") {
      handleSendOtp();
    } else if (e.key === "Enter" && step === "otp") {
      handleVerifyOtp();
    }
  };
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // --- اضافه شده: فرمت کردن زمان (تبدیل ثانیه به دقیقه:ثانیه) ---
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  useEffect(() => {
    if (step == "phone") {
      phoneRef.current?.focus();
    } else if (step == "otp") {
      // چون otpRef الان به اینپوت اول وصل است، فوکوس روی اولی می‌رود
      otpRef.current?.focus();
    }
  }, [step]);

  /* ------------------ UI ------------------ */
  return (
    <div className="w-[100vw] h-[100vh] md:bg-linear-to-b  from-[#5764EF] to-[#3E47AD] flex items-center max-md:mt-[20vh] justify-evenly">
      <div className="max-md:hidden absolute top-[40px] right-10 text-white cursor-pointer">
        <a href="/panel/home" className="flex flex-row-reverse gap-3">
          <span>بازگشت</span>
          <Image
            src="/image/arrow-right.svg"
            alt="right arrow"
            width="20"
            height="20"
          />
        </a>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl p-8 flex flex-col md:gap-5 gap-6">
        <h1 className="text-center text-xl font-bold text-[#5764EF]">
          ورود | ثبت نام
        </h1>

        {step === "phone" ? (
          <>
            <label className="flex flex-col gap-2">
              <span className="text-xs">شماره همراه</span>
              <input
                ref={phoneRef}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="09123456789"
                className="bg-gray-100 p-3 rounded-lg focus:outline-none"
                onKeyDown={handleKeyDown}
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}
            </label>

            <Button onClick={handleSendOtp} variant="secondary">
              ارسال کد
            </Button>
          </>
        ) : (
          <>
            <p className="text-xs text-center text-gray-500">
              کد ارسال شده به {phone} را وارد کنید
            </p>

            <span
              onClick={resetPhone}
              className="text-xs text-red-500 cursor-pointer text-center"
            >
              ویرایش شماره
            </span>

            <div className="flex gap-2 justify-evenly flex-row-reverse">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  // تغییر مهم: فقط اگر ایندکس ۰ بود، ref را ست کن
                  ref={i === 0 ? otpRef : null}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, i)}
                  onKeyDown={(e) => {
                    handleOtpBackspace(e, i);
                    handleKeyDown(e);
                  }}
                  inputMode="numeric"
                  maxLength={1}
                  className="w-12 h-12 text-center bg-gray-100 rounded-lg text-lg focus:border-blue-500 focus:border-2 outline-none transition-all" // استایل فوکوس هم برای زیبایی اضافه شد
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}
            {/* --- اضافه شده: بخش تایمر و ارسال مجدد --- */}
            <div className="flex justify-between flex-row-reverse items-center text-xs -my-1 px-1">
              <span
                onClick={handleResendOtp}
                className={`transition-colors text-xs ${
                  timer === 0
                    ? "text-[#5764EF] cursor-pointer font-bold hover:text-blue-700"
                    : "text-gray-400 cursor-default"
                }`}
              >
                ارسال مجدد کد
              </span>
              <span className="text-gray-500 tabular-nums">
                {formatTime(timer)}
              </span>
            </div>
            {/* -------------------------------------- */}
            <Button onClick={handleVerifyOtp} variant="secondary">
              تایید
            </Button>
          </>
        )}

        <p className="text-xs text-center text-gray-400">
          ورود به معنی پذیرش{" "}
          <Link href="#" className="text-red-500">
            قوانین
          </Link>{" "}
          است
        </p>
      </div>

      {/* Logo Section */}

      <div className="max-md:w-full max-md:h-[50%] max-md:bg-linear-300 max-md:absolute max-md:top-0 max-md:rounded-b-4xl from-[#5764EF] to-[#3E47AD] w-[400px] h-[400px] ">
        <div className="flex flex-col gap-5 max-sm:gap-2 items-center justify-center h-full max-sm:mt-1 mt-5">
          <Image src="/image/Logo.svg" alt="test" width="140" height="140" />
          <div className="flex flex-col text-white">
            <span className="z-[1000] text-4xl">ایمکس</span>
            <span className="-mt-[11px] text-4xl w-fit mr-[3px] bg-clip-text text-transparent bg-linear-to-b from-[#FFFFFF00] from-25% to-[#FFFFFF] font-extrabold">
              IM EX
            </span>
          </div>
          <p className="text-white text-xl">IMPORT & EXPORT APPLICATION</p>
          <div className="md:hidden flex gap-3 items-center text-white">
            <Image
              src="/image/BazarganOriginalLogo1.svg"
              alt="Bazargan Original Logo"
              width="50"
              height="50"
            />
            <p>ارائه شده توسط چاپ و نشر بازرگانی</p>
          </div>
        </div>
      </div>
    </div>
  );
}
