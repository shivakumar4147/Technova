'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';

export const OtpScreen: React.FC = () => {
  const { pendingPhone, verifyOtp, navigateTo } = useApp();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
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
      setError('Invalid verification code');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] dark:bg-[#0D1117] flex flex-col justify-center px-4 py-8 relative text-[#0F0F0F] dark:text-[#F0F6FC] font-sans transition-colors duration-200">
      <div className="max-w-sm mx-auto w-full">
        
        {/* Back Button */}
        <button
          onClick={() => navigateTo('login')}
          className="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-[#8B949E] hover:text-[#0F0F0F] dark:hover:text-[#F0F6FC] mb-6 transition font-bold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change Number</span>
        </button>

        {/* Title */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-black text-[#0F0F0F] dark:text-[#F0F6FC]">Verify your number</h2>
          <p className="text-xs text-[#64748B] dark:text-[#8B949E] font-medium mt-1">
            Enter the 6-digit verification code sent to
          </p>
          <p className="text-sm font-extrabold text-[#337418] dark:text-[#5DD62C] mt-0.5">{pendingPhone}</p>
        </div>

        {/* OTP Input Card */}
        <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex justify-between gap-2 mb-6">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                placeholder="•"
                className="w-11 h-12 text-center text-lg font-black text-[#0F0F0F] dark:text-[#F0F6FC] bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-300 dark:border-slate-800 rounded-xl focus:border-[#5DD62C] transition focus:outline-none"
              />
            ))}
          </div>

          {error && <p className="text-xs text-rose-600 dark:text-rose-400 font-bold text-center mb-4">{error}</p>}

          <button
            onClick={handleVerify}
            className="w-full py-3.5 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0F0F0F] font-extrabold text-sm shadow-xs flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer"
          >
            <span>Verify & Proceed</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-center text-xs text-[#64748B] dark:text-[#8B949E] font-bold mt-6">
          <button
            onClick={() => setOtp(['', '', '', '', '', ''])}
            className="flex items-center gap-1.5 hover:text-[#0F0F0F] dark:hover:text-[#F0F6FC] transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Resend Code</span>
          </button>
        </div>

      </div>
    </div>
  );
};
