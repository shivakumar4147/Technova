'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Info, Bell, CheckCircle2, CheckCheck, School, Sparkles } from 'lucide-react';
import { MessageComposer } from '@/components/common/MessageComposer';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/common/Badge';

export const GroupChatScreen: React.FC = () => {
  const {
    conversations,
    activeConversationId,
    messages,
    sendMessage,
    announcements,
    acknowledgeAnnouncement,
    currentUser,
    navigateTo
  } = useApp();

  const conversation = conversations.find(c => c.id === activeConversationId) || conversations[0];
  const chatMessages = messages[conversation.id] || [];

  return (
    <div className="min-h-[calc(100vh-120px)] max-w-md mx-auto flex flex-col text-[#F8FAFC] relative font-sans bg-[#0B0F17]">
      
      {/* 1. STICKY WHATSAPP-STYLE HEADER */}
      <header className="shrink-0 z-40 bg-[#0B0F17] px-3.5 py-2.5 flex items-center justify-between border-b border-[#1E293B] shadow-xs">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={() => navigateTo('chat_home')}
            className="p-1.5 rounded-xl text-[#F8FAFC] hover:bg-[#1E293B] transition active:scale-95 shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Top Bar Group Info Trigger */}
          <div
            onClick={() => navigateTo('group_info')}
            className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0 py-0.5 hover:opacity-85 transition"
          >
            <div className="w-10 h-10 rounded-full bg-[#5DD62C]/15 text-[#5DD62C] border border-[#5DD62C]/30 flex items-center justify-center font-bold text-base shrink-0">
              <School className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xs font-black text-[#F8FAFC] truncate leading-tight">
                {conversation.name}
              </h2>
              <p className="text-[10px] text-[#5DD62C] font-extrabold mt-0.5 truncate">
                Tap for group details & members
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigateTo('group_info')}
          className="p-2 rounded-xl text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC] transition active:scale-95 shrink-0 cursor-pointer"
          title="Group Information"
        >
          <Info className="w-5 h-5" />
        </button>
      </header>

      {/* 2. CHAT STREAM (Strictly scrollable, flex-1) */}
      <main className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3">
        
        {/* Date Divider */}
        <div className="flex justify-center my-2">
          <span className="px-3.5 py-1 rounded-full bg-[#1E293B] text-[10px] font-black text-[#5DD62C] uppercase tracking-wider border border-[#334155]">
            Today, Technova 2026
          </span>
        </div>

        {chatMessages.map(msg => {
          const isMe = msg.sender_id === currentUser?.id;
          const isOfficial = msg.message_type === 'official' || !!msg.announcement_id;

          // Official Announcement Card
          if (isOfficial) {
            const announcement = announcements.find(a => a.id === msg.announcement_id) || announcements[0];
            const isAckedByMe = announcement.acknowledgements.some(ack => ack.user_id === currentUser?.id);

            return (
              <div key={msg.id} className="my-3 max-w-sm mx-auto">
                <div className="p-4 rounded-2xl bg-[#111827] border border-[#5DD62C]/40 shadow-xl relative overflow-hidden">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-[#5DD62C]" />
                      <span className="text-[11px] font-black text-[#5DD62C] uppercase tracking-wider">
                        OFFICIAL UPDATE
                      </span>
                    </div>
                    <span className="text-[10px] text-[#94A3B8] font-mono">{msg.created_at}</span>
                  </div>

                  <h3 className="text-sm font-black text-[#F8FAFC] mb-1 leading-snug">{announcement.title}</h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">{announcement.content}</p>

                  {/* Inline Acknowledgement Action */}
                  <div className="pt-2.5 border-t border-[#1E293B] flex items-center justify-between">
                    {currentUser?.role === 'teacher' ? (
                      isAckedByMe ? (
                        <div className="flex items-center gap-1.5 text-[#5DD62C] font-black text-xs">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>✓ Acknowledged</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => acknowledgeAnnouncement(announcement.id)}
                          className="px-4 py-2 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0B0F17] font-black text-xs shadow-xs active:scale-95 transition cursor-pointer"
                        >
                          Acknowledge Update
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => navigateTo('acknowledgement_tracker', { announcementId: announcement.id })}
                        className="flex items-center gap-1.5 text-xs text-[#5DD62C] font-extrabold hover:underline cursor-pointer"
                      >
                        <span>{announcement.acknowledged_count}/{announcement.sent_to_count} Acknowledged</span>
                        <CheckCheck className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                </div>
              </div>
            );
          }

          // Regular Chat Message Bubble
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} my-1`}
            >
              {!isMe && (
                <span className="text-[10px] font-extrabold text-[#5DD62C] mb-1 ml-1">
                  {msg.sender_name} ({msg.sender_role})
                </span>
              )}

              <div
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                  isMe
                    ? 'bg-[#5DD62C]/20 border border-[#5DD62C]/40 text-[#F8FAFC] rounded-br-xs'
                    : 'bg-[#111827] border border-[#1E293B] text-[#F8FAFC] rounded-bl-xs'
                }`}
              >
                <p>{msg.content}</p>

                <div className="flex items-center justify-end gap-1 mt-1.5 text-[9px] text-[#94A3B8] font-mono">
                  <span>{msg.created_at}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-[#5DD62C]" />}
                </div>
              </div>
            </div>
          );
        })}

      </main>

      {/* 3. STICKY COMPOSER */}
      <footer className="shrink-0 z-40 bg-[#0B0F17] border-t border-[#1E293B]">
        <MessageComposer
          onSendMessage={(text) => sendMessage(conversation.id, text)}
          placeholder={`Message ${conversation.name}...`}
        />
      </footer>

    </div>
  );
};
