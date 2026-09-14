'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Building, Phone, Moon, Sun, LogOut, ArrowLeft, Edit3, LogIn, Lock } from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { currentUser, logout, navigateTo, loginWithGoogle, themeMode, toggleTheme } = useApp();

  // If user is NOT signed in, render Clean Unauthenticated Sign-In Guard
  if (!currentUser) {
    return (
      <div className="pb-28 pt-8 px-4 max-w-md mx-auto min-h-[80vh] flex flex-col justify-center items-center text-center bg-[#F8F8F8] dark:bg-[#0D1117] font-sans">
        <div className="w-16 h-16 rounded-3xl bg-[#5DD62C]/20 border border-[#5DD62C] flex items-center justify-center text-[#337418] dark:text-[#5DD62C] shadow-xs mb-4">
          <Lock className="w-8 h-8 text-[#337418] dark:text-[#5DD62C]" />
        </div>

        <h2 className="text-xl font-black text-[#0F0F0F] dark:text-[#F0F6FC] mb-1">Not Signed In</h2>
        <p className="text-xs text-[#64748B] dark:text-[#8B949E] font-medium max-w-xs mb-6 leading-relaxed">
          Sign in to access your Technova Connect profile, PU College delegate details, group communications, and role permissions.
        </p>

        <div className="w-full space-y-3 max-w-xs">
          {/* Sign In with Google */}
          <button
            onClick={loginWithGoogle}
            className="w-full py-3.5 px-4 rounded-2xl bg-white dark:bg-[#161B22] border border-slate-300 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#0F0F0F] dark:text-[#F0F6FC] font-black text-xs shadow-xs flex items-center justify-center gap-2.5 transition active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Sign in with Google</span>
          </button>

          {/* Phone / Alternate Login */}
          <button
            onClick={() => navigateTo('login')}
            className="w-full py-3 px-4 rounded-2xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0F0F0F] font-extrabold text-xs shadow-xs flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Go to Login Page</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#F8F8F8] dark:bg-[#0D1117] font-sans">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('chat_home')}
            className="p-1.5 rounded-xl text-[#0F0F0F] dark:text-[#F0F6FC] hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black text-[#0F0F0F] dark:text-[#F0F6FC]">My Profile</h2>
            <p className="text-[11px] text-[#64748B] dark:text-[#8B949E] font-medium">Account preferences & details</p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('profile_setup')}
          className="p-2 rounded-xl text-[#337418] dark:text-[#5DD62C] hover:bg-[#5DD62C]/20 transition cursor-pointer"
          title="Edit Profile"
        >
          <Edit3 className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Profile Overview Card (Clean & Sleek with Profile Photo) */}
      <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs mb-3.5">
        <div className="flex items-center gap-3.5">
          <img
            src={currentUser.avatar_url || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'}
            alt={currentUser.full_name}
            className="w-12 h-12 rounded-full object-cover border-2 border-[#5DD62C] shadow-xs shrink-0"
          />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg bg-[#5DD62C] text-[#0F0F0F] shadow-xs uppercase tracking-wider inline-block mb-1">
              {(currentUser.role || 'teacher').toUpperCase()} ACCESS
            </span>
            <h3 className="text-base font-black text-[#0F0F0F] dark:text-[#F0F6FC] truncate">{currentUser.full_name}</h3>
            <p className="text-xs text-[#475569] dark:text-[#8B949E] font-medium truncate">{currentUser.designation || 'Faculty Member'}</p>
          </div>
        </div>

        <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-[#0F0F0F] dark:text-[#F0F6FC]">
          <Building className="w-4 h-4 text-[#337418] dark:text-[#5DD62C] shrink-0" />
          <span className="font-bold truncate">{currentUser.college_name || 'PU College Delegate'}</span>
        </div>
      </div>

      {/* Two Column Section: Phone Status & Visual Theme Toggle */}
      <div className="grid grid-cols-2 gap-3 mb-3.5">
        {/* Phone Status */}
        <div className="p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between h-28">
          <div className="flex items-center justify-between">
            <Phone className="w-4 h-4 text-[#337418] dark:text-[#5DD62C]" />
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#5DD62C]/20 text-[#2D6614] dark:text-[#5DD62C] border border-[#5DD62C]/50">
              Verified
            </span>
          </div>
          <div>
            <p className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-medium">Mobile Phone</p>
            <p className="text-xs font-bold text-[#0F0F0F] dark:text-[#F0F6FC] font-mono mt-0.5">{currentUser.phone || 'Connected'}</p>
          </div>
        </div>

        {/* Theme & Appearance Toggle */}
        <div
          onClick={toggleTheme}
          className="p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between h-28 cursor-pointer hover:border-[#5DD62C] transition"
        >
          <div className="flex items-center justify-between">
            {themeMode === 'dark' ? (
              <Moon className="w-4 h-4 text-[#5DD62C]" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
              themeMode === 'dark'
                ? 'bg-[#5DD62C]/20 text-[#5DD62C] border-[#5DD62C]/50'
                : 'bg-amber-100 text-amber-800 border-amber-300'
            }`}>
              {themeMode === 'dark' ? 'Dark' : 'Light'}
            </span>
          </div>
          <div>
            <p className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-medium">Visual Theme</p>
            <p className="text-xs font-black text-[#0F0F0F] dark:text-[#F0F6FC] mt-0.5 flex items-center justify-between">
              <span>{themeMode === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
              <span className="text-[10px] text-[#337418] dark:text-[#5DD62C]">Toggle ➔</span>
            </p>
          </div>
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="rounded-2xl overflow-hidden">
        <button
          onClick={logout}
          className="w-full py-3 rounded-2xl bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 font-extrabold text-xs flex items-center justify-center gap-2 transition active:scale-98 shadow-xs cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of Technova Connect</span>
        </button>
      </div>

    </div>
  );
};
