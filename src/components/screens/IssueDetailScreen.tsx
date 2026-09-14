'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, CheckCircle2, Clock, Send, Shield, AlertTriangle } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/common/Badge';

export const IssueDetailScreen: React.FC = () => {
  const { issues, addIssueMessage, updateIssueStatus, currentUser, navigateTo } = useApp();
  const [replyText, setReplyText] = useState('');

  const issue = issues[0]; // Bus delay issue

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addIssueMessage(issue.id, replyText.trim());
    setReplyText('');
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('issues')}
            className="p-1.5 rounded-xl text-slate-300 hover:bg-slate-800/80 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-bold text-white">Issue Resolution Detail</h2>
            <p className="text-[10px] text-slate-400">Ref ID: {issue.id}</p>
          </div>
        </div>

        <Badge
          variant={issue.status === 'Open' ? 'red' : issue.status === 'In progress' ? 'amber' : 'green'}
          size="md"
        >
          {issue.status}
        </Badge>
      </div>

      {/* Main Issue Card */}
      <GlassCard variant="bright" className="p-4 border-amber-500/40 mb-4">
        <h3 className="text-sm font-extrabold text-white mb-1">{issue.title}</h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-3">{issue.description}</p>

        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <div>
            <span className="text-slate-400">Reporter: </span>
            <span className="font-bold text-white">{issue.creator_name}</span>
          </div>
          <span className="text-[10px] text-cyan-400 font-mono">{issue.created_at}</span>
        </div>

        {/* Coordinator Resolution Controls */}
        {currentUser?.role !== 'teacher' && (
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-semibold">Change Status:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => updateIssueStatus(issue.id, 'In progress')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  issue.status === 'In progress' ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-300'
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => updateIssueStatus(issue.id, 'Resolved')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  issue.status === 'Resolved' ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Resolved
              </button>
            </div>
          </div>
        )}
      </GlassCard>

      {/* Live Reply Thread */}
      <div className="mb-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
          Resolution Messages ({issue.messages.length})
        </h4>

        <div className="space-y-2.5">
          {issue.messages.map(msg => (
            <GlassCard key={msg.id} className="p-3 bg-slate-900/80 border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-cyan-300">{msg.sender_name}</span>
                <span className="text-[9px] text-slate-400 font-mono">{msg.created_at}</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">{msg.message}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Reply Input Form */}
      <GlassCard className="p-3 border-cyan-500/30">
        <form onSubmit={handleSendReply} className="flex items-center gap-2">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type reply or status update..."
            className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs shadow"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </GlassCard>

    </div>
  );
};
