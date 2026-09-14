'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  ArrowLeft, Search, UserPlus, Phone, Video, Shield, Bell, FileText, Image as ImageIcon,
  MessageSquare, School, Megaphone, AlertTriangle, LogOut, ChevronRight, Check, Crown
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
    <div className="min-h-screen bg-[#0B0F17] max-w-md mx-auto flex flex-col pb-28 text-[#F8FAFC] font-sans">
      
      {/* 1. STICKY TOP HEADER */}
      <header className="sticky top-0 z-40 bg-[#0B0F17] px-4 py-3 flex items-center justify-between border-b border-[#1E293B] shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('group_chat')}
            className="p-1.5 rounded-xl text-[#F8FAFC] hover:bg-[#1E293B] transition active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-black text-[#F8FAFC]">Group info</h2>
        </div>
      </header>

      {/* MAIN SCROLLABLE BODY */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        
        {/* 2. GROUP HERO CONTAINER */}
        <div className="bg-[#111827] p-6 rounded-3xl border border-[#1E293B] text-center shadow-md">
          <div className="w-24 h-24 rounded-full bg-[#5DD62C]/15 border-2 border-[#5DD62C] flex items-center justify-center text-[#5DD62C] shadow-sm mx-auto mb-3">
            <School className="w-12 h-12" />
          </div>

          <h3 className="text-lg font-black text-[#F8FAFC]">{conv.name}</h3>
          <p className="text-xs text-[#94A3B8] font-medium mt-0.5">
            Group • {groupMembers.length} participants
          </p>

          {/* Quick Action Circular Buttons */}
          <div className="flex items-center justify-center gap-6 mt-5 pt-4 border-t border-[#1E293B]">
            <button className="flex flex-col items-center gap-1 hover:opacity-75 transition cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#5DD62C]/20 text-[#5DD62C] flex items-center justify-center border border-[#5DD62C]/40">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-extrabold text-[#5DD62C]">Audio</span>
            </button>

            <button className="flex flex-col items-center gap-1 hover:opacity-75 transition cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#5DD62C]/20 text-[#5DD62C] flex items-center justify-center border border-[#5DD62C]/40">
                <Video className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-extrabold text-[#5DD62C]">Video</span>
            </button>

            <button className="flex flex-col items-center gap-1 hover:opacity-75 transition cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#5DD62C]/20 text-[#5DD62C] flex items-center justify-center border border-[#5DD62C]/40">
                <UserPlus className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-extrabold text-[#5DD62C]">Add</span>
            </button>

            <button className="flex flex-col items-center gap-1 hover:opacity-75 transition cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#5DD62C]/20 text-[#5DD62C] flex items-center justify-center border border-[#5DD62C]/40">
                <Search className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-extrabold text-[#5DD62C]">Search</span>
            </button>
          </div>
        </div>

        {/* 3. GROUP DESCRIPTION CONTAINER */}
        <div className="bg-[#111827] p-4 rounded-2xl border border-[#1E293B] shadow-xs">
          <span className="text-[10px] font-extrabold text-[#5DD62C] uppercase tracking-wider block mb-1">
            Group Description
          </span>
          <p className="text-xs text-[#F8FAFC] leading-relaxed font-medium">
            Official group for {conv.name}.
          </p>
          <span className="text-[10px] text-[#94A3B8] font-mono block mt-2">
            Created by {conv.creator_id === currentUser?.id ? 'You (Group Creator)' : 'Technova Admin'}
          </span>
        </div>

        {/* 4. MEDIA, LINKS & DOCS PREVIEW */}
        <div className="bg-[#111827] p-4 rounded-2xl border border-[#1E293B] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1E293B] text-[#5DD62C] flex items-center justify-center border border-[#334155]">
              <ImageIcon className="w-4.5 h-4.5 text-[#5DD62C]" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[#F8FAFC]">Media, links, and docs</h4>
              <p className="text-[11px] text-[#94A3B8]">12 photos, 4 documents</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
        </div>

        {/* 5. EXACT PARTICIPANTS LIST SECTION */}
        <div className="bg-[#111827] p-4 rounded-3xl border border-[#1E293B] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-black text-[#F8FAFC]">
              {groupMembers.length} participants
            </h4>
            <div className="relative">
              <input
                type="text"
                value={memberSearchQuery}
                onChange={(e) => setMemberSearchQuery(e.target.value)}
                placeholder="Search member..."
                className="bg-[#1E293B] text-[#F8FAFC] text-[11px] font-bold rounded-xl pl-2.5 pr-2 py-1 border border-[#334155] focus:outline-none focus:border-[#5DD62C] w-32 placeholder-[#94A3B8]"
              />
            </div>
          </div>

          {/* Add Participant Row (Visible if Admin) */}
          {isCurrentUserAdmin && (
            <div className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-[#1E293B] cursor-pointer transition mb-1 border-b border-[#1E293B]">
              <div className="w-10 h-10 rounded-full bg-[#5DD62C] text-[#0B0F17] flex items-center justify-center font-bold shadow-xs">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-black text-[#F8FAFC]">Add participant</span>
                <p className="text-[10px] text-[#94A3B8]">Add members by mobile number</p>
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
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#1E293B] transition border-b border-[#1E293B]/60 last:border-none"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <img
                      src={member.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
                      alt={member.full_name}
                      className="w-10 h-10 rounded-full object-cover shadow-xs border border-[#334155]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-[#F8FAFC] truncate">
                          {isMe ? 'You' : member.full_name}
                        </span>
                        {isAdmin && (
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-[#5DD62C]/20 text-[#5DD62C] border border-[#5DD62C]/50 flex items-center gap-0.5">
                            <Crown className="w-2.5 h-2.5 text-[#5DD62C]" />
                            <span>Group Admin</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#94A3B8] font-mono truncate">
                        {member.phone} • {member.designation || 'Participant'}
                      </p>
                    </div>
                  </div>

                  {/* Actions for Admin on other members */}
                  <div className="flex items-center gap-1 shrink-0">
                    {isCurrentUserAdmin && !isMe && conv.members && (
                      <button
                        onClick={() => toggleGroupAdminRole(conv.id, member.user_id)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-extrabold transition cursor-pointer border ${
                          isAdmin
                            ? 'bg-[#1E293B] text-[#94A3B8] border-[#334155] hover:text-[#F8FAFC]'
                            : 'bg-[#5DD62C]/20 text-[#5DD62C] border-[#5DD62C]/40 hover:bg-[#5DD62C]/30'
                        }`}
                      >
                        {isAdmin ? 'Dismiss Admin' : 'Make Admin'}
                      </button>
                    )}

                    {!isMe && (
                      <button
                        onClick={() => navigateTo('private_chat')}
                        className="p-1.5 rounded-xl bg-[#1E293B] text-[#5DD62C] hover:bg-[#334155] transition active:scale-95 cursor-pointer"
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
        <div className="bg-[#111827] p-3 rounded-2xl border border-[#1E293B] shadow-xs">
          <button className="w-full py-2 flex items-center justify-center gap-2 text-xs font-extrabold text-rose-400 hover:bg-rose-500/10 rounded-xl transition cursor-pointer">
            <LogOut className="w-4 h-4" />
            <span>Exit Group</span>
          </button>
        </div>

      </div>
    </div>
  );
};
