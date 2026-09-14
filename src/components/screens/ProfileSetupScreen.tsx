'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { User, Building, ShieldAlert, ArrowRight, Camera } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';

export const ProfileSetupScreen: React.FC = () => {
  const { colleges, completeProfile } = useApp();
  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [selectedCollege, setSelectedCollege] = useState(colleges[0]?.id || '');
  const [designation, setDesignation] = useState('Senior Lecturer');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const collegeObj = colleges.find(c => c.id === selectedCollege);
    completeProfile({
      full_name: fullName || 'Technova Participant',
      display_name: displayName || fullName || 'Technova Participant',
      college_id: selectedCollege,
      college_name: collegeObj?.name || 'PU College',
      designation,
      bio,
      avatar_url: avatarUrl
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex flex-col justify-center px-4 py-8">
      <div className="max-w-md mx-auto w-full">
        
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white">Complete Profile</h2>
          <p className="text-xs text-slate-400 mt-1">Set up your identity for Technova 2026</p>
        </div>

        <GlassCard variant="bright" className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Avatar Selector */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-cyan-400 p-0.5 shadow-lg shadow-cyan-500/20">
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition cursor-pointer">
                  <Camera className="w-6 h-6 text-cyan-300" />
                </div>
              </div>
              <span className="text-[11px] text-slate-400 mt-2">Profile Photo</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Dr. Anand Sharma"
                className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Display Name (In Chat)</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Anand Sharma"
                className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">PU College</label>
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
              >
                {colleges.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Designation</label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="e.g. CS Lecturer / Faculty Lead"
                className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Optional Bio</label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Short bio or team details..."
                className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Role Notice */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/30 flex items-start gap-2 text-xs text-amber-300">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Roles (Coordinator/Admin) are assigned strictly by Technova Admins. New profiles default to Teacher access.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 active:scale-[0.98] transition"
            >
              <span>Save & Enter App</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        </GlassCard>

      </div>
    </div>
  );
};
