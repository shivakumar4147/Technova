'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Plus, AlertTriangle, Clock, CheckCircle2, MessageSquare, Shield, ChevronRight } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';
import { IssueType, IssuePriority } from '@/types';

export const IssuesScreen: React.FC = () => {
  const { issues, raiseIssue, currentUser, navigateTo } = useApp();

  const [showRaiseModal, setShowRaiseModal] = useState(false);
  const [issueType, setIssueType] = useState<IssueType>('Bus delay');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<IssuePriority>('high');

  const issueCategories: IssueType[] = [
    'Student missing', 'Bus delay', 'Room problem', 'Workshop issue', 'Food issue', 'Technical issue', 'Emergency', 'Other'
  ];

  const handleRaiseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    raiseIssue({
      type: issueType,
      title: title || `${issueType} Notice`,
      description,
      priority
    });
    setShowRaiseModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#0B0F17] font-sans text-[#F8FAFC]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo(currentUser?.role === 'teacher' ? 'teacher_dashboard' : 'chat_home')}
            className="p-1.5 rounded-xl text-[#F8FAFC] hover:bg-[#1E293B] transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black text-[#F8FAFC]">Event Issue Management</h2>
            <p className="text-[10px] text-[#94A3B8]">Report & track logistics or student issues</p>
          </div>
        </div>

        <button
          onClick={() => setShowRaiseModal(true)}
          className="px-3 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs shadow-xs flex items-center gap-1 active:scale-95 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Raise Issue</span>
        </button>
      </div>

      {/* Issues List */}
      <div className="space-y-3">
        {issues.map(iss => (
          <div
            key={iss.id}
            onClick={() => navigateTo('issue_detail', { issueId: iss.id })}
            className={`p-4 rounded-2xl bg-[#111827] border shadow-xs cursor-pointer hover:border-[#5DD62C] transition ${
              iss.status === 'Open' ? 'border-rose-500/40' : iss.status === 'In progress' ? 'border-amber-500/40' : 'border-[#1E293B]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Badge
                variant={iss.status === 'Open' ? 'red' : iss.status === 'In progress' ? 'amber' : 'green'}
              >
                {iss.status}
              </Badge>
              <span className="text-[10px] text-[#94A3B8] font-mono">{iss.created_at}</span>
            </div>

            <h3 className="text-sm font-black text-[#F8FAFC] mb-1">{iss.title}</h3>
            <p className="text-xs text-[#94A3B8] line-clamp-2 mb-3 leading-relaxed">{iss.description}</p>

            <div className="flex items-center justify-between pt-2 border-t border-[#1E293B] text-[11px]">
              <span className="text-[#94A3B8]">
                By: <strong className="text-[#F8FAFC]">{iss.creator_name}</strong>
              </span>
              <span className="text-[#5DD62C] font-black flex items-center gap-1">
                <span>{iss.messages.length} Messages</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}

        {issues.length === 0 && (
          <div className="text-center py-12 text-[#94A3B8] text-xs bg-[#111827] rounded-2xl border border-[#1E293B]">
            No open issues reported yet.
          </div>
        )}
      </div>

      {/* Raise Issue Modal */}
      <Modal
        isOpen={showRaiseModal}
        onClose={() => setShowRaiseModal(false)}
        title="Report New Issue to Coordinators"
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
            <label className="block text-[#F8FAFC] font-extrabold mb-1">Issue Headline</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Bus #3 delayed by 20 minutes"
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
                    priority === p ? 'bg-rose-500 text-white shadow-xs' : 'bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[#F8FAFC] font-extrabold mb-1">Description & Details</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Specify location, student names or bus numbers..."
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
              className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black shadow-xs cursor-pointer"
            >
              Submit Issue
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
