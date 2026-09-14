'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { User, Building, Phone, Shield, Moon, LogOut, ArrowLeft, Edit3, ChevronRight, Check } from 'lucide-react';
import { BentoGrid, BentoCard } from '@/components/common/BentoGrid';
import { Badge } from '@/components/common/Badge';

export const ProfileScreen: React.FC = () => {
  const { currentUser, switchUserRole, logout, navigateTo } = useApp();

  return (
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto min-h-screen">
      
      {/* Bento Layout — Profile Overview */}
      <BentoGrid className="gap-3.5">

        {/* Block 1: Header Bar */}
        <BentoCard span="full" variant="level2" className="border-slate-800 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('chat_home')}
                className="p-1.5 rounded-xl text-slate-300 hover:bg-slate-800/80 transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-base font-extrabold text-white">My Profile</h2>
            </div>

            <button
              onClick={() => navigateTo('profile_setup')}
              className="p-2 rounded-xl text-cyan-400 hover:bg-cyan-500/10 transition"
              title="Edit Profile"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </BentoCard>

        {/* Block 2: Hero Profile Bento Spotlight (Full Width) */}
        <BentoCard span="full" variant="level3" className="border-cyan-500/40 text-center py-6">
          <div className="relative w-20 h-20 rounded-full mx-auto mb-3 border-2 border-cyan-400 p-0.5 shadow-lg shadow-cyan-500/20">
            <img
              src={currentUser?.avatar_url || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <h3 className="text-lg font-extrabold text-white">{currentUser?.full_name}</h3>
          <p className="text-xs text-slate-300 mt-0.5">{currentUser?.designation || 'Lecturer in Computer Science'}</p>

          <div className="flex items-center justify-center gap-2 mt-3">
            <Badge
              variant={currentUser?.role === 'admin' ? 'red' : currentUser?.role === 'coordinator' ? 'amber' : 'cyan'}
              size="md"
            >
              {currentUser?.role.toUpperCase()} ACCESS
            </Badge>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-300">
            <Building className="w-4 h-4 text-cyan-400" />
            <span>{currentUser?.college_name || 'St. Aloysius PU College'}</span>
          </div>
        </BentoCard>

        {/* Block 3: Role Fast-Switcher Bento Block */}
        <BentoCard span="full" variant="level2" className="border-slate-800">
          <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2.5">
            Role Access Switcher
          </h4>

          <div className="grid grid-cols-3 gap-2">
            {(['teacher', 'coordinator', 'admin'] as const).map((role) => (
              <button
                key={role}
                onClick={() => switchUserRole(role)}
                className={`py-2.5 rounded-xl text-xs font-extrabold capitalize transition flex items-center justify-center gap-1 ${
                  currentUser?.role === role
                    ? 'bg-cyan-400 text-black shadow-md shadow-cyan-400/20'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800'
                }`}
              >
                {currentUser?.role === role && <Check className="w-3.5 h-3.5" />}
                <span>{role}</span>
              </button>
            ))}
          </div>
        </BentoCard>

        {/* Block 4: Phone Status */}
        <BentoCard span="col-1" variant="level2" className="flex flex-col justify-between h-28 border-slate-800">
          <div className="flex items-center justify-between">
            <Phone className="w-4 h-4 text-cyan-400" />
            <Badge variant="green" size="sm">Verified</Badge>
          </div>
          <div>
            <p className="text-[10px] text-slate-400">Mobile Phone</p>
            <p className="text-xs font-bold text-white font-mono">{currentUser?.phone}</p>
          </div>
        </BentoCard>

        {/* Block 5: Theme & Appearance */}
        <BentoCard span="col-1" variant="level2" className="flex flex-col justify-between h-28 border-slate-800">
          <div className="flex items-center justify-between">
            <Moon className="w-4 h-4 text-cyan-400" />
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF]" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400">Visual Theme</p>
            <p className="text-xs font-bold text-white">Glassmorphism</p>
          </div>
        </BentoCard>

        {/* Block 6: Sign Out */}
        <BentoCard span="full" variant="level2" className="p-0 border-rose-500/30 overflow-hidden">
          <button
            onClick={logout}
            className="w-full py-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-extrabold text-xs flex items-center justify-center gap-2 transition active:scale-98"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of Technova Connect</span>
          </button>
        </BentoCard>

      </BentoGrid>

    </div>
  );
};
