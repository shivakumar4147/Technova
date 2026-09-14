'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Search, ArrowLeft, Users, Building2, Calendar, MessageSquare, Shield } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/common/Badge';

export const SearchScreen: React.FC = () => {
  const { profiles, colleges, workshops, conversations, navigateTo, setActiveConversationId } = useApp();
  const [query, setQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'people' | 'colleges' | 'workshops'>('all');

  const filteredProfiles = profiles.filter(p => p.full_name.toLowerCase().includes(query.toLowerCase()) || p.role.includes(query.toLowerCase()));
  const filteredColleges = colleges.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.short_name.toLowerCase().includes(query.toLowerCase()));
  const filteredWorkshops = workshops.filter(w => w.name.toLowerCase().includes(query.toLowerCase()) || w.venue.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto min-h-screen">
      
      {/* Search Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigateTo('chat_home')}
          className="p-1.5 rounded-xl text-slate-300 hover:bg-slate-800/80 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search teachers, colleges, workshops..."
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition"
          />
        </div>
      </div>

      {/* Filter Categories */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
        {(['all', 'people', 'colleges', 'workshops'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize shrink-0 transition ${
              filterCategory === cat
                ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-4">
        
        {/* People Section */}
        {(filterCategory === 'all' || filterCategory === 'people') && filteredProfiles.length > 0 && (
          <div>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1 px-1">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>People ({filteredProfiles.length})</span>
            </h4>
            <div className="space-y-2">
              {filteredProfiles.map(p => (
                <GlassCard
                  key={p.id}
                  variant="clickable"
                  onClick={() => {
                    setActiveConversationId('conv-private-1');
                    navigateTo('private_chat');
                  }}
                  className="p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img src={p.avatar_url} alt={p.full_name} className="w-10 h-10 rounded-2xl object-cover border border-slate-700" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">{p.full_name}</span>
                        <Badge variant={p.role === 'admin' ? 'red' : p.role === 'coordinator' ? 'amber' : 'cyan'}>
                          {p.role}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-slate-400">{p.college_name || p.designation}</p>
                    </div>
                  </div>
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Colleges Section */}
        {(filterCategory === 'all' || filterCategory === 'colleges') && filteredColleges.length > 0 && (
          <div>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1 px-1">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Colleges ({filteredColleges.length})</span>
            </h4>
            <div className="space-y-2">
              {filteredColleges.map(c => (
                <GlassCard
                  key={c.id}
                  variant="clickable"
                  onClick={() => navigateTo('college_detail', { collegeId: c.id })}
                  className="p-3 flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-xs font-bold text-white">{c.name}</h5>
                    <p className="text-[10px] text-slate-400">{c.teachers_count} Teachers • {c.students_count} Students</p>
                  </div>
                  <Badge variant="green">Active</Badge>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Workshops Section */}
        {(filterCategory === 'all' || filterCategory === 'workshops') && filteredWorkshops.length > 0 && (
          <div>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1 px-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Workshops ({filteredWorkshops.length})</span>
            </h4>
            <div className="space-y-2">
              {filteredWorkshops.map(w => (
                <GlassCard
                  key={w.id}
                  variant="clickable"
                  onClick={() => navigateTo('workshops')}
                  className="p-3 flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-xs font-bold text-white">{w.name}</h5>
                    <p className="text-[10px] text-cyan-400">{w.venue} • {w.start_time}</p>
                  </div>
                  <Badge variant="cyan">{w.enrolled_students} enrolled</Badge>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
