'use client';

import React, { useState } from 'react';
import { Plus, Send, Mic, Paperclip, Image as ImageIcon, Smile } from 'lucide-react';

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
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0B0F17]/95 backdrop-blur-md border-t border-slate-800/80 px-3 py-2">
      <div className="max-w-md mx-auto relative">
        
        {/* Attachment Options Drawer */}
        {showAttachments && (
          <div className="absolute bottom-14 left-0 bg-[#131924] border border-slate-700/60 rounded-2xl p-2.5 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
            <button
              onClick={() => {
                onSendMessage('📷 Shared an event photo', 'image');
                setShowAttachments(false);
              }}
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-slate-800 text-slate-300"
            >
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <ImageIcon className="w-4 h-4" />
              </div>
              <span className="text-[10px]">Photo</span>
            </button>

            <button
              onClick={() => {
                onSendMessage('📄 Shared event_schedule.pdf', 'text');
                setShowAttachments(false);
              }}
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-slate-800 text-slate-300"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Paperclip className="w-4 h-4" />
              </div>
              <span className="text-[10px]">Document</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          {/* Add Attachment Button */}
          <button
            type="button"
            onClick={() => setShowAttachments(!showAttachments)}
            className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 transition"
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
              className="w-full bg-[#131924] border border-slate-700/80 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          {/* Send or Voice Record Button */}
          {text.trim() ? (
            <button
              type="submit"
              className="w-9 h-9 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black flex items-center justify-center font-bold shadow-md transition shrink-0"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onSendMessage('🎙️ Voice message (0:12)', 'voice')}
              className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 transition shrink-0"
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
