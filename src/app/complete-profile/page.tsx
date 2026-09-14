'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { upsertProfileInSupabase, fetchCollegesFromSupabase } from '@/lib/supabaseService';
import { College } from '@/types';
import { ShieldAlert, ArrowRight, Camera, CheckCircle2 } from 'lucide-react';
import { LoadingScreen } from '@/components/common/LoadingScreen';

import { useApp } from '@/context/AppContext';

function CompleteProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { completeProfile } = useApp();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [authUserId, setAuthUserId] = useState<string | null>(null);

  // Google OAuth prefilled metadata (read-only)
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80');

  // Custom User Input Fields
  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');
  const [customCollegeName, setCustomCollegeName] = useState('');
  const [designation, setDesignation] = useState('');
  const [bio, setBio] = useState('');

  const [colleges, setColleges] = useState<College[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function checkAuthAndLoadColleges() {
      try {
        // 1. Fetch colleges list
        if (isSupabaseConfigured()) {
          const colList = await fetchCollegesFromSupabase();
          if (colList) setColleges(colList);
        }

        // 2. Check active Supabase auth session
        const { data: { session } } = await supabase.auth.getSession();

        // Guest protection: redirect unauthenticated users to /get-started
        if (!session?.user) {
          // Check query params as fallback for Google redirect info
          const qpEmail = searchParams.get('email');
          const qpFullName = searchParams.get('full_name');
          const qpAvatar = searchParams.get('avatar_url');

          if (!qpEmail && !isSupabaseConfigured()) {
            // Local dev mode fallback or guest redirect
          } else if (!qpEmail) {
            router.push('/get-started');
            return;
          }

          if (qpEmail) setEmail(qpEmail);
          if (qpFullName) {
            setFullName(qpFullName);
            setDisplayName(qpFullName);
          }
          if (qpAvatar) setAvatarUrl(qpAvatar);
        } else {
          // User is authenticated via Supabase session
          setAuthUserId(session.user.id);
          const meta = session.user.user_metadata || {};
          const userEmail = session.user.email || meta.email || '';
          const userFullName = meta.full_name || meta.name || '';
          const userAvatar = meta.avatar_url || meta.picture || '';

          setEmail(userEmail);
          setFullName(userFullName);
          setDisplayName(userFullName);
          if (userAvatar) setAvatarUrl(userAvatar);
        }
      } catch (err) {
        console.error('Error during profile setup auth check:', err);
      } finally {
        setLoading(false);
      }
    }

    checkAuthAndLoadColleges();
  }, [router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Server/Client Validation
    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile phone number.');
      return;
    }
    if (!selectedCollege) {
      setError('Please select your PU College / Institution.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      let collegeId: string | undefined = selectedCollege;
      let collegeName = '';

      if (selectedCollege === 'OTHER') {
        if (!customCollegeName.trim()) {
          setError('Please enter your PU College / Institution name.');
          setSubmitting(false);
          return;
        }
        collegeName = customCollegeName.trim();
        collegeId = undefined;
      } else {
        const colObj = colleges.find(c => c.id === selectedCollege);
        collegeName = colObj?.name || 'PU College Delegate';
      }

      const formattedPhone = phone.startsWith('+91') ? phone : `+91 ${phone}`;

      const profilePayload = {
        id: authUserId || undefined,
        email: email || undefined,
        phone: formattedPhone,
        full_name: fullName || 'Technova Participant',
        display_name: displayName || fullName || 'Technova Participant',
        college_id: collegeId,
        college_name: collegeName,
        designation: designation || 'Faculty Member',
        bio: bio || '',
        avatar_url: avatarUrl,
        is_profile_complete: true
      };

      // Upsert profile record in database for active auth.uid()
      const savedProfile = await upsertProfileInSupabase(profilePayload);
      console.log('Profile setup saved to database:', savedProfile);

      // Save to AppContext & localStorage
      if (completeProfile) {
        completeProfile(savedProfile || profilePayload);
      }

      // On successful write, route user to /dashboard
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Profile submission failed:', err);
      setError(err?.message || 'Failed to submit profile. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="Verifying Google identity & profile status..." />;
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col justify-center items-center px-4 py-6 text-[#0F0F0F] font-sans overflow-y-auto">
      <div className="max-w-md mx-auto w-full my-auto">
        
        {/* Header */}
        <div className="mb-4 text-center">
          <span className="text-[10px] font-black uppercase text-[#337418] bg-[#5DD62C]/20 border border-[#5DD62C]/40 px-3 py-1 rounded-full">
            Onboarding Step 2 of 2
          </span>
          <h1 className="text-2xl font-black text-[#0F0F0F] mt-2">Complete Profile</h1>
          <p className="text-xs text-[#64748B] font-medium mt-0.5">Finalize your delegate details for Technova 2026</p>
        </div>

        {/* Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-slate-200 shadow-xs space-y-3 max-h-[82vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-3">
            
            {/* Avatar Preview */}
            <div className="flex flex-col items-center mb-1">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#5DD62C] p-0.5 shadow-xs bg-slate-100">
                <img src={avatarUrl} alt="Google Avatar" className="w-full h-full object-cover rounded-full" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition cursor-pointer">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-1 text-[11px] text-[#337418] font-extrabold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Google Profile Synced</span>
              </div>
            </div>

            {/* Read-Only Locked Gmail Field */}
            <div>
              <label className="block text-xs font-extrabold text-[#0F0F0F] mb-0.5">Google Gmail (Read-Only)</label>
              <input
                type="email"
                disabled
                value={email || 'google-user@gmail.com'}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 cursor-not-allowed"
              />
            </div>

            {/* Full Name (Pre-filled from Google) */}
            <div>
              <label className="block text-xs font-extrabold text-[#0F0F0F] mb-0.5">Full Name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Dr. Anand Sharma"
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-[#0F0F0F] placeholder-slate-400 focus:border-[#5DD62C] focus:outline-none"
              />
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-xs font-extrabold text-[#0F0F0F] mb-0.5">Display Name (In Event Chat)</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Anand Sharma"
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-[#0F0F0F] placeholder-slate-400 focus:border-[#5DD62C] focus:outline-none"
              />
            </div>

            {/* Mandatory Mobile Phone */}
            <div>
              <label className="block text-xs font-extrabold text-[#0F0F0F] mb-0.5">Mobile Phone Number *</label>
              <div className="flex items-center rounded-xl bg-[#F8FAFC] border border-slate-300 focus-within:border-[#5DD62C] transition overflow-hidden">
                <span className="px-3 text-xs font-extrabold text-[#0F0F0F] bg-slate-100 py-2 border-r border-slate-300">
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
                  className="w-full bg-transparent px-3 py-2 text-sm font-bold text-[#0F0F0F] placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* PU College Selection */}
            <div>
              <label className="block text-xs font-extrabold text-[#0F0F0F] mb-0.5">PU College / Institution *</label>
              <select
                required
                value={selectedCollege}
                onChange={(e) => {
                  setSelectedCollege(e.target.value);
                  if (e.target.value) setError('');
                }}
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-[#0F0F0F] focus:border-[#5DD62C] focus:outline-none"
              >
                <option value="" className="text-slate-400">Select your PU College...</option>
                {colleges.map(c => (
                  <option key={c.id} value={c.id} className="bg-[#FFFFFF] text-[#0F0F0F]">
                    {c.name}
                  </option>
                ))}
                <option value="OTHER" className="bg-[#FFFFFF] text-[#337418] font-black">
                  ➕ Other (Type PU College manually...)
                </option>
              </select>
            </div>

            {selectedCollege === 'OTHER' && (
              <div>
                <label className="block text-xs font-extrabold text-[#0F0F0F] mb-0.5">Type PU College Name *</label>
                <input
                  type="text"
                  required
                  value={customCollegeName}
                  onChange={(e) => {
                    setCustomCollegeName(e.target.value);
                    if (e.target.value) setError('');
                  }}
                  placeholder="e.g. Sharada PU College / Canara PU College"
                  className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-[#0F0F0F] placeholder-slate-400 focus:border-[#5DD62C] focus:outline-none"
                />
              </div>
            )}

            {/* Designation / Department */}
            <div>
              <label className="block text-xs font-extrabold text-[#0F0F0F] mb-0.5">Designation / Department</label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="e.g. CS Lecturer / Faculty Coordinator"
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-[#0F0F0F] placeholder-slate-400 focus:border-[#5DD62C] focus:outline-none"
              />
            </div>

            {/* Optional Bio */}
            <div>
              <label className="block text-xs font-extrabold text-[#0F0F0F] mb-0.5">Optional Bio</label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Short bio or delegate notes..."
                className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-[#0F0F0F] placeholder-slate-400 focus:border-[#5DD62C] focus:outline-none"
              />
            </div>

            {error && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-600">
                {error}
              </div>
            )}

            {/* Role Notice */}
            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-start gap-2 text-[11px] text-[#64748B]">
              <ShieldAlert className="w-3.5 h-3.5 text-[#337418] shrink-0 mt-0.5" />
              <span>Permissions are managed by Technova Admins. New profiles default to Teacher / Delegate status.</span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0F0F0F] font-extrabold text-sm shadow-xs flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer disabled:opacity-50"
            >
              <span>{submitting ? 'Saving Profile to Database...' : 'Save & Enter Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default function CompleteProfilePage() {
  return (
    <Suspense fallback={<LoadingScreen message="Loading Technova profile form..." />}>
      <CompleteProfileContent />
    </Suspense>
  );
}
