'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Bell, Calendar, Users, AlertTriangle, ArrowRight, CheckCircle2, MapPin, Clock, UserCheck, Sparkles } from 'lucide-react';
import { BentoGrid, BentoCard } from '@/components/common/BentoGrid';
import { Badge } from '@/components/common/Badge';

export const TeacherDashboardScreen: React.FC = () => {
  const { currentUser, announcements, events, issues, navigateTo } = useApp();

  const latestAnn = announcements[0];
  const nextEvt = events[0];
  const openIssuesCount = issues.filter(i => i.status !== 'Resolved').length;

  return (
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#0B0F17] text-[#F8FAFC] font-sans">
      
      {/* Bento Layout — 5 Clean Blocks */}
      <BentoGrid className="gap-3.5">
        
        {/* Block 1: Header & Greeting (Full Width) */}
        <BentoCard span="full" variant="level2" className="border-[#1E293B] bg-[#111827]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-black text-[#F8FAFC] flex items-center gap-1.5">
                <span>Good morning, {currentUser?.display_name || 'Ramesh'}</span>
                <Sparkles className="w-4 h-4 text-[#5DD62C]" />
              </h1>
              <p className="text-xs text-[#5DD62C] font-extrabold mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#5DD62C]" />
                <span>{currentUser?.college_name || 'St. Aloysius PU College'}</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-[#5DD62C]/15 border border-[#5DD62C]/40 flex items-center justify-center text-[#5DD62C] font-bold text-sm">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
        </BentoCard>

        {/* Block 2: Important Announcement (Full Width / Spotlight) */}
        {latestAnn && (
          <BentoCard span="full" variant="level3" className="border-[#5DD62C]/40 bg-[#111827] relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-[#5DD62C]" />
                <span className="text-[11px] font-extrabold text-[#5DD62C] uppercase tracking-wider">
                  OFFICIAL ANNOUNCEMENT
                </span>
              </div>
              <Badge variant="cyan" size="sm">{latestAnn.announcement_type}</Badge>
            </div>

            <h3 className="text-sm font-black text-[#F8FAFC] mb-1 leading-snug">{latestAnn.title}</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed mb-3 line-clamp-2">{latestAnn.content}</p>

            <button
              onClick={() => navigateTo('group_chat')}
              className="w-full py-2.5 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0B0F17] font-black text-xs shadow-xs transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <span>View Notice & Acknowledge</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0B0F17]" />
            </button>
          </BentoCard>
        )}

        {/* Block 3: Next Event Overview */}
        <BentoCard span="full" variant="level2" className="border-[#1E293B] bg-[#111827]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#5DD62C]" />
              <span>Next Up Today</span>
            </span>
            <Badge variant="green" size="sm">ONGOING</Badge>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-sm font-black text-[#F8FAFC]">{nextEvt.name}</h4>
              <p className="text-xs text-[#94A3B8] mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#5DD62C]" />
                <span>Venue: {nextEvt.venue}</span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-[#5DD62C] font-mono">{nextEvt.start_time}</span>
              <p className="text-[10px] text-[#94A3B8]">Schedule</p>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#1E293B] flex items-center justify-between text-xs text-[#94A3B8]">
            <span>Delegation: <strong className="text-[#F8FAFC]">75 Students</strong></span>
            <button
              onClick={() => navigateTo('events')}
              className="text-[#5DD62C] font-black text-xs hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Full Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </BentoCard>

        {/* Block 4: Quick Action — Students Roster */}
        <BentoCard
          span="col-1"
          variant="interactive"
          onClick={() => navigateTo('students')}
          className="flex flex-col justify-between h-28 bg-[#111827] border-[#1E293B]"
        >
          <div className="w-8 h-8 rounded-xl bg-[#5DD62C]/15 text-[#5DD62C] flex items-center justify-center font-bold text-sm border border-[#5DD62C]/30">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-[#F8FAFC]">Students Roster</h4>
            <p className="text-[10px] text-[#94A3B8]">Attendance toggles</p>
          </div>
        </BentoCard>

        {/* Block 5: Quick Action — Support & Issues */}
        <BentoCard
          span="col-1"
          variant="interactive"
          onClick={() => navigateTo('issues')}
          className="flex flex-col justify-between h-28 bg-[#111827] border-[#1E293B]"
        >
          <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm border border-rose-500/30">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-[#F8FAFC]">Raise Issue</h4>
            <p className="text-[10px] text-rose-400 font-semibold">{openIssuesCount} active report</p>
          </div>
        </BentoCard>

      </BentoGrid>

    </div>
  );
};
