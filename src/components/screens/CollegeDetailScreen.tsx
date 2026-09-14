'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, UserCheck, MessageSquare, Phone } from 'lucide-react';

export const CollegeDetailScreen: React.FC = () => {
  const { colleges, profiles, navigateTo, setActiveConversationId } = useApp();
  const college = colleges[0]; // St. Aloysius PU College

  const facultyMembers = profiles.filter(p => p.college_id === college.id);

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#F8F8F8] dark:bg-[#0D1117] font-sans text-[#0F0F0F] dark:text-[#F0F6FC] transition-colors duration-200">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigateTo('colleges')}
          className="p-1.5 rounded-xl text-[#0F0F0F] dark:text-[#F0F6FC] hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-black text-[#0F0F0F] dark:text-[#F0F6FC]">College Details</h2>
          <p className="text-[11px] text-[#64748B] dark:text-[#8B949E] font-medium">Delegation info & faculty roster</p>
        </div>
      </div>

      {/* College Info Card */}
      <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs mb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-2xl bg-[#5DD62C]/15 border border-[#5DD62C]/40 flex items-center justify-center text-2xl">
            🏫
          </div>
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-[#5DD62C]/20 text-[#2D6614] dark:text-[#5DD62C] border border-[#5DD62C]/40">
            Official Partner
          </span>
        </div>

        <h3 className="text-lg font-black text-[#0F0F0F] dark:text-[#F0F6FC] mb-1">{college.name}</h3>
        <p className="text-xs text-[#337418] dark:text-[#5DD62C] font-bold mb-3">📍 {college.city || 'Mangaluru'}, Mangalore District</p>

        <div className="p-3 rounded-2xl bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-[#0F0F0F] dark:text-[#F0F6FC] mb-4">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#337418] dark:text-[#5DD62C] shrink-0" />
            <span className="text-[#64748B] dark:text-[#8B949E] font-medium">
              Assigned Coordinator: <strong className="text-[#0F0F0F] dark:text-[#F0F6FC] font-bold">{college.assigned_coordinator_name || 'Dr. Anand Sharma'}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#337418] dark:text-[#5DD62C] shrink-0" />
            <span className="text-[#64748B] dark:text-[#8B949E] font-medium">Contact Hotline: <strong className="text-[#0F0F0F] dark:text-[#F0F6FC] font-bold">+91 98450 12345</strong></span>
          </div>
        </div>

        <button
          onClick={() => {
            setActiveConversationId('conv-group-1');
            navigateTo('group_chat');
          }}
          className="w-full py-2.5 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0F0F0F] font-black text-xs shadow-xs flex items-center justify-center gap-2 transition cursor-pointer active:scale-95"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Open Official Group Chat</span>
        </button>
      </div>

      {/* Faculty Roster */}
      <div className="mb-4">
        <h4 className="text-xs font-black text-[#64748B] dark:text-[#8B949E] uppercase tracking-wider mb-2.5 px-1">
          Faculty Delegation ({facultyMembers.length})
        </h4>

        <div className="space-y-2">
          {facultyMembers.map(fac => (
            <div key={fac.id} className="p-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={fac.avatar_url} alt={fac.full_name} className="w-10 h-10 rounded-2xl object-cover border border-slate-200 dark:border-slate-800" />
                <div>
                  <h5 className="text-xs font-black text-[#0F0F0F] dark:text-[#F0F6FC]">{fac.full_name}</h5>
                  <p className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-medium">{fac.designation || 'Lecturer'}</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[#0F0F0F] dark:text-[#F0F6FC] border border-slate-200 dark:border-slate-700">
                Teacher
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
