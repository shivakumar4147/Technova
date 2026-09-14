'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Send } from 'lucide-react';

export const IssueDetailScreen: React.FC = () => {
  const { issues, screenParams, addIssueMessage, updateIssueStatus, currentUser, navigateTo } = useApp();
  const [replyText, setReplyText] = useState('');

  const issueId = screenParams?.issueId;
  const issue = issues.find(i => i.id === issueId) || issues[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !issue) return;
    addIssueMessage(issue.id, replyText.trim());
    setReplyText('');
  };

  if (!issue) return null;

  return (
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#F8F8F8] dark:bg-[#0D1117] font-sans text-[#0F0F0F] dark:text-[#F0F6FC] transition-colors duration-200">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('notifications')}
            className="p-1.5 rounded-xl text-[#0F0F0F] dark:text-[#F0F6FC] hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black text-[#0F0F0F] dark:text-[#F0F6FC]">Issue Resolution Detail</h2>
            <p className="text-[11px] text-[#64748B] dark:text-[#8B949E] font-medium">Ref ID: {issue.id}</p>
          </div>
        </div>

        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg uppercase tracking-wider ${
          issue.status === 'Open'
            ? 'bg-amber-500/20 text-amber-800 dark:text-amber-400 border border-amber-500/40'
            : issue.status === 'In progress'
            ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
            : 'bg-[#5DD62C] text-[#0F0F0F] shadow-xs'
        }`}>
          {issue.status}
        </span>
      </div>

      {/* Main Issue Card */}
      <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs mb-4 space-y-3">
        <h3 className="text-sm font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] mb-1">{issue.title}</h3>
        <p className="text-xs text-[#475569] dark:text-[#8B949E] leading-relaxed mb-3">{issue.description}</p>

        <div className="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-[#0F0F0F] dark:text-[#F0F6FC]">
          <div>
            <span className="text-[#64748B] dark:text-[#8B949E]">Reporter: </span>
            <span className="font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">{issue.creator_name}</span>
          </div>
          <span className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-mono">{issue.created_at}</span>
        </div>

        {/* Coordinator Resolution Controls */}
        {currentUser?.role !== 'teacher' && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-[#64748B] dark:text-[#8B949E] font-semibold">Change Status:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => updateIssueStatus(issue.id, 'In progress')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  issue.status === 'In progress' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-[#475569] dark:text-[#8B949E]'
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => updateIssueStatus(issue.id, 'Resolved')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  issue.status === 'Resolved' ? 'bg-[#5DD62C] text-[#0F0F0F] shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-[#475569] dark:text-[#8B949E]'
                }`}
              >
                Resolved
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Live Reply Thread */}
      <div className="mb-4">
        <h4 className="text-xs font-extrabold text-[#64748B] dark:text-[#8B949E] uppercase tracking-wider mb-2.5 px-1">
          Resolution Messages ({issue.messages.length})
        </h4>

        <div className="space-y-2.5">
          {issue.messages.map(msg => (
            <div key={msg.id} className="p-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC]">{msg.sender_name}</span>
                <span className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-mono">{msg.created_at}</span>
              </div>
              <p className="text-xs text-[#475569] dark:text-[#8B949E] leading-relaxed">{msg.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reply Input Form */}
      <div className="p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs">
        <form onSubmit={handleSendReply} className="flex items-center gap-2">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type reply or status update..."
            className="flex-1 bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-[#0F0F0F] dark:text-[#F0F6FC] placeholder-slate-400 focus:outline-none focus:border-[#5DD62C]"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0F0F0F] font-extrabold text-xs shadow-xs cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
};
