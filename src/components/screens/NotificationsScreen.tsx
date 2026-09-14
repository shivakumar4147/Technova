'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  ArrowLeft, Bell, CheckCheck, AlertTriangle, Plus, Send,
  CheckCircle2, Clock, MessageSquare, ChevronRight, X, User, MapPin
} from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import { Issue, IssueType, IssuePriority, Announcement } from '@/types';

export const NotificationsScreen: React.FC = () => {
  const {
    announcements,
    issues,
    raiseIssue,
    addIssueMessage,
    updateIssueStatus,
    acknowledgeAnnouncement,
    currentUser,
    navigateTo
  } = useApp();

  // Filter States
  const [activeTab, setActiveTab] = useState<'all' | 'announcements' | 'issues'>('all');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Open' | 'In progress' | 'Resolved'>('ALL');

  // In-line Modal States
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<string | null>(null);
  const [showRaiseModal, setShowRaiseModal] = useState(false);

  // Form States for Raise Issue & Reply
  const [replyText, setReplyText] = useState('');
  const [issueType, setIssueType] = useState<IssueType>('Bus delay');
  const [raiseTitle, setRaiseTitle] = useState('');
  const [raiseDesc, setRaiseDesc] = useState('');
  const [priority, setPriority] = useState<IssuePriority>('high');

  const issueCategories: IssueType[] = [
    'Student missing', 'Bus delay', 'Room problem', 'Workshop issue', 'Food issue', 'Technical issue', 'Emergency', 'Other'
  ];

  // Currently Selected Issue
  const activeIssue = issues.find(i => i.id === selectedIssueId) || null;
  const activeAnnouncement = announcements.find(a => a.id === selectedAnnouncementId) || null;

  // Filter Logic
  const filteredIssues = issues.filter(iss => {
    if (statusFilter === 'ALL') return true;
    return iss.status === statusFilter;
  });

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedIssueId) return;
    addIssueMessage(selectedIssueId, replyText.trim());
    setReplyText('');
  };

  const handleRaiseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    raiseIssue({
      type: issueType,
      title: raiseTitle || `${issueType} Notice`,
      description: raiseDesc,
      priority
    });
    setShowRaiseModal(false);
    setRaiseTitle('');
    setRaiseDesc('');
  };

  return (
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#0B0F17] font-sans text-[#F8FAFC]">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('chat_home')}
            className="p-1.5 rounded-xl text-[#F8FAFC] hover:bg-[#1E293B] transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black text-[#F8FAFC]">Notifications & Alerts</h2>
            <p className="text-[11px] text-[#94A3B8] font-medium">Official updates & issue tracking hub</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRaiseModal(true)}
            className="px-2.5 py-1.5 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0B0F17] font-black text-[11px] flex items-center gap-1 shadow-xs transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Report</span>
          </button>
        </div>
      </div>

      {/* Main Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#1E293B] mb-3 text-xs font-bold border border-[#334155]">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-1.5 rounded-xl transition text-center cursor-pointer ${
            activeTab === 'all' ? 'bg-[#5DD62C] text-[#0B0F17] font-black shadow-xs' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
          }`}
        >
          All ({announcements.length + issues.length})
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex-1 py-1.5 rounded-xl transition text-center cursor-pointer ${
            activeTab === 'announcements' ? 'bg-[#5DD62C] text-[#0B0F17] font-black shadow-xs' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
          }`}
        >
          📢 Updates ({announcements.length})
        </button>
        <button
          onClick={() => setActiveTab('issues')}
          className={`flex-1 py-1.5 rounded-xl transition text-center cursor-pointer ${
            activeTab === 'issues' ? 'bg-[#5DD62C] text-[#0B0F17] font-black shadow-xs' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
          }`}
        >
          ⚠ Issues ({issues.length})
        </button>
      </div>

      {/* Issue Status Filter Chips */}
      {(activeTab === 'issues' || activeTab === 'all') && (
        <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1 text-[11px] font-bold no-scrollbar">
          {(['ALL', 'Open', 'In progress', 'Resolved'] as const).map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-xl whitespace-nowrap transition cursor-pointer border ${
                statusFilter === st
                  ? 'bg-[#5DD62C] text-[#0B0F17] font-black border-[#5DD62C]'
                  : 'bg-[#111827] text-[#94A3B8] border-[#1E293B] hover:border-[#334155]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      )}

      {/* Activity Feed */}
      <div className="space-y-2.5">

        {/* Announcements List */}
        {(activeTab === 'all' || activeTab === 'announcements') &&
          announcements.map(ann => (
            <div
              key={ann.id}
              onClick={() => setSelectedAnnouncementId(ann.id)}
              className="p-3.5 rounded-2xl bg-[#111827] border border-[#1E293B] hover:border-[#5DD62C] cursor-pointer transition-all shadow-xs"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#5DD62C]/20 text-[#5DD62C] flex items-center justify-center font-bold shrink-0 mt-0.5 border border-[#5DD62C]/40">
                  📢
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-lg bg-[#5DD62C] text-[#0B0F17] shadow-xs uppercase tracking-wider">
                      {ann.announcement_type}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] font-mono font-medium">{ann.created_at}</span>
                  </div>
                  <h4 className="text-xs font-black text-[#F8FAFC] mb-0.5 leading-snug">{ann.title}</h4>
                  <p className="text-[11px] text-[#94A3B8] leading-relaxed line-clamp-2">{ann.content}</p>
                </div>
              </div>
            </div>
          ))}

        {/* Issue Notifications List */}
        {(activeTab === 'all' || activeTab === 'issues') &&
          filteredIssues.map(iss => (
            <div
              key={iss.id}
              onClick={() => setSelectedIssueId(iss.id)}
              className={`p-3.5 rounded-2xl bg-[#111827] border hover:border-[#5DD62C] cursor-pointer transition-all shadow-xs ${
                iss.status === 'Open' ? 'border-amber-500/40' : 'border-[#1E293B]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold shrink-0 mt-0.5 ${
                  iss.status === 'Open' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-[#5DD62C]/20 text-[#5DD62C] border border-[#5DD62C]/40'
                }`}>
                  ⚠
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-lg uppercase tracking-wider ${
                      iss.status === 'Open'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : iss.status === 'In progress'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                        : 'bg-[#5DD62C] text-[#0B0F17] font-black shadow-xs'
                    }`}>
                      {iss.status}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] font-mono font-medium">{iss.created_at}</span>
                  </div>
                  <h4 className="text-xs font-black text-[#F8FAFC] mb-0.5 leading-snug">Issue: {iss.title}</h4>
                  <p className="text-[11px] text-[#94A3B8] leading-relaxed line-clamp-1 mb-2">{iss.description}</p>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-[#1E293B] text-[10px]">
                    <span className="text-[#94A3B8]">
                      Reporter: <strong className="text-[#F8FAFC]">{iss.creator_name}</strong>
                    </span>
                    <span className="text-[#5DD62C] font-black flex items-center gap-1">
                      <span>{iss.messages.length} Messages</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {/* Empty State */}
        {activeTab === 'issues' && filteredIssues.length === 0 && (
          <div className="text-center py-10 text-[#94A3B8] text-xs bg-[#111827] rounded-2xl border border-[#1E293B]">
            No issues match the selected filter status.
          </div>
        )}
      </div>

      {/* ================= IN-LINE ISSUE RESOLUTION MODAL ================= */}
      {activeIssue && (
        <Modal
          isOpen={!!activeIssue}
          onClose={() => setSelectedIssueId(null)}
          title={`Issue Resolution: ${activeIssue.id}`}
        >
          <div className="space-y-3.5 text-xs text-[#F8FAFC]">
            
            {/* Header / Info Box */}
            <div className="p-3.5 rounded-2xl bg-[#1E293B] border border-[#334155] space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg uppercase tracking-wider ${
                  activeIssue.status === 'Open'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : activeIssue.status === 'In progress'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                    : 'bg-[#5DD62C] text-[#0B0F17] font-black shadow-xs'
                }`}>
                  {activeIssue.status}
                </span>
                <span className="text-[10px] text-[#94A3B8] font-mono">{activeIssue.created_at}</span>
              </div>

              <h3 className="text-sm font-black text-[#F8FAFC]">{activeIssue.title}</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{activeIssue.description}</p>

              <div className="pt-2 border-t border-[#334155] flex items-center justify-between text-[11px] text-[#94A3B8]">
                <span>Reporter: <strong className="text-[#F8FAFC]">{activeIssue.creator_name}</strong></span>
                <span>Type: <strong className="text-[#F8FAFC]">{activeIssue.type}</strong></span>
              </div>
            </div>

            {/* Coordinator Status Update Controls */}
            {currentUser?.role !== 'teacher' && (
              <div className="p-3 rounded-xl bg-[#111827] border border-[#1E293B] flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-[#F8FAFC]">Update Status:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateIssueStatus(activeIssue.id, 'In progress')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      activeIssue.status === 'In progress'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-[#1E293B] text-[#94A3B8] border border-[#334155] hover:text-[#F8FAFC]'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => updateIssueStatus(activeIssue.id, 'Resolved')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      activeIssue.status === 'Resolved'
                        ? 'bg-[#5DD62C] text-[#0B0F17] font-black shadow-xs'
                        : 'bg-[#1E293B] text-[#94A3B8] border border-[#334155] hover:text-[#F8FAFC]'
                    }`}
                  >
                    Resolved
                  </button>
                </div>
              </div>
            )}

            {/* Live Message Thread */}
            <div>
              <h4 className="text-[11px] font-extrabold text-[#94A3B8] uppercase tracking-wider mb-2">
                Resolution Messages ({activeIssue.messages.length})
              </h4>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {activeIssue.messages.map(msg => (
                  <div key={msg.id} className="p-2.5 rounded-xl bg-[#1E293B] border border-[#334155] space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-extrabold text-[#F8FAFC]">{msg.sender_name} ({msg.sender_role})</span>
                      <span className="text-[#94A3B8] font-mono">{msg.created_at}</span>
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reply Input Form */}
            <form onSubmit={handleSendReply} className="flex items-center gap-2 pt-2 border-t border-[#1E293B]">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type resolution update or reply..."
                className="flex-1 bg-[#1E293B] border border-[#334155] rounded-xl px-3 py-2 text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#5DD62C]"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0B0F17] font-black text-xs shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>
        </Modal>
      )}

      {/* ================= IN-LINE ANNOUNCEMENT DETAIL MODAL ================= */}
      {activeAnnouncement && (
        <Modal
          isOpen={!!activeAnnouncement}
          onClose={() => setSelectedAnnouncementId(null)}
          title="Official Announcement Detail"
        >
          <div className="space-y-3.5 text-xs text-[#F8FAFC]">
            <div className="p-3.5 rounded-2xl bg-[#1E293B] border border-[#334155] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg bg-[#5DD62C] text-[#0B0F17] uppercase tracking-wider">
                  {activeAnnouncement.announcement_type}
                </span>
                <span className="text-[10px] text-[#94A3B8] font-mono">{activeAnnouncement.created_at}</span>
              </div>
              <h3 className="text-sm font-black text-[#F8FAFC]">{activeAnnouncement.title}</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{activeAnnouncement.content}</p>
              <div className="pt-2 border-t border-[#334155] flex items-center justify-between text-[11px] text-[#94A3B8]">
                <span>By: <strong className="text-[#F8FAFC]">{activeAnnouncement.sender_name}</strong></span>
                <span>Role: <strong className="text-[#F8FAFC]">{activeAnnouncement.sender_role}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  acknowledgeAnnouncement(activeAnnouncement.id);
                  setSelectedAnnouncementId(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0B0F17] font-black text-xs shadow-xs transition cursor-pointer"
              >
                Acknowledge Notice
              </button>
              <button
                onClick={() => {
                  setSelectedAnnouncementId(null);
                  navigateTo('group_chat');
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#1E293B] text-[#F8FAFC] hover:bg-[#334155] font-extrabold text-xs transition cursor-pointer border border-[#334155]"
              >
                Open Group Chat
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ================= IN-LINE RAISE ISSUE MODAL ================= */}
      <Modal
        isOpen={showRaiseModal}
        onClose={() => setShowRaiseModal(false)}
        title="Report Event Issue"
      >
        <form onSubmit={handleRaiseSubmit} className="space-y-3 text-xs text-[#F8FAFC]">
          <div>
            <label className="block text-[#F8FAFC] font-extrabold mb-1">Issue Category</label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value as IssueType)}
              className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-2.5 text-[#F8FAFC] font-bold focus:border-[#5DD62C] focus:outline-none"
            >
              {issueCategories.map(cat => (
                <option key={cat} value={cat} className="bg-[#111827] text-[#F8FAFC]">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#F8FAFC] font-extrabold mb-1">Headline / Title</label>
            <input
              type="text"
              required
              value={raiseTitle}
              onChange={(e) => setRaiseTitle(e.target.value)}
              placeholder="e.g. Bus #3 delayed by 20 mins"
              className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-2.5 text-[#F8FAFC] font-bold placeholder-[#94A3B8] focus:border-[#5DD62C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#F8FAFC] font-extrabold mb-1">Priority</label>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'medium', 'high'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`py-1.5 rounded-xl font-extrabold capitalize transition cursor-pointer ${
                    priority === p
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[#F8FAFC] font-extrabold mb-1">Details & Context</label>
            <textarea
              rows={3}
              required
              value={raiseDesc}
              onChange={(e) => setRaiseDesc(e.target.value)}
              placeholder="Specify location, bus numbers or student names..."
              className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-2.5 text-[#F8FAFC] font-bold placeholder-[#94A3B8] focus:border-[#5DD62C] focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowRaiseModal(false)}
              className="px-4 py-2 rounded-xl bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0B0F17] font-black shadow-xs cursor-pointer"
            >
              Submit Issue
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
