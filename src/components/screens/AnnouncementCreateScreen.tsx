'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Bell, Send, AlertTriangle, ShieldCheck, Check } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';
import { AnnouncementType, AnnouncementPriority } from '@/types';

export const AnnouncementCreateScreen: React.FC = () => {
  const { colleges, createAnnouncement, navigateTo } = useApp();

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
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigateTo('chat_home')}
          className="p-1.5 rounded-xl text-slate-300 hover:bg-slate-800/80 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-bold text-white">Create Official Announcement</h2>
          <p className="text-[10px] text-slate-400">Broadcast notice with acknowledgement tracking</p>
        </div>
      </div>

      <GlassCard variant="bright" className="p-5 border-cyan-500/30 mb-4">
        <form onSubmit={(e) => { e.preventDefault(); setShowConfirmModal(true); }} className="space-y-4">
          
          {/* Target Audience */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Target Audience
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleToggleCollege('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedColleges.includes('ALL')
                    ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
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
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
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
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Announcement Category
            </label>
            <select
              value={announcementType}
              onChange={(e) => setAnnouncementType(e.target.value as AnnouncementType)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
            >
              {announcementTypes.map(t => (
                <option key={t} value={t} className="bg-slate-900 text-white">
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Priority Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'high', 'urgent'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`py-2 rounded-xl text-xs font-bold capitalize transition ${
                    priority === p
                      ? p === 'urgent' ? 'bg-rose-500 text-white' : p === 'high' ? 'bg-amber-500 text-black' : 'bg-cyan-500 text-black'
                      : 'bg-slate-900/80 text-slate-400 border border-slate-800'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cybersecurity Workshop Venue Shift"
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Message Content */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Message Content
            </label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide clear details (e.g. Room 204 → Lab 2 at 11:00 AM)..."
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1.5 active:scale-95 transition"
          >
            <Bell className="w-4 h-4" />
            <span>Broadcast Announcement</span>
          </button>

        </form>
      </GlassCard>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Announcement Broadcast"
      >
        <div className="space-y-4 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30">
            <Badge variant="cyan" size="sm" className="mb-2">{announcementType}</Badge>
            <h4 className="text-sm font-bold text-white mb-1">{title || 'Official Notice'}</h4>
            <p className="text-slate-300">{content || 'No details specified.'}</p>
          </div>

          <p className="text-slate-400">
            This announcement will be broadcast into target college groups and trigger mandatory teacher acknowledgement tracking.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="w-1/2 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
            >
              Edit Notice
            </button>
            <button
              onClick={handleConfirmSend}
              className="w-1/2 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold shadow-md shadow-cyan-400/20 flex items-center justify-center gap-1"
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
