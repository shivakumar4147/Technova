'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, MapPin, Clock, User } from 'lucide-react';

export const WorkshopsScreen: React.FC = () => {
  const { workshops, navigateTo } = useApp();

  return (
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#F8F8F8] dark:bg-[#0D1117] font-sans transition-colors duration-200">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigateTo('events')}
          className="p-1.5 rounded-xl text-[#0F0F0F] dark:text-[#F0F6FC] hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-black text-[#0F0F0F] dark:text-[#F0F6FC]">Technova Workshops</h2>
          <p className="text-[11px] text-[#64748B] dark:text-[#8B949E] font-medium">Allocated halls, capacities & instructors</p>
        </div>
      </div>

      {/* Workshop Cards */}
      <div className="space-y-3">
        {workshops.map(wk => (
          <div key={wk.id} className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg tracking-wider uppercase ${
                wk.status === 'ONGOING'
                  ? 'bg-[#5DD62C] text-[#0F0F0F] shadow-xs'
                  : 'bg-[#5DD62C]/20 text-[#2D6614] dark:text-[#5DD62C] border border-[#5DD62C]/50'
              }`}>
                {wk.status}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-[#337418] dark:text-[#5DD62C] font-mono font-bold">
                <Clock className="w-3.5 h-3.5 text-[#337418] dark:text-[#5DD62C]" />
                <span>{wk.start_time} - {wk.end_time}</span>
              </div>
            </div>

            <h3 className="text-sm font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] mb-1">{wk.name}</h3>
            <p className="text-xs text-[#475569] dark:text-[#8B949E] mb-3 leading-relaxed">{wk.description}</p>

            <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs mb-3">
              <div className="flex items-center gap-2 text-[#0F0F0F] dark:text-[#F0F6FC]">
                <MapPin className="w-3.5 h-3.5 text-[#337418] dark:text-[#5DD62C] shrink-0" />
                <span className="font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">{wk.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-[#0F0F0F] dark:text-[#F0F6FC]">
                <User className="w-3.5 h-3.5 text-[#337418] dark:text-[#5DD62C] shrink-0" />
                <span>Instructor: {wk.coordinator_name} ({wk.coordinator_phone})</span>
              </div>
            </div>

            {/* Capacity & Enrolled Pill */}
            <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-[#64748B] dark:text-[#8B949E] text-[11px] font-medium">
                Capacity: <strong className="text-[#0F0F0F] dark:text-[#F0F6FC]">{wk.capacity}</strong>
              </span>
              <span className="text-[#2D6614] dark:text-[#5DD62C] font-extrabold text-[11px] bg-[#5DD62C]/20 px-2.5 py-1 rounded-lg border border-[#5DD62C]/50">
                {wk.enrolled_students} Students Enrolled
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
