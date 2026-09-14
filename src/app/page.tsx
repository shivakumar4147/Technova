'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Header } from '@/components/navigation/Header';
import { BottomNav } from '@/components/navigation/BottomNav';
import { LoadingScreen } from '@/components/common/LoadingScreen';

// Screen Imports
import { SplashScreen } from '@/components/screens/SplashScreen';
import { LoginScreen } from '@/components/screens/LoginScreen';
import { OtpScreen } from '@/components/screens/OtpScreen';
import { ProfileSetupScreen } from '@/components/screens/ProfileSetupScreen';
import { ChatHomeScreen } from '@/components/screens/ChatHomeScreen';
import { GroupChatScreen } from '@/components/screens/GroupChatScreen';
import { PrivateChatScreen } from '@/components/screens/PrivateChatScreen';
import { GroupInfoScreen } from '@/components/screens/GroupInfoScreen';
import { SearchScreen } from '@/components/screens/SearchScreen';
import { EventsScreen } from '@/components/screens/EventsScreen';
import { EventDetailScreen } from '@/components/screens/EventDetailScreen';
import { AnnouncementCreateScreen } from '@/components/screens/AnnouncementCreateScreen';
import { AcknowledgementTrackerScreen } from '@/components/screens/AcknowledgementTrackerScreen';
import { TeacherDashboardScreen } from '@/components/screens/TeacherDashboardScreen';
import { StudentsScreen } from '@/components/screens/StudentsScreen';
import { WorkshopsScreen } from '@/components/screens/WorkshopsScreen';
import { AdminDashboardScreen } from '@/components/screens/AdminDashboardScreen';
import { IssuesScreen } from '@/components/screens/IssuesScreen';
import { IssueDetailScreen } from '@/components/screens/IssueDetailScreen';
import { CollegesScreen } from '@/components/screens/CollegesScreen';
import { CollegeDetailScreen } from '@/components/screens/CollegeDetailScreen';
import { ProfileScreen } from '@/components/screens/ProfileScreen';
import { NotificationsScreen } from '@/components/screens/NotificationsScreen';

export default function Home() {
  const { currentScreen, currentUser, themeMode } = useApp();
  const isLight = themeMode === 'light';

  // 3-Second Page Open Shining TECHNOVA Loader State
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Show 3-second shining TECHNOVA loader when page opens
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Show shining TECHNOVA loader for 3 seconds when page first opens
  if (initialLoading) {
    return <LoadingScreen message="Initialising Technova Connect 2026..." />;
  }

  // Unauthenticated Guest Guard: If user is not logged in, route to LoginScreen / SplashScreen
  if (!currentUser) {
    if (currentScreen === 'splash') return <SplashScreen />;
    if (currentScreen === 'otp') return <OtpScreen />;
    if (currentScreen === 'profile_setup') return <ProfileSetupScreen />;
    return <LoginScreen />;
  }

  // Onboarding & Fullscreen View Routing (No Bottom Nav / Header)
  if (currentScreen === 'splash') return <SplashScreen />;
  if (currentScreen === 'login') return <LoginScreen />;
  if (currentScreen === 'otp') return <OtpScreen />;
  if (currentScreen === 'profile_setup') return <ProfileSetupScreen />;

  // Main Application Shell Screens (With Header & Bottom Navigation)
  const renderMainScreen = () => {
    switch (currentScreen) {
      case 'chat_home':
        return <ChatHomeScreen />;
      case 'group_chat':
        return <GroupChatScreen />;
      case 'private_chat':
        return <PrivateChatScreen />;
      case 'group_info':
        return <GroupInfoScreen />;
      case 'search':
        return <SearchScreen />;
      case 'events':
        return <EventsScreen />;
      case 'event_detail':
        return <EventDetailScreen />;
      case 'announcement_create':
        return <AnnouncementCreateScreen />;
      case 'acknowledgement_tracker':
        return <AcknowledgementTrackerScreen />;
      case 'teacher_dashboard':
        return <TeacherDashboardScreen />;
      case 'students':
        return <StudentsScreen />;
      case 'workshops':
        return <WorkshopsScreen />;
      case 'admin_dashboard':
        return <AdminDashboardScreen />;
      case 'issues':
        return <IssuesScreen />;
      case 'issue_detail':
        return <IssueDetailScreen />;
      case 'colleges':
        return <CollegesScreen />;
      case 'college_detail':
        return <CollegeDetailScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      default:
        return <ChatHomeScreen />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-[#5DD62C] selection:text-[#0F0F0F] transition-colors duration-300 ${
      isLight ? 'bg-[#F8F9FA] text-[#0F172A]' : 'bg-[#0B0F17] text-[#F8FAFC]'
    }`}>
      {/* Header bar */}
      <Header />

      {/* Main Screen Content */}
      <main className={`flex-1 w-full max-w-md mx-auto transition-colors duration-300 ${
        isLight ? 'bg-[#F8F9FA]' : 'bg-[#0B0F17]'
      }`}>
        {renderMainScreen()}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
