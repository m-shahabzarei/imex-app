"use client";
import Button from "@/component/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Login() {

  const Submit = () => {
    setLogin(false)
  };

  const [login, setLogin] = useState(true);
  return (
    <div className="w-[100vw] h-[100vh] bg-linear-300  from-[#5764EF] to-[#3E47AD] flex items-center justify-center">
      <div className="absolute top-[40px] right-10 text-white flex flex-row-reverse gap-3 cursor-pointer">
        <span>بازگشت</span>
        <Image
          src="/image/arrow-right.svg"
          alt="right arrow"
          width="20"
          height="20"
        />
      </div>

      {/* Login Section */}

      <div className="w-full items-center justify-evenly flex">
        <div className="bg-white rounded-2xl w-2/5 h-[65vh] px-20 py-8 flex flex-col justify-evenly items-center gap-6">
          <h1 className="text-2xl text-[#5764EF] font-bold">ورود | ثبت نام</h1>
          <form className="w-full flex flex-col gap-7">
            <label>
              <span className="text-xs">
                {
                  login ? "شماره همراه"
                  : "کدتایید"
                }
              </span>
              <input
              type="number"
                placeholder="09123456789"
                className="w-full bg-gray-100 p-[8px] rounded-lg placeholder:text-gray-300 focus:outline-gray-200"
              />
            </label>
            <Button onClick={Submit} variant="secondary">
              تایید
            </Button>
          </form>
          <p className="text-xs text-center text-gray-400">
            ورود به اپلیکیشن همراه تجارت به منزله پذیرفتن{" "}
            <span className="text-red-500">
              <Link href="#">قوانین</Link>
            </span>{" "}
            این برنامه است
          </p>
        </div>

        {/* Logo Section */}

        <div className=" w-[400px] h-[400px] ">
          <div className="flex flex-col gap-5 items-center justify-center h-full">
            <Image src="/image/Logo.svg" alt="test" width="140" height="140" />
            <div className="flex flex-col text-white">
              <span className="z-[1000] text-4xl">ایمکس</span>
              <span className="-mt-[11px] text-4xl w-fit mr-[3px] bg-clip-text text-transparent bg-linear-to-b from-[#FFFFFF00] from-25% to-[#FFFFFF] font-extrabold">
                IM EX
              </span>
            </div>
            <p className="text-white text-xl">IMPORT & EXPORT APPLICATION</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
