'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Settings, Shield, Bell, Check, User, Sliders, Moon, LogOut } from 'lucide-react';
import { Modal } from '@/components/common/Modal';

export const Header: React.FC = () => {
  const { currentUser, switchUserRole, navigateTo, notifications } = useApp();
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
              className="p-2 rounded-xl text-[#F8F8F8] hover:bg-[#202020] hover:text-[#5DD62C] transition active:scale-95 flex items-center gap-1.5"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Comprehensive App Settings & Role Modal */}
      <Modal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="Application Settings"
      >
        <div className="space-y-4 text-xs">
          
          {/* Current User Profile Card */}
          <div className="p-3 rounded-2xl bg-[#F8F8F8] border border-[#202020]/10 flex items-center gap-3">
            <img
              src={currentUser.avatar_url}
              alt={currentUser.full_name}
              className="w-10 h-10 rounded-full object-cover border border-[#5DD62C]"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-[#0F0F0F] truncate">{currentUser.full_name}</h4>
              <p className="text-[11px] text-[#202020]/70 truncate">{currentUser.college_name || currentUser.phone}</p>
              <span className="text-[10px] font-extrabold text-[#337418] uppercase tracking-wider block mt-0.5">
                Role: {currentUser.role}
              </span>
            </div>
          </div>

          {/* Demo Role Perspective Switcher */}
          <div>
            <h5 className="text-[11px] font-extrabold text-[#0F0F0F] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#337418]" />
              <span>Switch Demo Perspective</span>
            </h5>
            <div className="space-y-2">
              {[
                { id: 'teacher', title: 'Teacher (Ramesh Bhat)', desc: 'View college group, official updates & report issues' },
                { id: 'coordinator', title: 'Coordinator (Priya Nayak)', desc: 'Broadcast announcements, track ack & manage issues' },
                { id: 'admin', title: 'System Admin (Anand Sharma)', desc: 'Full command center & administrative controls' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    const target = item.id === 'teacher' ? 'user-104' : item.id === 'coordinator' ? 'user-102' : 'user-101';
                    switchUserRole(target);
                    setIsSettingsOpen(false);
                  }}
                  className={`w-full p-3 rounded-xl border text-left transition flex items-start justify-between ${
                    currentUser.role === item.id
                      ? 'bg-[#5DD62C]/20 border-[#5DD62C] text-[#0F0F0F]'
                      : 'bg-[#FFFFFF] border-[#202020]/15 text-[#0F0F0F] hover:bg-[#F8F8F8]'
                  }`}
                >
                  <div>
                    <div className="font-bold text-[#0F0F0F] text-xs mb-0.5">{item.title}</div>
                    <div className="text-[11px] text-[#202020]/80 leading-normal">{item.desc}</div>
                  </div>
                  {currentUser.role === item.id && <Check className="w-4 h-4 text-[#337418] shrink-0 mt-0.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions inside Settings */}
          <div>
            <h5 className="text-[11px] font-extrabold text-[#0F0F0F] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#337418]" />
              <span>Preferences</span>
            </h5>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setIsSettingsOpen(false);
                  navigateTo('notifications');
                }}
                className="w-full p-2.5 rounded-xl border border-[#202020]/15 bg-[#FFFFFF] hover:bg-[#F8F8F8] flex items-center justify-between text-xs font-bold text-[#0F0F0F]"
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#337418]" />
                  <span>Notifications Center</span>
                </div>
                {unreadNotifs > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#5DD62C] text-[#0F0F0F] text-[10px] font-extrabold">
                    {unreadNotifs} Unread
                  </span>
                )}
              </button>

              <div className="p-2.5 rounded-xl border border-[#202020]/15 bg-[#FFFFFF] flex items-center justify-between text-xs font-bold text-[#0F0F0F]">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-[#337418]" />
                  <span>Appearance</span>
                </div>
                <span className="text-[11px] text-[#202020]/70 font-mono">Clean White Theme</span>
              </div>
            </div>
          </div>

          {/* App Metadata */}
          <div className="pt-2 border-t border-[#202020]/10 flex items-center justify-between text-[10px] text-[#202020]/60 font-mono">
            <span>Technova Connect v2.6.0</span>
            <span>All Systems Operational</span>
          </div>

        </div>
      </Modal>
    </>
  );
};
