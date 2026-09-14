'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Search, Plus, MessageSquare, Users, Building2, Shield, Bell, Megaphone, School, UserPlus, Phone, Check, X } from 'lucide-react';
import { Modal } from '@/components/common/Modal';

export const ChatHomeScreen: React.FC = () => {
  const { conversations, currentUser, setActiveConversationId, navigateTo, announcements, createGroupConversation, profiles } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'groups' | 'direct'>('all');

  // Create New Group Modal State
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [selectedMemberPhones, setSelectedMemberPhones] = useState<string[]>([]);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (conv.last_message && conv.last_message.toLowerCase().includes(searchQuery.toLowerCase()));

    if (filterTab === 'groups') return matchesSearch && conv.is_group;
    if (filterTab === 'direct') return matchesSearch && !conv.is_group;
    return matchesSearch;
  });

  const latestAnnouncement = announcements[0];

  const handleAddPhone = () => {
    if (!phoneInput.trim()) return;
    const formatted = phoneInput.trim();
    if (!selectedMemberPhones.includes(formatted)) {
      setSelectedMemberPhones(prev => [...prev, formatted]);
    }
    setPhoneInput('');
  };

  const handleToggleContact = (phone: string) => {
    if (selectedMemberPhones.includes(phone)) {
      setSelectedMemberPhones(prev => prev.filter(p => p !== phone));
    } else {
      setSelectedMemberPhones(prev => [...prev, phone]);
    }
  };

  const handleCreateGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    createGroupConversation(newGroupName.trim(), selectedMemberPhones);
    setNewGroupName('');
    setSelectedMemberPhones([]);
    setPhoneInput('');
    setIsNewGroupModalOpen(false);
  };

  return (
    <div className="min-h-[calc(100vh-56px)] max-w-md mx-auto bg-[#0B0F17] pb-28 relative font-sans text-[#F8FAFC]">
      
      {/* UNIFIED HEADER & SEARCH CONTROLS */}
      <div className="px-4 pt-3 pb-2 bg-[#0B0F17]">
        
        {/* Search Input */}
        <div className="mb-2.5 relative">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats, groups or messages..."
            className="w-full bg-[#1E293B] border border-[#334155] rounded-2xl pl-10 pr-4 py-2.5 text-xs font-medium text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#5DD62C] transition shadow-xs"
          />
        </div>

        {/* Latest Official Notice Banner */}
        {latestAnnouncement && (
          <div
            onClick={() => navigateTo('acknowledgement_tracker', { announcementId: latestAnnouncement.id })}
            className="mb-3 p-3.5 rounded-2xl bg-[#111827] border border-[#5DD62C]/40 hover:border-[#5DD62C] cursor-pointer transition-all shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              {/* Left Column: Megaphone Icon + Notice Details */}
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-[#5DD62C] text-[#0B0F17] flex items-center justify-center font-black shrink-0 shadow-xs mt-0.5">
                  <Megaphone className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-black text-[#5DD62C] uppercase tracking-wider block">OFFICIAL NOTICE</span>
                  <h4 className="text-[12px] font-bold text-[#F8FAFC] line-clamp-1 mt-0.5">{latestAnnouncement.title}</h4>
                </div>
              </div>

              {/* Right Column: Timing & Ack Counter */}
              <div className="flex flex-col items-end shrink-0 gap-1.5">
                <span className="text-[10px] font-semibold text-[#94A3B8] whitespace-nowrap">
                  {latestAnnouncement.created_at}
                </span>
                <div className="text-[10px] font-extrabold text-[#5DD62C] px-2 py-0.5 rounded-lg bg-[#5DD62C]/20 border border-[#5DD62C]/40 whitespace-nowrap">
                  {latestAnnouncement.acknowledged_count}/{latestAnnouncement.sent_to_count} Ack
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
          <div className="flex items-center gap-1.5">
            {[
              { id: 'all', label: 'All Chats' },
              { id: 'groups', label: 'Groups' },
              { id: 'direct', label: 'Direct' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  filterTab === tab.id
                    ? 'bg-[#5DD62C] text-[#0B0F17] font-black shadow-xs'
                    : 'bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#334155]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {(currentUser?.role === 'admin' || currentUser?.role === 'coordinator') && (
            <button
              onClick={() => setIsNewGroupModalOpen(true)}
              className="p-2 rounded-xl bg-[#5DD62C]/20 border border-[#5DD62C]/50 text-[#5DD62C] hover:bg-[#5DD62C] hover:text-[#0B0F17] transition active:scale-95 flex items-center justify-center cursor-pointer"
              title="Create New Group"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* CHAT CONVERSATION LIST */}
      <div className="divide-y divide-[#1E293B]/60">
        {filteredConversations.map(conv => (
          <div
            key={conv.id}
            onClick={() => {
              setActiveConversationId(conv.id);
              if (conv.is_group) navigateTo('group_chat');
              else navigateTo('private_chat');
            }}
            className="p-4 bg-[#0B0F17] hover:bg-[#111827] cursor-pointer transition flex items-center justify-between"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="relative shrink-0">
                {conv.is_group ? (
                  <div className="w-12 h-12 rounded-2xl bg-[#5DD62C]/15 border border-[#5DD62C]/30 text-[#5DD62C] flex items-center justify-center font-bold text-lg">
                    <School className="w-6 h-6" />
                  </div>
                ) : (
                  <img
                    src={conv.avatar_url}
                    alt={conv.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-[#1E293B]"
                  />
                )}
                {conv.unread_count && conv.unread_count > 0 ? (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#5DD62C] text-[#0B0F17] font-black text-[10px] flex items-center justify-center border-2 border-[#0B0F17]">
                    {conv.unread_count}
                  </span>
                ) : null}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs font-black text-[#F8FAFC] truncate pr-2">{conv.name}</h3>
                  <span className="text-[10px] font-medium text-[#94A3B8] shrink-0 font-mono">
                    {conv.last_message_time || 'Just now'}
                  </span>
                </div>
                <p className="text-[11px] text-[#94A3B8] truncate font-medium">
                  {conv.last_message || 'Tap to start conversation'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create New Group Modal */}
      <Modal
        isOpen={isNewGroupModalOpen}
        onClose={() => setIsNewGroupModalOpen(false)}
        title="Create Technova PU Group"
      >
        <form onSubmit={handleCreateGroupSubmit} className="space-y-4 text-xs font-sans text-[#F8FAFC]">
          <div>
            <label className="block text-[#F8FAFC] font-extrabold mb-1">Group Name *</label>
            <input
              type="text"
              required
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="e.g. St. Aloysius PU Delegates 2026"
              className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-2.5 text-xs font-bold text-[#F8FAFC] placeholder-[#94A3B8] focus:border-[#5DD62C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#F8FAFC] font-extrabold mb-1">Add Phone Number</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="+91 98450 00000"
                className="flex-1 bg-[#1E293B] border border-[#334155] rounded-xl p-2.5 text-xs font-bold text-[#F8FAFC] placeholder-[#94A3B8] focus:border-[#5DD62C] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddPhone}
                className="px-3.5 py-2.5 rounded-xl bg-[#5DD62C] text-[#0B0F17] font-black text-xs hover:bg-[#50b925] transition cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* Selected Numbers Chips */}
          {selectedMemberPhones.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedMemberPhones.map(ph => (
                <span
                  key={ph}
                  className="px-2.5 py-1 rounded-lg bg-[#5DD62C]/20 border border-[#5DD62C]/40 text-[#5DD62C] font-bold text-[10px] flex items-center gap-1"
                >
                  <span>{ph}</span>
                  <button type="button" onClick={() => handleToggleContact(ph)}>
                    <X className="w-3 h-3 hover:text-rose-400" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#1E293B]">
            <button
              type="button"
              onClick={() => setIsNewGroupModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0B0F17] font-black shadow-xs cursor-pointer"
            >
              Create Group
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
