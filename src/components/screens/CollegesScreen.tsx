'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Search, Building2, Users, UserCheck, ChevronRight, Plus, School, MapPin } from 'lucide-react';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';

export const CollegesScreen: React.FC = () => {
  const { currentUser, colleges, createCollege, assignCoordinator, profiles, navigateTo } = useApp();

  const isAuthorized = currentUser?.role === 'admin' || currentUser?.role === 'coordinator';

  if (!isAuthorized) {
    return (
      <div className="pb-28 pt-8 px-4 max-w-md mx-auto min-h-screen text-center flex flex-col justify-center items-center font-sans bg-[#0B0F17] text-[#F8FAFC]">
        <div className="p-6 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-lg space-y-4 max-w-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-black text-[#F8FAFC]">Colleges Directory Restricted</h2>
            <p className="text-xs text-[#94A3B8] font-medium mt-1">
              Managing institutions and coordinator assignments is restricted to Admin & Coordinator roles only.
            </p>
          </div>
          <button
            onClick={() => navigateTo('chat_home')}
            className="w-full py-2.5 px-4 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0B0F17] font-extrabold text-xs shadow-xs transition cursor-pointer"
          >
            Return to Main Chat
          </button>
        </div>
      </div>
    );
  }

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollegeId, setSelectedCollegeId] = useState<string | null>(null);
  const [selectedCoordinatorId, setSelectedCoordinatorId] = useState('');

  // Add College Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCollegeName, setNewCollegeName] = useState('');
  const [newCollegeShort, setNewCollegeShort] = useState('');
  const [newCollegeCity, setNewCollegeCity] = useState('');
  const [newCollegePhone, setNewCollegePhone] = useState('');

  const coordinators = profiles.filter(p => p.role === 'coordinator' || p.role === 'admin');

  const filteredColleges = colleges.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.city || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCollegeId || !selectedCoordinatorId) return;
    const coord = profiles.find(p => p.id === selectedCoordinatorId);
    assignCoordinator(selectedCollegeId, selectedCoordinatorId, coord?.full_name || 'Assigned Coordinator');
    setSelectedCollegeId(null);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollegeName.trim()) return;
    createCollege({
      name: newCollegeName.trim(),
      short_name: newCollegeShort.trim() || 'PU College',
      city: newCollegeCity.trim() || 'Mangaluru',
      contact_phone: newCollegePhone.trim() || '+91 9800000000'
    });
    setNewCollegeName('');
    setNewCollegeShort('');
    setNewCollegeCity('');
    setNewCollegePhone('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#0B0F17] font-sans text-[#F8FAFC]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('admin_dashboard')}
            className="p-1.5 rounded-xl text-[#F8FAFC] hover:bg-[#1E293B] transition active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black text-[#F8FAFC]">PU Colleges Directory</h2>
            <p className="text-[11px] text-[#94A3B8] font-medium">Participating institutions & assigned coordinators</p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3 py-2 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0B0F17] font-black text-xs shadow-xs flex items-center gap-1 transition active:scale-95 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add College</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4 relative">
        <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search college name or city..."
          className="w-full bg-[#1E293B] border border-[#334155] rounded-2xl pl-10 pr-4 py-2.5 text-xs font-bold text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#5DD62C] transition shadow-xs"
        />
      </div>

      {/* College List Cards */}
      <div className="space-y-3">
        {filteredColleges.map(col => (
          <div
            key={col.id}
            onClick={() => navigateTo('college_detail', { collegeId: col.id })}
            className="p-4 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-xs cursor-pointer hover:border-[#5DD62C] transition"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#5DD62C]/15 text-[#5DD62C] flex items-center justify-center font-bold border border-[#5DD62C]/40 shrink-0">
                  <School className="w-5 h-5 text-[#5DD62C]" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#F8FAFC]">{col.name}</h3>
                  <p className="text-[11px] text-[#5DD62C] font-extrabold flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#5DD62C]" />
                    <span>{col.city || 'Mangaluru'}</span>
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#5DD62C]/20 text-[#5DD62C] border border-[#5DD62C]/40">
                Active
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#1E293B] border border-[#334155] flex items-center justify-between text-xs my-3">
              <div>
                <span className="text-[#94A3B8] text-[10px] font-medium">Teachers: </span>
                <strong className="text-[#F8FAFC] font-bold font-mono">{col.teachers_count}</strong>
              </div>
              <div className="w-px h-3 bg-[#334155]" />
              <div>
                <span className="text-[#94A3B8] text-[10px] font-medium">Students: </span>
                <strong className="text-[#F8FAFC] font-bold font-mono">{col.students_count}</strong>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#1E293B] text-xs">
              <div className="flex items-center gap-1.5 text-[#F8FAFC]">
                <UserCheck className="w-3.5 h-3.5 text-[#5DD62C]" />
                <span className="text-[11px] font-medium text-[#94A3B8]">
                  Coordinator: <strong className="text-[#F8FAFC] font-bold">{col.assigned_coordinator_name || 'Unassigned'}</strong>
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCollegeId(col.id);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#5DD62C] text-[#0B0F17] font-black text-[11px] hover:bg-[#50b925] transition active:scale-95 cursor-pointer shadow-xs"
              >
                Assign
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Assign Coordinator Modal */}
      <Modal
        isOpen={!!selectedCollegeId}
        onClose={() => setSelectedCollegeId(null)}
        title="Assign Technova Coordinator"
      >
        <form onSubmit={handleAssignSubmit} className="space-y-4 text-xs font-sans text-[#F8FAFC]">
          <div>
            <label className="block text-[#F8FAFC] font-extrabold mb-1">Select Coordinator</label>
            <select
              value={selectedCoordinatorId}
              onChange={(e) => setSelectedCoordinatorId(e.target.value)}
              className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-2.5 text-[#F8FAFC] font-bold focus:border-[#5DD62C] focus:outline-none"
            >
              <option value="" className="bg-[#111827] text-[#94A3B8]">Choose a coordinator...</option>
              {coordinators.map(c => (
                <option key={c.id} value={c.id} className="bg-[#111827] text-[#F8FAFC]">
                  {c.full_name} ({c.designation || 'Technova Lead'})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0B0F17] font-black shadow-xs cursor-pointer"
            >
              Save Assignment
            </button>
          </div>
        </form>
      </Modal>

      {/* Add PU College Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New PU College"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs font-sans text-[#F8FAFC]">
          <div>
            <label className="block text-[#F8FAFC] font-extrabold mb-1">College Full Name *</label>
            <input
              type="text"
              required
              value={newCollegeName}
              onChange={(e) => setNewCollegeName(e.target.value)}
              placeholder="e.g. St. Aloysius Pre-University College"
              className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-2.5 text-sm font-bold text-[#F8FAFC] placeholder-[#94A3B8] focus:border-[#5DD62C] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[#F8FAFC] font-extrabold mb-1">Short Name</label>
              <input
                type="text"
                value={newCollegeShort}
                onChange={(e) => setNewCollegeShort(e.target.value)}
                placeholder="e.g. Aloysius PU"
                className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-2.5 text-xs font-bold text-[#F8FAFC] placeholder-[#94A3B8] focus:border-[#5DD62C] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#F8FAFC] font-extrabold mb-1">City</label>
              <input
                type="text"
                value={newCollegeCity}
                onChange={(e) => setNewCollegeCity(e.target.value)}
                placeholder="e.g. Mangaluru"
                className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-2.5 text-xs font-bold text-[#F8FAFC] placeholder-[#94A3B8] focus:border-[#5DD62C] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#F8FAFC] font-extrabold mb-1">Contact Phone</label>
            <input
              type="text"
              value={newCollegePhone}
              onChange={(e) => setNewCollegePhone(e.target.value)}
              placeholder="e.g. +91 98450 12345"
              className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-2.5 text-xs font-bold text-[#F8FAFC] placeholder-[#94A3B8] focus:border-[#5DD62C] focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#5DD62C] hover:bg-[#50b925] text-[#0B0F17] font-black shadow-xs cursor-pointer"
            >
              Save PU College
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
