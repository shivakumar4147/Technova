'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Radio, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { navigateTo, currentUser, screenParams } = useApp();

  const handleGetStarted = () => {
    if (currentUser) {
      if (!currentUser.is_profile_complete || !currentUser.college_id) {
        navigateTo('profile_setup');
      } else {
        navigateTo('chat_home');
      }
    } else if (screenParams?.email) {
      navigateTo('profile_setup');
    } else {
      navigateTo('login');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex flex-col justify-between p-6 text-center relative overflow-hidden text-white font-sans selection:bg-[#5DD62C] selection:text-black">
      
      {/* Background Ambient Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#5DD62C]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="pt-4 z-10 flex justify-center">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] font-black text-[#5DD62C] tracking-widest uppercase shadow-md">
          <Sparkles className="w-3 h-3 text-[#5DD62C] animate-pulse" />
          OFFICIAL INTER-COLLEGIATE PLATFORM
        </span>
      </div>

      {/* Center Hero with Light-Reflecting TECHNOVA Effect */}
      <div className="flex flex-col items-center z-10 max-w-sm mx-auto my-auto">
        
        {/* Glowing Radio App Icon */}
        <div className="relative w-20 h-20 rounded-3xl bg-slate-900 border border-[#5DD62C]/40 flex items-center justify-center text-[#5DD62C] shadow-2xl mb-8 group">
          <div className="absolute inset-0 rounded-3xl bg-[#5DD62C]/20 blur-md group-hover:blur-lg transition-all" />
          <Radio className="w-10 h-10 text-[#5DD62C] font-black relative z-10 animate-pulse" />
        </div>

        {/* LIGHT-REFLECTING TECHNOVA TEXT */}
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase mb-2 animate-light-reflect">
          TECHNOVA
        </h1>

        <p className="text-sm font-extrabold text-[#5DD62C] tracking-widest uppercase mb-6 flex items-center gap-1">
          <span>CONNECT</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#5DD62C] inline-block animate-ping" />
        </p>

        <p className="text-xs font-medium text-slate-400 max-w-xs leading-relaxed mb-6">
          Real-time event operations, college group messaging, official announcement tracking & delegate permissions for Technova 2026.
        </p>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-left w-full shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <ShieldCheck className="w-5 h-5 text-[#5DD62C] shrink-0" />
            <span className="font-medium text-[11px] leading-tight">
              Google OAuth authentication & role-based delegate security powered by Supabase.
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="z-10 max-w-sm mx-auto w-full pb-4">
        <button
          onClick={handleGetStarted}
          className="w-full py-4 rounded-2xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0F0F0F] font-extrabold text-base shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer border border-[#5DD62C]"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        <p className="text-[11px] text-slate-500 font-semibold mt-4">
          Technova 2026 • Command & Delegate Network
        </p>
      </div>
    </div>
  );
};
