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
    <div className="min-h-screen bg-[#0B0F17] flex flex-col justify-center px-4 py-8 relative text-[#F8FAFC] font-sans">
      <div className="max-w-sm mx-auto w-full">
        
        {/* Back Button */}
        <button
          onClick={() => navigateTo('login')}
          className="flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-[#F8FAFC] mb-6 transition font-bold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change Number</span>
        </button>

        {/* Title */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-black text-[#F8FAFC]">Verify your number</h2>
          <p className="text-xs text-[#94A3B8] font-medium mt-1">
            Enter the 6-digit verification code sent to
          </p>
          <p className="text-sm font-black text-[#5DD62C] mt-0.5">{pendingPhone}</p>
        </div>

        {/* OTP Input Card */}
        <div className="p-6 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-md">
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
                className="w-11 h-12 text-center text-lg font-black text-[#F8FAFC] bg-[#1E293B] border border-[#334155] rounded-xl focus:border-[#5DD62C] transition focus:outline-none placeholder-[#94A3B8]"
              />
            ))}
          </div>

          {error && <p className="text-xs text-rose-400 font-bold text-center mb-4">{error}</p>}

          <button
            onClick={handleVerify}
            className="w-full py-3.5 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0B0F17] font-black text-sm shadow-xs flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer"
          >
            <span>Verify & Proceed</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-center text-xs text-[#94A3B8] font-bold mt-6">
          <button
            onClick={() => setOtp(['', '', '', '', '', ''])}
            className="flex items-center gap-1.5 hover:text-[#F8FAFC] transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Resend Code</span>
          </button>
        </div>

      </div>
    </div>
  );
};
