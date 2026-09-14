export type UserRole = 'admin' | 'coordinator' | 'teacher';

export interface UserProfile {
  id: string;
  phone: string;
  full_name: string;
  display_name?: string;
  avatar_url?: string;
  role: UserRole;
  college_id?: string;
  college_name?: string;
  designation?: string;
  bio?: string;
  is_active: boolean;
  created_at: string;
}

export interface College {
  id: string;
  name: string;
  short_name: string;
  city?: string;
  address: string;
  contact_name: string;
  contact_phone: string;
  teachers_count: number;
  students_count: number;
  assigned_coordinator_id?: string;
  assigned_coordinator_name?: string;
  is_active: boolean;
}

export type ConversationType = 'private' | 'group' | 'event';

export interface GroupMember {
  user_id: string;
  full_name: string;
  phone: string;
  role: 'admin' | 'member';
  avatar_url?: string;
  designation?: string;
}

export interface Conversation {
  id: string;
  type: ConversationType;
  name: string;
  is_group?: boolean;
  is_online?: boolean;
  college_id?: string;
  avatar_url?: string;
  last_message?: string;
  last_message_time?: string;
  unread_count: number;
  pinned?: boolean;
  creator_id?: string;
  members?: GroupMember[];
}

export type MessageType = 'text' | 'image' | 'document' | 'voice' | 'official' | 'system';

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  sender_role: UserRole;
  message_type: MessageType;
  content: string;
  reply_to_id?: string;
  attachment_url?: string;
  attachment_name?: string;
  announcement_id?: string;
  is_acknowledged_by_me?: boolean;
  acknowledged_count?: number;
  total_recipients_count?: number;
  created_at: string;
  is_deleted?: boolean;
  reads_count?: number;
}

export type EventStatus = 'UPCOMING' | 'ONGOING' | 'COMPLETED';

export interface EventItem {
  id: string;
  name: string;
  description: string;
  event_date: string;
  start_time: string;
  end_time: string;
  venue: string;
  status: EventStatus;
  participating_colleges_count: number;
  registered_students_count: number;
}

export interface Workshop {
  id: string;
  event_id: string;
  name: string;
  description: string;
  venue: string;
  start_time: string;
  end_time: string;
  capacity: number;
  coordinator_name: string;
  coordinator_phone: string;
  participating_colleges: string[];
  status: EventStatus;
  enrolled_students: number;
}

export interface Student {
  id: string;
  college_id: string;
  college_name: string;
  name: string;
  class_name: string;
  phone: string;
  student_identifier: string;
  workshop_name: string;
  attendance_status: 'PRESENT' | 'ABSENT' | 'REGISTERED';
}

export type AnnouncementType = 'General' | 'Room change' | 'Schedule update' | 'Emergency' | 'Transport' | 'Workshop' | 'Important notice';
export type AnnouncementPriority = 'normal' | 'high' | 'urgent';

export interface Announcement {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_role: string;
  title: string;
  content: string;
  announcement_type: AnnouncementType;
  priority: AnnouncementPriority;
  target_colleges: string[]; // ['ALL'] or list of college IDs
  target_college_names: string[];
  sent_to_count: number;
  acknowledged_count: number;
  created_at: string;
  acknowledgements: {
    user_id: string;
    user_name: string;
    college_name: string;
    acknowledged_at: string;
  }[];
  pending_users: {
    user_id: string;
    user_name: string;
    college_name: string;
    phone: string;
  }[];
}

export type IssueType = 'Student missing' | 'Bus delay' | 'Room problem' | 'Workshop issue' | 'Food issue' | 'Technical issue' | 'Emergency' | 'Other';
export type IssuePriority = 'low' | 'medium' | 'high' | 'urgent';
export type IssueStatus = 'Open' | 'In progress' | 'Resolved';

export interface Issue {
  id: string;
  created_by: string;
  creator_name: string;
  creator_role: string;
  college_id: string;
  college_name: string;
  type: IssueType;
  title: string;
  description: string;
  priority: IssuePriority;
  status: IssueStatus;
  assigned_to_name?: string;
  created_at: string;
  resolved_at?: string;
  messages: {
    id: string;
    sender_id: string;
    sender_name: string;
    sender_role: string;
    message: string;
    created_at: string;
  }[];
}

export interface NotificationItem {
  id: string;
  user_id: string;
  type: 'message' | 'announcement' | 'event' | 'issue' | 'system';
  title: string;
  body: string;
  reference_type?: string;
  reference_id?: string;
  is_read: boolean;
  created_at: string;
}

export interface AuditLogItem {
  id: string;
  user_id: string;
  user_name: string;
  user_role: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  metadata?: string;
  created_at: string;
}
