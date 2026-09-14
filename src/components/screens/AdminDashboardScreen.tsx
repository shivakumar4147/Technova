'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Shield, Bell, CheckCircle2, AlertTriangle, Building2, Users, ArrowRight,
  Calendar, Megaphone, MapPin, Plus, UserCheck, ShieldAlert, ShieldCheck,
  Search, SlidersHorizontal, RefreshCw, UserPlus, FileText, Activity, Clock
} from 'lucide-react';
import { Badge } from '@/components/common/Badge';
import { UserRole } from '@/types';

export const AdminDashboardScreen: React.FC = () => {
  const {
    currentUser, colleges, profiles, announcements, issues, events, workshops,
    auditLogs, navigateTo, updateUserRole, toggleUserStatus, updateIssueStatus,
    sendAnnouncementReminder
  } = useApp();

  const isAuthorized = currentUser?.role === 'admin' || currentUser?.role === 'coordinator';

  // Active Admin View Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'colleges' | 'announcements' | 'issues'>('overview');

  // Users Filter State
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | UserRole>('ALL');

  // Quick Action Notification State
  const [reminderSentFor, setReminderSentFor] = useState<string | null>(null);

  if (!isAuthorized) {
    return (
      <div className="pb-28 pt-8 px-4 max-w-md mx-auto min-h-screen text-center flex flex-col justify-center items-center font-sans bg-[#0B0F17] text-[#F8FAFC]">
        <div className="p-6 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-lg space-y-4 max-w-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-black text-[#F8FAFC]">Restricted Admin Area</h2>
            <p className="text-xs text-[#94A3B8] font-medium mt-1">
              Command center controls, user management, and broadcasting tools are restricted to Admin & Coordinator roles only.
            </p>
          </div>
          <button
            onClick={() => navigateTo('chat_home')}
            className="w-full py-2.5 px-4 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0B0F17] font-extrabold text-xs shadow-xs transition active:scale-95 cursor-pointer"
          >
            Return to Main Chat
          </button>
        </div>
      </div>
    );
  }

  // Key Metrics
  const totalTeachers = profiles.filter(p => p.role === 'teacher').length;
  const totalCoordinators = profiles.filter(p => p.role === 'coordinator').length;
  const totalAdmins = profiles.filter(p => p.role === 'admin').length;
  const openIssues = issues.filter(i => i.status !== 'Resolved');
  const latestAnn = announcements[0];
  const nextEvt = events[0];

  // Filtered Users
  const filteredUsers = profiles.filter(p => {
    const matchesSearch = p.full_name.toLowerCase().includes(userSearch.toLowerCase()) ||
                          (p.email || '').toLowerCase().includes(userSearch.toLowerCase()) ||
                          (p.college_name || '').toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || p.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleSendReminder = (annId: string) => {
    sendAnnouncementReminder(annId);
    setReminderSentFor(annId);
    setTimeout(() => setReminderSentFor(null), 3000);
  };

  return (
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto min-h-screen font-sans bg-[#0B0F17] text-[#F8FAFC]">
      
      {/* TOP HEADER CARD */}
      <div className="mb-4 p-4 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Shield className="w-4 h-4 text-[#5DD62C]" />
              <span className="text-[10px] font-black text-[#5DD62C] uppercase tracking-widest">
                {currentUser?.role === 'admin' ? 'SYSTEM ADMIN CONTROL' : 'LEAD COORDINATOR HUB'}
              </span>
            </div>
            <h1 className="text-lg font-black text-[#F8FAFC]">Technova Command Center</h1>
            <p className="text-[11px] text-[#94A3B8] font-medium mt-0.5">Logged in as {currentUser?.full_name}</p>
          </div>

          <button
            onClick={() => navigateTo('announcement_create')}
            className="px-3.5 py-2 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0B0F17] font-black text-xs shadow-xs flex items-center gap-1.5 transition active:scale-95 border border-[#5DD62C]/30 cursor-pointer"
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Broadcast</span>
          </button>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-1 mt-4 p-1 rounded-xl bg-[#1E293B] border border-[#334155] text-[11px] font-bold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer ${
              activeTab === 'overview' ? 'bg-[#5DD62C] text-[#0B0F17] font-black shadow-xs' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1 cursor-pointer ${
              activeTab === 'users' ? 'bg-[#5DD62C] text-[#0B0F17] font-black shadow-xs' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <span>Users ({profiles.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('colleges')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer ${
              activeTab === 'colleges' ? 'bg-[#5DD62C] text-[#0B0F17] font-black shadow-xs' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            Colleges ({colleges.length})
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer ${
              activeTab === 'announcements' ? 'bg-[#5DD62C] text-[#0B0F17] font-black shadow-xs' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            Notices
          </button>
          <button
            onClick={() => setActiveTab('issues')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1 cursor-pointer ${
              activeTab === 'issues' ? 'bg-[#5DD62C] text-[#0B0F17] font-black shadow-xs' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <span>Issues</span>
            {openIssues.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-bold">
                {openIssues.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* TAB 1: OVERVIEW & SYSTEM METRICS */}
      {/* ========================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-3.5">
          
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => setActiveTab('users')}
              className="p-3.5 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-xs cursor-pointer hover:border-[#5DD62C] transition flex flex-col justify-between h-28"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-wider">Total Delegates</span>
                <div className="w-7 h-7 rounded-lg bg-[#5DD62C]/20 text-[#5DD62C] flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-[#F8FAFC] font-mono">{profiles.length}</span>
                <p className="text-[10px] text-[#94A3B8] mt-0.5 font-semibold">{totalTeachers} Teachers • {totalCoordinators} Coords</p>
              </div>
            </div>

            <div
              onClick={() => setActiveTab('issues')}
              className="p-3.5 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-xs cursor-pointer hover:border-rose-400 transition flex flex-col justify-between h-28"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-wider">Open Support Issues</span>
                <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-rose-400 font-mono">{openIssues.length}</span>
                <p className="text-[10px] text-rose-400 mt-0.5 font-semibold">Action Required</p>
              </div>
            </div>
          </div>

          {/* Admin Powers & Quick Action Grid */}
          <div className="p-4 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-xs">
            <h3 className="text-xs font-black text-[#F8FAFC] uppercase tracking-wider mb-3">
              Admin Powers & Control Tools
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setActiveTab('users')}
                className="p-3 rounded-xl bg-[#1E293B] hover:bg-[#334155] border border-[#334155] text-left transition active:scale-95 flex flex-col justify-between cursor-pointer"
              >
                <div className="w-7.5 h-7.5 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-2 font-bold">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#F8FAFC]">Manage User Roles</h4>
                <p className="text-[9px] text-[#94A3B8] mt-0.5">Promote/Revoke Admin & Coords</p>
              </button>

              <button
                onClick={() => navigateTo('colleges')}
                className="p-3 rounded-xl bg-[#1E293B] hover:bg-[#334155] border border-[#334155] text-left transition active:scale-95 flex flex-col justify-between cursor-pointer"
              >
                <div className="w-7.5 h-7.5 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2 font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#F8FAFC]">PU Colleges ({colleges.length})</h4>
                <p className="text-[9px] text-[#94A3B8] mt-0.5">Add colleges & assign lead coords</p>
              </button>

              <button
                onClick={() => navigateTo('announcement_create')}
                className="p-3 rounded-xl bg-[#1E293B] hover:bg-[#334155] border border-[#334155] text-left transition active:scale-95 flex flex-col justify-between cursor-pointer"
              >
                <div className="w-7.5 h-7.5 rounded-xl bg-[#5DD62C]/20 text-[#5DD62C] flex items-center justify-center mb-2 font-bold">
                  <Megaphone className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#F8FAFC]">Broadcast Notice</h4>
                <p className="text-[9px] text-[#94A3B8] mt-0.5">With live ACK status tracking</p>
              </button>

              <button
                onClick={() => navigateTo('events')}
                className="p-3 rounded-xl bg-[#1E293B] hover:bg-[#334155] border border-[#334155] text-left transition active:scale-95 flex flex-col justify-between cursor-pointer"
              >
                <div className="w-7.5 h-7.5 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 font-bold">
                  <Calendar className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#F8FAFC]">Events & Workshops</h4>
                <p className="text-[9px] text-[#94A3B8] mt-0.5">Venues, timings & registrations</p>
              </button>
            </div>
          </div>

          {/* Active Event Spotlight */}
          {nextEvt && (
            <div className="p-4 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-wider">Next Live Event Spotlight</span>
                <span className="px-2 py-0.5 rounded-md bg-[#5DD62C]/20 text-[#5DD62C] border border-[#5DD62C]/40 font-bold text-[10px]">
                  {nextEvt.start_time}
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-[#F8FAFC] mb-0.5">{nextEvt.name}</h3>
              <p className="text-xs text-[#94A3B8] flex items-center gap-1 mt-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#5DD62C]" />
                <span>Venue: {nextEvt.venue} • {nextEvt.registered_students_count} Students Registered</span>
              </p>
            </div>
          )}

          {/* System Audit Stream */}
          <div className="p-4 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black text-[#F8FAFC] uppercase tracking-wider flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-[#5DD62C]" />
                <span>System Audit Log</span>
              </span>
              <span className="text-[10px] text-[#94A3B8] font-mono">Live Sync</span>
            </div>
            <div className="space-y-2">
              {auditLogs.slice(0, 3).map(log => (
                <div key={log.id} className="p-2.5 rounded-xl bg-[#1E293B] border border-[#334155] flex items-start justify-between text-[11px]">
                  <div>
                    <strong className="text-[#F8FAFC] font-bold">{log.user_name}</strong>
                    <span className="text-[#94A3B8]"> {log.action}</span>
                    {log.metadata && <p className="text-[10px] text-[#5DD62C] font-mono font-semibold mt-0.5">{log.metadata}</p>}
                  </div>
                  <span className="text-[9px] text-[#94A3B8] font-medium whitespace-nowrap">
                    {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================== */}
      {/* TAB 2: USER & DELEGATE ROLE MANAGEMENT */}
      {/* ========================================== */}
      {activeTab === 'users' && (
        <div className="space-y-3">
          
          {/* Search & Role Filters Header */}
          <div className="p-3.5 rounded-2xl bg-[#111827] border border-[#1E293B] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#F8FAFC]">Delegate Permissions & Roles</h3>
              <span className="px-2 py-0.5 rounded-md bg-[#5DD62C]/20 text-[#5DD62C] border border-[#5DD62C]/40 font-extrabold text-[10px]">
                {filteredUsers.length} Users
              </span>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search user name, email, college..."
                className="w-full bg-[#1E293B] border border-[#334155] rounded-xl pl-9 pr-3 py-2 text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#5DD62C]"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 text-xs">
              {(['ALL', 'admin', 'coordinator', 'teacher'] as const).map(role => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition cursor-pointer ${
                    roleFilter === role
                      ? 'bg-[#5DD62C] text-[#0B0F17] shadow-xs font-black'
                      : 'bg-[#1E293B] text-[#94A3B8] border border-[#334155] hover:bg-[#334155] hover:text-[#F8FAFC]'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* User List */}
          <div className="space-y-2.5">
            {filteredUsers.map(user => {
              const isAdmin = user.role === 'admin';
              const isCoord = user.role === 'coordinator';

              return (
                <div key={user.id} className="p-3.5 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                        alt={user.full_name}
                        className="w-10 h-10 rounded-full border border-[#334155] object-cover shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-black text-[#F8FAFC]">{user.full_name}</h4>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                            isAdmin ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40' : isCoord ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'bg-[#1E293B] text-[#94A3B8]'
                          }`}>
                            {user.role}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#94A3B8] font-medium">{user.email || user.phone}</p>
                        <p className="text-[10px] text-[#5DD62C] font-bold mt-0.5">{user.college_name || 'PU College Delegate'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Role Elevation Controls */}
                  <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between text-xs">
                    <span className="text-[10px] text-[#94A3B8] font-bold">Role Elevation:</span>

                    <div className="flex items-center gap-2">
                      <select
                        value={user.role}
                        onChange={(e) => updateUserRole(user.id, e.target.value as UserRole)}
                        className="bg-[#1E293B] border border-[#334155] rounded-lg px-2 py-1 text-[11px] font-bold text-[#F8FAFC] focus:outline-none focus:border-[#5DD62C]"
                      >
                        <option value="teacher" className="bg-[#111827] text-[#F8FAFC]">Teacher</option>
                        <option value="coordinator" className="bg-[#111827] text-[#F8FAFC]">Coordinator</option>
                        <option value="admin" className="bg-[#111827] text-[#F8FAFC]">System Admin</option>
                      </select>

                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border transition cursor-pointer ${
                          user.is_active
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                        }`}
                      >
                        {user.is_active ? 'Active' : 'Disabled'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================== */}
      {/* TAB 3: COLLEGES DIRECTORY HUB */}
      {/* ========================================== */}
      {activeTab === 'colleges' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#111827] border border-[#1E293B]">
            <div>
              <h3 className="text-sm font-black text-[#F8FAFC]">PU Colleges Directory</h3>
              <p className="text-[10px] text-[#94A3B8]">Manage institutions & assign lead coordinators</p>
            </div>
            <button
              onClick={() => navigateTo('colleges')}
              className="px-3 py-1.5 rounded-xl bg-[#5DD62C] text-[#0B0F17] font-black text-xs shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add College</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {colleges.map(col => (
              <div key={col.id} className="p-3.5 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-xs flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#F8FAFC]">{col.name}</h4>
                    <p className="text-[10px] text-[#94A3B8]">{col.city} • Lead: <strong className="text-[#5DD62C]">{col.assigned_coordinator_name}</strong></p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('colleges')}
                  className="p-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-[#F8FAFC] border border-[#334155] cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 4: BROADCAST NOTICES ENGINE */}
      {/* ========================================== */}
      {activeTab === 'announcements' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#111827] border border-[#1E293B]">
            <div>
              <h3 className="text-sm font-black text-[#F8FAFC]">Broadcast Notices Engine</h3>
              <p className="text-[10px] text-[#94A3B8]">Track teacher acknowledgements in real time</p>
            </div>
            <button
              onClick={() => navigateTo('announcement_create')}
              className="px-3 py-1.5 rounded-xl bg-[#5DD62C] text-[#0B0F17] font-black text-xs shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>+ New Notice</span>
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map(ann => (
              <div key={ann.id} className="p-4 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                        ann.priority === 'urgent' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-[#5DD62C]/20 text-[#5DD62C] border border-[#5DD62C]/40'
                      }`}>
                        {ann.announcement_type}
                      </span>
                      <span className="text-[10px] text-[#94A3B8] font-mono">
                        {new Date(ann.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <h4 className="text-xs font-black text-[#F8FAFC]">{ann.title}</h4>
                    <p className="text-[11px] text-[#94A3B8] mt-1 line-clamp-2">{ann.content}</p>
                  </div>
                </div>

                {/* ACK & Action Buttons */}
                <div className="p-2.5 rounded-xl bg-[#1E293B] border border-[#334155] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-[#94A3B8] uppercase font-bold">ACK Rate: </span>
                    <strong className="text-[#5DD62C] font-mono font-bold">87.5% (7/8 ACKed)</strong>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleSendReminder(ann.id)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-bold transition flex items-center gap-1 hover:bg-amber-500/30 cursor-pointer"
                    >
                      <Bell className="w-3 h-3" />
                      <span>{reminderSentFor === ann.id ? 'Reminder Sent!' : 'Remind Pending'}</span>
                    </button>

                    <button
                      onClick={() => navigateTo('acknowledgement_tracker', { announcementId: ann.id })}
                      className="px-2.5 py-1 rounded-lg bg-[#5DD62C] text-[#0B0F17] text-[10px] font-black shadow-xs cursor-pointer"
                    >
                      Track ACK
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 5: HELP DESK & SUPPORT ISSUES */}
      {/* ========================================== */}
      {activeTab === 'issues' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#111827] border border-[#1E293B]">
            <div>
              <h3 className="text-sm font-black text-[#F8FAFC]">Technova Help Desk Queue</h3>
              <p className="text-[10px] text-[#94A3B8]">Resolve technical & venue issues from delegates</p>
            </div>
            <button
              onClick={() => navigateTo('issues')}
              className="px-3 py-1.5 rounded-xl bg-[#5DD62C] text-[#0B0F17] font-black text-xs shadow-xs cursor-pointer"
            >
              Open Queue
            </button>
          </div>

          <div className="space-y-2.5">
            {issues.map(iss => {
              const isResolved = iss.status === 'Resolved';

              return (
                <div key={iss.id} className="p-3.5 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-xs space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                          isResolved ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        }`}>
                          {iss.status}
                        </span>
                        <span className="text-[10px] text-[#94A3B8] uppercase font-bold">{iss.type}</span>
                      </div>
                      <h4 className="text-xs font-black text-[#F8FAFC]">{iss.title}</h4>
                      <p className="text-[11px] text-[#94A3B8] mt-0.5">{iss.description}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between text-xs">
                    <span className="text-[10px] text-[#94A3B8]">Reporter: {iss.creator_name || 'Delegate'}</span>
                    <button
                      onClick={() => updateIssueStatus(iss.id, isResolved ? 'Open' : 'Resolved')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition border cursor-pointer ${
                        isResolved
                          ? 'bg-[#1E293B] text-[#94A3B8] border-[#334155]'
                          : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      }`}
                    >
                      {isResolved ? 'Re-open Issue' : 'Mark Resolved'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
