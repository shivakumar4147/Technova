'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Header } from '@/components/navigation/Header';
import { BottomNav } from '@/components/navigation/BottomNav';

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
  const { currentScreen } = useApp();

  // Onboarding & Fullscreen View Routing (No Bottom Nav / Header)
  if (currentScreen === 'splash') return <SplashScreen />;
  if (currentScreen === 'login') return <LoginScreen />;
  if (currentScreen === 'otp') return <OtpScreen />;
  if (currentScreen === 'profile_setup') return <ProfileSetupScreen />;
  if (currentScreen === 'group_chat') return <GroupChatScreen />;
  if (currentScreen === 'private_chat') return <PrivateChatScreen />;

  // Main Application Shell Screens (With Header & Bottom Navigation)
  const renderMainScreen = () => {
    switch (currentScreen) {
      case 'chat_home':
        return <ChatHomeScreen />;
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
    <div className="min-h-screen bg-[#F8F8F8] text-[#0F0F0F] flex flex-col font-sans selection:bg-[#5DD62C] selection:text-[#0F0F0F]">
      {/* Header bar */}
      <Header />

      {/* Main Screen Content */}
      <main className="flex-1 w-full max-w-md mx-auto bg-[#F8F8F8]">
        {renderMainScreen()}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
