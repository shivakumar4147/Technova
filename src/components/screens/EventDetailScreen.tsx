'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, MapPin, User, Clock } from 'lucide-react';

export const EventDetailScreen: React.FC = () => {
  const { events, workshops, colleges, navigateTo } = useApp();
  const evt = events[0]; // Technova 2026 National Tech Conclave

  return (
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#F8F8F8] dark:bg-[#0D1117] font-sans text-[#0F0F0F] dark:text-[#F0F6FC] transition-colors duration-200">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigateTo('events')}
          className="p-1.5 rounded-xl text-[#0F0F0F] dark:text-[#F0F6FC] hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-black text-[#0F0F0F] dark:text-[#F0F6FC]">Event Details</h2>
          <p className="text-[11px] text-[#64748B] dark:text-[#8B949E] font-medium">Venue, schedule, and participating colleges</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg bg-[#5DD62C] text-[#0F0F0F] shadow-xs uppercase tracking-wider">
            {evt.status}
          </span>
          <span className="text-xs font-mono text-[#337418] dark:text-[#5DD62C] font-bold">{evt.event_date}</span>
        </div>

        <h3 className="text-lg font-black text-[#0F0F0F] dark:text-[#F0F6FC] mb-2">{evt.name}</h3>
        <p className="text-xs text-[#475569] dark:text-[#8B949E] leading-relaxed mb-4">{evt.description}</p>

        <div className="space-y-2 p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-[#0F0F0F] dark:text-[#F0F6FC]">
            <Clock className="w-4 h-4 text-[#337418] dark:text-[#5DD62C] shrink-0" />
            <span className="font-semibold">{evt.start_time} - {evt.end_time}</span>
          </div>
          <div className="flex items-center gap-2 text-[#0F0F0F] dark:text-[#F0F6FC]">
            <MapPin className="w-4 h-4 text-[#337418] dark:text-[#5DD62C] shrink-0" />
            <span className="font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">{evt.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-[#0F0F0F] dark:text-[#F0F6FC]">
            <User className="w-4 h-4 text-[#337418] dark:text-[#5DD62C] shrink-0" />
            <span>Coordinator: Prof. Rajesh Sharma (+91 9811122233)</span>
          </div>
        </div>
      </div>

      {/* Participating Colleges */}
      <div className="mb-4">
        <h4 className="text-xs font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] uppercase tracking-wider mb-2.5 px-1">
          Participating Colleges ({colleges.length})
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {colleges.map(c => (
            <div key={c.id} className="p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 flex items-center gap-2.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-[#5DD62C]/15 text-[#337418] dark:text-[#5DD62C] flex items-center justify-center font-bold text-xs shrink-0">
                🏫
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#0F0F0F] dark:text-[#F0F6FC] truncate">{c.short_name}</p>
                <p className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-medium">{c.students_count} Students</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parallel Workshops Agenda */}
      <div>
        <h4 className="text-xs font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] uppercase tracking-wider mb-2.5 px-1">
          Parallel Workshop Tracks ({workshops.length})
        </h4>

        <div className="space-y-2.5">
          {workshops.map(wk => (
            <div key={wk.id} className="p-3.5 rounded-xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <h5 className="text-xs font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC]">{wk.name}</h5>
                <span className="text-[10px] font-extrabold text-[#2D6614] dark:text-[#5DD62C] bg-[#5DD62C]/20 border border-[#5DD62C]/50 px-2 py-0.5 rounded-lg">
                  {wk.start_time}
                </span>
              </div>
              <p className="text-[11px] text-[#475569] dark:text-[#8B949E] mb-2">{wk.description}</p>
              <div className="flex items-center justify-between text-[10px] text-[#337418] dark:text-[#5DD62C] font-bold">
                <span>📍 {wk.venue}</span>
                <span>👨‍🏫 {wk.coordinator_name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
