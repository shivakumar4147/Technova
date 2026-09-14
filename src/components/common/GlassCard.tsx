'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export type GlassLevel = 'level1' | 'level2' | 'level3' | 'level4' | 'interactive' | 'solid' | 'glass' | 'bright' | 'clickable';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: GlassLevel;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'level2',
  className = '',
  onClick,
  ...props
}) => {
  let baseStyle = 'rounded-2xl transition-all duration-200 ';

  switch (variant) {
    case 'level1':
    case 'solid':
      // Level 1: Standard dark translucent surface
      baseStyle += 'glass-level1 ';
      break;

    case 'level2':
    case 'glass':
    case 'bright':
    default:
      // Level 2: Elevated surface (for cards & main containers)
      baseStyle += 'glass-level2 ';
      break;

    case 'level3':
      // Level 3: Floating surface (for nav, headers, action sheets)
      baseStyle += 'glass-level3 ';
      break;

    case 'level4':
      // Level 4: Modal & dialog surface (high contrast overlay)
      baseStyle += 'glass-level4 ';
      break;

    case 'interactive':
    case 'clickable':
      // Level 2 Interactive with subtle hover/active scale
      baseStyle += 'glass-level2 hover:border-[#7ED9B9]/40 active:scale-[0.99] cursor-pointer ';
      break;
  }

  return (
    <motion.div
      onClick={onClick}
      className={`${baseStyle} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
