'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Radio, ShieldCheck } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { loginWithGoogle } = useApp();

  return (
    <div className="min-h-screen bg-[#F8F8F8] dark:bg-[#0D1117] flex flex-col justify-center px-4 py-8 relative text-[#0F0F0F] dark:text-[#F0F6FC] font-sans transition-colors duration-200">
      <div className="max-w-sm mx-auto w-full">
        
        {/* Logo Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#5DD62C]/20 border border-[#5DD62C] flex items-center justify-center text-[#0F0F0F] shadow-xs mb-3">
            <Radio className="w-8 h-8 text-[#337418] dark:text-[#5DD62C] font-black" />
          </div>
          <h2 className="text-2xl font-black text-[#0F0F0F] dark:text-[#F0F6FC] tracking-tight">TECHNOVA CONNECT</h2>
          <p className="text-xs text-[#64748B] dark:text-[#8B949E] font-medium mt-1">Inter-Collegiate Event & Communication Hub</p>
        </div>

        {/* Login Card */}
        <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <p className="text-xs text-[#64748B] dark:text-[#8B949E] font-bold text-center mb-2">
            Sign in using your Google account to access Technova 2026
          </p>

          {/* Primary Gmail Sign-In Button */}
          <button
            onClick={() => loginWithGoogle()}
            type="button"
            className="w-full py-4 px-4 rounded-xl bg-[#FFFFFF] dark:bg-[#0D1117] hover:bg-slate-50 dark:hover:bg-slate-800 border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-[#0F0F0F] dark:text-[#F0F6FC] font-black text-sm shadow-xs flex items-center justify-center gap-3 active:scale-[0.98] transition group cursor-pointer"
          >
            {/* Multicolor Google G Logo */}
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>

        {/* Trust info */}
        <div className="mt-8 p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 text-center flex items-center justify-center gap-2 text-xs text-[#64748B] dark:text-[#8B949E]">
          <ShieldCheck className="w-4 h-4 text-[#337418] dark:text-[#5DD62C] shrink-0" />
          <span>Secure Google OAuth synced with Supabase</span>
        </div>

      </div>
    </div>
  );
};
