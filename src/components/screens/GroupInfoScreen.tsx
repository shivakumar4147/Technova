'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  ArrowLeft, Search, UserPlus, Phone, Video, School, Image as ImageIcon,
  MessageSquare, LogOut, ChevronRight, Crown
} from 'lucide-react';
import { GroupMember } from '@/types';

export const GroupInfoScreen: React.FC = () => {
  const { activeConversationId, conversations, profiles, navigateTo, currentUser, toggleGroupAdminRole } = useApp();
  const [memberSearchQuery, setMemberSearchQuery] = useState('');

  const conv = conversations.find(c => c.id === activeConversationId) || conversations[0];
  
  // Dynamic group member resolution: Use exact stored members if present, else fallback to college group members
  const groupMembers: GroupMember[] = (conv.members && conv.members.length > 0)
    ? conv.members
    : profiles
        .filter(p => p.college_id === conv.college_id || p.role !== 'teacher')
        .map(p => ({
          user_id: p.id,
          full_name: p.full_name,
          phone: p.phone,
          role: (p.role === 'coordinator' || p.role === 'admin' ? 'admin' : 'member') as 'admin' | 'member',
          avatar_url: p.avatar_url,
          designation: p.designation || 'Faculty Delegate'
        }));

  // Check if logged-in user is an Admin of this group
  const isCurrentUserAdmin = groupMembers.some(
    m => m.user_id === currentUser?.id && m.role === 'admin'
  ) || conv.creator_id === currentUser?.id || currentUser?.role === 'admin';

  const filteredMembers = groupMembers.filter(m =>
    m.full_name.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
    m.phone.includes(memberSearchQuery) ||
    (m.designation && m.designation.toLowerCase().includes(memberSearchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F8F8F8] dark:bg-[#0D1117] max-w-md mx-auto flex flex-col pb-28 text-[#0F0F0F] dark:text-[#F0F6FC] font-sans transition-colors duration-200">
      
      {/* 1. STICKY TOP HEADER */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF] dark:bg-[#161B22] px-4 py-3 flex items-center justify-between border-b border-[#E2E8F0] dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('group_chat')}
            className="p-1.5 rounded-xl text-[#0F0F0F] dark:text-[#F0F6FC] hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">Group info</h2>
        </div>
      </header>

      {/* MAIN SCROLLABLE BODY */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        
        {/* 2. GROUP HERO CONTAINER */}
        <div className="bg-[#FFFFFF] dark:bg-[#161B22] p-6 rounded-3xl border border-[#E2E8F0] dark:border-slate-800 text-center shadow-xs">
          <div className="w-24 h-24 rounded-full bg-[#5DD62C]/15 border-2 border-[#5DD62C] flex items-center justify-center text-[#337418] dark:text-[#5DD62C] shadow-sm mx-auto mb-3">
            <School className="w-12 h-12" />
          </div>

          <h3 className="text-lg font-black text-[#0F0F0F] dark:text-[#F0F6FC]">{conv.name}</h3>
          <p className="text-xs text-[#64748B] dark:text-[#8B949E] font-medium mt-0.5">
            Group • {groupMembers.length} participants
          </p>

          {/* Quick Action Circular Buttons */}
          <div className="flex items-center justify-center gap-6 mt-5 pt-4 border-t border-[#F1F5F9] dark:border-slate-800">
            <button className="flex flex-col items-center gap-1 hover:opacity-75 transition cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#5DD62C]/20 text-[#337418] dark:text-[#5DD62C] flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-[#337418] dark:text-[#5DD62C]">Audio</span>
            </button>

            <button className="flex flex-col items-center gap-1 hover:opacity-75 transition cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#5DD62C]/20 text-[#337418] dark:text-[#5DD62C] flex items-center justify-center">
                <Video className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-[#337418] dark:text-[#5DD62C]">Video</span>
            </button>

            <button className="flex flex-col items-center gap-1 hover:opacity-75 transition cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#5DD62C]/20 text-[#337418] dark:text-[#5DD62C] flex items-center justify-center">
                <UserPlus className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-[#337418] dark:text-[#5DD62C]">Add</span>
            </button>

            <button className="flex flex-col items-center gap-1 hover:opacity-75 transition cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#5DD62C]/20 text-[#337418] dark:text-[#5DD62C] flex items-center justify-center">
                <Search className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-[#337418] dark:text-[#5DD62C]">Search</span>
            </button>
          </div>
        </div>

        {/* 3. GROUP DESCRIPTION CONTAINER */}
        <div className="bg-[#FFFFFF] dark:bg-[#161B22] p-4 rounded-2xl border border-[#E2E8F0] dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-extrabold text-[#337418] dark:text-[#5DD62C] uppercase tracking-wider block mb-1">
            Group Description
          </span>
          <p className="text-xs text-[#0F0F0F] dark:text-[#F0F6FC] leading-relaxed font-medium">
            Official group for {conv.name}.
          </p>
          <span className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-mono block mt-2">
            Created by {conv.creator_id === currentUser?.id ? 'You (Group Creator)' : 'Technova Admin'}
          </span>
        </div>

        {/* 4. MEDIA, LINKS & DOCS PREVIEW */}
        <div className="bg-[#FFFFFF] dark:bg-[#161B22] p-4 rounded-2xl border border-[#E2E8F0] dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#0F0F0F] dark:text-[#F0F6FC] flex items-center justify-center">
              <ImageIcon className="w-4.5 h-4.5 text-[#337418] dark:text-[#5DD62C]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">Media, links, and docs</h4>
              <p className="text-[11px] text-[#64748B] dark:text-[#8B949E]">12 photos, 4 documents</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#64748B] dark:text-[#8B949E]" />
        </div>

        {/* 5. EXACT PARTICIPANTS LIST SECTION */}
        <div className="bg-[#FFFFFF] dark:bg-[#161B22] p-4 rounded-3xl border border-[#E2E8F0] dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">
              {groupMembers.length} participants
            </h4>
            <div className="relative">
              <input
                type="text"
                value={memberSearchQuery}
                onChange={(e) => setMemberSearchQuery(e.target.value)}
                placeholder="Search member..."
                className="bg-slate-100 dark:bg-[#0D1117] text-[#0F0F0F] dark:text-[#F0F6FC] text-[11px] rounded-xl pl-2.5 pr-2 py-1 border border-slate-200 dark:border-slate-800 focus:outline-none w-32"
              />
            </div>
          </div>

          {/* Add Participant Row (Visible if Admin) */}
          {isCurrentUserAdmin && (
            <div className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition mb-1 border-b border-[#F1F5F9] dark:border-slate-800">
              <div className="w-10 h-10 rounded-full bg-[#5DD62C] text-[#0F0F0F] flex items-center justify-center font-bold">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">Add participant</span>
                <p className="text-[10px] text-[#64748B] dark:text-[#8B949E]">Add members by mobile number</p>
              </div>
            </div>
          )}

          {/* Participant Rows */}
          <div className="space-y-1">
            {filteredMembers.map((member) => {
              const isMe = currentUser?.id === member.user_id;
              const isAdmin = member.role === 'admin';

              return (
                <div
                  key={member.user_id}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition border-b border-slate-50 dark:border-slate-800/40 last:border-none"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <img
                      src={member.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
                      alt={member.full_name}
                      className="w-10 h-10 rounded-full object-cover shadow-xs border border-slate-200 dark:border-slate-800"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#0F0F0F] dark:text-[#F0F6FC] truncate">
                          {isMe ? 'You' : member.full_name}
                        </span>
                        {isAdmin && (
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-[#5DD62C]/20 text-[#337418] dark:text-[#5DD62C] border border-[#5DD62C]/50 flex items-center gap-0.5">
                            <Crown className="w-2.5 h-2.5 text-[#337418] dark:text-[#5DD62C]" />
                            <span>Group Admin</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#64748B] dark:text-[#8B949E] font-mono truncate">
                        {member.phone} • {member.designation || 'Participant'}
                      </p>
                    </div>
                  </div>

                  {/* Actions for Admin on other members */}
                  <div className="flex items-center gap-1 shrink-0">
                    {isCurrentUserAdmin && !isMe && conv.members && (
                      <button
                        onClick={() => toggleGroupAdminRole(conv.id, member.user_id)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold transition border cursor-pointer ${
                          isAdmin
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                            : 'bg-[#5DD62C]/20 text-[#2D6614] dark:text-[#5DD62C] border-[#5DD62C]/40 hover:bg-[#5DD62C]/30'
                        }`}
                      >
                        {isAdmin ? 'Dismiss Admin' : 'Make Admin'}
                      </button>
                    )}

                    {!isMe && (
                      <button
                        onClick={() => navigateTo('private_chat')}
                        className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#337418] dark:text-[#5DD62C] hover:bg-[#5DD62C]/20 transition active:scale-95 cursor-pointer"
                        title="Direct Message"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. DANGER ACTIONS */}
        <div className="bg-[#FFFFFF] dark:bg-[#161B22] p-3 rounded-2xl border border-[#E2E8F0] dark:border-slate-800 shadow-xs">
          <button className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition cursor-pointer">
            <LogOut className="w-4 h-4" />
            <span>Exit Group</span>
          </button>
        </div>

      </div>
    </div>
  );
};
