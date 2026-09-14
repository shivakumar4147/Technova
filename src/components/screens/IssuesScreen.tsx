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
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo(currentUser?.role === 'teacher' ? 'teacher_dashboard' : 'chat_home')}
            className="p-1.5 rounded-xl text-slate-300 hover:bg-slate-800/80 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-bold text-white">Event Issue Management</h2>
            <p className="text-[10px] text-slate-400">Report & track logistics or student issues</p>
          </div>
        </div>

        <button
          onClick={() => setShowRaiseModal(true)}
          className="px-3 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs shadow-md shadow-rose-500/20 flex items-center gap-1 active:scale-95 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Raise Issue</span>
        </button>
      </div>

      {/* Issues List */}
      <div className="space-y-3">
        {issues.map(iss => (
          <GlassCard
            key={iss.id}
            variant="bright"
            onClick={() => navigateTo('issue_detail', { issueId: iss.id })}
            className={`p-4 border-slate-800 cursor-pointer ${
              iss.status === 'Open' ? 'border-rose-500/40' : iss.status === 'In progress' ? 'border-amber-500/40' : 'border-emerald-500/30'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Badge
                variant={iss.status === 'Open' ? 'red' : iss.status === 'In progress' ? 'amber' : 'green'}
              >
                {iss.status}
              </Badge>
              <span className="text-[10px] text-slate-400 font-mono">{iss.created_at}</span>
            </div>

            <h3 className="text-sm font-extrabold text-white mb-1">{iss.title}</h3>
            <p className="text-xs text-slate-300 line-clamp-2 mb-3">{iss.description}</p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
              <span className="text-slate-400">
                By: <strong className="text-white">{iss.creator_name}</strong>
              </span>
              <span className="text-cyan-400 font-bold flex items-center gap-1">
                <span>{iss.messages.length} Messages</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </GlassCard>
        ))}

        {issues.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-xs">
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
        <form onSubmit={handleRaiseSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Issue Category</label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value as IssueType)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:border-cyan-400 focus:outline-none"
            >
              {issueCategories.map(cat => (
                <option key={cat} value={cat} className="bg-slate-900 text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Issue Headline</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Bus #3 delayed by 20 minutes"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Priority</label>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'medium', 'high'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`py-1.5 rounded-xl font-bold capitalize transition ${
                    priority === p ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Description & Details</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Specify location, student names or bus numbers..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowRaiseModal(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold shadow-md shadow-rose-500/20"
            >
              Submit Issue
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
