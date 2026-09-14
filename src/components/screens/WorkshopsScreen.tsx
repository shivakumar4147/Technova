'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, MapPin, Clock, Users, User, Phone, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/common/Badge';

export const WorkshopsScreen: React.FC = () => {
  const { workshops, navigateTo } = useApp();

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigateTo('events')}
          className="p-1.5 rounded-xl text-slate-300 hover:bg-slate-800/80 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-bold text-white">Technova Workshops</h2>
          <p className="text-[10px] text-slate-400">Allocated halls, capacities & instructors</p>
        </div>
      </div>

      {/* Workshop Cards */}
      <div className="space-y-3">
        {workshops.map(wk => (
          <GlassCard key={wk.id} variant="bright" className="p-4 border-cyan-500/30">
            <div className="flex items-center justify-between mb-2">
              <Badge variant={wk.status === 'ONGOING' ? 'green' : 'cyan'}>
                {wk.status}
              </Badge>
              <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-mono">
                <Clock className="w-3 h-3" />
                <span>{wk.start_time} - {wk.end_time}</span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-white mb-1">{wk.name}</h3>
            <p className="text-xs text-slate-300 mb-3">{wk.description}</p>

            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 text-xs mb-3">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-semibold text-white">{wk.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <User className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Instructor: {wk.coordinator_name} ({wk.coordinator_phone})</span>
              </div>
            </div>

            {/* Capacity & Enrolled Pill */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <span className="text-slate-400 text-[11px]">
                Capacity: <strong className="text-white">{wk.capacity}</strong>
              </span>
              <span className="text-cyan-400 font-bold text-xs bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                {wk.enrolled_students} Students Enrolled
              </span>
            </div>
          </GlassCard>
        ))}
      </div>

    </div>
  );
};
