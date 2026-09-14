'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Bell, Send, AlertTriangle, ShieldCheck, Check } from 'lucide-react';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';
import { AnnouncementType, AnnouncementPriority } from '@/types';

export const AnnouncementCreateScreen: React.FC = () => {
  const { currentUser, colleges, createAnnouncement, navigateTo } = useApp();

  const isAuthorized = currentUser?.role === 'admin' || currentUser?.role === 'coordinator';

  if (!isAuthorized) {
    return (
      <div className="pb-24 pt-8 px-4 max-w-md mx-auto min-h-screen text-center flex flex-col justify-center items-center font-sans bg-[#0B0F17] text-[#F8FAFC]">
        <div className="p-6 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-lg space-y-4 max-w-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-black text-[#F8FAFC]">Announcement Restricted</h2>
            <p className="text-xs text-[#94A3B8] font-medium mt-1">
              Broadcasting official announcements is permitted for Admin & Coordinator roles only.
            </p>
          </div>
          <button
            onClick={() => navigateTo('chat_home')}
            className="w-full py-2.5 px-4 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0B0F17] font-extrabold text-xs shadow-xs transition cursor-pointer"
          >
            Return to Main Chat
          </button>
        </div>
      </div>
    );
  }

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [announcementType, setAnnouncementType] = useState<AnnouncementType>('Room change');
  const [priority, setPriority] = useState<AnnouncementPriority>('high');
  const [selectedColleges, setSelectedColleges] = useState<string[]>(['ALL']);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const announcementTypes: AnnouncementType[] = [
    'Room change', 'Schedule update', 'Emergency', 'Transport', 'Workshop', 'Important notice', 'General'
  ];

  const handleToggleCollege = (colId: string) => {
    if (colId === 'ALL') {
      setSelectedColleges(['ALL']);
      return;
    }
    let updated = selectedColleges.filter(id => id !== 'ALL');
    if (updated.includes(colId)) {
      updated = updated.filter(id => id !== colId);
      if (updated.length === 0) updated = ['ALL'];
    } else {
      updated.push(colId);
    }
    setSelectedColleges(updated);
  };

  const handleConfirmSend = () => {
    const targetNames = selectedColleges.includes('ALL')
      ? ['All PU Colleges']
      : colleges.filter(c => selectedColleges.includes(c.id)).map(c => c.short_name);

    createAnnouncement({
      title: title || 'Official Update',
      content: content || 'Please acknowledge this official notice.',
      announcement_type: announcementType,
      priority,
      target_colleges: selectedColleges,
      target_college_names: targetNames
    });

    setShowConfirmModal(false);
    navigateTo('acknowledgement_tracker', { announcementId: 'ann-1' });
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#0B0F17] font-sans text-[#F8FAFC]">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigateTo('chat_home')}
          className="p-1.5 rounded-xl text-[#F8FAFC] hover:bg-[#1E293B] transition cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-black text-[#F8FAFC]">Create Official Announcement</h2>
          <p className="text-[11px] text-[#94A3B8] font-medium">Broadcast notice with acknowledgement tracking</p>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-md mb-4">
        <form onSubmit={(e) => { e.preventDefault(); setShowConfirmModal(true); }} className="space-y-4">
          
          {/* Target Audience */}
          <div>
            <label className="block text-xs font-extrabold text-[#F8FAFC] mb-1.5">
              Target Audience
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleToggleCollege('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedColleges.includes('ALL')
                    ? 'bg-[#5DD62C] text-[#0B0F17] font-black shadow-xs'
                    : 'bg-[#1E293B] text-[#94A3B8] hover:bg-[#334155] border border-[#334155]'
                }`}
              >
                All Colleges
              </button>
              {colleges.map(c => {
                const isSelected = selectedColleges.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleToggleCollege(c.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      isSelected
                        ? 'bg-[#5DD62C] text-[#0B0F17] font-black shadow-xs'
                        : 'bg-[#1E293B] text-[#94A3B8] hover:bg-[#334155] border border-[#334155]'
                    }`}
                  >
                    {c.short_name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Announcement Type */}
          <div>
            <label className="block text-xs font-extrabold text-[#F8FAFC] mb-1.5">
              Announcement Category
            </label>
            <select
              value={announcementType}
              onChange={(e) => setAnnouncementType(e.target.value as AnnouncementType)}
              className="w-full bg-[#1E293B] border border-[#334155] rounded-xl px-3 py-2.5 text-xs font-bold text-[#F8FAFC] focus:border-[#5DD62C] focus:outline-none"
            >
              {announcementTypes.map(t => (
                <option key={t} value={t} className="bg-[#111827] text-[#F8FAFC]">
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-extrabold text-[#F8FAFC] mb-1.5">
              Priority Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'high', 'urgent'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`py-2 rounded-xl text-xs font-extrabold capitalize transition cursor-pointer ${
                    priority === p
                      ? p === 'urgent' ? 'bg-rose-500 text-white' : p === 'high' ? 'bg-amber-500 text-[#0B0F17]' : 'bg-[#5DD62C] text-[#0B0F17]'
                      : 'bg-[#1E293B] text-[#94A3B8] border border-[#334155] hover:bg-[#334155]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-extrabold text-[#F8FAFC] mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cybersecurity Workshop Venue Shift"
              className="w-full bg-[#1E293B] border border-[#334155] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#F8FAFC] placeholder-[#94A3B8] focus:border-[#5DD62C] focus:outline-none"
            />
          </div>

          {/* Message Content */}
          <div>
            <label className="block text-xs font-extrabold text-[#F8FAFC] mb-1">
              Message Content
            </label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide clear details (e.g. Room 204 → Lab 2 at 11:00 AM)..."
              className="w-full bg-[#1E293B] border border-[#334155] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#F8FAFC] placeholder-[#94A3B8] focus:border-[#5DD62C] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0B0F17] font-black text-xs shadow-xs flex items-center justify-center gap-1.5 active:scale-95 transition cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span>Broadcast Announcement</span>
          </button>

        </form>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Announcement Broadcast"
      >
        <div className="space-y-4 text-xs font-sans text-[#F8FAFC]">
          <div className="p-3 rounded-xl bg-[#1E293B] border border-[#334155]">
            <span className="inline-block px-2 py-0.5 rounded-md bg-[#5DD62C]/20 text-[#5DD62C] font-extrabold text-[10px] mb-2 border border-[#5DD62C]/40">
              {announcementType}
            </span>
            <h4 className="text-sm font-black text-[#F8FAFC] mb-1">{title || 'Official Notice'}</h4>
            <p className="text-[#94A3B8] font-medium">{content || 'No details specified.'}</p>
          </div>

          <p className="text-[#94A3B8] font-medium">
            This announcement will be broadcast into target college groups and trigger mandatory teacher acknowledgement tracking.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="w-1/2 py-2.5 rounded-xl bg-[#1E293B] text-[#94A3B8] hover:bg-[#334155] hover:text-[#F8FAFC] font-bold cursor-pointer"
            >
              Edit Notice
            </button>
            <button
              onClick={handleConfirmSend}
              className="w-1/2 py-2.5 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0B0F17] font-black shadow-xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Confirm & Send</span>
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
