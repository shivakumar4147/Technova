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
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#0B0F17] font-sans text-[#F8FAFC]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('group_chat')}
            className="p-1.5 rounded-xl text-[#F8FAFC] hover:bg-[#1E293B] transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black text-[#F8FAFC]">Acknowledgement Tracker</h2>
            <p className="text-[10px] text-[#94A3B8]">Real-time announcement receipt control</p>
          </div>
        </div>

        <Badge variant="cyan" size="sm" className="font-mono">
          {ann.announcement_type}
        </Badge>
      </div>

      {/* Announcement Summary Card */}
      <div className="p-4 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-md mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-extrabold text-[#F8FAFC]">{ann.title}</h3>
          <span className="text-[10px] text-[#94A3B8] font-mono">{ann.created_at}</span>
        </div>

        <p className="text-xs text-[#94A3B8] mb-3">{ann.content}</p>

        {/* Real-time Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-[#5DD62C] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{ann.acknowledged_count} of {ann.sent_to_count} Teachers Acknowledged</span>
            </span>
            <span className="font-extrabold text-[#5DD62C] font-mono">{percentAck}%</span>
          </div>

          <div className="h-2.5 bg-[#1E293B] rounded-full overflow-hidden border border-[#334155] p-0.5">
            <div
              className="h-full bg-[#5DD62C] rounded-full transition-all duration-500 shadow-[0_0_10px_#5DD62C]"
              style={{ width: `${percentAck}%` }}
            />
          </div>
        </div>

        {/* 1-Click Reminder Button */}
        {ann.pending_users.length > 0 && (
          <div className="mt-4 pt-3 border-t border-[#1E293B] flex items-center justify-between">
            <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{ann.pending_users.length} teacher pending receipt</span>
            </span>

            <button
              onClick={handleReminder}
              disabled={reminderSent}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                reminderSent
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-amber-500 hover:bg-amber-400 text-black shadow-xs active:scale-95'
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
              ? 'bg-[#5DD62C] text-[#0B0F17] font-black'
              : 'bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC]'
          }`}
        >
          All ({ann.sent_to_count})
        </button>
        <button
          onClick={() => setActiveTab('acknowledged')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
            activeTab === 'acknowledged'
              ? 'bg-[#5DD62C] text-[#0B0F17] font-black'
              : 'bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC]'
          }`}
        >
          ✓ Acknowledged ({ann.acknowledged_count})
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
            activeTab === 'pending'
              ? 'bg-amber-500 text-black font-black'
              : 'bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC]'
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
            <div key={idx} className="p-3 rounded-2xl bg-[#111827] border border-[#1E293B] flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#5DD62C]/20 text-[#5DD62C] flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#F8FAFC]">{ack.user_name}</h5>
                  <p className="text-[10px] text-[#94A3B8]">{ack.college_name}</p>
                </div>
              </div>

              <div className="text-right">
                <Badge variant="green" size="sm">
                  Acknowledged
                </Badge>
                <p className="text-[9px] text-[#94A3B8] mt-0.5 font-mono">{ack.acknowledged_at}</p>
              </div>
            </div>
          ))}

        {/* Pending Teachers */}
        {(activeTab === 'all' || activeTab === 'pending') &&
          ann.pending_users.map((p, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-[#111827] border border-amber-500/30 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  ⚠
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#F8FAFC]">{p.user_name}</h5>
                  <p className="text-[10px] text-[#94A3B8]">{p.college_name}</p>
                </div>
              </div>

              <div className="text-right flex items-center gap-2">
                <Badge variant="amber" size="sm">
                  Pending
                </Badge>
                <button
                  onClick={handleReminder}
                  className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/40 transition cursor-pointer"
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
