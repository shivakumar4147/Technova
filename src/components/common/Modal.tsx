import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FFFFFF] dark:bg-[#161B22] text-[#0F0F0F] dark:text-[#F0F6FC] rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto font-sans">
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-black text-[#0F0F0F] dark:text-[#F0F6FC] tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-[#0F0F0F] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
