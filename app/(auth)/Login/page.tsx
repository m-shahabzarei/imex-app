

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/component/ui/Button";
import { getMe, sendOtp, verifyOtp } from "@/services/auth";
import { useAuthStore } from "@/stores/auth.store";

const OTP_LENGTH = 5;

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setError("کد تایید باید ۵ رقم باشد");
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
      setError("");
    } catch {
      setError("خطا در ارسال کد");
    } finally {
      setLoading(false);
    }
  };

  // const handleVerifyOtp = async () => {
  //   if (!isValidOtp()) return;

  //   try {
  //     setLoading(true);

  //     const res =  await verifyOtp(phone, otp.join(""));
  //     console.log(res.data , res , res.data.access_token)
  //     useAuthStore.getState().setAccessToken(res.data.access_token)                                                                    

  //     window.location.href = "/panel/home";

  //   } catch {
  //     setError("کد وارد شده صحیح نیست");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleVerifyOtp = async () => {
  const res = await verifyOtp(phone, otp.join(""));

  // access فقط اینجا میاد
  useAuthStore.getState().setAccessToken(res.data.access_token);
  useAuthStore.getState().setRefreshToken(res.data.refresh_token);

  const me = await getMe();
  useAuthStore.getState().setUser(me.data);

  window.location.href = "/panel/home";
};


  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      (e.target.nextElementSibling as HTMLInputElement)?.focus();
    }
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

  /* ------------------ UI ------------------ */
  return (
    <div className="w-[100vw] h-[100vh] md:bg-linear-to-b  from-[#5764EF] to-[#3E47AD] flex items-center max-md:mt-[25vh] justify-evenly">
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

      <div className="w-full max-w-md bg-white rounded-2xl p-8 flex flex-col gap-6">
        <h1 className="text-center text-xl font-bold text-[#5764EF]">
          ورود | ثبت نام
        </h1>

        {step === "phone" ? (
          <>
            <label className="flex flex-col gap-2">
              <span className="text-xs">شماره همراه</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="09123456789"
                className="bg-gray-100 p-3 rounded-lg focus:outline-none"
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

            <div className="flex gap-2 justify-center flex-row-reverse">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, i)}
                  onKeyDown={(e) => handleOtpBackspace(e, i)}
                  inputMode="numeric"
                  maxLength={1}
                  className="w-12 h-12 text-center bg-gray-100 rounded-lg text-lg"
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}

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
        <div className="flex flex-col gap-5 items-center justify-center h-full mt-5">
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
