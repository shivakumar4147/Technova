'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Bell, CheckCheck, AlertCircle, CheckCircle2, MessageSquare } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/common/Badge';

export const NotificationsScreen: React.FC = () => {
  const { announcements, issues, navigateTo } = useApp();

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('chat_home')}
            className="p-1.5 rounded-xl text-slate-300 hover:bg-slate-800/80 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-bold text-white">Notifications & Alerts</h2>
            <p className="text-[10px] text-slate-400">Official updates & issue tracking activity</p>
          </div>
        </div>

        <button className="text-xs text-cyan-400 font-bold hover:underline flex items-center gap-1">
          <CheckCheck className="w-3.5 h-3.5" />
          <span>Mark Read</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5">
        
        {/* Official Announcement Notifications */}
        {announcements.map(ann => (
          <GlassCard
            key={ann.id}
            variant="clickable"
            onClick={() => navigateTo('group_chat')}
            className="p-3 border-cyan-500/30 bg-slate-900/80"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                📢
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="cyan" size="sm">{ann.announcement_type}</Badge>
                  <span className="text-[9px] text-slate-400 font-mono">{ann.created_at}</span>
                </div>
                <h4 className="text-xs font-bold text-white mb-0.5">{ann.title}</h4>
                <p className="text-[11px] text-slate-300 line-clamp-2">{ann.content}</p>
              </div>
            </div>
          </GlassCard>
        ))}

        {/* Issue Activity Notifications */}
        {issues.map(iss => (
          <GlassCard
            key={iss.id}
            variant="clickable"
            onClick={() => navigateTo('issue_detail', { issueId: iss.id })}
            className="p-3 border-amber-500/30 bg-slate-900/80"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                ⚠
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant={iss.status === 'Open' ? 'red' : 'amber'} size="sm">
                    {iss.status}
                  </Badge>
                  <span className="text-[9px] text-slate-400 font-mono">{iss.created_at}</span>
                </div>
                <h4 className="text-xs font-bold text-white mb-0.5">Issue Update: {iss.title}</h4>
                <p className="text-[11px] text-slate-300 line-clamp-1">{iss.description}</p>
              </div>
            </div>
          </GlassCard>
        ))}

      </div>

    </div>
  );
};
