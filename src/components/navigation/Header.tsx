'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Settings, Bell, Sliders, Moon, Sun } from 'lucide-react';
import { Modal } from '@/components/common/Modal';

export const Header: React.FC = () => {
  const { currentUser, navigateTo, notifications, themeMode, toggleTheme } = useApp();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  if (!currentUser) return null;

  const unreadNotifs = notifications.filter(n => !n.is_read).length;

  return (
    <>
      {/* Sleek Dark Charcoal Header Bar (#0F0F0F) */}
      <header className="sticky top-0 z-40 bg-[#0F0F0F] px-4 py-3 border-b border-[#202020] shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          
          {/* Clean TECHNOVA Text Logo */}
          <div className="flex items-center">
            <span className="text-lg font-black text-[#F8F8F8] tracking-wider uppercase">
              TECHNOVA
            </span>
          </div>

          {/* Right Corner Settings Button */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-xl text-[#F8F8F8] hover:bg-[#202020] hover:text-[#5DD62C] transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Comprehensive App Settings Modal */}
      <Modal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="Application Settings"
      >
        <div className="space-y-4 text-xs font-sans">
          
          {/* Current User Profile Card */}
          <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <img
              src={currentUser.avatar_url}
              alt={currentUser.full_name}
              className="w-10 h-10 rounded-full object-cover border border-[#5DD62C]"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-black text-[#0F0F0F] dark:text-[#F0F6FC] truncate">{currentUser.full_name}</h4>
              <p className="text-[11px] text-[#64748B] dark:text-[#8B949E] truncate">{currentUser.college_name || currentUser.phone}</p>
              <span className="text-[10px] font-extrabold text-[#337418] dark:text-[#5DD62C] uppercase tracking-wider block mt-0.5 capitalize">
                Role: {currentUser.role}
              </span>
            </div>
          </div>

          {/* Preferences & Theme Section */}
          <div>
            <h5 className="text-[11px] font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#337418] dark:text-[#5DD62C]" />
              <span>Preferences</span>
            </h5>
            
            <div className="space-y-2">
              
              {/* Notifications Center button */}
              <button
                onClick={() => {
                  setIsSettingsOpen(false);
                  navigateTo('notifications');
                }}
                className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#FFFFFF] dark:bg-[#161B22] hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-between text-xs font-bold text-[#0F0F0F] dark:text-[#F0F6FC] transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#337418] dark:text-[#5DD62C]" />
                  <span>Notifications Center</span>
                </div>
                {unreadNotifs > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#5DD62C] text-[#0F0F0F] text-[10px] font-extrabold">
                    {unreadNotifs} Unread
                  </span>
                )}
              </button>

              {/* Interactive Theme Mode Switcher */}
              <div className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#FFFFFF] dark:bg-[#161B22] flex items-center justify-between text-xs font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">
                <div className="flex items-center gap-2">
                  {themeMode === 'dark' ? (
                    <Moon className="w-4 h-4 text-[#5DD62C]" />
                  ) : (
                    <Sun className="w-4 h-4 text-amber-500" />
                  )}
                  <span>Theme Mode</span>
                </div>

                <button
                  onClick={toggleTheme}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 shadow-xs ${
                    themeMode === 'dark'
                      ? 'bg-[#5DD62C] text-[#0F0F0F]'
                      : 'bg-slate-100 text-[#0F0F0F] border border-slate-300'
                  }`}
                >
                  {themeMode === 'dark' ? (
                    <>
                      <Moon className="w-3.5 h-3.5" />
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>Light Mode</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* App Metadata */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] text-[#64748B] dark:text-[#8B949E] font-mono">
            <span>Technova Connect v2.6.0</span>
            <span className="text-[#337418] dark:text-[#5DD62C] font-bold">All Systems Operational</span>
          </div>

        </div>
      </Modal>
    </>
  );
};
