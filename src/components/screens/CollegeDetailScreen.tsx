'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Building2, UserCheck, Users, MessageSquare, MapPin, Phone, Shield } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/common/Badge';

export const CollegeDetailScreen: React.FC = () => {
  const { colleges, profiles, navigateTo, setActiveConversationId } = useApp();
  const college = colleges[0]; // St. Aloysius PU College

  const facultyMembers = profiles.filter(p => p.college_id === college.id);

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigateTo('colleges')}
          className="p-1.5 rounded-xl text-slate-300 hover:bg-slate-800/80 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-bold text-white">College Details</h2>
          <p className="text-[10px] text-slate-400">Delegation info & faculty roster</p>
        </div>
      </div>

      {/* College Info Card */}
      <GlassCard variant="bright" className="p-5 border-cyan-500/40 mb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-600/30 to-blue-800/30 border border-cyan-500/40 flex items-center justify-center text-2xl">
            🏫
          </div>
          <Badge variant="green" size="md">Official Partner</Badge>
        </div>

        <h3 className="text-lg font-extrabold text-white mb-1">{college.name}</h3>
        <p className="text-xs text-cyan-300 font-medium mb-3">📍 {college.city}, Mangalore District</p>

        <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5 text-xs text-slate-300 mb-4">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Assigned Coordinator: <strong className="text-white">{college.assigned_coordinator_name}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Contact Hotline: +91 98450 12345</span>
          </div>
        </div>

        <button
          onClick={() => {
            setActiveConversationId('conv-group-1');
            navigateTo('group_chat');
          }}
          className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs shadow-md shadow-cyan-400/20 flex items-center justify-center gap-2 transition"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Open Official Group Chat</span>
        </button>
      </GlassCard>

      {/* Faculty Roster */}
      <div className="mb-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
          Faculty Delegation ({facultyMembers.length})
        </h4>

        <div className="space-y-2">
          {facultyMembers.map(fac => (
            <GlassCard key={fac.id} className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={fac.avatar_url} alt={fac.full_name} className="w-10 h-10 rounded-2xl object-cover border border-slate-700" />
                <div>
                  <h5 className="text-xs font-bold text-white">{fac.full_name}</h5>
                  <p className="text-[10px] text-slate-400">{fac.designation || 'Lecturer'}</p>
                </div>
              </div>
              <Badge variant="cyan" size="sm">
                Teacher
              </Badge>
            </GlassCard>
          ))}
        </div>
      </div>

    </div>
  );
};
