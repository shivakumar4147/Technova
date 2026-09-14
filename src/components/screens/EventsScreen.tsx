'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { MapPin, Users, Clock, ChevronRight } from 'lucide-react';

export const EventsScreen: React.FC = () => {
  const { events, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'completed'>('today');

  const filteredEvents = events.filter(e => {
    if (activeTab === 'today') return e.status === 'ONGOING';
    if (activeTab === 'upcoming') return e.status === 'UPCOMING';
    return e.status === 'COMPLETED';
  });

  return (
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#F8F8F8] dark:bg-[#0D1117] font-sans transition-colors duration-200">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-black text-[#0F0F0F] dark:text-[#F0F6FC]">Technova Events & Workshops</h2>
          <p className="text-[11px] text-[#64748B] dark:text-[#8B949E] font-medium">Schedule, venues, and college allocations</p>
        </div>
        <button
          onClick={() => navigateTo('workshops')}
          className="px-3.5 py-1.5 rounded-xl bg-[#5DD62C] text-[#0F0F0F] font-extrabold text-xs shadow-xs hover:bg-[#50b925] active:scale-95 transition border border-[#337418] cursor-pointer"
        >
          Workshops View
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-4">
        {(['today', 'upcoming', 'completed'] as const).map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition cursor-pointer ${
              activeTab === t
                ? 'bg-[#5DD62C] text-[#0F0F0F] shadow-xs'
                : 'bg-[#F1F5F9] dark:bg-[#161B22] text-[#475569] dark:text-[#8B949E] hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div className="space-y-3">
        {filteredEvents.map(evt => (
          <div
            key={evt.id}
            onClick={() => navigateTo('event_detail', { eventId: evt.id })}
            className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 hover:border-[#5DD62C] cursor-pointer transition-all shadow-xs"
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg tracking-wider uppercase ${
                evt.status === 'ONGOING'
                  ? 'bg-[#5DD62C] text-[#0F0F0F] shadow-xs'
                  : 'bg-[#5DD62C]/20 text-[#2D6614] dark:text-[#5DD62C] border border-[#5DD62C]/50'
              }`}>
                {evt.status}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-[#337418] dark:text-[#5DD62C] font-mono font-bold">
                <Clock className="w-3.5 h-3.5 text-[#337418] dark:text-[#5DD62C]" />
                <span>{evt.start_time} - {evt.end_time}</span>
              </div>
            </div>

            <h3 className="text-sm font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] mb-1">{evt.name}</h3>
            <p className="text-xs text-[#475569] dark:text-[#8B949E] line-clamp-2 mb-3 leading-relaxed">{evt.description}</p>

            <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-200/80 dark:border-slate-800 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-[#0F0F0F] dark:text-[#F0F6FC]">
                <MapPin className="w-3.5 h-3.5 text-[#337418] dark:text-[#5DD62C] shrink-0" />
                <span className="font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">{evt.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-[#64748B] dark:text-[#8B949E] text-[11px]">
                <Users className="w-3.5 h-3.5 text-[#64748B] dark:text-[#8B949E] shrink-0" />
                <span>{evt.participating_colleges_count} Colleges • {evt.registered_students_count} Registered Students</span>
              </div>
            </div>

            <div className="flex items-center justify-end mt-3 text-xs font-bold text-[#337418] dark:text-[#5DD62C] hover:underline gap-0.5">
              <span>View Full Schedule & Details</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12 text-[#64748B] dark:text-[#8B949E] text-xs font-medium bg-[#FFFFFF] dark:bg-[#161B22] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            No events scheduled under this section.
          </div>
        )}
      </div>

    </div>
  );
};
