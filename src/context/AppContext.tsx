'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile, College, Conversation, Message, EventItem, Workshop, Student,
  Announcement, Issue, NotificationItem, AuditLogItem, UserRole, MessageType, GroupMember
} from '@/types';
import {
  INITIAL_COLLEGES, INITIAL_PROFILES, INITIAL_CONVERSATIONS, INITIAL_MESSAGES,
  INITIAL_ANNOUNCEMENTS, INITIAL_EVENTS, INITIAL_WORKSHOPS, INITIAL_STUDENTS,
  INITIAL_ISSUES, INITIAL_NOTIFICATIONS, INITIAL_AUDIT_LOGS
} from '@/lib/mockData';

interface AppContextType {
  currentUser: UserProfile | null;
  currentScreen: string;
  screenParams: any;
  colleges: College[];
  profiles: UserProfile[];
  conversations: Conversation[];
  activeConversationId: string;
  messages: Record<string, Message[]>;
  announcements: Announcement[];
  events: EventItem[];
  workshops: Workshop[];
  students: Student[];
  issues: Issue[];
  notifications: NotificationItem[];
  auditLogs: AuditLogItem[];
  pendingPhone: string;
  
  // Navigation & User
  navigateTo: (screen: string, params?: any) => void;
  setCurrentUser: (user: UserProfile | null) => void;
  switchUserRole: (userId: string) => void;
  loginWithPhone: (phone: string) => boolean;
  verifyOtp: (code: string) => boolean;
  completeProfile: (details: Partial<UserProfile>) => void;
  logout: () => void;

  // Messaging & Announcements
  setActiveConversationId: (id: string) => void;
  sendMessage: (conversationId: string, content: string, messageType?: MessageType, attachmentUrl?: string, attachmentName?: string, announcementId?: string) => void;
  createAnnouncement: (announcement: Partial<Announcement>) => void;
  acknowledgeAnnouncement: (announcementId: string) => void;
  sendAnnouncementReminder: (announcementId: string) => void;

  // Issues & Students
  raiseIssue: (issue: Partial<Issue>) => void;
  addIssueMessage: (issueId: string, message: string) => void;
  updateIssueStatus: (issueId: string, status: Issue['status']) => void;
  updateStudentAttendance: (studentId: string, status: Student['attendance_status']) => void;

