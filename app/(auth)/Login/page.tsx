"use client";
import Button from "@/component/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { sendOtp, verifyOtp } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { setAuthCookie } from "@/utils/cookie";
import { useRouter } from "next/navigation";

function Login() {
  const Submit = () => {
    setLogin(!login);
    console.log(number);
    setNumber([]);
    setPhone("");
    setError("");
  };

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/g, "").slice(-1);
    e.target.value = value;
    if (value && index < 4) {
      const nextInput = e.target.nextElementSibling as HTMLInputElement;
      if (nextInput && nextInput.tagName === "INPUT") {
        nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Backspace" && !target.value && index > 0) {
      const prevInput = target.previousElementSibling as HTMLInputElement;
      if (prevInput && prevInput.tagName === "INPUT") {
        prevInput.focus();
      }
    }
  };

  const handleError = () => {
    if (phone.length !== 11 && !phone.startsWith("09") && login == true) {
      setError("شماره تلفن وارد شده معتبر نمی باشد.");
      throw new Error("Invalid phone number");
    }
    if (number.length < 5 && login == false) {
      setError("کد تایید باید ۵ رقم باشد.");
      throw new Error("Incomplete OTP code");
    }
  }

  const storeLogin = useAuthStore((s) => s.login);
  const router = useRouter();

  const handleSendOtp = async () => {
    handleError();
    await sendOtp(phone);
    setLogin(false);
    setError("");
  };

  const handleVerifyOtp = async () => {
    handleError();
    const otpCode = number.join("");
    const res = await verifyOtp(phone, otpCode);

    const { token, user } = res.data;
    storeLogin(token, user); // zustand
    setAuthCookie(token); // cookie
    router.push("/panel/home");
    setError("");
  };


  const [phone, setPhone] = useState("");
  const [login, setLogin] = useState(true);
  const [number, setNumber] = useState<string[]>([]);
  const [error, setError] = useState("");
  return (
    <div className="w-[100vw] h-[100vh] md:bg-linear-to-b  from-[#5764EF] to-[#3E47AD] flex items-center justify-center">
      <div className="max-md:hidden absolute top-[40px] right-10 text-white flex flex-row-reverse gap-3 cursor-pointer">
        <span>بازگشت</span>
        <Image
          src="/image/arrow-right.svg"
          alt="right arrow"
          width="20"
          height="20"
        />
      </div>

      {/* Login Section */}

      <div className="max-md:flex-col-reverse w-full items-center justify-evenly flex">
        <div className="max-md:absolute max-md:bottom-[5%] max-md:h-[50%] max-md:w-full max-md:py-0 max-lg:px-10 bg-white rounded-2xl w-2/5 h-[65vh] px-20 py-8 flex flex-col justify-evenly items-center gap-6">
          <h1
            className={`${
              login ? "max-md:mt-5" : "max-md:mt-12"
            } max-md:text-2xl text-xl text-[#5764EF] font-bold`}
          >
            ورود | ثبت نام
          </h1>

          {login ? (
            <div className="w-full flex flex-col gap-7">
              <label>
                <span className="max-md:text-lg text-xs">شماره همراه</span>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  placeholder="09123456789"
                  className="max-md:mb-7 max-md:py-4 max-md:mt-3 w-full bg-gray-100 p-[8px] rounded-lg placeholder:text-gray-300 focus:outline-gray-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <p className="text-red-500 text-xs mt-1">{error}</p>
              </label>
              <Button onClick={handleSendOtp} variant="secondary">
                تایید
              </Button>
            </div>
          ) : (
            <div className="lg:gap-4 w-full flex flex-col gap-7">
              <p className="w-full flex text-center text-xs items-center justify-center text-[#757575] ">
                کد ۵ رقمی ارسال شده به شماره {phone} را وارد نمایید
              </p>
              <span
                onClick={Submit}
                className="max-lg:mt-8 max-lg:text-xl text-xs text-[#EF5764] flex gap-3 w-full items-center justify-center cursor-pointer"
              >
                <Image
                  src="/image/edit.svg"
                  width="20"
                  height="20"
                  alt="edit icon"
                />{" "}
                ویرایش شماره
              </span>
              <label>
                <span className="max-md:text-xl text-xs">کدتایید</span>

                {/* inputs */}
                <div className="flex flex-row-reverse gap-2 max-lg:mt-3 w-full">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <input
                      key={i}
                      onChangeCapture={(e) =>
                        setNumber([
                          ...number,
                          (e.target as HTMLInputElement).value,
                        ])
                      }
                      type="number"
                      inputMode="numeric"
                      maxLength={1}
                      onChange={(e) => handleOtpChange(e, i)}
                      onKeyDown={(e) => handleOtpKeyDown(e, i)}
                      className="w-full aspect-square min-w-0 text-center text-lg bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5562EF] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  ))}
                </div>
                <p className="text-red-500 text-xs mt-1">{error}</p>
              </label>
              <Button onClick={handleVerifyOtp} variant="secondary">
                تایید
              </Button>
            </div>
          )}

          <p className=" text-[clamp(0.8rem,1.7vw,0.8rem)] text-center text-gray-400">
            ورود به اپلیکیشن همراه تجارت به منزله پذیرفتن{" "}
            <span className="text-red-500">
              <Link href="#">قوانین</Link>
            </span>{" "}
            این برنامه است
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
    </div>
  );
}

export default Login;
