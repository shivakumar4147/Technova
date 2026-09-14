'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, CheckCircle2, Clock, BellRing, Phone, Send, ShieldCheck, AlertCircle } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/common/Badge';

export const AcknowledgementTrackerScreen: React.FC = () => {
  const { announcements, sendAnnouncementReminder, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'acknowledged' | 'pending'>('all');
  const [reminderSent, setReminderSent] = useState(false);

  const ann = announcements[0]; // Cybersecurity Workshop venue shift announcement

  const percentAck = Math.round((ann.acknowledged_count / ann.sent_to_count) * 100);

  const handleReminder = () => {
    sendAnnouncementReminder(ann.id);
    setReminderSent(true);
    setTimeout(() => setReminderSent(false), 3000);
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('group_chat')}
            className="p-1.5 rounded-xl text-slate-300 hover:bg-slate-800/80 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-bold text-white">Acknowledgement Tracker</h2>
            <p className="text-[10px] text-slate-400">Real-time announcement receipt control</p>
          </div>
        </div>

        <Badge variant="cyan" size="sm" className="font-mono">
          {ann.announcement_type}
        </Badge>
      </div>

      {/* Announcement Summary Card */}
      <GlassCard variant="bright" className="p-4 border-cyan-500/40 mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-extrabold text-white">{ann.title}</h3>
          <span className="text-[10px] text-slate-400 font-mono">{ann.created_at}</span>
        </div>

        <p className="text-xs text-slate-300 mb-3">{ann.content}</p>

        {/* Real-time Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{ann.acknowledged_count} of {ann.sent_to_count} Teachers Acknowledged</span>
            </span>
            <span className="font-extrabold text-cyan-400 font-mono">{percentAck}%</span>
          </div>

          <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_10px_#00F0FF]"
              style={{ width: `${percentAck}%` }}
            />
          </div>
        </div>

        {/* 1-Click Reminder Button */}
        {ann.pending_users.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-amber-300 font-semibold flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{ann.pending_users.length} teacher pending receipt</span>
            </span>

            <button
              onClick={handleReminder}
              disabled={reminderSent}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                reminderSent
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/20 active:scale-95'
              }`}
            >
              <BellRing className="w-3.5 h-3.5" />
              <span>{reminderSent ? 'Reminder Sent!' : 'Send Reminder'}</span>
            </button>
          </div>
        )}
      </GlassCard>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
            activeTab === 'all'
              ? 'bg-cyan-500 text-black font-bold'
              : 'bg-slate-800/60 text-slate-400'
          }`}
        >
          All ({ann.sent_to_count})
        </button>
        <button
          onClick={() => setActiveTab('acknowledged')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
            activeTab === 'acknowledged'
              ? 'bg-emerald-500 text-black font-bold'
              : 'bg-slate-800/60 text-slate-400'
          }`}
        >
          ✓ Acknowledged ({ann.acknowledged_count})
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
            activeTab === 'pending'
              ? 'bg-amber-500 text-black font-bold'
              : 'bg-slate-800/60 text-slate-400'
          }`}
        >
          ⚠ Pending ({ann.pending_users.length})
        </button>
      </div>

      {/* Teacher Status Breakdown List */}
      <div className="space-y-2">
        
        {/* Acknowledged Teachers */}
        {(activeTab === 'all' || activeTab === 'acknowledged') &&
          ann.acknowledgements.map((ack, idx) => (
            <GlassCard key={idx} className="p-3 flex items-center justify-between border-emerald-500/20 bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">{ack.user_name}</h5>
                  <p className="text-[10px] text-slate-400">{ack.college_name}</p>
                </div>
              </div>

              <div className="text-right">
                <Badge variant="green" size="sm">
                  Acknowledged
                </Badge>
                <p className="text-[9px] text-slate-400 mt-0.5 font-mono">{ack.acknowledged_at}</p>
              </div>
            </GlassCard>
          ))}

        {/* Pending Teachers */}
        {(activeTab === 'all' || activeTab === 'pending') &&
          ann.pending_users.map((p, idx) => (
            <GlassCard key={idx} className="p-3 flex items-center justify-between border-amber-500/30 bg-amber-950/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  ⚠
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">{p.user_name}</h5>
                  <p className="text-[10px] text-slate-400">{p.college_name}</p>
                </div>
              </div>

              <div className="text-right flex items-center gap-2">
                <Badge variant="amber" size="sm">
                  Pending
                </Badge>
                <button
                  onClick={handleReminder}
                  className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/40 transition"
                  title="Send Direct Reminder"
                >
                  <BellRing className="w-3.5 h-3.5" />
                </button>
              </div>
            </GlassCard>
          ))}

      </div>

    </div>
  );
};
