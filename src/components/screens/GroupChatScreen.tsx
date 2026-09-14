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
    <div className="h-[100dvh] max-w-md mx-auto flex flex-col overflow-hidden text-white relative">
      
      {/* 1. STICKY WHATSAPP-STYLE HEADER */}
      <header className="shrink-0 z-40 bg-[#FFFFFF] px-3.5 py-2.5 flex items-center justify-between border-b border-[#E2E8F0] shadow-xs">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={() => navigateTo('chat_home')}
            className="p-1.5 rounded-xl text-[#0F0F0F] hover:bg-slate-100 transition active:scale-95 shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Top Bar Group Info Trigger */}
          <div
            onClick={() => navigateTo('group_info')}
            className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0 py-0.5 hover:opacity-85 transition"
          >
            <div className="w-10 h-10 rounded-full bg-[#5DD62C]/15 text-[#337418] border border-[#5DD62C]/30 flex items-center justify-center font-bold text-base shrink-0">
              <School className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xs font-bold text-[#0F0F0F] truncate leading-tight">
                {conversation.name}
              </h2>
              <p className="text-[10px] text-[#337418] font-medium mt-0.5 truncate">
                Tap for group details & members
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigateTo('group_info')}
          className="p-2 rounded-xl text-[#64748B] hover:bg-slate-100 hover:text-[#0F0F0F] transition active:scale-95 shrink-0"
          title="Group Information"
        >
          <Info className="w-5 h-5" />
        </button>
      </header>

      {/* 2. CHAT STREAM (Strictly scrollable, flex-1) */}
      <main className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3">
        
        {/* Date Divider */}
        <div className="flex justify-center my-2">
          <span className="px-3.5 py-1 rounded-full glass-level1 text-[10px] font-extrabold text-slate-300 uppercase tracking-wider border border-slate-700/40">
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
                <GlassCard variant="level3" className="p-4 border-cyan-500/50 shadow-xl relative overflow-hidden">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-cyan-400" />
                      <span className="text-[11px] font-extrabold text-cyan-400 uppercase tracking-wider">
                        OFFICIAL UPDATE
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{msg.created_at}</span>
                  </div>

                  <h3 className="text-sm font-extrabold text-white mb-1 leading-snug">{announcement.title}</h3>
                  <p className="text-xs text-slate-200 leading-relaxed mb-3">{announcement.content}</p>

                  {/* Inline Acknowledgement Action */}
                  <div className="pt-2.5 border-t border-slate-700/60 flex items-center justify-between">
                    {currentUser?.role === 'teacher' ? (
                      isAckedByMe ? (
                        <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-xs">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>✓ Acknowledged</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => acknowledgeAnnouncement(announcement.id)}
                          className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs shadow-md shadow-cyan-400/20 active:scale-95 transition"
                        >
                          Acknowledge Update
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => navigateTo('acknowledgement_tracker', { announcementId: announcement.id })}
                        className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold hover:underline"
                      >
                        <span>{announcement.acknowledged_count}/{announcement.sent_to_count} Acknowledged</span>
                        <CheckCheck className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                </GlassCard>
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
                <span className="text-[10px] font-bold text-cyan-400 mb-1 ml-1">
                  {msg.sender_name} ({msg.sender_role})
                </span>
              )}

              <div
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  isMe
                    ? 'bg-cyan-500/20 border border-cyan-500/40 text-white rounded-br-xs'
                    : 'glass-level1 text-slate-200 rounded-bl-xs'
                }`}
              >
                <p>{msg.content}</p>

                <div className="flex items-center justify-end gap-1 mt-1.5 text-[9px] text-slate-400 font-mono">
                  <span>{msg.created_at}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-cyan-400" />}
                </div>
              </div>
            </div>
          );
        })}

      </main>

      {/* 3. STICKY COMPOSER (Fixed at bottom, shrink-0, zero overlap) */}
      <footer className="shrink-0 z-40 bg-[#070A11]/90 backdrop-blur-xl border-t border-slate-800">
        <MessageComposer
          onSendMessage={(text) => sendMessage(conversation.id, text)}
          placeholder={`Message ${conversation.name}...`}
        />
      </footer>

    </div>
  );
};
