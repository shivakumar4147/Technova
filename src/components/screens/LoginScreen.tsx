'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Radio, Phone, ArrowRight, Shield, Zap } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';

export const LoginScreen: React.FC = () => {
  const { loginWithPhone, navigateTo } = useApp();
  const [phoneNumber, setPhoneNumber] = useState('9800011122');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    const fullPhone = `+91${phoneNumber}`;
    loginWithPhone(fullPhone);
    navigateTo('otp');
  };

  const handleQuickSelect = (phoneStr: string) => {
    const raw = phoneStr.replace('+91', '').trim();
    setPhoneNumber(raw);
    loginWithPhone(phoneStr);
    navigateTo('otp');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-8 relative">
      <div className="max-w-sm mx-auto w-full">
        
        {/* Logo Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center text-white shadow-xl shadow-cyan-500/20 mb-3 backdrop-blur-xl">
            <Radio className="w-8 h-8 text-cyan-400 font-extrabold" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-wide">TECHNOVA CONNECT</h2>
          <p className="text-xs text-slate-300 mt-1">Mobile-First Event & Communication Platform</p>
        </div>

        {/* Level 3 Glass Login Form */}
        <GlassCard variant="level3" className="p-6 border-cyan-500/30">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Mobile Number
              </label>
              <div className="flex items-center rounded-xl glass-level1 border border-slate-700/80 focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400 transition overflow-hidden">
                <span className="px-3 text-sm font-bold text-cyan-400 glass-level2 py-3 border-r border-slate-700/80">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10 digit number"
                  className="w-full bg-transparent px-3 py-3 text-sm font-medium text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
              {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-sm shadow-lg shadow-cyan-400/20 flex items-center justify-center gap-2 active:scale-[0.98] transition"
            >
              <span>Continue with OTP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </GlassCard>

        {/* Quick Demo Login Chips */}
        <div className="mt-6">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Fast-Track Demo Accounts</span>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleQuickSelect('+919800011122')}
              className="w-full p-3 rounded-2xl glass-level1 hover:glass-level2 border border-slate-800 text-left flex items-center justify-between text-xs transition"
            >
              <div>
                <span className="font-semibold text-slate-200">Ramesh Bhat</span>
                <span className="text-[10px] text-cyan-400 ml-2">(Teacher • St. Aloysius)</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">+91 98000 11122</span>
            </button>

            <button
              onClick={() => handleQuickSelect('+919811122233')}
              className="w-full p-3 rounded-2xl glass-level1 hover:glass-level2 border border-slate-800 text-left flex items-center justify-between text-xs transition"
            >
              <div>
                <span className="font-semibold text-slate-200">Prof. Rajesh Sharma</span>
                <span className="text-[10px] text-amber-400 ml-2">(Coordinator)</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">+91 98111 22233</span>
            </button>

            <button
              onClick={() => handleQuickSelect('+919876543210')}
              className="w-full p-3 rounded-2xl glass-level1 hover:glass-level2 border border-slate-800 text-left flex items-center justify-between text-xs transition"
            >
              <div>
                <span className="font-semibold text-slate-200">Dr. Vikram Hegde</span>
                <span className="text-[10px] text-rose-400 ml-2">(Admin)</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">+91 98765 43210</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-[11px] text-center text-slate-500 mt-8">
          Only registered Technova coordinators & teachers can access the platform.
        </p>

      </div>
    </div>
  );
};
