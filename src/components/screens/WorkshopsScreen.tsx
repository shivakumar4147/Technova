'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, MapPin, Clock, Users, User, Phone, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/common/Badge';

export const WorkshopsScreen: React.FC = () => {
  const { workshops, navigateTo } = useApp();

  return (
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#0B0F17] font-sans text-[#F8FAFC]">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigateTo('events')}
          className="p-1.5 rounded-xl text-[#F8FAFC] hover:bg-[#1E293B] transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-black text-[#F8FAFC]">Technova Workshops</h2>
          <p className="text-[11px] text-[#94A3B8] font-medium">Allocated halls, capacities & instructors</p>
        </div>
      </div>

      {/* Workshop Cards */}
      <div className="space-y-3">
        {workshops.map(wk => (
          <div key={wk.id} className="p-4 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg tracking-wider uppercase ${
                wk.status === 'ONGOING'
                  ? 'bg-[#5DD62C] text-[#0B0F17] shadow-xs'
                  : 'bg-[#5DD62C]/20 text-[#5DD62C] border border-[#5DD62C]/50'
              }`}>
                {wk.status}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-[#5DD62C] font-mono font-bold">
                <Clock className="w-3.5 h-3.5 text-[#5DD62C]" />
                <span>{wk.start_time} - {wk.end_time}</span>
              </div>
            </div>

            <h3 className="text-sm font-extrabold text-[#F8FAFC] mb-1">{wk.name}</h3>
            <p className="text-xs text-[#94A3B8] mb-3 leading-relaxed">{wk.description}</p>

            <div className="p-3 rounded-xl bg-[#1E293B] border border-[#334155] space-y-1.5 text-xs mb-3">
              <div className="flex items-center gap-2 text-[#F8FAFC]">
                <MapPin className="w-3.5 h-3.5 text-[#5DD62C] shrink-0" />
                <span className="font-bold text-[#F8FAFC]">{wk.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-[#F8FAFC]">
                <User className="w-3.5 h-3.5 text-[#5DD62C] shrink-0" />
                <span>Instructor: {wk.coordinator_name} ({wk.coordinator_phone})</span>
              </div>
            </div>

            {/* Capacity & Enrolled Pill */}
            <div className="flex items-center justify-between pt-2.5 border-t border-[#1E293B] text-xs">
              <span className="text-[#94A3B8] text-[11px] font-medium">
                Capacity: <strong className="text-[#F8FAFC]">{wk.capacity}</strong>
              </span>
              <span className="text-[#5DD62C] font-extrabold text-[11px] bg-[#5DD62C]/20 px-2.5 py-1 rounded-lg border border-[#5DD62C]/50">
                {wk.enrolled_students} Students Enrolled
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
