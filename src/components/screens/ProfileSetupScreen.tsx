'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { ShieldAlert, ArrowRight, Camera } from 'lucide-react';

export const ProfileSetupScreen: React.FC = () => {
  const { currentUser, colleges, completeProfile, screenParams } = useApp();
  
  const [fullName, setFullName] = useState(currentUser?.full_name || screenParams?.full_name || '');
  const [displayName, setDisplayName] = useState(currentUser?.display_name || currentUser?.full_name || screenParams?.full_name || '');
  const [phone, setPhone] = useState(() => {
    const raw = currentUser?.phone || screenParams?.phone || '';
    return raw.replace('+91', '').trim();
  });
  const [selectedCollege, setSelectedCollege] = useState(() => {
    if (currentUser?.college_id) return currentUser.college_id;
    if (currentUser?.college_name) return 'OTHER';
    return '';
  });
  const [customCollegeName, setCustomCollegeName] = useState(currentUser?.college_name || '');
  const [designation, setDesignation] = useState(currentUser?.designation || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(
    currentUser?.avatar_url || screenParams?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  );

  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) {
      if (currentUser.full_name) setFullName(currentUser.full_name);
      if (currentUser.display_name) setDisplayName(currentUser.display_name);
      if (currentUser.phone) setPhone(currentUser.phone.replace('+91', '').trim());
      if (currentUser.college_id) {
        setSelectedCollege(currentUser.college_id);
      } else if (currentUser.college_name) {
        setSelectedCollege('OTHER');
        setCustomCollegeName(currentUser.college_name);
      }
      if (currentUser.designation) setDesignation(currentUser.designation);
      if (currentUser.bio) setBio(currentUser.bio);
      if (currentUser.avatar_url) setAvatarUrl(currentUser.avatar_url);
    } else if (screenParams) {
      if (screenParams.full_name && !fullName) {
        setFullName(screenParams.full_name);
        setDisplayName(screenParams.full_name);
      }
      if (screenParams.avatar_url && avatarUrl.includes('unsplash')) {
        setAvatarUrl(screenParams.avatar_url);
      }
      if (screenParams.phone && !phone) {
        setPhone(screenParams.phone.replace('+91', '').trim());
      }
    }
  }, [currentUser, screenParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile phone number.');
      return;
    }
    if (!selectedCollege) {
      setError('Please select your PU College / Institution.');
      return;
    }

    let collegeId: string | undefined = selectedCollege;
    let collegeName = '';

    if (selectedCollege === 'OTHER') {
      if (!customCollegeName.trim()) {
        setError('Please enter your PU College / Institution name.');
        return;
      }
      collegeName = customCollegeName.trim();
      collegeId = undefined;
    } else {
      const collegeObj = colleges.find(c => c.id === selectedCollege);
      collegeName = collegeObj?.name || 'PU College Delegate';
    }

    const formattedPhone = phone.startsWith('+91') ? phone : `+91 ${phone}`;

    setError('');
    completeProfile({
      email: screenParams?.email || undefined,
      phone: formattedPhone,
      full_name: fullName || 'Technova Participant',
      display_name: displayName || fullName || 'Technova Participant',
      college_id: collegeId,
      college_name: collegeName,
      designation: designation || 'Faculty Member',
      bio: bio || '',
      avatar_url: avatarUrl
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] dark:bg-[#0D1117] flex flex-col justify-center items-center px-4 py-4 sm:py-6 text-[#0F0F0F] dark:text-[#F0F6FC] font-sans transition-colors duration-200 overflow-y-auto">
      <div className="max-w-md mx-auto w-full my-auto">
        
        <div className="mb-3 text-center">
          <h2 className="text-xl sm:text-2xl font-black text-[#0F0F0F] dark:text-[#F0F6FC]">
            {currentUser?.is_profile_complete ? 'Edit Profile' : 'Complete Profile'}
          </h2>
          <p className="text-[11px] text-[#64748B] dark:text-[#8B949E] font-medium mt-0.5">
            {currentUser?.is_profile_complete ? 'Update your account preferences & details' : 'Set up your identity for Technova 2026'}
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-3">
            
            {/* Avatar Selector */}
            <div className="flex flex-col items-center mb-2">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#5DD62C] p-0.5 shadow-xs">
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition cursor-pointer">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>
              <span className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-bold mt-1">Profile Photo</span>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] mb-0.5">Full Name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Dr. Anand Sharma"
                className="w-full bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-[#0F0F0F] dark:text-[#F0F6FC] placeholder-slate-400 focus:border-[#5DD62C] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] mb-0.5">Display Name (In Chat)</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Anand Sharma"
                className="w-full bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-[#0F0F0F] dark:text-[#F0F6FC] placeholder-slate-400 focus:border-[#5DD62C] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] mb-0.5">Mobile Phone Number *</label>
              <div className="flex items-center rounded-xl bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-300 dark:border-slate-800 focus-within:border-[#5DD62C] transition overflow-hidden">
                <span className="px-3 text-xs font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] bg-slate-100 dark:bg-slate-800 py-2 border-r border-slate-300 dark:border-slate-800">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, ''));
                    if (e.target.value.length >= 10) setError('');
                  }}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full bg-transparent px-3 py-2 text-sm font-bold text-[#0F0F0F] dark:text-[#F0F6FC] placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Google Email Info */}
            {screenParams?.email && (
              <div>
                <label className="block text-xs font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] mb-0.5">Gmail Account</label>
                <input
                  type="email"
                  disabled
                  value={screenParams.email}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 cursor-not-allowed"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] mb-0.5">PU College / Institution *</label>
              <select
                required
                value={selectedCollege}
                onChange={(e) => {
                  setSelectedCollege(e.target.value);
                  if (e.target.value) setError('');
                }}
                className="w-full bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-[#0F0F0F] dark:text-[#F0F6FC] focus:border-[#5DD62C] focus:outline-none"
              >
                <option value="" className="text-slate-400">Select your PU College...</option>
                {colleges.map(c => (
                  <option key={c.id} value={c.id} className="bg-[#FFFFFF] dark:bg-[#161B22] text-[#0F0F0F] dark:text-[#F0F6FC]">
                    {c.name}
                  </option>
                ))}
                <option value="OTHER" className="bg-[#FFFFFF] dark:bg-[#161B22] text-[#337418] dark:text-[#5DD62C] font-black">
                  ➕ Other (Type PU College manually...)
                </option>
              </select>
            </div>

            {selectedCollege === 'OTHER' && (
              <div>
                <label className="block text-xs font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] mb-0.5">Type PU College Name *</label>
                <input
                  type="text"
                  required
                  value={customCollegeName}
                  onChange={(e) => {
                    setCustomCollegeName(e.target.value);
                    if (e.target.value) setError('');
                  }}
                  placeholder="e.g. Sharada PU College / Canara PU College"
                  className="w-full bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-[#0F0F0F] dark:text-[#F0F6FC] placeholder-slate-400 focus:border-[#5DD62C] focus:outline-none"
                />
              </div>
            )}

            {error && <p className="text-xs text-rose-600 dark:text-rose-400 font-bold">{error}</p>}

            <div>
              <label className="block text-xs font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] mb-0.5">Designation</label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="e.g. CS Lecturer / Faculty Lead"
                className="w-full bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-[#0F0F0F] dark:text-[#F0F6FC] placeholder-slate-400 focus:border-[#5DD62C] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC] mb-0.5">Optional Bio</label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Short bio or team details..."
                className="w-full bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-[#0F0F0F] dark:text-[#F0F6FC] placeholder-slate-400 focus:border-[#5DD62C] focus:outline-none"
              />
            </div>

            {/* Role Notice */}
            <div className="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 flex items-start gap-2 text-[11px] text-[#64748B] dark:text-[#8B949E]">
              <ShieldAlert className="w-3.5 h-3.5 text-[#337418] dark:text-[#5DD62C] shrink-0 mt-0.5" />
              <span>Roles (Coordinator/Admin) are assigned strictly by Technova Admins. Default access is Teacher.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0F0F0F] font-extrabold text-sm shadow-xs flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer sticky bottom-0 z-10"
            >
              <span>{currentUser?.is_profile_complete ? 'Update Profile' : 'Save & Enter App'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};
