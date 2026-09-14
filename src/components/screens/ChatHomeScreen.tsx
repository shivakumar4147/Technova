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
    <div className="h-[calc(100dvh-56px)] max-w-md mx-auto bg-[#FFFFFF] overflow-y-auto pb-28 relative">
      
      {/* UNIFIED HEADER & SEARCH CONTROLS (Scrolls naturally up with the chat list!) */}
      <div className="px-4 pt-3 pb-2 bg-[#FFFFFF]">
        
        {/* Search Input */}
        <div className="mb-2.5 relative">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats, groups or messages..."
            className="w-full bg-[#F1F5F9] border-none rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#0F0F0F] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#5DD62C] transition"
          />
        </div>

        {/* Latest Official Notice Banner */}
        {latestAnnouncement && (
          <div
            onClick={() => navigateTo('acknowledgement_tracker', { announcementId: latestAnnouncement.id })}
            className="mb-3 p-3.5 rounded-2xl bg-[#5DD62C]/10 border border-[#5DD62C]/40 hover:bg-[#5DD62C]/18 cursor-pointer transition-all shadow-xs"
          >
            <div className="flex items-start justify-between gap-3">
              {/* Left Column: Megaphone Icon + Notice Details */}
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-[#5DD62C] text-[#0F0F0F] flex items-center justify-center font-black shrink-0 shadow-xs mt-0.5">
                  <Megaphone className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-black text-[#2D6614] uppercase tracking-wider block">OFFICIAL NOTICE</span>
                  <h4 className="text-[12px] font-bold text-[#0F0F0F] line-clamp-1 mt-0.5">{latestAnnouncement.title}</h4>
                </div>
              </div>

              {/* Right Column: Timing at the Top-Right Corner + Ack Counter */}
              <div className="flex flex-col items-end shrink-0 gap-1.5">
                <span className="text-[10px] font-semibold text-[#64748B] whitespace-nowrap">
                  {latestAnnouncement.created_at}
                </span>
                <div className="text-[10px] font-extrabold text-[#2D6614] px-2 py-0.5 rounded-lg bg-[#5DD62C]/25 border border-[#5DD62C]/60 whitespace-nowrap">
                  {latestAnnouncement.acknowledged_count}/{latestAnnouncement.sent_to_count} Ack
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs - Single straight line with reduced font size */}
        <div className="flex items-center gap-1.5 pb-1 overflow-x-auto no-scrollbar">
          {(['all', 'groups', 'direct'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap capitalize transition shrink-0 ${
                filterTab === tab
                  ? 'bg-[#5DD62C] text-[#0F0F0F] shadow-xs'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-slate-200'
              }`}
            >
              {tab === 'all' ? 'All Chats' : tab === 'groups' ? 'College Groups' : 'Direct Messages'}
            </button>
          ))}
        </div>

      </div>

      {/* WHATSAPP-STYLE FULL-WIDTH CHAT ROWS */}
      <div className="bg-[#FFFFFF]">
        {filteredConversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => {
              setActiveConversationId(conv.id);
              if (conv.is_group) navigateTo('group_chat');
              else navigateTo('private_chat');
            }}
            className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 active:bg-slate-100 transition-colors border-b border-[#F1F5F9]/80"
          >
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              
              {/* Avatar / Group Icon (WhatsApp style circular) */}
              <div className="relative shrink-0">
                {conv.is_group ? (
                  <div className="w-12 h-12 rounded-full bg-[#5DD62C]/15 text-[#0F0F0F] flex items-center justify-center font-black text-base shadow-xs">
                    <School className="w-6 h-6 text-[#337418]" />
                  </div>
                ) : (
                  <img
                    src={conv.avatar_url}
                    alt={conv.name}
                    className="w-12 h-12 rounded-full object-cover shadow-xs"
                  />
                )}
                {conv.is_online && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#5DD62C] border-2 border-[#FFFFFF]" />
                )}
              </div>

              {/* Text Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="text-[13px] font-bold text-[#0F0F0F] truncate pr-2">{conv.name}</h3>
                  <span className="text-[11px] text-[#64748B] shrink-0 font-medium">{conv.last_message_time}</span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[12px] text-[#64748B] truncate pr-2">
                    {conv.is_group && <strong className="text-[#337418]">Coordinator: </strong>}
                    {conv.last_message}
                  </p>
                  {conv.unread_count > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#5DD62C] text-[#0F0F0F] font-extrabold text-[10px] flex items-center justify-center shrink-0 shadow-xs">
                      {conv.unread_count}
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* WHATSAPP FLOATING SMALL SQUARE '+' BUTTON TO CREATE NEW GROUP */}
      <button
        onClick={() => setIsNewGroupModalOpen(true)}
        className="fixed bottom-24 right-4 z-40 w-11 h-11 rounded-2xl bg-[#5DD62C] hover:bg-[#5DD62C]/90 text-[#0F0F0F] font-black shadow-lg flex items-center justify-center transition active:scale-95 border border-[#337418] cursor-pointer"
        title="Create New Group"
      >
        <Plus className="w-5 h-5" strokeWidth={2.5} />
      </button>

      {/* CREATE NEW GROUP MODAL */}
      <Modal
        isOpen={isNewGroupModalOpen}
        onClose={() => setIsNewGroupModalOpen(false)}
        title="Create New WhatsApp Group"
      >
        <form onSubmit={handleCreateGroupSubmit} className="space-y-4 text-xs">
          
          {/* Group Name Field */}
          <div>
            <label className="block text-[11px] font-bold text-[#0F0F0F] uppercase tracking-wider mb-1">
              Group Name *
            </label>
            <input
              type="text"
              required
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="e.g. Canara Faculty 2026, Student Coordinators..."
              className="w-full bg-[#F1F5F9] border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-[#0F0F0F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5DD62C]"
            />
          </div>

          {/* Add Mobile Number Section */}
          <div>
            <label className="block text-[11px] font-bold text-[#0F0F0F] uppercase tracking-wider mb-1">
              Add Members by Mobile Number
            </label>
            <div className="flex items-center gap-2">
              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="+91 98765 43210"
                className="flex-1 bg-[#F1F5F9] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#0F0F0F] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5DD62C]"
              />
              <button
                type="button"
                onClick={handleAddPhone}
                className="px-3.5 py-2 rounded-xl bg-[#5DD62C] text-[#0F0F0F] font-bold text-xs shrink-0 shadow-xs hover:bg-[#5DD62C]/90"
              >
                Add
              </button>
            </div>
          </div>

          {/* Added Members Chips */}
          {selectedMemberPhones.length > 0 && (
            <div>
              <span className="text-[10px] font-extrabold text-[#337418] uppercase tracking-wider block mb-1.5">
                Added Members ({selectedMemberPhones.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedMemberPhones.map((phone) => (
                  <span
                    key={phone}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#5DD62C]/20 text-[#2D6614] border border-[#5DD62C]/50 text-[11px] font-bold"
                  >
                    <span>{phone}</span>
                    <X
                      className="w-3.5 h-3.5 cursor-pointer hover:text-red-600"
                      onClick={() => handleToggleContact(phone)}
                    />
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quick Select Contacts List */}
          <div>
            <span className="text-[11px] font-bold text-[#0F0F0F] uppercase tracking-wider block mb-1.5">
              Or Select From Directory Contacts
            </span>
            <div className="max-h-40 overflow-y-auto space-y-1.5 border border-slate-200 rounded-xl p-2 bg-[#F8F8F8]">
              {profiles.map((p) => {
                const isSelected = selectedMemberPhones.includes(p.phone);
                return (
                  <div
                    key={p.id}
                    onClick={() => handleToggleContact(p.phone)}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition ${
                      isSelected
                        ? 'bg-[#5DD62C]/20 border border-[#5DD62C]'
                        : 'bg-[#FFFFFF] hover:bg-slate-100 border border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={p.avatar_url}
                        alt={p.full_name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-[11px] text-[#0F0F0F] truncate">{p.full_name}</div>
                        <div className="text-[10px] text-[#64748B] font-mono">{p.phone}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#337418] shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Create Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#5DD62C] hover:bg-[#5DD62C]/90 text-[#0F0F0F] font-black text-xs shadow-md transition active:scale-95 mt-2"
          >
            Create Group & Open Chat
          </button>

        </form>
      </Modal>

    </div>
  );
};
