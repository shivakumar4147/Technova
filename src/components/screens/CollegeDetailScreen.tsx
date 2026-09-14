'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Building2, UserCheck, Users, MessageSquare, MapPin, Phone, Shield } from 'lucide-react';
import { Badge } from '@/components/common/Badge';

export const CollegeDetailScreen: React.FC = () => {
  const { colleges, profiles, navigateTo, setActiveConversationId } = useApp();
  const college = colleges[0]; // St. Aloysius PU College

  const facultyMembers = profiles.filter(p => p.college_id === college.id);

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#0B0F17] font-sans text-[#F8FAFC]">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigateTo('colleges')}
          className="p-1.5 rounded-xl text-[#F8FAFC] hover:bg-[#1E293B] transition cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-black text-[#F8FAFC]">College Details</h2>
          <p className="text-[11px] text-[#94A3B8] font-medium">Delegation info & faculty roster</p>
        </div>
      </div>

      {/* College Info Card */}
      <div className="p-5 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-md mb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-2xl bg-[#5DD62C]/15 border border-[#5DD62C]/40 flex items-center justify-center text-2xl">
            🏫
          </div>
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-[#5DD62C]/20 text-[#5DD62C] border border-[#5DD62C]/40">
            Official Partner
          </span>
        </div>

        <h3 className="text-lg font-black text-[#F8FAFC] mb-1">{college.name}</h3>
        <p className="text-xs text-[#5DD62C] font-bold mb-3">📍 {college.city || 'Mangaluru'}, Mangalore District</p>

        <div className="p-3 rounded-2xl bg-[#1E293B] border border-[#334155] space-y-2 text-xs text-[#F8FAFC] mb-4">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#5DD62C] shrink-0" />
            <span className="text-[#94A3B8] font-medium">
              Assigned Coordinator: <strong className="text-[#F8FAFC] font-bold">{college.assigned_coordinator_name || 'Dr. Anand Sharma'}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#5DD62C] shrink-0" />
            <span className="text-[#94A3B8] font-medium">Contact Hotline: <strong className="text-[#F8FAFC] font-bold">+91 98450 12345</strong></span>
          </div>
        </div>

        <button
          onClick={() => {
            setActiveConversationId('conv-group-1');
            navigateTo('group_chat');
          }}
          className="w-full py-2.5 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0B0F17] font-black text-xs shadow-xs flex items-center justify-center gap-2 transition cursor-pointer active:scale-95"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Open Official Group Chat</span>
        </button>
      </div>

      {/* Faculty Roster */}
      <div className="mb-4">
        <h4 className="text-xs font-black text-[#94A3B8] uppercase tracking-wider mb-2.5 px-1">
          Faculty Delegation ({facultyMembers.length})
        </h4>

        <div className="space-y-2">
          {facultyMembers.map(fac => (
            <div key={fac.id} className="p-3 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={fac.avatar_url} alt={fac.full_name} className="w-10 h-10 rounded-2xl object-cover border border-[#334155]" />
                <div>
                  <h5 className="text-xs font-black text-[#F8FAFC]">{fac.full_name}</h5>
                  <p className="text-[10px] text-[#94A3B8] font-medium">{fac.designation || 'Lecturer'}</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#1E293B] text-[#94A3B8] border border-[#334155]">
                Teacher
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
