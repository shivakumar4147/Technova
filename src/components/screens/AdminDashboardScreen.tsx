'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Shield, AlertTriangle, Building2, Users, ArrowRight,
  Calendar, Megaphone, MapPin, Plus, UserCheck, Activity
} from 'lucide-react';
import { UserRole } from '@/types';

export const AdminDashboardScreen: React.FC = () => {
  const {
    currentUser, colleges, profiles, announcements, issues, events,
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
      <div className="pb-28 pt-8 px-4 max-w-md mx-auto min-h-screen text-center flex flex-col justify-center items-center font-sans bg-[#FFFFFF] dark:bg-[#0D1117] transition-colors duration-200">
        <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 max-w-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-black text-[#0F0F0F] dark:text-[#F0F6FC]">Restricted Admin Area</h2>
            <p className="text-xs text-[#64748B] dark:text-[#8B949E] font-medium mt-1">
              Command center controls, user management, and broadcasting tools are restricted to Admin & Coordinator roles only.
            </p>
          </div>
          <button
            onClick={() => navigateTo('chat_home')}
            className="w-full py-2.5 px-4 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0F0F0F] font-extrabold text-xs shadow-xs transition active:scale-95 cursor-pointer"
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
  const openIssues = issues.filter(i => i.status !== 'Resolved');
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
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto min-h-screen font-sans bg-[#FFFFFF] dark:bg-[#0D1117] transition-colors duration-200">
      
      {/* TOP HEADER CARD */}
      <div className="mb-4 p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#161B22] border border-slate-200/90 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Shield className="w-4 h-4 text-[#337418] dark:text-[#5DD62C]" />
              <span className="text-[10px] font-black text-[#337418] dark:text-[#5DD62C] uppercase tracking-widest">
                {currentUser?.role === 'admin' ? 'SYSTEM ADMIN CONTROL' : 'LEAD COORDINATOR HUB'}
              </span>
            </div>
            <h1 className="text-lg font-black text-[#0F0F0F] dark:text-[#F0F6FC]">Technova Command Center</h1>
            <p className="text-[11px] text-[#64748B] dark:text-[#8B949E] font-medium mt-0.5">Logged in as {currentUser?.full_name}</p>
          </div>

          <button
            onClick={() => navigateTo('announcement_create')}
            className="px-3.5 py-2 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0F0F0F] font-black text-xs shadow-xs flex items-center gap-1.5 transition active:scale-95 border border-[#337418]/30 cursor-pointer"
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Broadcast</span>
          </button>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-1 mt-4 p-1 rounded-xl bg-[#E2E8F0]/70 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-[11px] font-bold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer ${
              activeTab === 'overview' ? 'bg-[#5DD62C] text-[#0F0F0F] font-black shadow-xs' : 'text-[#64748B] dark:text-[#8B949E] hover:text-[#0F0F0F] dark:hover:text-[#F0F6FC]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1 cursor-pointer ${
              activeTab === 'users' ? 'bg-[#5DD62C] text-[#0F0F0F] font-black shadow-xs' : 'text-[#64748B] dark:text-[#8B949E] hover:text-[#0F0F0F] dark:hover:text-[#F0F6FC]'
            }`}
          >
            <span>Users ({profiles.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('colleges')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer ${
              activeTab === 'colleges' ? 'bg-[#5DD62C] text-[#0F0F0F] font-black shadow-xs' : 'text-[#64748B] dark:text-[#8B949E] hover:text-[#0F0F0F] dark:hover:text-[#F0F6FC]'
            }`}
          >
            Colleges ({colleges.length})
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer ${
              activeTab === 'announcements' ? 'bg-[#5DD62C] text-[#0F0F0F] font-black shadow-xs' : 'text-[#64748B] dark:text-[#8B949E] hover:text-[#0F0F0F] dark:hover:text-[#F0F6FC]'
            }`}
          >
            Notices
          </button>
          <button
            onClick={() => setActiveTab('issues')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1 cursor-pointer ${
              activeTab === 'issues' ? 'bg-[#5DD62C] text-[#0F0F0F] font-black shadow-xs' : 'text-[#64748B] dark:text-[#8B949E] hover:text-[#0F0F0F] dark:hover:text-[#F0F6FC]'
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

      {/* TAB 1: OVERVIEW & SYSTEM METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-3.5">
          
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => setActiveTab('users')}
              className="p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs cursor-pointer hover:border-[#5DD62C] transition flex flex-col justify-between h-28"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-[#64748B] dark:text-[#8B949E] uppercase tracking-wider">Total Delegates</span>
                <div className="w-7 h-7 rounded-lg bg-[#5DD62C]/20 text-[#337418] dark:text-[#5DD62C] flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-[#0F0F0F] dark:text-[#F0F6FC] font-mono">{profiles.length}</span>
                <p className="text-[10px] text-[#64748B] dark:text-[#8B949E] mt-0.5 font-semibold">{totalTeachers} Teachers • {totalCoordinators} Coords</p>
              </div>
            </div>

            <div
              onClick={() => setActiveTab('issues')}
              className="p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs cursor-pointer hover:border-rose-400 transition flex flex-col justify-between h-28"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-[#64748B] dark:text-[#8B949E] uppercase tracking-wider">Open Support Issues</span>
                <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono">{openIssues.length}</span>
                <p className="text-[10px] text-rose-500 dark:text-rose-400 mt-0.5 font-semibold">Action Required</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-xs font-black text-[#0F0F0F] dark:text-[#F0F6FC] uppercase tracking-wider mb-3">
              Admin Powers & Control Tools
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setActiveTab('users')}
                className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0D1117] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-left transition active:scale-95 flex flex-col justify-between cursor-pointer"
              >
                <div className="w-7.5 h-7.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2 font-bold">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">Manage User Roles</h4>
                <p className="text-[9px] text-[#64748B] dark:text-[#8B949E] mt-0.5">Promote/Revoke Admin & Coords</p>
              </button>

              <button
                onClick={() => navigateTo('colleges')}
                className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0D1117] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-left transition active:scale-95 flex flex-col justify-between cursor-pointer"
              >
                <div className="w-7.5 h-7.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2 font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">PU Colleges ({colleges.length})</h4>
                <p className="text-[9px] text-[#64748B] dark:text-[#8B949E] mt-0.5">Add colleges & assign lead coords</p>
              </button>

              <button
                onClick={() => navigateTo('announcement_create')}
                className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0D1117] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-left transition active:scale-95 flex flex-col justify-between cursor-pointer"
              >
                <div className="w-7.5 h-7.5 rounded-xl bg-[#5DD62C]/20 text-[#337418] dark:text-[#5DD62C] flex items-center justify-center mb-2 font-bold">
                  <Megaphone className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">Broadcast Notice</h4>
                <p className="text-[9px] text-[#64748B] dark:text-[#8B949E] mt-0.5">With live ACK status tracking</p>
              </button>

              <button
                onClick={() => navigateTo('events')}
                className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#0D1117] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-left transition active:scale-95 flex flex-col justify-between cursor-pointer"
              >
                <div className="w-7.5 h-7.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2 font-bold">
                  <Calendar className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">Events & Workshops</h4>
                <p className="text-[9px] text-[#64748B] dark:text-[#8B949E] mt-0.5">Venues, timings & registrations</p>
              </button>
            </div>
          </div>

          {nextEvt && (
            <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-[#64748B] dark:text-[#8B949E] uppercase tracking-wider">Next Live Event Spotlight</span>
                <span className="px-2 py-0.5 rounded-md bg-[#5DD62C]/20 text-[#337418] dark:text-[#5DD62C] font-bold text-[10px]">
                  {nextEvt.start_time}
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] mb-0.5">{nextEvt.name}</h3>
              <p className="text-xs text-[#64748B] dark:text-[#8B949E] flex items-center gap-1 mt-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#337418] dark:text-[#5DD62C]" />
                <span>Venue: {nextEvt.venue} • {nextEvt.registered_students_count} Students Registered</span>
              </p>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black text-[#0F0F0F] dark:text-[#F0F6FC] uppercase tracking-wider flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-[#337418] dark:text-[#5DD62C]" />
                <span>System Audit Log</span>
              </span>
              <span className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-mono">Live Sync</span>
            </div>
            <div className="space-y-2">
              {auditLogs.slice(0, 3).map(log => (
                <div key={log.id} className="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-100 dark:border-slate-800 flex items-start justify-between text-[11px]">
                  <div>
                    <strong className="text-[#0F0F0F] dark:text-[#F0F6FC] font-bold">{log.user_name}</strong>
                    <span className="text-[#64748B] dark:text-[#8B949E]"> {log.action}</span>
                    {log.metadata && <p className="text-[10px] text-[#337418] dark:text-[#5DD62C] font-mono font-semibold mt-0.5">{log.metadata}</p>}
                  </div>
                  <span className="text-[9px] text-[#64748B] dark:text-[#8B949E] font-medium whitespace-nowrap">
                    {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: USER ROLES */}
      {activeTab === 'users' && (
        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#0F0F0F] dark:text-[#F0F6FC]">Delegate Permissions & Roles</h3>
              <span className="px-2 py-0.5 rounded-md bg-[#5DD62C]/20 text-[#337418] dark:text-[#5DD62C] font-extrabold text-[10px]">
                {filteredUsers.length} Users
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search user name, email, college..."
                className="w-full bg-[#FFFFFF] dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-[#0F0F0F] dark:text-[#F0F6FC] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5DD62C]"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              {(['ALL', 'admin', 'coordinator', 'teacher'] as const).map(role => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition cursor-pointer ${
                    roleFilter === role
                      ? 'bg-[#5DD62C] text-[#0F0F0F] shadow-xs'
                      : 'bg-[#FFFFFF] dark:bg-[#0D1117] text-[#64748B] dark:text-[#8B949E] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredUsers.map(user => {
              const isAdmin = user.role === 'admin';
              const isCoord = user.role === 'coordinator';

              return (
                <div key={user.id} className="p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                        alt={user.full_name}
                        className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 object-cover shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-black text-[#0F0F0F] dark:text-[#F0F6FC]">{user.full_name}</h4>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                            isAdmin ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' : isCoord ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}>
                            {user.role}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-medium">{user.email || user.phone}</p>
                        <p className="text-[10px] text-[#337418] dark:text-[#5DD62C] font-bold mt-0.5">{user.college_name || 'PU College Delegate'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-bold">Role Elevation:</span>

                    <div className="flex items-center gap-2">
                      <select
                        value={user.role}
                        onChange={(e) => updateUserRole(user.id, e.target.value as UserRole)}
                        className="bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-300 dark:border-slate-800 rounded-lg px-2 py-1 text-[11px] font-bold text-[#0F0F0F] dark:text-[#F0F6FC] focus:outline-none focus:ring-2 focus:ring-[#5DD62C]"
                      >
                        <option value="teacher">Teacher</option>
                        <option value="coordinator">Coordinator</option>
                        <option value="admin">System Admin</option>
                      </select>

                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border transition cursor-pointer ${
                          user.is_active
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                            : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-300 dark:border-rose-800'
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

      {/* TAB 3: COLLEGES DIRECTORY */}
      {activeTab === 'colleges' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-black text-[#0F0F0F] dark:text-[#F0F6FC]">PU Colleges Directory</h3>
              <p className="text-[10px] text-[#64748B] dark:text-[#8B949E]">Manage institutions & assign lead coordinators</p>
            </div>
            <button
              onClick={() => navigateTo('colleges')}
              className="px-3 py-1.5 rounded-xl bg-[#5DD62C] text-[#0F0F0F] font-black text-xs shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add College</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {colleges.map(col => (
              <div key={col.id} className="p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#0F0F0F] dark:text-[#F0F6FC]">{col.name}</h4>
                    <p className="text-[10px] text-[#64748B] dark:text-[#8B949E]">{col.city} • Lead: <strong className="text-[#337418] dark:text-[#5DD62C]">{col.assigned_coordinator_name}</strong></p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('colleges')}
                  className="p-1.5 rounded-lg bg-[#F8FAFC] dark:bg-[#0D1117] hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0F0F0F] dark:text-[#F0F6FC] border border-slate-200 dark:border-slate-800 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: BROADCAST NOTICES */}
      {activeTab === 'announcements' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-black text-[#0F0F0F] dark:text-[#F0F6FC]">Broadcast Notices Engine</h3>
              <p className="text-[10px] text-[#64748B] dark:text-[#8B949E]">Track teacher acknowledgements in real time</p>
            </div>
            <button
              onClick={() => navigateTo('announcement_create')}
              className="px-3 py-1.5 rounded-xl bg-[#5DD62C] text-[#0F0F0F] font-black text-xs shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>+ New Notice</span>
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map(ann => (
              <div key={ann.id} className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                        ann.priority === 'urgent' ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400' : 'bg-[#5DD62C]/20 text-[#337418] dark:text-[#5DD62C]'
                      }`}>
                        {ann.announcement_type}
                      </span>
                      <span className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-mono">
                        {new Date(ann.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <h4 className="text-xs font-black text-[#0F0F0F] dark:text-[#F0F6FC]">{ann.title}</h4>
                    <p className="text-[11px] text-[#475569] dark:text-[#8B949E] mt-1 line-clamp-2">{ann.content}</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-[#64748B] dark:text-[#8B949E] uppercase font-bold">ACK Rate: </span>
                    <strong className="text-[#337418] dark:text-[#5DD62C] font-mono font-bold">87.5% (7/8 ACKed)</strong>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleSendReminder(ann.id)}
                      className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800 text-[10px] font-bold transition flex items-center gap-1 hover:bg-amber-100 cursor-pointer"
                    >
                      <span>{reminderSentFor === ann.id ? 'Reminder Sent!' : 'Remind Pending'}</span>
                    </button>

                    <button
                      onClick={() => navigateTo('acknowledgement_tracker', { announcementId: ann.id })}
                      className="px-2.5 py-1 rounded-lg bg-[#5DD62C] text-[#0F0F0F] text-[10px] font-black shadow-xs cursor-pointer"
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

      {/* TAB 5: HELP DESK & SUPPORT ISSUES */}
      {activeTab === 'issues' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-black text-[#0F0F0F] dark:text-[#F0F6FC]">Technova Help Desk Queue</h3>
              <p className="text-[10px] text-[#64748B] dark:text-[#8B949E]">Resolve technical & venue issues from delegates</p>
            </div>
            <button
              onClick={() => navigateTo('issues')}
              className="px-3 py-1.5 rounded-xl bg-[#5DD62C] text-[#0F0F0F] font-black text-xs shadow-xs cursor-pointer"
            >
              Open Queue
            </button>
          </div>

          <div className="space-y-2.5">
            {issues.map(iss => {
              const isResolved = iss.status === 'Resolved';

              return (
                <div key={iss.id} className="p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                          isResolved ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400'
                        }`}>
                          {iss.status}
                        </span>
                        <span className="text-[10px] text-[#64748B] dark:text-[#8B949E] uppercase font-bold">{iss.type}</span>
                      </div>
                      <h4 className="text-xs font-black text-[#0F0F0F] dark:text-[#F0F6FC]">{iss.title}</h4>
                      <p className="text-[11px] text-[#475569] dark:text-[#8B949E] mt-0.5">{iss.description}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-[#64748B] dark:text-[#8B949E]">Reporter: {iss.creator_name || 'Delegate'}</span>
                    <button
                      onClick={() => updateIssueStatus(iss.id, isResolved ? 'Open' : 'Resolved')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition border cursor-pointer ${
                        isResolved
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                          : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
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
