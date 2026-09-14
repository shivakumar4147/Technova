'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Calendar, MapPin, Users, User, Clock, CheckCircle2, Shield } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/common/Badge';

export const EventDetailScreen: React.FC = () => {
  const { events, workshops, colleges, navigateTo } = useApp();
  const evt = events[0]; // Technova 2026 National Tech Conclave

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
          <h2 className="text-base font-bold text-white">Event Details</h2>
          <p className="text-[10px] text-slate-400">Venue, schedule, and participating colleges</p>
        </div>
      </div>

      {/* Main Card */}
      <GlassCard variant="bright" className="p-5 border-cyan-500/40 mb-4">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="green" size="md">
            {evt.status}
          </Badge>
          <span className="text-xs font-mono text-cyan-400 font-bold">{evt.event_date}</span>
        </div>

        <h3 className="text-lg font-extrabold text-white mb-2">{evt.name}</h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">{evt.description}</p>

        <div className="space-y-2 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{evt.start_time} - {evt.end_time}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="font-semibold text-white">{evt.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <User className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Coordinator: Prof. Rajesh Sharma (+91 9811122233)</span>
          </div>
        </div>
      </GlassCard>

      {/* Participating Colleges */}
      <div className="mb-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
          Participating Colleges ({colleges.length})
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {colleges.map(c => (
            <GlassCard key={c.id} className="p-2.5 flex items-center gap-2 border-slate-800">
              <div className="w-7 h-7 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xs">
                🏫
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{c.short_name}</p>
                <p className="text-[9px] text-slate-400">{c.students_count} Students</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Parallel Workshops Agenda */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
          Parallel Workshop Tracks ({workshops.length})
        </h4>

        <div className="space-y-2.5">
          {workshops.map(wk => (
            <GlassCard key={wk.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <h5 className="text-xs font-bold text-white">{wk.name}</h5>
                <Badge variant={wk.status === 'ONGOING' ? 'green' : 'cyan'} size="sm">
                  {wk.start_time}
                </Badge>
              </div>
              <p className="text-[11px] text-slate-400 mb-2">{wk.description}</p>
              <div className="flex items-center justify-between text-[10px] text-cyan-300 font-medium">
                <span>📍 {wk.venue}</span>
                <span>👨‍🏫 {wk.coordinator_name}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

    </div>
  );
};
