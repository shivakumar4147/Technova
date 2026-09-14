'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Search, Plus, Megaphone, School, Check, X } from 'lucide-react';
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
    <div className="min-h-[calc(100vh-56px)] max-w-md mx-auto bg-[#FFFFFF] dark:bg-[#0D1117] pb-28 relative font-sans transition-colors duration-200">
      
      {/* UNIFIED HEADER & SEARCH CONTROLS */}
      <div className="px-4 pt-3 pb-2 bg-[#FFFFFF] dark:bg-[#0D1117] border-b border-slate-100 dark:border-slate-800">
        
        {/* Search Input */}
        <div className="mb-2.5 relative">
          <Search className="w-4 h-4 text-[#64748B] dark:text-[#8B949E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats, groups or messages..."
            className="w-full bg-[#F1F5F9] dark:bg-[#161B22] border border-transparent dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#0F0F0F] dark:text-[#F0F6FC] placeholder-[#64748B] dark:placeholder-[#8B949E] focus:outline-none focus:ring-2 focus:ring-[#5DD62C] transition"
          />
        </div>

        {/* Latest Official Notice Banner */}
        {latestAnnouncement && (
          <div
            onClick={() => navigateTo('acknowledgement_tracker', { announcementId: latestAnnouncement.id })}
            className="mb-3 p-3.5 rounded-2xl bg-[#5DD62C]/10 dark:bg-[#5DD62C]/15 border border-[#5DD62C]/40 hover:bg-[#5DD62C]/18 cursor-pointer transition-all shadow-xs"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-[#5DD62C] text-[#0F0F0F] flex items-center justify-center font-black shrink-0 shadow-xs mt-0.5">
                  <Megaphone className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-black text-[#2D6614] dark:text-[#5DD62C] uppercase tracking-wider block">OFFICIAL NOTICE</span>
                  <h4 className="text-[12px] font-bold text-[#0F0F0F] dark:text-[#F0F6FC] line-clamp-1 mt-0.5">{latestAnnouncement.title}</h4>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0 gap-1.5">
                <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#8B949E] whitespace-nowrap">
                  {latestAnnouncement.created_at}
                </span>
                <div className="text-[10px] font-extrabold text-[#2D6614] dark:text-[#5DD62C] px-2 py-0.5 rounded-lg bg-[#5DD62C]/25 border border-[#5DD62C]/60 whitespace-nowrap">
                  {latestAnnouncement.acknowledged_count}/{latestAnnouncement.sent_to_count} Ack
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 pb-1 overflow-x-auto no-scrollbar">
          {(['all', 'groups', 'direct'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap capitalize transition shrink-0 cursor-pointer ${
                filterTab === tab
                  ? 'bg-[#5DD62C] text-[#0F0F0F] shadow-xs'
                  : 'bg-[#F1F5F9] dark:bg-[#161B22] text-[#475569] dark:text-[#8B949E] hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {tab === 'all' ? 'All Chats' : tab === 'groups' ? 'College Groups' : 'Direct Messages'}
            </button>
          ))}
        </div>

      </div>

      {/* CHAT ROWS */}
      <div className="bg-[#FFFFFF] dark:bg-[#0D1117]">
        {filteredConversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => {
              setActiveConversationId(conv.id);
              if (conv.is_group) navigateTo('group_chat');
              else navigateTo('private_chat');
            }}
            className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-[#161B22] transition-colors border-b border-[#F1F5F9]/80 dark:border-slate-800/80"
          >
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              
              <div className="relative shrink-0">
                {conv.is_group ? (
                  <div className="w-12 h-12 rounded-full bg-[#5DD62C]/15 text-[#0F0F0F] dark:text-[#F0F6FC] flex items-center justify-center font-black text-base shadow-xs">
                    <School className="w-6 h-6 text-[#337418] dark:text-[#5DD62C]" />
                  </div>
                ) : (
                  <img
                    src={conv.avatar_url}
                    alt={conv.name}
                    className="w-12 h-12 rounded-full object-cover shadow-xs border border-slate-200 dark:border-slate-800"
                  />
                )}
                {conv.is_online && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#5DD62C] border-2 border-[#FFFFFF] dark:border-[#0D1117]" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="text-[13px] font-bold text-[#0F0F0F] dark:text-[#F0F6FC] truncate pr-2">{conv.name}</h3>
                  <span className="text-[11px] text-[#64748B] dark:text-[#8B949E] shrink-0 font-medium">{conv.last_message_time}</span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[12px] text-[#64748B] dark:text-[#8B949E] truncate pr-2">
                    {conv.is_group && <strong className="text-[#337418] dark:text-[#5DD62C]">Coordinator: </strong>}
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

      {/* FLOATING '+' BUTTON */}
      {(currentUser?.role === 'admin' || currentUser?.role === 'coordinator') && (
        <button
          onClick={() => setIsNewGroupModalOpen(true)}
          className="fixed bottom-24 right-4 md:right-[calc(50%-224px+16px)] z-40 w-11 h-11 rounded-2xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0F0F0F] font-black shadow-lg flex items-center justify-center transition active:scale-95 border border-[#337418] cursor-pointer"
          title="Create New Group"
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
        </button>
      )}

      {/* CREATE NEW GROUP MODAL */}
      <Modal
        isOpen={isNewGroupModalOpen}
        onClose={() => setIsNewGroupModalOpen(false)}
        title="Create New WhatsApp Group"
      >
        <form onSubmit={handleCreateGroupSubmit} className="space-y-4 text-xs font-sans text-[#0F0F0F] dark:text-[#F0F6FC]">
          
          <div>
            <label className="block text-[11px] font-bold text-[#0F0F0F] dark:text-[#F0F6FC] uppercase tracking-wider mb-1">
              Group Name *
            </label>
            <input
              type="text"
              required
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="e.g. Canara Faculty 2026, Student Coordinators..."
              className="w-full bg-[#F1F5F9] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-[#0F0F0F] dark:text-[#F0F6FC] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5DD62C]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#0F0F0F] dark:text-[#F0F6FC] uppercase tracking-wider mb-1">
              Add Members by Mobile Number
            </label>
            <div className="flex items-center gap-2">
              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="+91 98765 43210"
                className="flex-1 bg-[#F1F5F9] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-[#0F0F0F] dark:text-[#F0F6FC] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5DD62C]"
              />
              <button
                type="button"
                onClick={handleAddPhone}
                className="px-3.5 py-2 rounded-xl bg-[#5DD62C] text-[#0F0F0F] font-bold text-xs shrink-0 shadow-xs hover:bg-[#50b925] cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {selectedMemberPhones.length > 0 && (
            <div>
              <span className="text-[10px] font-extrabold text-[#337418] dark:text-[#5DD62C] uppercase tracking-wider block mb-1.5">
                Added Members ({selectedMemberPhones.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedMemberPhones.map((phone) => (
                  <span
                    key={phone}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#5DD62C]/20 text-[#2D6614] dark:text-[#5DD62C] border border-[#5DD62C]/50 text-[11px] font-bold"
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

          <div>
            <span className="text-[11px] font-bold text-[#0F0F0F] dark:text-[#F0F6FC] uppercase tracking-wider block mb-1.5">
              Or Select From Directory Contacts
            </span>
            <div className="max-h-40 overflow-y-auto space-y-1.5 border border-slate-200 dark:border-slate-800 rounded-xl p-2 bg-[#F8F8F8] dark:bg-[#0D1117]">
              {profiles.map((p) => {
                const isSelected = selectedMemberPhones.includes(p.phone);
                return (
                  <div
                    key={p.id}
                    onClick={() => handleToggleContact(p.phone)}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition ${
                      isSelected
                        ? 'bg-[#5DD62C]/20 border border-[#5DD62C]'
                        : 'bg-[#FFFFFF] dark:bg-[#161B22] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={p.avatar_url}
                        alt={p.full_name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-[11px] text-[#0F0F0F] dark:text-[#F0F6FC] truncate">{p.full_name}</div>
                        <div className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-mono">{p.phone}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#337418] dark:text-[#5DD62C] shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0F0F0F] font-black text-xs shadow-md transition active:scale-95 mt-2 cursor-pointer"
          >
            Create Group & Open Chat
          </button>

        </form>
      </Modal>

    </div>
  );
};
