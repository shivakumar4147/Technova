'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Plus, ChevronRight } from 'lucide-react';
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
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#F8F8F8] dark:bg-[#0D1117] font-sans text-[#0F0F0F] dark:text-[#F0F6FC] transition-colors duration-200">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo(currentUser?.role === 'teacher' ? 'teacher_dashboard' : 'chat_home')}
            className="p-1.5 rounded-xl text-[#0F0F0F] dark:text-[#F0F6FC] hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black text-[#0F0F0F] dark:text-[#F0F6FC]">Event Issue Management</h2>
            <p className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-medium">Report & track logistics or student issues</p>
          </div>
        </div>

        <button
          onClick={() => setShowRaiseModal(true)}
          className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-xs flex items-center gap-1 active:scale-95 transition cursor-pointer"
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
            className={`p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border shadow-xs cursor-pointer hover:border-[#5DD62C] transition ${
              iss.status === 'Open' ? 'border-rose-300 dark:border-rose-800' : iss.status === 'In progress' ? 'border-amber-300 dark:border-amber-800' : 'border-emerald-300 dark:border-emerald-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                iss.status === 'Open' ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400' : iss.status === 'In progress' ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
              }`}>
                {iss.status}
              </span>
              <span className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-mono">{iss.created_at}</span>
            </div>

            <h3 className="text-sm font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] mb-1">{iss.title}</h3>
            <p className="text-xs text-[#475569] dark:text-[#8B949E] line-clamp-2 mb-3 leading-relaxed">{iss.description}</p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
              <span className="text-[#64748B] dark:text-[#8B949E]">
                By: <strong className="text-[#0F0F0F] dark:text-[#F0F6FC]">{iss.creator_name}</strong>
              </span>
              <span className="text-[#337418] dark:text-[#5DD62C] font-bold flex items-center gap-1">
                <span>{iss.messages.length} Messages</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}

        {issues.length === 0 && (
          <div className="text-center py-12 text-[#64748B] dark:text-[#8B949E] text-xs font-medium bg-[#FFFFFF] dark:bg-[#161B22] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
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
        <form onSubmit={handleRaiseSubmit} className="space-y-3 text-xs font-sans text-[#0F0F0F] dark:text-[#F0F6FC]">
          <div>
            <label className="block font-bold mb-1">Issue Category</label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value as IssueType)}
              className="w-full bg-[#F8FAFC] dark:bg-[#161B22] border border-slate-300 dark:border-slate-800 rounded-xl p-2.5 text-[#0F0F0F] dark:text-[#F0F6FC] focus:border-[#5DD62C] focus:outline-none"
            >
              {issueCategories.map(cat => (
                <option key={cat} value={cat} className="bg-[#FFFFFF] dark:bg-[#161B22] text-[#0F0F0F] dark:text-[#F0F6FC]">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold mb-1">Issue Headline</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Bus #3 delayed by 20 minutes"
              className="w-full bg-[#F8FAFC] dark:bg-[#161B22] border border-slate-300 dark:border-slate-800 rounded-xl p-2.5 text-[#0F0F0F] dark:text-[#F0F6FC] focus:border-[#5DD62C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Priority</label>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'medium', 'high'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`py-1.5 rounded-xl font-bold capitalize transition cursor-pointer ${
                    priority === p ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-[#64748B] dark:text-[#8B949E]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Description & Details</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Specify location, student names or bus numbers..."
              className="w-full bg-[#F8FAFC] dark:bg-[#161B22] border border-slate-300 dark:border-slate-800 rounded-xl p-2.5 text-[#0F0F0F] dark:text-[#F0F6FC] focus:border-[#5DD62C] focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowRaiseModal(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#64748B] dark:text-[#8B949E] font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black shadow-xs cursor-pointer"
            >
              Submit Issue
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
