'use client';

import React, { useState } from 'react';
import { Plus, Send, Mic, Paperclip, Image as ImageIcon } from 'lucide-react';

interface MessageComposerProps {
  onSendMessage: (content: string, type?: 'text' | 'image' | 'voice') => void;
  placeholder?: string;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({
  onSendMessage,
  placeholder = 'Type a message...'
}) => {
  const [text, setText] = useState('');
  const [showAttachments, setShowAttachments] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text.trim());
    setText('');
    setShowAttachments(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#FFFFFF] dark:bg-[#161B22] backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-2 font-sans">
      <div className="max-w-md mx-auto relative">
        
        {/* Attachment Options Drawer */}
        {showAttachments && (
          <div className="absolute bottom-14 left-0 bg-[#FFFFFF] dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
            <button
              onClick={() => {
                onSendMessage('📷 Shared an event photo', 'image');
                setShowAttachments(false);
              }}
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0F0F0F] dark:text-[#F0F6FC] cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#5DD62C]/20 text-[#337418] dark:text-[#5DD62C] flex items-center justify-center font-bold">
                <ImageIcon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold">Photo</span>
            </button>

            <button
              onClick={() => {
                onSendMessage('📄 Shared event_schedule.pdf', 'text');
                setShowAttachments(false);
              }}
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0F0F0F] dark:text-[#F0F6FC] cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <Paperclip className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold">Document</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          {/* Add Attachment Button */}
          <button
            type="button"
            onClick={() => setShowAttachments(!showAttachments)}
            className="p-2 rounded-xl text-[#64748B] dark:text-[#8B949E] hover:text-[#0F0F0F] dark:hover:text-[#F0F6FC] hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Input field */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-slate-100 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-[#0F0F0F] dark:text-[#F0F6FC] placeholder-slate-400 focus:outline-none focus:border-[#5DD62C] transition"
            />
          </div>

          {/* Send or Voice Record Button */}
          {text.trim() ? (
            <button
              type="submit"
              className="w-9 h-9 rounded-2xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0F0F0F] flex items-center justify-center font-extrabold shadow-xs transition shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onSendMessage('🎙️ Voice message (0:12)', 'voice')}
              className="p-2 rounded-xl text-[#64748B] dark:text-[#8B949E] hover:text-[#0F0F0F] dark:hover:text-[#F0F6FC] hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0 cursor-pointer"
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
