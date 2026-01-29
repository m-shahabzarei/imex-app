"use client";

import Link from "next/link";
import { useState } from "react";

const suggestions = [
  "چگونه می‌توانم اشتراک تهیه کنم؟",
  "چگونه می‌توانم تعرفه‌ها را مشاهده کنم؟",
  "آیا می‌توانم به تعرفه‌ها جستجو کنم؟",
];

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = (text?: string) => {
    const msg = text ?? input;
    if (!msg.trim()) return;

    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  return (
    <div className="min-h-screen max-md:pt-20 flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-indigo-100 px-4">
      <Link
        href="/panel/home"
        className="bg-[#5764ef34] absolute max-md:top-50 top-4 right-4 text-[#5764EF] w-fit text-center justify-center max-md:py-[12px] max-md:text-lg px-[12px] py-[8px] rounded-[12px] text-sm font-medium cursor-pointer hover:opacity-90 transition-all duration-200 ease-in-out flex items-center gap-1"
      >
        <span>بازگشت</span>
      </Link>
      <div className="w-full max-w-3xl flex flex-col h-screen p-4">
        {/* Header */}
        <div className="py-6 text-center text-gray-400 text-sm absolute top-3/4 px-7">
          پیام خود را جهت دریافت پاسخ از هوش مصنوعی ارسال نمایید.
        </div>

        {/* Suggestions */}
        {messages.length === 0 && (
          <div className="px-6 pb-4 space-y-3 absolute top-1/3">
            <div className="text-center text-blue-600 font-medium">
              سوالات پیشنهادی
            </div>

            {suggestions.map((item, index) => (
              <button
                key={index}
                onClick={() => sendMessage(item)}
                className="w-full bg-gray-50 hover:bg-gray-100 transition px-4 py-3 rounded-xl text-sm text-gray-700 text-right"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-blue-50 text-gray-800 px-4 py-2 rounded-xl w-fit max-w-[80%] ml-auto"
            >
              {msg}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 flex items-center gap-3 flex-row-reverse">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="متن پیام"
            className="flex-1 bg-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => sendMessage()}
            className="bg-blue-600 hover:bg-blue-700 transition text-white py-1 px-3 rounded-xl"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
