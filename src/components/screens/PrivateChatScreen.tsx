'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Phone, MoreVertical, CheckCheck } from 'lucide-react';
import { MessageComposer } from '@/components/common/MessageComposer';

export const PrivateChatScreen: React.FC = () => {
  const {
    conversations,
    activeConversationId,
    messages,
    sendMessage,
    currentUser,
    navigateTo
  } = useApp();

  const conversation = conversations.find(c => c.id === activeConversationId) || conversations[1];
  const chatMessages = messages[conversation.id] || [];

  return (
    <div className="min-h-[calc(100vh-120px)] max-w-md mx-auto flex flex-col bg-[#F8F8F8] dark:bg-[#0D1117] text-[#0F0F0F] dark:text-[#F0F6FC] font-sans transition-colors duration-200 relative">
      
      {/* 1. STICKY HEADER (Fixed at top, shrink-0) */}
      <header className="shrink-0 z-40 bg-[#FFFFFF] dark:bg-[#161B22] px-3.5 py-3 flex items-center justify-between border-b border-[#E2E8F0] dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('chat_home')}
            className="p-1.5 rounded-xl text-[#0F0F0F] dark:text-[#F0F6FC] hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src={conversation.avatar_url}
                alt={conversation.name}
                className="w-9 h-9 rounded-2xl object-cover border border-slate-200 dark:border-slate-800"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#161B22]" />
            </div>
            <div>
              <h2 className="text-xs font-black text-[#0F0F0F] dark:text-[#F0F6FC] truncate max-w-[160px] leading-tight">{conversation.name}</h2>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">Online</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 rounded-xl text-[#64748B] dark:text-[#8B949E] hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95 cursor-pointer">
            <Phone className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-xl text-[#64748B] dark:text-[#8B949E] hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95 cursor-pointer">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. CHAT FEED (Strictly scrollable, flex-1) */}
      <main className="flex-1 overflow-y-auto px-3.5 py-4 space-y-2.5">
        {chatMessages.map(msg => {
          const isMe = msg.sender_id === currentUser?.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} my-1`}
            >
              <div
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                  isMe
                    ? 'bg-[#5DD62C] text-[#0F0F0F] font-medium rounded-br-xs'
                    : 'bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 text-[#0F0F0F] dark:text-[#F0F6FC] rounded-bl-xs'
                }`}
              >
                <p>{msg.content}</p>

                <div className={`flex items-center justify-end gap-1 mt-1.5 text-[9px] font-mono ${
                  isMe ? 'text-[#0F0F0F]/70' : 'text-[#64748B] dark:text-[#8B949E]'
                }`}>
                  <span>{msg.created_at}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-[#0F0F0F]" />}
                </div>
              </div>
            </div>
          );
        })}
      </main>

      {/* 3. STICKY COMPOSER */}
      <footer className="shrink-0 z-40 bg-[#FFFFFF] dark:bg-[#161B22] border-t border-slate-200 dark:border-slate-800">
        <MessageComposer
          onSendMessage={(text) => sendMessage(conversation.id, text)}
          placeholder={`Message ${conversation.name}...`}
        />
      </footer>

    </div>
  );
};
