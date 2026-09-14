'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';

export const OtpScreen: React.FC = () => {
  const { pendingPhone, verifyOtp, navigateTo } = useApp();
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [error, setError] = useState('');

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter all 6 digits');
      return;
    }
    setError('');
    const success = verifyOtp(code);
    if (!success) {
      setError('Invalid OTP. Use 123456 for demo verification.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex flex-col justify-center px-4 py-8 relative">
      <div className="max-w-sm mx-auto w-full">
        
        {/* Back Button */}
        <button
          onClick={() => navigateTo('login')}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change Number</span>
        </button>

        {/* Title */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white">Verify your number</h2>
          <p className="text-xs text-slate-400 mt-1">
            We sent a 6-digit verification code to
          </p>
          <p className="text-sm font-bold text-cyan-400 mt-0.5">{pendingPhone}</p>
        </div>

        {/* OTP Input Boxes */}
        <GlassCard variant="bright" className="p-6">
          <div className="flex justify-between gap-2 mb-6">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="w-11 h-12 text-center text-lg font-bold text-white bg-slate-900/80 border border-slate-700/80 rounded-xl focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition focus:outline-none"
              />
            ))}
          </div>

          {error && <p className="text-xs text-rose-400 text-center mb-4">{error}</p>}

          <button
            onClick={handleVerify}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 active:scale-[0.98] transition"
          >
            <span>Verify & Proceed</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </GlassCard>

        {/* Footer Actions */}
        <div className="flex items-center justify-between text-xs text-slate-400 mt-6 px-2">
          <button
            onClick={() => setOtp(['1', '2', '3', '4', '5', '6'])}
            className="flex items-center gap-1 hover:text-cyan-400 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Resend OTP</span>
          </button>

          <span className="text-[11px] text-cyan-400/80 font-mono">Demo OTP: 123456</span>
        </div>

      </div>
    </div>
  );
};
