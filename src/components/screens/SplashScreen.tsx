'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Radio, ArrowRight, ShieldCheck } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';

export const SplashScreen: React.FC = () => {
  const { navigateTo, currentUser } = useApp();

  return (
    <div className="min-h-screen bg-[#0B0F17] flex flex-col justify-between p-6 text-center relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

      {/* Top Space */}
      <div />

      {/* Center Hero */}
      <div className="flex flex-col items-center z-10 max-w-sm mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-cyan-500/30 mb-6 animate-pulse">
          <Radio className="w-10 h-10 text-black font-extrabold" />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          TECHNOVA <span className="text-cyan-400">CONNECT</span>
        </h1>

        <p className="text-xs font-semibold text-cyan-300 tracking-widest uppercase mb-4 px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
          Mobile Communication & Event Coordination
        </p>

        <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
          Real-time event control, college group messaging, official announcement tracking, and issue management for Technova 2026.
        </p>

        <GlassCard className="mt-8 p-4 border-slate-800/80 text-left w-full">
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Secure mobile OTP login & role-based event permissions.</span>
          </div>
        </GlassCard>
      </div>

      {/* Bottom Button */}
      <div className="z-10 max-w-sm mx-auto w-full">
        <button
          onClick={() => navigateTo(currentUser ? 'chat_home' : 'login')}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-base shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        <p className="text-[11px] text-slate-500 mt-4">
          Technova 2026 • Official College Coordination Platform
        </p>
      </div>
    </div>
  );
};
