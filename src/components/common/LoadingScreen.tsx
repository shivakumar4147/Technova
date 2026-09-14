'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  const { theme } = useApp();
  const isLight = theme === 'light';

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center select-none font-sans transition-colors duration-300 ${
      isLight ? 'bg-[#F8F9FA] text-[#0F172A]' : 'bg-[#0B0F17] text-[#F8FAFC]'
    }`}>
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase animate-light-reflect">
        TECHNOVA
      </h1>
      <p className={`text-xs font-bold mt-2 tracking-widest uppercase ${
        isLight ? 'text-[#337418]' : 'text-[#5DD62C]'
      }`}>
        Inter-Collegiate Hub • 2026
      </p>
    </div>
  );
};
