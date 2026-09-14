'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Search, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';

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
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto min-h-screen bg-[#F8F8F8] dark:bg-[#0D1117] font-sans text-[#0F0F0F] dark:text-[#F0F6FC] transition-colors duration-200">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigateTo('teacher_dashboard')}
          className="p-1.5 rounded-xl text-[#0F0F0F] dark:text-[#F0F6FC] hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-black text-[#0F0F0F] dark:text-[#F0F6FC]">Assigned Students Roster</h2>
          <p className="text-[10px] text-[#64748B] dark:text-[#8B949E] font-medium">
            {currentUser?.college_name || 'St. Aloysius PU College'} Delegation
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="p-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 text-center shadow-xs">
          <span className="text-lg font-extrabold text-[#0F0F0F] dark:text-[#F0F6FC]">{students.length}</span>
          <p className="text-[9px] text-[#64748B] dark:text-[#8B949E] uppercase font-bold">Total</p>
        </div>
        <div className="p-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-emerald-300 dark:border-emerald-800 text-center shadow-xs">
          <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">{presentCount}</span>
          <p className="text-[9px] text-emerald-600 dark:text-emerald-400 uppercase font-bold">Present</p>
        </div>
        <div className="p-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-rose-300 dark:border-rose-800 text-center shadow-xs">
          <span className="text-lg font-extrabold text-rose-600 dark:text-rose-400">{absentCount}</span>
          <p className="text-[9px] text-rose-600 dark:text-rose-400 uppercase font-bold">Absent</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-3 relative">
        <Search className="w-4 h-4 text-[#64748B] dark:text-[#8B949E] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search student name or USN..."
          className="w-full bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#0F0F0F] dark:text-[#F0F6FC] placeholder-slate-400 focus:outline-none focus:border-[#5DD62C] transition shadow-xs"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1">
        {(['ALL', 'PRESENT', 'ABSENT', 'REGISTERED'] as const).map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize shrink-0 transition cursor-pointer ${
              filterStatus === st
                ? 'bg-[#5DD62C] text-[#0F0F0F] font-bold shadow-xs'
                : 'bg-[#FFFFFF] dark:bg-[#161B22] text-[#64748B] dark:text-[#8B949E] border border-slate-200 dark:border-slate-800'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Student Roster Cards */}
      <div className="space-y-2">
        {filteredStudents.map(student => (
          <div key={student.id} className="p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="text-xs font-bold text-[#0F0F0F] dark:text-[#F0F6FC]">{student.name}</h4>
                <span className="text-[9px] px-1.5 py-0.5 bg-[#F1F5F9] dark:bg-[#0D1117] text-[#337418] dark:text-[#5DD62C] font-mono rounded font-bold">
                  {student.student_identifier}
                </span>
              </div>
              <p className="text-[10px] text-[#64748B] dark:text-[#8B949E]">
                {student.class_name} • {student.workshop_name}
              </p>
            </div>

            {/* Attendance Toggle */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => updateStudentAttendance(student.id, student.attendance_status === 'PRESENT' ? 'ABSENT' : 'PRESENT')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                  student.attendance_status === 'PRESENT'
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                    : student.attendance_status === 'ABSENT'
                      ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-[#0F0F0F] dark:text-[#F0F6FC]'
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
          <div className="text-center py-12 text-[#64748B] dark:text-[#8B949E] text-xs font-medium bg-[#FFFFFF] dark:bg-[#161B22] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            No students found matching your criteria.
          </div>
        )}
      </div>

    </div>
  );
};
