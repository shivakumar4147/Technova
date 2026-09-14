'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Calendar, MapPin, Users, Clock, ChevronRight, Shield, ArrowLeft } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/common/Badge';

export const EventsScreen: React.FC = () => {
  const { events, workshops, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'completed'>('today');

  const filteredEvents = events.filter(e => {
    if (activeTab === 'today') return e.status === 'ONGOING';
    if (activeTab === 'upcoming') return e.status === 'UPCOMING';
    return e.status === 'COMPLETED';
  });

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-white">Technova Events & Workshops</h2>
          <p className="text-[10px] text-slate-400">Schedule, venues, and college allocations</p>
        </div>
        <button
          onClick={() => navigateTo('workshops')}
          className="px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 font-bold text-xs border border-cyan-500/30 hover:bg-cyan-500/20 transition"
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
            className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition ${
              activeTab === t
                ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div className="space-y-3">
        {filteredEvents.map(evt => (
          <GlassCard
            key={evt.id}
            variant="bright"
            onClick={() => navigateTo('event_detail', { eventId: evt.id })}
            className="p-4 border-cyan-500/30 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <Badge variant={evt.status === 'ONGOING' ? 'green' : 'cyan'}>
                {evt.status}
              </Badge>
              <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-mono">
                <Clock className="w-3 h-3" />
                <span>{evt.start_time} - {evt.end_time}</span>
              </div>
            </div>

            <h3 className="text-sm font-extrabold text-white mb-1">{evt.name}</h3>
            <p className="text-xs text-slate-300 line-clamp-2 mb-3">{evt.description}</p>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-semibold text-white">{evt.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{evt.participating_colleges_count} Colleges • {evt.registered_students_count} Registered Students</span>
              </div>
            </div>

            <div className="flex items-center justify-end mt-3 text-xs font-bold text-cyan-400">
              <span>View Full Schedule & Details</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </GlassCard>
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-xs">
            No events scheduled under this section.
          </div>
        )}
      </div>

    </div>
  );
};
