/* eslint-disable react-hooks/immutability */
'use client';

import React, { useEffect, useState, useRef } from 'react';
import api from '@/lib/api';
import { Send, RefreshCw, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Header from '@/component/panel/layout/Header';

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
  text: string; 
  is_streaming: boolean;
}

const BASE_URL = 'https://api.imexapp.ir/ai_assistant';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState<number | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

// Hystory
  useEffect(() => {
    const savedChatId = localStorage.getItem('imex_chat_id');
    if (savedChatId) {
      const id = parseInt(savedChatId);
      setChatId(id);
      fetchChatHistory(id);
    }
  }, []);

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

  const pollForResponse = async (aiResponseId: number) => {
    let isStreaming = true;

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
                text: data.text || '', 
                is_streaming: data.is_streaming,
              };
            }
            return msg;
          })
        );

        isStreaming = data.is_streaming;

        if (isStreaming) {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }

      } catch (error) {
        console.error('Streaming error:', error);
        isStreaming = false;
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

    const userMsgId = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: 'hu', text: userText },
    ]);

    try {
      let activeChatId = chatId;

      if (!activeChatId) {
        activeChatId = await createChatRoom();
      }

      const payload = {
        text: userText,
        chat_history: activeChatId 
      };

      const res = await api.post<InitResponse>(
        `${BASE_URL}/generate_response/`,
        payload
      );

      const data = res.data;

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
    <div className="flex w-full flex-col items-center h-screen bg-[#F8F9FE] font-sans" dir="rtl">
      
      {/* Header */}
        <Header  isAI onclick={handleResetChat}/>
        
      {/* Main Chat */}
      <main className="max-md:flex-1 md:w-[83%] w-full overflow-y-auto max-md:px-4 max-md:py-6 scroll-smooth">
        <div className="max-md:max-w-3xl w-full mx-auto space-y-6 pb-28 md:pb-100">
          
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

        <div className="max-md:max-w-3xl md:w-[83%] mx-auto">
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