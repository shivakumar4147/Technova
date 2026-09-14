'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Search, ArrowLeft, Users, Building2, Calendar, MessageSquare } from 'lucide-react';

export const SearchScreen: React.FC = () => {
  const { profiles, colleges, workshops, navigateTo, setActiveConversationId } = useApp();
  const [query, setQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'people' | 'colleges' | 'workshops'>('all');

  const filteredProfiles = profiles.filter(p => p.full_name.toLowerCase().includes(query.toLowerCase()) || p.role.includes(query.toLowerCase()));
  const filteredColleges = colleges.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.short_name.toLowerCase().includes(query.toLowerCase()));
  const filteredWorkshops = workshops.filter(w => w.name.toLowerCase().includes(query.toLowerCase()) || w.venue.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#F8F8F8] dark:bg-[#0D1117] font-sans text-[#0F0F0F] dark:text-[#F0F6FC] transition-colors duration-200">
      
      {/* Search Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigateTo('chat_home')}
          className="p-1.5 rounded-xl text-[#0F0F0F] dark:text-[#F0F6FC] hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-[#64748B] dark:text-[#8B949E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search teachers, colleges, workshops..."
            className="w-full bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#0F0F0F] dark:text-[#F0F6FC] placeholder-slate-400 focus:outline-none focus:border-[#5DD62C] transition shadow-xs"
          />
        </div>
      </div>

      {/* Filter Categories */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
        {(['all', 'people', 'colleges', 'workshops'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize shrink-0 transition cursor-pointer ${
              filterCategory === cat
                ? 'bg-[#5DD62C] text-[#0F0F0F] font-bold shadow-xs'
                : 'bg-[#FFFFFF] dark:bg-[#161B22] text-[#64748B] dark:text-[#8B949E] border border-slate-200 dark:border-slate-800'
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
            <h4 className="text-[11px] font-bold text-[#64748B] dark:text-[#8B949E] uppercase tracking-wider mb-2 flex items-center gap-1 px-1">
              <Users className="w-3.5 h-3.5 text-[#337418] dark:text-[#5DD62C]" />
              <span>People ({filteredProfiles.length})</span>
            </h4>
            <div className="space-y-2">
              {filteredProfiles.map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    setActiveConversationId('conv-private-1');
                    navigateTo('private_chat');
                  }}
                  className="p-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#5DD62C] transition"
                >
                  <div className="flex items-center gap-3">
                    <img src={p.avatar_url} alt={p.full_name} className="w-10 h-10 rounded-2xl object-cover border border-slate-200 dark:border-slate-800" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">{p.full_name}</span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-[#5DD62C]/20 text-[#2D6614] dark:text-[#5DD62C]">
                          {p.role}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#64748B] dark:text-[#8B949E]">{p.college_name || p.designation}</p>
                    </div>
                  </div>
                  <MessageSquare className="w-4 h-4 text-[#337418] dark:text-[#5DD62C]" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Colleges Section */}
        {(filterCategory === 'all' || filterCategory === 'colleges') && filteredColleges.length > 0 && (
          <div>
            <h4 className="text-[11px] font-bold text-[#64748B] dark:text-[#8B949E] uppercase tracking-wider mb-2 flex items-center gap-1 px-1">
              <Building2 className="w-3.5 h-3.5 text-[#337418] dark:text-[#5DD62C]" />
              <span>Colleges ({filteredColleges.length})</span>
            </h4>
            <div className="space-y-2">
              {filteredColleges.map(c => (
                <div
                  key={c.id}
                  onClick={() => navigateTo('college_detail', { collegeId: c.id })}
                  className="p-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#5DD62C] transition"
                >
                  <div>
                    <h5 className="text-xs font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">{c.name}</h5>
                    <p className="text-[10px] text-[#64748B] dark:text-[#8B949E]">{c.teachers_count} Teachers • {c.students_count} Students</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Workshops Section */}
        {(filterCategory === 'all' || filterCategory === 'workshops') && filteredWorkshops.length > 0 && (
          <div>
            <h4 className="text-[11px] font-bold text-[#64748B] dark:text-[#8B949E] uppercase tracking-wider mb-2 flex items-center gap-1 px-1">
              <Calendar className="w-3.5 h-3.5 text-[#337418] dark:text-[#5DD62C]" />
              <span>Workshops ({filteredWorkshops.length})</span>
            </h4>
            <div className="space-y-2">
              {filteredWorkshops.map(w => (
                <div
                  key={w.id}
                  onClick={() => navigateTo('workshops')}
                  className="p-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#5DD62C] transition"
                >
                  <div>
                    <h5 className="text-xs font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">{w.name}</h5>
                    <p className="text-[10px] text-[#337418] dark:text-[#5DD62C] font-mono">{w.venue} • {w.start_time}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-[#5DD62C]/20 text-[#2D6614] dark:text-[#5DD62C]">
                    {w.enrolled_students} enrolled
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
