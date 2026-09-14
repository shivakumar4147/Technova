'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Shield, Bell, CheckCircle2, AlertTriangle, Building2, Users, ArrowRight, Calendar, Megaphone, MapPin } from 'lucide-react';
import { BentoGrid, BentoCard } from '@/components/common/BentoGrid';
import { Badge } from '@/components/common/Badge';

export const AdminDashboardScreen: React.FC = () => {
  const { colleges, profiles, announcements, issues, events, navigateTo } = useApp();

  const totalTeachers = profiles.filter(p => p.role === 'teacher').length;
  const openIssues = issues.filter(i => i.status !== 'Resolved').length;
  const latestAnn = announcements[0];
  const nextEvt = events[0];

  return (
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto min-h-screen">
      
      {/* Bento Layout — Coordinator Operational Hub */}
      <BentoGrid className="gap-3.5">
        
        {/* Block 1: Header (Full Width) */}
        <BentoCard span="full" variant="level2" className="border-slate-700/50 bg-gradient-to-r from-slate-900/90 to-cyan-950/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-widest">
                  COORDINATOR CONTROL
                </span>
              </div>
              <h1 className="text-lg font-extrabold text-white">Technova Operational Hub</h1>
            </div>

            <button
              onClick={() => navigateTo('announcement_create')}
              className="px-3.5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs shadow-md flex items-center gap-1.5 transition active:scale-95"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Broadcast</span>
            </button>
          </div>
        </BentoCard>

        {/* Block 2: Key Operational Metrics (Col 2 / Col 1) */}
        <BentoCard
          span="col-1"
          variant="interactive"
          onClick={() => navigateTo('acknowledgement_tracker', { announcementId: latestAnn?.id })}
          className="flex flex-col justify-between h-32"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase">Acknowledgement</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">87.5%</span>
            <p className="text-[10px] text-slate-300 mt-0.5 font-semibold">7 / 8 Teachers ACK</p>
          </div>
        </BentoCard>

        <BentoCard
          span="col-1"
          variant="interactive"
          onClick={() => navigateTo('issues')}
          className="flex flex-col justify-between h-32"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase">Open Issues</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-rose-400 font-mono">{openIssues}</span>
            <p className="text-[10px] text-rose-300 mt-0.5 font-semibold">Requires Action</p>
          </div>
        </BentoCard>

        {/* Block 3: Active Event Spotlight */}
        <BentoCard span="full" variant="level2" className="border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Event</span>
            <Badge variant="green" size="sm">11:00 AM</Badge>
          </div>
          <h3 className="text-sm font-extrabold text-white mb-0.5">{nextEvt.name}</h3>
          <p className="text-xs text-slate-300 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-cyan-400" />
            <span>Venue: {nextEvt.venue} • 75 registered students</span>
          </p>
        </BentoCard>

        {/* Block 4: Quick Action — Broadcast Notice */}
        <BentoCard
          span="full"
          variant="interactive"
          onClick={() => navigateTo('announcement_create')}
          className="flex items-center justify-between py-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-sm">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white">+ Create Official Announcement</h4>
              <p className="text-[10px] text-slate-400">Targeted notice with acknowledgement tracking</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-cyan-400" />
        </BentoCard>

        {/* Block 5: Quick Action — Colleges Directory */}
        <BentoCard
          span="full"
          variant="interactive"
          onClick={() => navigateTo('colleges')}
          className="flex items-center justify-between py-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white">PU Colleges Directory ({colleges.length})</h4>
              <p className="text-[10px] text-slate-400">Manage institutions & assign lead coordinators</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-cyan-400" />
        </BentoCard>

      </BentoGrid>

    </div>
  );
};
