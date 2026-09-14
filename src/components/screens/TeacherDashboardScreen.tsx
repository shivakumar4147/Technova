'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Bell, Users, AlertTriangle, ArrowRight, MapPin, Clock, UserCheck, Sparkles } from 'lucide-react';
import { BentoGrid, BentoCard } from '@/components/common/BentoGrid';

export const TeacherDashboardScreen: React.FC = () => {
  const { currentUser, announcements, events, issues, navigateTo } = useApp();

  const latestAnn = announcements[0];
  const nextEvt = events[0];
  const openIssuesCount = issues.filter(i => i.status !== 'Resolved').length;

  return (
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#F8F8F8] dark:bg-[#0D1117] font-sans transition-colors duration-200">
      
      {/* Bento Layout — 5 Clean Blocks */}
      <BentoGrid className="gap-3.5">
        
        {/* Block 1: Header & Greeting (Full Width) */}
        <BentoCard span="full" variant="level2" className="border-slate-200 dark:border-slate-800 bg-[#FFFFFF] dark:bg-[#161B22]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] flex items-center gap-1.5">
                <span>Good morning, {currentUser?.display_name || 'Ramesh'}</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </h1>
              <p className="text-xs text-[#337418] dark:text-[#5DD62C] font-semibold mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{currentUser?.college_name || 'St. Aloysius PU College'}</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-[#5DD62C]/20 border border-[#5DD62C]/40 flex items-center justify-center text-[#337418] dark:text-[#5DD62C] font-bold text-sm">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
        </BentoCard>

        {/* Block 2: Important Announcement (Full Width / Spotlight) */}
        {latestAnn && (
          <BentoCard span="full" variant="level3" className="border-[#5DD62C]/40 bg-[#FFFFFF] dark:bg-[#161B22] relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-[#337418] dark:text-[#5DD62C]" />
                <span className="text-[11px] font-extrabold text-[#337418] dark:text-[#5DD62C] uppercase tracking-wider">
                  OFFICIAL ANNOUNCEMENT
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-[#5DD62C]/20 text-[#2D6614] dark:text-[#5DD62C] border border-[#5DD62C]/40 uppercase">
                {latestAnn.announcement_type}
              </span>
            </div>

            <h3 className="text-sm font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] mb-1 leading-snug">{latestAnn.title}</h3>
            <p className="text-xs text-[#475569] dark:text-[#8B949E] leading-relaxed mb-3 line-clamp-2">{latestAnn.content}</p>

            <button
              onClick={() => navigateTo('group_chat')}
              className="w-full py-2.5 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0F0F0F] font-black text-xs transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-xs"
            >
              <span>View Notice & Acknowledge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </BentoCard>
        )}

        {/* Block 3: Next Event Overview */}
        <BentoCard span="full" variant="level2" className="border-slate-200 dark:border-slate-800 bg-[#FFFFFF] dark:bg-[#161B22]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#64748B] dark:text-[#8B949E] uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Next Up Today</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 uppercase">
              ONGOING
            </span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-sm font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC]">{nextEvt.name}</h4>
              <p className="text-xs text-[#475569] dark:text-[#8B949E] mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#337418] dark:text-[#5DD62C]" />
                <span>Venue: {nextEvt.venue}</span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-extrabold text-[#337418] dark:text-[#5DD62C] font-mono">{nextEvt.start_time}</span>
              <p className="text-[10px] text-[#64748B] dark:text-[#8B949E]">Schedule</p>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-[#475569] dark:text-[#8B949E]">
            <span>Delegation: <strong className="text-[#0F0F0F] dark:text-[#F0F6FC]">75 Students</strong></span>
            <button
              onClick={() => navigateTo('events')}
              className="text-[#337418] dark:text-[#5DD62C] font-bold text-xs hover:underline flex items-center gap-1 cursor-pointer"
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
          className="flex flex-col justify-between h-28 bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-[#5DD62C]/20 text-[#337418] dark:text-[#5DD62C] flex items-center justify-center font-bold text-sm">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC]">Students Roster</h4>
            <p className="text-[10px] text-[#64748B] dark:text-[#8B949E]">Attendance toggles</p>
          </div>
        </BentoCard>

        {/* Block 5: Quick Action — Support & Issues */}
        <BentoCard
          span="col-1"
          variant="interactive"
          onClick={() => navigateTo('issues')}
          className="flex flex-col justify-between h-28 bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC]">Raise Issue</h4>
            <p className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">{openIssuesCount} active report</p>
          </div>
        </BentoCard>

      </BentoGrid>

    </div>
  );
};
