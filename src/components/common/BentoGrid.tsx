'use client';

import React from 'react';
import { GlassCard, GlassLevel } from './GlassCard';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoCardProps {
  children: React.ReactNode;
  span?: 'full' | 'col-2' | 'col-1' | 'row-2';
  variant?: GlassLevel;
  className?: string;
  onClick?: () => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-3.5 ${className}`}>
      {children}
    </div>
  );
};

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  span = 'col-1',
  variant = 'level2',
  className = '',
  onClick
}) => {
  let spanClasses = '';
  switch (span) {
    case 'full':
    case 'col-2':
      spanClasses = 'md:col-span-2 col-span-1';
      break;
    case 'row-2':
      spanClasses = 'md:row-span-2 col-span-1';
      break;
    case 'col-1':
    default:
      spanClasses = 'col-span-1';
      break;
  }

  return (
    <GlassCard
      variant={variant}
      onClick={onClick}
      className={`p-4 md:p-5 ${spanClasses} ${onClick ? 'cursor-pointer hover:border-cyan-400/40 active:scale-[0.99]' : ''} ${className}`}
    >
      {children}
    </GlassCard>
  );
};
