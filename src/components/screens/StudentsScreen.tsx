'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Search, ArrowLeft, Users, CheckCircle2, XCircle, Clock, Shield } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Badge } from '@/components/common/Badge';

export const StudentsScreen: React.FC = () => {
  const { students, updateStudentAttendance, currentUser, navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PRESENT' | 'ABSENT' | 'REGISTERED'>('ALL');

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.student_identifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.class_name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filterStatus !== 'ALL') return s.attendance_status === filterStatus;
    return true;
  });

  const presentCount = students.filter(s => s.attendance_status === 'PRESENT').length;
  const absentCount = students.filter(s => s.attendance_status === 'ABSENT').length;

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#0B0F17] font-sans text-[#F8FAFC]">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigateTo('teacher_dashboard')}
          className="p-1.5 rounded-xl text-[#F8FAFC] hover:bg-[#1E293B] transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-black text-[#F8FAFC]">Assigned Students Roster</h2>
          <p className="text-[10px] text-[#94A3B8]">
            {currentUser?.college_name || 'St. Aloysius PU College'} Delegation
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="p-2.5 rounded-2xl bg-[#111827] border border-[#1E293B] text-center shadow-xs">
          <span className="text-lg font-black text-[#F8FAFC]">{students.length}</span>
          <p className="text-[9px] text-[#94A3B8] uppercase font-bold">Total</p>
        </div>
        <div className="p-2.5 rounded-2xl bg-[#111827] border border-emerald-500/30 text-center shadow-xs">
          <span className="text-lg font-black text-emerald-400">{presentCount}</span>
          <p className="text-[9px] text-emerald-400 uppercase font-bold">Present</p>
        </div>
        <div className="p-2.5 rounded-2xl bg-[#111827] border border-rose-500/30 text-center shadow-xs">
          <span className="text-lg font-black text-rose-400">{absentCount}</span>
          <p className="text-[9px] text-rose-400 uppercase font-bold">Absent</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-3 relative">
        <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search student name or USN..."
          className="w-full bg-[#1E293B] border border-[#334155] rounded-2xl pl-10 pr-4 py-2.5 text-xs font-bold text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#5DD62C] transition shadow-xs"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1 no-scrollbar">
        {(['ALL', 'PRESENT', 'ABSENT', 'REGISTERED'] as const).map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize shrink-0 transition cursor-pointer ${
              filterStatus === st
                ? 'bg-[#5DD62C] text-[#0B0F17] font-black shadow-xs'
                : 'bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Student Roster Cards */}
      <div className="space-y-2">
        {filteredStudents.map(student => (
          <div key={student.id} className="p-3 rounded-2xl bg-[#111827] border border-[#1E293B] shadow-xs flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="text-xs font-black text-[#F8FAFC]">{student.name}</h4>
                <span className="text-[9px] px-1.5 py-0.2 bg-[#1E293B] text-[#5DD62C] font-mono font-bold rounded border border-[#334155]">
                  {student.student_identifier}
                </span>
              </div>
              <p className="text-[10px] text-[#94A3B8]">
                {student.class_name} • {student.workshop_name}
              </p>
            </div>

            {/* Attendance Toggle */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => updateStudentAttendance(student.id, student.attendance_status === 'PRESENT' ? 'ABSENT' : 'PRESENT')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1 transition cursor-pointer ${
                  student.attendance_status === 'PRESENT'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : student.attendance_status === 'ABSENT'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      : 'bg-[#1E293B] text-[#94A3B8] border border-[#334155]'
                }`}
              >
                {student.attendance_status === 'PRESENT' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Present</span>
                  </>
                ) : student.attendance_status === 'ABSENT' ? (
                  <>
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Absent</span>
                  </>
                ) : (
                  <span>Mark Attendance</span>
                )}
              </button>
            </div>
          </div>
        ))}

        {filteredStudents.length === 0 && (
          <div className="text-center py-12 text-[#94A3B8] text-xs bg-[#111827] rounded-2xl border border-[#1E293B]">
            No students found matching your criteria.
          </div>
        )}
      </div>

    </div>
  );
};
