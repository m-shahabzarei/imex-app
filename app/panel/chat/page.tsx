'use client';

import React, { useEffect, useState, useRef } from 'react';
import api from '@/lib/api';
import { Send, RefreshCw, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// --- Types ---
interface Message {
  id: number;
  role: 'hu' | 'ai';
  text: string;
  is_streaming?: boolean;
}

interface CreateChatResponse {
  id: number;
}

interface InitResponse {
  id: number;
  chat_history: number;
  ai_response_id: number;
  role: 'hu';
  text: string;
}

interface StreamResponse {
  id: number;
  ai_response_id: number;
  chat_history: number;
  role: 'ai';
  text: string; // این متن حاوی کل پاسخ تا این لحظه است
  is_streaming: boolean;
}

const BASE_URL = 'https://api.imexapp.ir/ai_assistant';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState<number | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. دریافت آیدی و لود تاریخچه در شروع
  useEffect(() => {
    const savedChatId = localStorage.getItem('imex_chat_id');
    if (savedChatId) {
      const id = parseInt(savedChatId);
      setChatId(id);
      fetchChatHistory(id);
    }
  }, []);

  // اسکرول به پایین
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // --- API Functions ---

  const fetchChatHistory = async (id: number) => {
    try {
      const res = await api.get(`${BASE_URL}/chat_history/${id}/`);
      if (res.data && res.data.chat_texts) {
        setMessages(res.data.chat_texts);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
      localStorage.removeItem('imex_chat_id');
      setChatId(null);
    }
  };

  const createChatRoom = async (): Promise<number> => {
    try {
      const res = await api.post<CreateChatResponse>(`${BASE_URL}/chat_history/`, {});
      const newId = res.data.id;
      setChatId(newId);
      localStorage.setItem('imex_chat_id', newId.toString());
      return newId;
    } catch (error) {
      console.error('Error creating chat room:', error);
      throw error;
    }
  };

  const handleResetChat = () => {
    setMessages([]);
    setChatId(null);
    localStorage.removeItem('imex_chat_id');
  };

  // --- بخش مهم: اصلاح حلقه دریافت پاسخ ---
  const pollForResponse = async (aiResponseId: number) => {
    let isStreaming = true;

    // ایجاد حباب پیام خالی برای هوش مصنوعی
    const aiMessageTempId = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: aiMessageTempId, role: 'ai', text: '', is_streaming: true },
    ]);

    while (isStreaming) {
      try {
        const res = await api.get<StreamResponse>(
          `${BASE_URL}/generate_response/${aiResponseId}/`
        );
        
        const data = res.data;

        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id === aiMessageTempId) {
              return {
                ...msg,
                // تغییر اصلی اینجاست: 
                // به جای چسباندن متن (+=)، متن جدید را جایگزین میکنیم (=)
                // چون سرور هر بار کل متن تولید شده را می‌فرستد.
                text: data.text || '', 
                is_streaming: data.is_streaming,
              };
            }
            return msg;
          })
        );

        isStreaming = data.is_streaming;

        // تاخیر کوچک برای جلوگیری از درخواست‌های رگباری
        if (isStreaming) {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }

      } catch (error) {
        console.error('Streaming error:', error);
        isStreaming = false;
        // در صورت خطا، حالت لودینگ پیام را غیرفعال کن
        setMessages((prev) =>
            prev.map((msg) => 
                msg.id === aiMessageTempId ? { ...msg, is_streaming: false } : msg
            )
        );
      }
    }
    
    setIsLoading(false);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setIsLoading(true);

    // افزودن پیام کاربر
    const userMsgId = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: 'hu', text: userText },
    ]);

    try {
      let activeChatId = chatId;

      // اگر چت روم نداریم، بساز
      if (!activeChatId) {
        activeChatId = await createChatRoom();
      }

      // ارسال پیام
      const payload = {
        text: userText,
        chat_history: activeChatId 
      };

      const res = await api.post<InitResponse>(
        `${BASE_URL}/generate_response/`,
        payload
      );

      const data = res.data;

      // شروع دریافت جواب
      if (data.ai_response_id) {
        await pollForResponse(data.ai_response_id);
      } else {
        setIsLoading(false);
      }

    } catch (error) {
      console.error('Error process:', error);
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), role: 'ai', text: 'خطا در برقراری ارتباط.' },
      ]);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-[#F8F9FE] font-sans" dir="rtl">
      
      {/* Header */}
      <header className="md:max-w-3xl px-3 items-center pb-7 rounded-b-3xl justify-end h-43 text-white w-full bg-linear-to-b  from-[#5764EF] to-[#3E47AD]  flex flex-col ">
        <div className="flex items-center w-full flex-row-reverse justify-between max-w-3xl mx-auto mb-6">
          <button 
            onClick={handleResetChat}
            className="flex hover:cursor-pointer items-center gap-2 bg-white text-[#4F46E5] hover:bg-gray-100 px-5 py-2.5 rounded-lg transition-all text-sm font-bold shadow-sm"
          >
            <RefreshCw size={18} />
            تازه سازی چت
          </button>

          <Link href="/panel/home" className="flex flex-row-reverse items-center gap-3 text-2xl font-bold">
            <h1>راهنمایی</h1>
            <ArrowLeft className="rotate-180 w-6 h-6" />
          </Link>
        </div>
      </header>

      {/* Main Chat */}
      <main className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-6 pb-28">
          
          {messages.length === 0 && chatId === null && (
            <div className="text-center text-gray-400 mt-10 text-sm">
              سوالی دارید بپرسید...
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={msg.id || index}
              className={`flex w-full ${msg.role === 'hu' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${msg.role === 'hu' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {msg.role === 'ai' && (
                   <div className="w-8 h-8 flex items-start justify-center text-[#4F46E5] mt-1 shrink-0">
                     <Sparkles size={24} strokeWidth={1.5} />
                   </div>
                )}
                
                <div
                  className={`
                    px-5 py-3.5 text-[0.95rem] leading-8 whitespace-pre-wrap shadow-sm
                    ${msg.role === 'hu' 
                      ? 'bg-[#4F46E5] text-white rounded-[20px] rounded-tl-none' 
                      : 'bg-white text-gray-800 rounded-[20px] rounded-tr-none border border-gray-100'}
                  `}
                >
                  {msg.text}
                  {msg.is_streaming && (
                     <span className="inline-block w-1.5 h-1.5 bg-indigo-500 rounded-full mr-1 animate-ping align-middle"></span>
                  )}
                </div>

              </div>
            </div>
          ))}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-5 z-20">
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FE] via-[#F8F9FE] to-transparent -z-10 h-32 bottom-0 pointer-events-none" />

        <div className="max-w-3xl mx-auto">
          <form 
            onSubmit={handleSendMessage}
            className="bg-white p-2 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 flex flex-row-reverse items-center gap-3 pr-4"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="متن پیام..."
              className="flex-1 bg-transparent border-none outline-none py-3 text-right placeholder-gray-400 text-gray-700 font-medium"
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`
                w-12 h-12 flex items-center justify-center rounded-[16px] transition-all duration-300
                ${input.trim() && !isLoading 
                  ? 'bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-md hover:scale-105' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
              `}
            >
              {isLoading ? (
                <RefreshCw size={22} className="animate-spin" />
              ) : (
                <Send size={22} className="rtl:-rotate-90 ml-1" /> 
              )}
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}