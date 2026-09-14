'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Search, Building2, Users, UserCheck, ChevronRight, Plus, School, MapPin } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';

export const CollegesScreen: React.FC = () => {
  const { colleges, createCollege, assignCoordinator, profiles, navigateTo } = useApp();
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
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('admin_dashboard')}
            className="p-1.5 rounded-xl text-slate-300 hover:bg-slate-800/80 transition active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-extrabold text-white">PU Colleges Directory</h2>
            <p className="text-[10px] text-slate-400 font-medium">Participating institutions & assigned coordinators</p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs shadow-md flex items-center gap-1 transition active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add College</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search college name or city..."
          className="w-full glass-level2 border border-slate-700/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition"
        />
      </div>

      {/* College List */}
      <div className="space-y-3">
        {filteredColleges.map(col => (
          <GlassCard
            key={col.id}
            variant="bright"
            onClick={() => navigateTo('college_detail', { collegeId: col.id })}
            className="p-4 border-cyan-500/30 cursor-pointer hover:border-cyan-400/50 transition"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-lg border border-cyan-500/30">
                  <School className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">{col.name}</h3>
                  <p className="text-[10px] text-cyan-300 font-semibold flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{col.city}</span>
                  </p>
                </div>
              </div>
              <Badge variant="green" size="sm">Active</Badge>
            </div>

            <div className="p-2.5 rounded-xl glass-level1 border border-slate-800 flex items-center justify-between text-xs my-3">
              <div>
                <span className="text-slate-400 text-[10px]">Teachers: </span>
                <strong className="text-white font-bold font-mono">{col.teachers_count}</strong>
              </div>
              <div className="w-px h-3 bg-slate-800" />
              <div>
                <span className="text-slate-400 text-[10px]">Students: </span>
                <strong className="text-white font-bold font-mono">{col.students_count}</strong>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px]">
                  Coordinator: <strong className="text-cyan-300">{col.assigned_coordinator_name}</strong>
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCollegeId(col.id);
                }}
                className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold text-[11px] hover:bg-cyan-500/20 border border-cyan-500/30 transition active:scale-95"
              >
                Assign
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Assign Coordinator Modal */}
      <Modal
        isOpen={!!selectedCollegeId}
        onClose={() => setSelectedCollegeId(null)}
        title="Assign Technova Coordinator"
      >
        <form onSubmit={handleAssignSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Select Coordinator</label>
            <select
              value={selectedCoordinatorId}
              onChange={(e) => setSelectedCoordinatorId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:border-cyan-400 focus:outline-none"
            >
              <option value="" className="bg-slate-900 text-slate-400">Choose a coordinator...</option>
              {coordinators.map(c => (
                <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                  {c.full_name} ({c.designation || 'Technova Lead'})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold shadow"
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
        <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">College Full Name *</label>
            <input
              type="text"
              required
              value={newCollegeName}
              onChange={(e) => setNewCollegeName(e.target.value)}
              placeholder="e.g. St. Aloysius Pre-University College"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Short Name</label>
              <input
                type="text"
                value={newCollegeShort}
                onChange={(e) => setNewCollegeShort(e.target.value)}
                placeholder="e.g. Aloysius PU"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">City</label>
              <input
                type="text"
                value={newCollegeCity}
                onChange={(e) => setNewCollegeCity(e.target.value)}
                placeholder="e.g. Mangaluru"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Contact Phone</label>
            <input
              type="text"
              value={newCollegePhone}
              onChange={(e) => setNewCollegePhone(e.target.value)}
              placeholder="e.g. +91 98450 12345"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold shadow"
            >
              Create & Init Group
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