  // Notifications & Admin CRUD
  markNotificationRead: (id: string) => void;
  createGroupConversation: (name: string, memberPhones: string[]) => void;
  toggleGroupAdminRole: (conversationId: string, targetUserId: string) => void;
  createCollege: (college: Partial<College>) => void;
  updateCollege: (id: string, college: Partial<College>) => void;
  assignCoordinator: (collegeId: string, coordinatorId: string, coordinatorName: string) => void;
  createUser: (user: Partial<UserProfile>) => void;
  createEvent: (evt: Partial<EventItem>) => void;
  createWorkshop: (wk: Partial<Workshop>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(INITIAL_PROFILES[3]); // Default Teacher (Ramesh Bhat)
  const [currentScreen, setCurrentScreen] = useState<string>('chat_home');
  const [screenParams, setScreenParams] = useState<any>({});
  const [pendingPhone, setPendingPhone] = useState<string>('+919800011122');
  
  const [colleges, setColleges] = useState<College[]>(INITIAL_COLLEGES);
  const [profiles, setProfiles] = useState<UserProfile[]>(INITIAL_PROFILES);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string>('conv-group-1');
  const [messages, setMessages] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [workshops, setWorkshops] = useState<Workshop[]>(INITIAL_WORKSHOPS);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [issues, setIssues] = useState<Issue[]>(INITIAL_ISSUES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);

  const navigateTo = (screen: string, params?: any) => {
    setCurrentScreen(screen);
    if (params) setScreenParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchUserRole = (userId: string) => {
    const target = profiles.find(p => p.id === userId);
    if (target) {
      setCurrentUser(target);
      // Navigate to suitable screen depending on role
      if (target.role === 'admin') navigateTo('admin_panel');
      else if (target.role === 'coordinator') navigateTo('chat_home');
      else navigateTo('chat_home');
    }
  };

  const loginWithPhone = (phone: string): boolean => {
    setPendingPhone(phone);
    const existing = profiles.find(p => p.phone.replace(/\s+/g, '') === phone.replace(/\s+/g, ''));
    return !!existing;
  };

  const verifyOtp = (code: string): boolean => {
    if (code.length === 6) {
      const existing = profiles.find(p => p.phone.replace(/\s+/g, '') === pendingPhone.replace(/\s+/g, ''));
      if (existing) {
        setCurrentUser(existing);
        if (existing.role === 'teacher') navigateTo('teacher_dashboard');
        else if (existing.role === 'coordinator') navigateTo('chat_home');
        else navigateTo('admin_panel');
      } else {
        // New user profile setup required
        navigateTo('profile_setup');
      }
      return true;
    }
    return false;
  };

  const completeProfile = (details: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      phone: pendingPhone,
      full_name: details.full_name || 'Technova Participant',
      display_name: details.display_name || details.full_name,
      avatar_url: details.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: 'teacher', // Assigned as teacher by default, elevation by Admin
      college_id: details.college_id || 'col-1',
      college_name: details.college_name || 'St. Aloysius PU College',
      designation: details.designation || 'Faculty Member',
      bio: details.bio || 'Technova 2026 faculty delegate.',
      is_active: true,
      created_at: new Date().toISOString()
    };

    setProfiles(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    navigateTo('chat_home');
  };

  const logout = () => {
    setCurrentUser(null);
    navigateTo('login');
  };

  const sendMessage = (
    conversationId: string,
    content: string,
    messageType: MessageType = 'text',
    attachmentUrl?: string,
    attachmentName?: string,
    announcementId?: string
  ) => {
    if (!currentUser) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversation_id: conversationId,
      sender_id: currentUser.id,
      sender_name: currentUser.display_name || currentUser.full_name,
      sender_avatar: currentUser.avatar_url,
      sender_role: currentUser.role,
      message_type: messageType,
      content,
      attachment_url: attachmentUrl,
      attachment_name: attachmentName,
      announcement_id: announcementId,
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg]
    }));

    // Update conversation preview
    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          last_message: content,
          last_message_time: 'Just now'
        };
      }
      return c;
    }));
  };

  const createAnnouncement = (ann: Partial<Announcement>) => {
    if (!currentUser) return;
    const newAnnId = `ann-${Date.now()}`;
    const newAnnouncement: Announcement = {
      id: newAnnId,
      sender_id: currentUser.id,
      sender_name: currentUser.full_name,
      sender_role: currentUser.designation || 'Technova Coordinator',
      title: ann.title || 'Official Announcement',
      content: ann.content || '',
      announcement_type: ann.announcement_type || 'General',
      priority: ann.priority || 'high',
      target_colleges: ann.target_colleges || ['ALL'],
      target_college_names: ann.target_college_names || ['All Colleges'],
      sent_to_count: 8,
      acknowledged_count: 0,
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      acknowledgements: [],
      pending_users: profiles.filter(p => p.role === 'teacher').map(p => ({
        user_id: p.id,
        user_name: p.full_name,
        college_name: p.college_name || 'PU College',
        phone: p.phone
      }))
    };

    setAnnouncements(prev => [newAnnouncement, ...prev]);

    // Send official announcement into the main group chat
    sendMessage('conv-group-1', ann.content || '', 'official', undefined, undefined, newAnnId);

    // Record audit log
    const audit: AuditLogItem = {
      id: `aud-${Date.now()}`,
      user_id: currentUser.id,
      user_name: currentUser.full_name,
      user_role: currentUser.role,
      action: 'Created Announcement',
      entity_type: 'Announcement',
      entity_id: newAnnId,
      metadata: ann.title,
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setAuditLogs(prev => [audit, ...prev]);
  };

  const acknowledgeAnnouncement = (announcementId: string) => {
    if (!currentUser) return;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setAnnouncements(prev => prev.map(a => {
      if (a.id === announcementId) {
        const alreadyAcked = a.acknowledgements.some(ack => ack.user_id === currentUser.id);
        if (alreadyAcked) return a;

        const newAck = {
          user_id: currentUser.id,
          user_name: currentUser.full_name,
          college_name: currentUser.college_name || 'PU College',
          acknowledged_at: nowStr
        };

        return {
          ...a,
          acknowledged_count: a.acknowledged_count + 1,
          acknowledgements: [newAck, ...a.acknowledgements],
          pending_users: a.pending_users.filter(u => u.user_id !== currentUser.id)
        };
      }
      return a;
    }));

    // Update message state in group chat
    setMessages(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(convId => {
        updated[convId] = updated[convId].map(m => {
          if (m.announcement_id === announcementId) {
            return {
              ...m,
              is_acknowledged_by_me: true,
              acknowledged_count: (m.acknowledged_count || 0) + 1
            };
          }
          return m;
        });
      });
      return updated;
    });

    // Add audit log
    const audit: AuditLogItem = {
      id: `aud-${Date.now()}`,
      user_id: currentUser.id,
      user_name: currentUser.full_name,
      user_role: currentUser.role,
      action: 'Acknowledged Announcement',
      entity_type: 'Announcement',
      entity_id: announcementId,
      created_at: nowStr
    };
    setAuditLogs(prev => [audit, ...prev]);
  };

  const sendAnnouncementReminder = (announcementId: string) => {
    const ann = announcements.find(a => a.id === announcementId);
    if (!ann || ann.pending_users.length === 0) return;

    // Send notifications to pending teachers
    const newNotifs: NotificationItem[] = ann.pending_users.map(u => ({
      id: `notif-${Date.now()}-${u.user_id}`,
      user_id: u.user_id,
      type: 'announcement',
      title: 'REMINDER: Pending Announcement Acknowledgement',
      body: `Please acknowledge official update: "${ann.title}"`,
      reference_type: 'announcement',
      reference_id: announcementId,
      is_read: false,
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    setNotifications(prev => [...newNotifs, ...prev]);

    if (currentUser) {
      const audit: AuditLogItem = {
        id: `aud-${Date.now()}`,
        user_id: currentUser.id,
        user_name: currentUser.full_name,
        user_role: currentUser.role,
        action: 'Sent Acknowledgement Reminder',
        entity_type: 'Announcement',
        entity_id: announcementId,
        metadata: `Reminded ${ann.pending_users.length} pending teachers`,
        created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setAuditLogs(prev => [audit, ...prev]);
    }
  };

  const raiseIssue = (iss: Partial<Issue>) => {
    if (!currentUser) return;
    const newIssue: Issue = {
      id: `iss-${Date.now()}`,
      created_by: currentUser.id,
      creator_name: currentUser.full_name,
      creator_role: `Teacher (${currentUser.college_name || 'PU College'})`,
      college_id: currentUser.college_id || 'col-1',
      college_name: currentUser.college_name || 'St. Aloysius PU College',
      type: iss.type || 'Other',
      title: iss.title || 'Reported Issue',
      description: iss.description || '',
      priority: iss.priority || 'medium',
      status: 'Open',
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messages: [
        {
          id: `im-${Date.now()}`,
          sender_id: currentUser.id,
          sender_name: currentUser.full_name,
          sender_role: currentUser.role,
          message: iss.description || '',
          created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    setIssues(prev => [newIssue, ...prev]);

    // Audit log
    const audit: AuditLogItem = {
      id: `aud-${Date.now()}`,
      user_id: currentUser.id,
      user_name: currentUser.full_name,
      user_role: currentUser.role,
      action: 'Raised Issue',
      entity_type: 'Issue',
      entity_id: newIssue.id,
      metadata: `${iss.type}: ${iss.title}`,
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setAuditLogs(prev => [audit, ...prev]);
  };

  const addIssueMessage = (issueId: string, messageText: string) => {
    if (!currentUser) return;
    const newMsg = {
      id: `im-${Date.now()}`,
      sender_id: currentUser.id,
      sender_name: currentUser.full_name,
      sender_role: currentUser.role,
      message: messageText,
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setIssues(prev => prev.map(iss => {
      if (iss.id === issueId) {
        return {
          ...iss,
          messages: [...iss.messages, newMsg]
        };
      }
      return iss;
    }));
  };

  const updateIssueStatus = (issueId: string, status: Issue['status']) => {
    setIssues(prev => prev.map(iss => {
      if (iss.id === issueId) {
        return {
          ...iss,
          status,
          assigned_to_name: currentUser?.full_name,
          resolved_at: status === 'Resolved' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined
        };
      }
      return iss;
    }));
  };

  const updateStudentAttendance = (studentId: string, status: Student['attendance_status']) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, attendance_status: status } : s));
  };

  const createGroupConversation = (name: string, memberPhones: string[]) => {
    const newConvId = `conv-group-${Date.now()}`;
    
    // 1. Creator (currentUser) is the admin
    const groupMembers: GroupMember[] = [];
    if (currentUser) {
      groupMembers.push({
        user_id: currentUser.id,
        full_name: currentUser.full_name,
        phone: currentUser.phone,
        role: 'admin',
        avatar_url: currentUser.avatar_url,
        designation: currentUser.designation || 'Group Admin'
      });
    }

    // 2. Add ONLY the selected member phones
    memberPhones.forEach(phone => {
      const existingProfile = profiles.find(p => p.phone.replace(/\s+/g, '') === phone.replace(/\s+/g, ''));
      if (existingProfile) {
        if (!groupMembers.some(m => m.user_id === existingProfile.id)) {
          groupMembers.push({
            user_id: existingProfile.id,
            full_name: existingProfile.full_name,
            phone: existingProfile.phone,
            role: 'member',
            avatar_url: existingProfile.avatar_url,
            designation: existingProfile.designation || 'Faculty Member'
          });
        }
      } else {
        groupMembers.push({
          user_id: `user-phone-${Date.now()}-${Math.random()}`,
          full_name: `Participant (${phone})`,
          phone: phone,
          role: 'member',
          avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          designation: 'Member'
        });
      }
    });

    const newGroupConv: Conversation = {
      id: newConvId,
      type: 'group',
      is_group: true,
      name,
      last_message: `Group "${name}" created with ${groupMembers.length} members`,
      last_message_time: 'Just now',
      unread_count: 0,
      creator_id: currentUser?.id,
      members: groupMembers
    };

    setConversations(prev => [newGroupConv, ...prev]);

    setMessages(prev => ({
      ...prev,
      [newConvId]: [
        {
          id: `msg-${Date.now()}`,
          conversation_id: newConvId,
          sender_id: 'system',
          sender_name: 'Technova System',
          sender_role: 'admin',
          message_type: 'system',
          content: `Group "${name}" created with ${groupMembers.length} members.`,
          created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    }));

    setActiveConversationId(newConvId);
    navigateTo('group_chat');
  };

  const toggleGroupAdminRole = (conversationId: string, targetUserId: string) => {
    setConversations(prev => prev.map(c => {
      if (c.id === conversationId && c.members) {
        const updatedMembers = c.members.map(m => {
          if (m.user_id === targetUserId) {
            return {
              ...m,
              role: (m.role === 'admin' ? 'member' : 'admin') as 'admin' | 'member'
            };
          }
          return m;
        });
        return { ...c, members: updatedMembers };
      }
      return c;
    }));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const createCollege = (col: Partial<College>) => {
    const newColId = `col-${Date.now()}`;
    const newCol: College = {
      id: newColId,
      name: col.name || 'New PU College',
      short_name: col.short_name || 'PU College',
      city: col.city || 'Mangaluru',
      address: col.address || 'Mangaluru',
      contact_name: col.contact_name || 'Principal',
      contact_phone: col.contact_phone || '+91 9800000000',
      teachers_count: 0,
      students_count: 0,
      is_active: true
    };
    setColleges(prev => [...prev, newCol]);

    // Automatically create college group conversation (Milestone 4 & 6 requirement)
    const newGroupConv: Conversation = {
      id: `conv-group-${Date.now()}`,
      type: 'group',
      is_group: true,
      name: newCol.name,
      college_id: newColId,
      last_message: 'College group initialized for Technova 2026',
      last_message_time: 'Just now',
      unread_count: 0
    };
    setConversations(prev => [newGroupConv, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newGroupConv.id]: [
        {
          id: `msg-${Date.now()}`,
          conversation_id: newGroupConv.id,
          sender_id: 'system',
          sender_name: 'Technova System',
          sender_role: 'admin',
          message_type: 'system',
          content: `Official conversation group created for ${newCol.name}.`,
          created_at: 'Just now'
        }
      ]
    }));
  };

  const updateCollege = (id: string, col: Partial<College>) => {
    setColleges(prev => prev.map(c => c.id === id ? { ...c, ...col } : c));
  };

  const assignCoordinator = (collegeId: string, coordinatorId: string, coordinatorName: string) => {
    setColleges(prev => prev.map(c => {
      if (c.id === collegeId) {
        return {
          ...c,
          assigned_coordinator_id: coordinatorId,
          assigned_coordinator_name: coordinatorName
        };
      }
      return c;
    }));
  };

  const createUser = (user: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      phone: user.phone || '+919900000000',
      full_name: user.full_name || 'New User',
      display_name: user.display_name || user.full_name,
      avatar_url: user.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: user.role || 'teacher',
      college_id: user.college_id,
      college_name: user.college_name,
      designation: user.designation || 'Participant',
      is_active: true,
      created_at: new Date().toISOString()
    };
    setProfiles(prev => [...prev, newUser]);
  };

  const createEvent = (evt: Partial<EventItem>) => {
    const newEvt: EventItem = {
      id: `evt-${Date.now()}`,
      name: evt.name || 'New Technova Event',
      description: evt.description || '',
      event_date: evt.event_date || '2026-09-15',
      start_time: evt.start_time || '09:00 AM',
      end_time: evt.end_time || '05:00 PM',
      venue: evt.venue || 'Main Campus',
      status: 'UPCOMING',
      participating_colleges_count: 0,
      registered_students_count: 0
    };
    setEvents(prev => [...prev, newEvt]);
  };

  const createWorkshop = (wk: Partial<Workshop>) => {
    const newWk: Workshop = {
      id: `wk-${Date.now()}`,
      event_id: wk.event_id || 'evt-1',
      name: wk.name || 'New Technical Workshop',
      description: wk.description || '',
      venue: wk.venue || 'Lab 1',
      start_time: wk.start_time || '10:00 AM',
      end_time: wk.end_time || '12:00 PM',
      capacity: wk.capacity || 50,
      coordinator_name: wk.coordinator_name || 'Prof. Rajesh Sharma',
      coordinator_phone: wk.coordinator_phone || '+91 9811122233',
      participating_colleges: wk.participating_colleges || [],
      status: 'UPCOMING',
      enrolled_students: 0
    };
    setWorkshops(prev => [...prev, newWk]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentScreen,
        screenParams,
        colleges,
        profiles,
        conversations,
        activeConversationId,
        messages,
        announcements,
        events,
        workshops,
        students,
        issues,
        notifications,
        auditLogs,
        pendingPhone,
        navigateTo,
        setCurrentUser,
        switchUserRole,
        loginWithPhone,
        verifyOtp,
        completeProfile,
        logout,
        setActiveConversationId,
        sendMessage,
        createAnnouncement,
        acknowledgeAnnouncement,
        sendAnnouncementReminder,
        raiseIssue,
        addIssueMessage,
        updateIssueStatus,
        updateStudentAttendance,
        markNotificationRead,
        createGroupConversation,
        toggleGroupAdminRole,
        createCollege,
        updateCollege,
        assignCoordinator,
        createUser,
        createEvent,
        createWorkshop,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
