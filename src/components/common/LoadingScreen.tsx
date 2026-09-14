'use client';

import React from 'react';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  return (
    <div className="fixed inset-0 z-50 bg-[#FFFFFF] dark:bg-[#0F0F0F] flex items-center justify-center p-6 text-center select-none transition-colors duration-300">
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase animate-light-reflect">
        TECHNOVA
      </h1>
    </div>
  );
};
