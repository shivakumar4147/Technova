'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, CheckCircle2, BellRing, AlertCircle } from 'lucide-react';

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
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#F8F8F8] dark:bg-[#0D1117] font-sans text-[#0F0F0F] dark:text-[#F0F6FC] transition-colors duration-200">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('group_chat')}
            className="p-1.5 rounded-xl text-[#0F0F0F] dark:text-[#F0F6FC] hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black text-[#0F0F0F] dark:text-[#F0F6FC]">Acknowledgement Tracker</h2>
            <p className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-medium">Real-time announcement receipt control</p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-md bg-[#5DD62C]/20 text-[#2D6614] dark:text-[#5DD62C] font-mono text-[10px] font-extrabold border border-[#5DD62C]/40">
          {ann.announcement_type}
        </span>
      </div>

      {/* Announcement Summary Card */}
      <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC]">{ann.title}</h3>
          <span className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-mono">{ann.created_at}</span>
        </div>

        <p className="text-xs text-[#475569] dark:text-[#8B949E] mb-3">{ann.content}</p>

        {/* Real-time Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-[#337418] dark:text-[#5DD62C] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{ann.acknowledged_count} of {ann.sent_to_count} Teachers Acknowledged</span>
            </span>
            <span className="font-extrabold text-[#337418] dark:text-[#5DD62C] font-mono">{percentAck}%</span>
          </div>

          <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 p-0.5">
            <div
              className="h-full bg-[#5DD62C] rounded-full transition-all duration-500"
              style={{ width: `${percentAck}%` }}
            />
          </div>
        </div>

        {/* 1-Click Reminder Button */}
        {ann.pending_users.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{ann.pending_users.length} teacher pending receipt</span>
            </span>

            <button
              onClick={handleReminder}
              disabled={reminderSent}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                reminderSent
                  ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                  : 'bg-[#5DD62C] hover:bg-[#50b925] text-[#0F0F0F] font-black shadow-xs active:scale-95'
              }`}
            >
              <BellRing className="w-3.5 h-3.5" />
              <span>{reminderSent ? 'Reminder Sent!' : 'Send Reminder'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#5DD62C] text-[#0F0F0F] font-bold'
              : 'bg-[#FFFFFF] dark:bg-[#161B22] text-[#64748B] dark:text-[#8B949E] border border-slate-200 dark:border-slate-800'
          }`}
        >
          All ({ann.sent_to_count})
        </button>
        <button
          onClick={() => setActiveTab('acknowledged')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
            activeTab === 'acknowledged'
              ? 'bg-[#5DD62C] text-[#0F0F0F] font-bold'
              : 'bg-[#FFFFFF] dark:bg-[#161B22] text-[#64748B] dark:text-[#8B949E] border border-slate-200 dark:border-slate-800'
          }`}
        >
          ✓ Acknowledged ({ann.acknowledged_count})
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
            activeTab === 'pending'
              ? 'bg-amber-500 text-white font-bold'
              : 'bg-[#FFFFFF] dark:bg-[#161B22] text-[#64748B] dark:text-[#8B949E] border border-slate-200 dark:border-slate-800'
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
            <div key={idx} className="p-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">{ack.user_name}</h5>
                  <p className="text-[10px] text-[#64748B] dark:text-[#8B949E]">{ack.college_name}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 uppercase">
                  Acknowledged
                </span>
                <p className="text-[9px] text-[#64748B] dark:text-[#8B949E] mt-0.5 font-mono">{ack.acknowledged_at}</p>
              </div>
            </div>
          ))}

        {/* Pending Teachers */}
        {(activeTab === 'all' || activeTab === 'pending') &&
          ann.pending_users.map((p, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-amber-200 dark:border-amber-900/50 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  ⚠
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">{p.user_name}</h5>
                  <p className="text-[10px] text-[#64748B] dark:text-[#8B949E]">{p.college_name}</p>
                </div>
              </div>

              <div className="text-right flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 uppercase">
                  Pending
                </span>
                <button
                  onClick={handleReminder}
                  className="p-1.5 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-300 hover:bg-amber-500/40 transition cursor-pointer"
                  title="Send Direct Reminder"
                >
                  <BellRing className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

      </div>

    </div>
  );
};
