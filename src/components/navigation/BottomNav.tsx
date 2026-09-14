'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { MessageSquare, Calendar, Bell, User, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
  icon: any;
  badge?: number;
}

export const BottomNav: React.FC = () => {
  const { currentUser, currentScreen, navigateTo, notifications } = useApp();

  // Hide BottomNav on active chat screens to prevent composer overlap
  if (!currentUser || ['group_chat', 'private_chat'].includes(currentScreen)) return null;

  const unreadNotifs = notifications.filter(n => !n.is_read).length;

  // Navigation items for Admin & Coordinator (5-tab navigation including Control & Profile)
  const adminItems: NavItem[] = [
    { id: 'chat_home', label: 'Chats', icon: MessageSquare },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'notifications', label: 'Alerts', icon: Bell, badge: unreadNotifs },
    { id: 'admin_dashboard', label: 'Control', icon: Shield },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  // Navigation items for Teachers / Delegates (4-tab navigation including Profile)
  const teacherItems: NavItem[] = [
    { id: 'chat_home', label: 'Chats', icon: MessageSquare },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'notifications', label: 'Alerts', icon: Bell, badge: unreadNotifs },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const items = (currentUser.role === 'admin' || currentUser.role === 'coordinator') ? adminItems : teacherItems;

  // Determine active index
  const activeIndex = items.findIndex(item => {
    if (item.id === currentScreen) return true;
    if (item.id === 'chat_home' && ['chat_home'].includes(currentScreen)) return true;
    if (item.id === 'events' && ['events', 'event_detail', 'workshops'].includes(currentScreen)) return true;
    return false;
  });

  const safeActiveIndex = activeIndex >= 0 ? activeIndex : 0;
  const totalItems = items.length;

  // SVG Geometry Settings calibrated for ~2cm height (76px viewBox height)
  const viewBoxWidth = 360;
  const viewBoxHeight = 76;
  const topY = 18;
  const cornerRadius = 18;    // Rounded outer corners for navbar
  const dipDepth = 24;        // Deep U-scoop bowl
  const scoopRadius = 28;     // 28px scoop radius around 19px bubble radius = 9px equal gap!
  const shoulderRadius = 12;  // Soft rounded shoulder fillets at scoop entry & exit

  // Tab center X calculation with inset margin so Tab 0 & Tab 4 never collide with navbar corners
  const startMargin = 42;
  const endMargin = 318;
  const tabStep = (endMargin - startMargin) / (totalItems - 1);
  const activeCx = startMargin + safeActiveIndex * tabStep;

  // SVG Path with equal concentric U-scoop cutout and rounded shoulders
  const curvePath = `
    M ${cornerRadius},${topY}
    L ${activeCx - scoopRadius - shoulderRadius},${topY}
    Q ${activeCx - scoopRadius},${topY} ${activeCx - scoopRadius + 3},${topY + 5}
    C ${activeCx - 17},${topY + dipDepth} ${activeCx + 17},${topY + dipDepth} ${activeCx + scoopRadius - 3},${topY + 5}
    Q ${activeCx + scoopRadius},${topY} ${activeCx + scoopRadius + shoulderRadius},${topY}
    L ${viewBoxWidth - cornerRadius},${topY}
    Q ${viewBoxWidth},${topY} ${viewBoxWidth},${topY + cornerRadius}
    L ${viewBoxWidth},${viewBoxHeight - cornerRadius}
    Q ${viewBoxWidth},${viewBoxHeight} ${viewBoxWidth - cornerRadius},${viewBoxHeight}
    L ${cornerRadius},${viewBoxHeight}
    Q 0,${viewBoxHeight} 0,${viewBoxHeight - cornerRadius}
    L 0,${topY + cornerRadius}
    Q 0,${topY} ${cornerRadius},${topY}
    Z
  `;

  // Ultra-Smooth 60fps spring physics matching SVG curve, bubble motion, and rising icon
  const smoothSpring = {
    type: 'spring' as const,
    stiffness: 260,
    damping: 28,
    mass: 0.8,
  };

  return (
    <div className="fixed bottom-1.5 left-0 right-0 z-40 px-2 max-w-[360px] mx-auto select-none pointer-events-none">
      <div className="relative w-full h-[76px] pointer-events-auto">
        
        {/* Navbar Container SVG (~2cm height) with drop shadow */}
        <svg
          className="absolute inset-0 w-full h-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.2)]"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        >
          <motion.path
            initial={false}
            animate={{ d: curvePath }}
            className="fill-[#FFFFFF] dark:fill-[#161B22] stroke-[#E2E8F0] dark:stroke-slate-800"
            strokeWidth="1"
            transition={smoothSpring}
          />
        </svg>

        {/* Sliding Electric Green Bubble Circle (38px x 38px, radius 19px) - Centered at activeCx */}
        <motion.div
          className="absolute top-[-8px] w-[38px] h-[38px] rounded-full bg-[#5DD62C] shadow-[0_6px_16px_rgba(0,0,0,0.32),_0_2px_8px_rgba(93,214,44,0.4)] pointer-events-none z-20"
          initial={false}
          animate={{
            left: `${(activeCx / viewBoxWidth) * 100}%`,
          }}
          transition={smoothSpring}
          style={{ transform: 'translateX(-50%)' }}
        />

        {/* Interactive Tab Items - Positioned ABSOLUTELY at tabCx for 100% pixel-perfect centering */}
        <div className="absolute inset-0 top-[18px] pointer-events-none z-30">
          {items.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === safeActiveIndex;
            const tabCx = startMargin + index * tabStep;

            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className="absolute top-0 w-[50px] h-[58px] flex flex-col items-center justify-start focus:outline-none pointer-events-auto pt-2 cursor-pointer"
                style={{
                  left: `${(tabCx / viewBoxWidth) * 100}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                {/* Elevating Icon */}
                <motion.div
                  className="relative flex items-center justify-center pointer-events-none z-30"
                  animate={{
                    y: isActive ? -22 : 11,
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={smoothSpring}
                >
                  <Icon
                    className={`w-[19px] h-[19px] transition-colors duration-200 ${
                      isActive
                        ? 'text-[#000000] stroke-[2.4px]'
                        : 'text-[#64748B] dark:text-[#8B949E] stroke-[2px] hover:text-[#0F0F0F] dark:hover:text-[#F0F6FC]'
                    }`}
                  />

                  {/* Unread Alert Badge count */}
                  {item.badge && item.badge > 0 && !isActive ? (
                    <span className="absolute top-[-4px] right-[-6px] min-w-[14px] h-[14px] px-1 rounded-full bg-[#5DD62C] text-[8px] font-black text-[#0F0F0F] flex items-center justify-center shadow-xs">
                      {item.badge}
                    </span>
                  ) : null}
                </motion.div>

                {/* Active Text Label */}
                <motion.span
                  className="absolute top-[36px] text-[11px] font-bold text-[#475569] dark:text-[#8B949E] tracking-tight whitespace-nowrap text-center pointer-events-none z-30"
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? -4 : 4,
                    scale: isActive ? 1 : 0.9,
                  }}
                  transition={smoothSpring}
                >
                  {item.label}
                </motion.span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
