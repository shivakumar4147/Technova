'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Settings, Shield, Bell, Check, User, Sliders, Moon, Sun, LogOut } from 'lucide-react';
import { Modal } from '@/components/common/Modal';

export const Header: React.FC = () => {
  const { currentUser, navigateTo, notifications, logout, theme, toggleTheme } = useApp();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  if (!currentUser) return null;

  const unreadNotifs = notifications.filter(n => !n.is_read).length;
  const isDark = theme === 'dark';

  return (
    <>
      {/* Header Bar */}
      <header className={`sticky top-0 z-40 px-4 py-3 border-b shadow-md font-sans transition-colors duration-300 ${
        isDark ? 'bg-[#090D16] border-[#1E293B]' : 'bg-[#FFFFFF] border-[#E2E8F0]'
      }`}>
        <div className="max-w-md mx-auto flex items-center justify-between">
          
          {/* Clean TECHNOVA Text Logo */}
          <div className="flex items-center gap-2">
            <span className={`text-lg font-black tracking-wider uppercase flex items-center gap-1.5 ${
              isDark ? 'text-[#F8FAFC]' : 'text-[#0F172A]'
            }`}>
              TECHNOVA
              <span className="w-2 h-2 rounded-full bg-[#5DD62C] animate-pulse" />
            </span>
          </div>

          {/* Right Corner Settings Button */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className={`p-2 rounded-xl transition active:scale-95 flex items-center gap-1.5 cursor-pointer ${
                isDark ? 'text-[#CBD5E1] hover:bg-[#1E293B] hover:text-[#5DD62C]' : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
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
          <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
            isDark ? 'bg-[#1E293B]/70 border-[#334155] text-[#F8FAFC]' : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A]'
          }`}>
            <img
              src={currentUser.avatar_url}
              alt={currentUser.full_name}
              className="w-11 h-11 rounded-full object-cover border-2 border-[#5DD62C]"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-black truncate">{currentUser.full_name}</h4>
              <p className="text-[11px] opacity-70 truncate">{currentUser.college_name || currentUser.phone}</p>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#5DD62C]/20 text-[#337418] dark:text-[#5DD62C] border border-[#5DD62C]/40 uppercase tracking-wider inline-block mt-1">
                Role: {currentUser.role}
              </span>
            </div>
          </div>

          {/* Preferences Section */}
          <div>
            <h5 className={`text-[11px] font-extrabold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
              isDark ? 'text-[#CBD5E1]' : 'text-[#64748B]'
            }`}>
              <Sliders className="w-3.5 h-3.5 text-[#5DD62C]" />
              <span>Preferences</span>
            </h5>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setIsSettingsOpen(false);
                  navigateTo('notifications');
                }}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-xs font-bold transition cursor-pointer ${
                  isDark ? 'border-[#334155] bg-[#1E293B]/60 hover:bg-[#1E293B] text-[#F8FAFC]' : 'border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#5DD62C]" />
                  <span>Notifications Center</span>
                </div>
                {unreadNotifs > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#5DD62C] text-[#0B0F17] text-[10px] font-black">
                    {unreadNotifs} Unread
                  </span>
                )}
              </button>

              {/* Theme Switcher Toggle Row */}
              <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold transition ${
                isDark ? 'border-[#334155] bg-[#1E293B]/60 text-[#F8FAFC]' : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A]'
              }`}>
                <div className="flex items-center gap-2">
                  {isDark ? <Moon className="w-4 h-4 text-[#5DD62C]" /> : <Sun className="w-4 h-4 text-amber-500" />}
                  <span>Appearance</span>
                </div>

                {/* Dynamic Light/Dark Mode Switch Button */}
                <button
                  onClick={toggleTheme}
                  type="button"
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-xs border ${
                    isDark
                      ? 'bg-[#5DD62C] text-[#0B0F17] border-[#5DD62C]'
                      : 'bg-[#0F172A] text-[#F8FAFC] border-[#0F172A]'
                  }`}
                >
                  {isDark ? (
                    <>
                      <Moon className="w-3.5 h-3.5 fill-current" />
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400 fill-current" />
                      <span>Light Mode</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className={`pt-2 border-t ${isDark ? 'border-[#334155]' : 'border-[#E2E8F0]'}`}>
            <button
              onClick={() => {
                setIsSettingsOpen(false);
                logout();
              }}
              className="w-full p-3 rounded-xl border border-rose-500/40 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 font-extrabold text-xs flex items-center justify-center gap-2 transition cursor-pointer active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of Technova</span>
            </button>
          </div>

          {/* App Metadata */}
          <div className={`pt-2 border-t flex items-center justify-between text-[10px] font-mono ${
            isDark ? 'border-[#334155] text-[#94A3B8]' : 'border-[#E2E8F0] text-[#64748B]'
          }`}>
            <span>Technova Connect v2.6.0</span>
            <span className="text-[#5DD62C] font-bold">Theme: {theme.toUpperCase()}</span>
          </div>

        </div>
      </Modal>
    </>
  );
};
