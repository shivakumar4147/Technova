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
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto min-h-screen">
      
      {/* Bento Layout — 5 Clean Blocks */}
      <BentoGrid className="gap-3.5">
        
        {/* Block 1: Header & Greeting (Full Width) */}
        <BentoCard span="full" variant="level2" className="border-slate-700/50 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-cyan-950/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-extrabold text-white flex items-center gap-1.5">
                <span>Good morning, {currentUser?.display_name || 'Ramesh'}</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </h1>
              <p className="text-xs text-cyan-400 font-semibold mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{currentUser?.college_name || 'St. Aloysius PU College'}</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
        </BentoCard>

        {/* Block 2: Important Announcement (Full Width / Spotlight) */}
        {latestAnn && (
          <BentoCard span="full" variant="level3" className="border-cyan-500/40 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px] font-extrabold text-cyan-400 uppercase tracking-wider">
                  OFFICIAL ANNOUNCEMENT
                </span>
              </div>
              <Badge variant="cyan" size="sm">{latestAnn.announcement_type}</Badge>
            </div>

            <h3 className="text-sm font-extrabold text-white mb-1 leading-snug">{latestAnn.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3 line-clamp-2">{latestAnn.content}</p>

            <button
              onClick={() => navigateTo('group_chat')}
              className="w-full py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 font-extrabold text-xs border border-cyan-500/40 transition flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>View Notice & Acknowledge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </BentoCard>
        )}

        {/* Block 3: Next Event Overview */}
        <BentoCard span="full" variant="level2" className="border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Next Up Today</span>
            </span>
            <Badge variant="green" size="sm">ONGOING</Badge>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-sm font-extrabold text-white">{nextEvt.name}</h4>
              <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" />
                <span>Venue: {nextEvt.venue}</span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-extrabold text-cyan-400 font-mono">{nextEvt.start_time}</span>
              <p className="text-[10px] text-slate-400">Schedule</p>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
            <span>Delegation: <strong className="text-white">75 Students</strong></span>
            <button
              onClick={() => navigateTo('events')}
              className="text-cyan-400 font-bold text-xs hover:underline flex items-center gap-1"
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
          className="flex flex-col justify-between h-28"
        >
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-sm">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-white">Students Roster</h4>
            <p className="text-[10px] text-slate-400">Attendance toggles</p>
          </div>
        </BentoCard>

        {/* Block 5: Quick Action — Support & Issues */}
        <BentoCard
          span="col-1"
          variant="interactive"
          onClick={() => navigateTo('issues')}
          className="flex flex-col justify-between h-28"
        >
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-white">Raise Issue</h4>
            <p className="text-[10px] text-rose-400 font-semibold">{openIssuesCount} active report</p>
          </div>
        </BentoCard>

      </BentoGrid>

    </div>
  );
};
