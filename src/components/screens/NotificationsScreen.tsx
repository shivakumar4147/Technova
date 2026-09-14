'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  ArrowLeft, Plus, Send, ChevronRight
} from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import { IssueType, IssuePriority } from '@/types';

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
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#F8F8F8] dark:bg-[#0D1117] font-sans text-[#0F0F0F] dark:text-[#F0F6FC] transition-colors duration-200">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('chat_home')}
            className="p-1.5 rounded-xl text-[#0F0F0F] dark:text-[#F0F6FC] hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black text-[#0F0F0F] dark:text-[#F0F6FC]">Notifications & Alerts</h2>
            <p className="text-[11px] text-[#64748B] dark:text-[#8B949E] font-medium">Official updates & issue tracking hub</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRaiseModal(true)}
            className="px-2.5 py-1.5 rounded-xl bg-[#5DD62C] text-[#0F0F0F] font-extrabold text-[11px] flex items-center gap-1 shadow-xs hover:bg-[#50b925] transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Report</span>
          </button>
        </div>
      </div>

      {/* Main Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#E2E8F0] dark:bg-[#161B22] mb-3 text-xs font-bold border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-1.5 rounded-xl transition text-center cursor-pointer ${
            activeTab === 'all' ? 'bg-[#FFFFFF] dark:bg-[#0D1117] text-[#0F0F0F] dark:text-[#F0F6FC] shadow-xs' : 'text-[#64748B] dark:text-[#8B949E] hover:text-[#0F0F0F]'
          }`}
        >
          All ({announcements.length + issues.length})
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex-1 py-1.5 rounded-xl transition text-center cursor-pointer ${
            activeTab === 'announcements' ? 'bg-[#FFFFFF] dark:bg-[#0D1117] text-[#0F0F0F] dark:text-[#F0F6FC] shadow-xs' : 'text-[#64748B] dark:text-[#8B949E] hover:text-[#0F0F0F]'
          }`}
        >
          📢 Updates ({announcements.length})
        </button>
        <button
          onClick={() => setActiveTab('issues')}
          className={`flex-1 py-1.5 rounded-xl transition text-center cursor-pointer ${
            activeTab === 'issues' ? 'bg-[#FFFFFF] dark:bg-[#0D1117] text-[#0F0F0F] dark:text-[#F0F6FC] shadow-xs' : 'text-[#64748B] dark:text-[#8B949E] hover:text-[#0F0F0F]'
          }`}
        >
          ⚠ Issues ({issues.length})
        </button>
      </div>

      {/* Issue Status Filter Chips */}
      {(activeTab === 'issues' || activeTab === 'all') && (
        <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1 text-[11px] font-bold">
          {(['ALL', 'Open', 'In progress', 'Resolved'] as const).map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-xl whitespace-nowrap transition border cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#5DD62C] text-[#0F0F0F] font-black border-[#5DD62C]'
                  : 'bg-[#FFFFFF] dark:bg-[#161B22] text-[#64748B] dark:text-[#8B949E] border-slate-200 dark:border-slate-800 hover:border-slate-300'
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
              className="p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 hover:border-[#5DD62C] cursor-pointer transition-all shadow-xs"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#5DD62C]/20 text-[#337418] dark:text-[#5DD62C] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  📢
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-lg bg-[#5DD62C] text-[#0F0F0F] shadow-xs uppercase tracking-wider">
                      {ann.announcement_type}
                    </span>
                    <span className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-mono font-medium">{ann.created_at}</span>
                  </div>
                  <h4 className="text-xs font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] mb-0.5 leading-snug">{ann.title}</h4>
                  <p className="text-[11px] text-[#475569] dark:text-[#8B949E] leading-relaxed line-clamp-2">{ann.content}</p>
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
              className={`p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border hover:border-[#5DD62C] cursor-pointer transition-all shadow-xs ${
                iss.status === 'Open' ? 'border-amber-400 dark:border-amber-800' : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold shrink-0 mt-0.5 ${
                  iss.status === 'Open' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' : 'bg-[#5DD62C]/20 text-[#337418] dark:text-[#5DD62C]'
                }`}>
                  ⚠
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-lg uppercase tracking-wider ${
                      iss.status === 'Open'
                        ? 'bg-amber-500/20 text-amber-800 dark:text-amber-400 border border-amber-500/40'
                        : iss.status === 'In progress'
                        ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                        : 'bg-[#5DD62C] text-[#0F0F0F] shadow-xs'
                    }`}>
                      {iss.status}
                    </span>
                    <span className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-mono font-medium">{iss.created_at}</span>
                  </div>
                  <h4 className="text-xs font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] mb-0.5 leading-snug">Issue: {iss.title}</h4>
                  <p className="text-[11px] text-[#475569] dark:text-[#8B949E] leading-relaxed line-clamp-1 mb-2">{iss.description}</p>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px]">
                    <span className="text-[#64748B] dark:text-[#8B949E]">
                      Reporter: <strong className="text-[#0F0F0F] dark:text-[#F0F6FC]">{iss.creator_name}</strong>
                    </span>
                    <span className="text-[#337418] dark:text-[#5DD62C] font-bold flex items-center gap-1">
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
          <div className="text-center py-10 text-[#64748B] dark:text-[#8B949E] text-xs font-medium">
            No issues match the selected filter status.
          </div>
        )}
      </div>

      {/* IN-LINE ISSUE RESOLUTION MODAL */}
      {activeIssue && (
        <Modal
          isOpen={!!activeIssue}
          onClose={() => setSelectedIssueId(null)}
          title={`Issue Resolution: ${activeIssue.id}`}
        >
          <div className="space-y-3.5 text-xs text-[#0F0F0F] dark:text-[#F0F6FC] font-sans">
            
            {/* Header / Info Box */}
            <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg uppercase tracking-wider ${
                  activeIssue.status === 'Open'
                    ? 'bg-amber-500/20 text-amber-800 dark:text-amber-400 border border-amber-500/40'
                    : activeIssue.status === 'In progress'
                    ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                    : 'bg-[#5DD62C] text-[#0F0F0F] shadow-xs'
                }`}>
                  {activeIssue.status}
                </span>
                <span className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-mono">{activeIssue.created_at}</span>
              </div>

              <h3 className="text-sm font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC]">{activeIssue.title}</h3>
              <p className="text-xs text-[#475569] dark:text-[#8B949E] leading-relaxed">{activeIssue.description}</p>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-[#64748B] dark:text-[#8B949E]">
                <span>Reporter: <strong className="text-[#0F0F0F] dark:text-[#F0F6FC]">{activeIssue.creator_name}</strong></span>
                <span>Type: <strong className="text-[#0F0F0F] dark:text-[#F0F6FC]">{activeIssue.type}</strong></span>
              </div>
            </div>

            {/* Coordinator Status Update Controls */}
            {currentUser?.role !== 'teacher' && (
              <div className="p-3 rounded-xl bg-[#F1F5F9] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">Update Status:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateIssueStatus(activeIssue.id, 'In progress')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      activeIssue.status === 'In progress'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-[#FFFFFF] dark:bg-[#0D1117] text-[#475569] dark:text-[#8B949E] border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => updateIssueStatus(activeIssue.id, 'Resolved')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      activeIssue.status === 'Resolved'
                        ? 'bg-[#5DD62C] text-[#0F0F0F] shadow-xs'
                        : 'bg-[#FFFFFF] dark:bg-[#0D1117] text-[#475569] dark:text-[#8B949E] border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    Resolved
                  </button>
                </div>
              </div>
            )}

            {/* Live Message Thread */}
            <div>
              <h4 className="text-[11px] font-extrabold text-[#64748B] dark:text-[#8B949E] uppercase tracking-wider mb-2">
                Resolution Messages ({activeIssue.messages.length})
              </h4>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {activeIssue.messages.map(msg => (
                  <div key={msg.id} className="p-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">{msg.sender_name} ({msg.sender_role})</span>
                      <span className="text-[#64748B] dark:text-[#8B949E] font-mono">{msg.created_at}</span>
                    </div>
                    <p className="text-xs text-[#334155] dark:text-[#8B949E] leading-relaxed">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reply Input Form */}
            <form onSubmit={handleSendReply} className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type resolution update or reply..."
                className="flex-1 bg-[#FFFFFF] dark:bg-[#0D1117] border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-[#0F0F0F] dark:text-[#F0F6FC] placeholder-slate-400 focus:outline-none focus:border-[#5DD62C]"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0F0F0F] font-extrabold text-xs shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>
        </Modal>
      )}

      {/* IN-LINE ANNOUNCEMENT DETAIL MODAL */}
      {activeAnnouncement && (
        <Modal
          isOpen={!!activeAnnouncement}
          onClose={() => setSelectedAnnouncementId(null)}
          title="Official Announcement Detail"
        >
          <div className="space-y-3.5 text-xs text-[#0F0F0F] dark:text-[#F0F6FC] font-sans">
            <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg bg-[#5DD62C] text-[#0F0F0F] uppercase tracking-wider">
                  {activeAnnouncement.announcement_type}
                </span>
                <span className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-mono">{activeAnnouncement.created_at}</span>
              </div>
              <h3 className="text-sm font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC]">{activeAnnouncement.title}</h3>
              <p className="text-xs text-[#334155] dark:text-[#8B949E] leading-relaxed">{activeAnnouncement.content}</p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-[#64748B] dark:text-[#8B949E]">
                <span>By: <strong className="text-[#0F0F0F] dark:text-[#F0F6FC]">{activeAnnouncement.sender_name}</strong></span>
                <span>Role: <strong className="text-[#0F0F0F] dark:text-[#F0F6FC]">{activeAnnouncement.sender_role}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  acknowledgeAnnouncement(activeAnnouncement.id);
                  setSelectedAnnouncementId(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#5DD62C] text-[#0F0F0F] font-extrabold text-xs shadow-xs hover:bg-[#50b925] transition cursor-pointer"
              >
                Acknowledge Notice
              </button>
              <button
                onClick={() => {
                  setSelectedAnnouncementId(null);
                  navigateTo('group_chat');
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#0F0F0F] dark:bg-slate-800 text-[#FFFFFF] font-extrabold text-xs hover:bg-slate-800 transition cursor-pointer"
              >
                Open Group Chat
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* IN-LINE RAISE ISSUE MODAL */}
      <Modal
        isOpen={showRaiseModal}
        onClose={() => setShowRaiseModal(false)}
        title="Report Event Issue"
      >
        <form onSubmit={handleRaiseSubmit} className="space-y-3 text-xs text-[#0F0F0F] dark:text-[#F0F6FC] font-sans">
          <div>
            <label className="block text-[#0F0F0F] dark:text-[#F0F6FC] font-bold mb-1">Issue Category</label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value as IssueType)}
              className="w-full bg-[#FFFFFF] dark:bg-[#0D1117] border border-slate-300 dark:border-slate-800 rounded-xl p-2.5 text-[#0F0F0F] dark:text-[#F0F6FC] focus:border-[#5DD62C] focus:outline-none"
            >
              {issueCategories.map(cat => (
                <option key={cat} value={cat} className="bg-[#FFFFFF] dark:bg-[#161B22] text-[#0F0F0F] dark:text-[#F0F6FC]">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#0F0F0F] dark:text-[#F0F6FC] font-bold mb-1">Headline / Title</label>
            <input
              type="text"
              required
              value={raiseTitle}
              onChange={(e) => setRaiseTitle(e.target.value)}
              placeholder="e.g. Bus #3 delayed by 20 mins"
              className="w-full bg-[#FFFFFF] dark:bg-[#0D1117] border border-slate-300 dark:border-slate-800 rounded-xl p-2.5 text-[#0F0F0F] dark:text-[#F0F6FC] focus:border-[#5DD62C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#0F0F0F] dark:text-[#F0F6FC] font-bold mb-1">Priority</label>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'medium', 'high'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`py-1.5 rounded-xl font-bold capitalize transition cursor-pointer ${
                    priority === p
                      ? 'bg-[#5DD62C] text-[#0F0F0F]'
                      : 'bg-slate-100 dark:bg-slate-800 text-[#64748B] dark:text-[#8B949E]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[#0F0F0F] dark:text-[#F0F6FC] font-bold mb-1">Details & Context</label>
            <textarea
              rows={3}
              required
              value={raiseDesc}
              onChange={(e) => setRaiseDesc(e.target.value)}
              placeholder="Specify location, bus numbers or student names..."
              className="w-full bg-[#FFFFFF] dark:bg-[#0D1117] border border-slate-300 dark:border-slate-800 rounded-xl p-2.5 text-[#0F0F0F] dark:text-[#F0F6FC] focus:border-[#5DD62C] focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowRaiseModal(false)}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-[#0F0F0F] dark:text-[#F0F6FC] font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0F0F0F] font-extrabold shadow-xs cursor-pointer"
            >
              Submit Issue
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
