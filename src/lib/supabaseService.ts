import { supabase, isSupabaseConfigured } from './supabaseClient';
import { UserProfile, College, Conversation, Message, Announcement, EventItem, Workshop, Issue } from '@/types';

// ==========================================
// COLLEGES & PROFILES
// ==========================================

export async function fetchCollegesFromSupabase(): Promise<College[] | null> {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase.from('colleges').select('*').order('name');
  if (error) {
    console.error('[Supabase Error] fetchColleges:', error.message || error);
    return null;
  }
  return data as College[];
}

export async function insertCollegeInSupabase(col: Partial<College>): Promise<College | null> {
  if (!isSupabaseConfigured()) return null;
  const payload = {
    name: col.name || 'New PU College',
    short_name: col.short_name || col.name || 'PU College',
    address: col.address || null,
    contact_name: col.contact_name || null,
    contact_phone: col.contact_phone || null,
    is_active: true
  };
  const { data, error } = await supabase.from('colleges').insert(payload).select().single();
  if (error) {
    console.error('[Supabase Error] insertCollege:', error.message || error);
    return null;
  }
  console.log('[Supabase Success] College inserted:', data);
  return data as College;
}

const isValidUUID = (str?: string | null): boolean => {
  if (!str) return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

export async function fetchProfilesFromSupabase(): Promise<UserProfile[] | null> {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase.from('profiles').select('*').order('full_name');
  if (error) {
    console.error('[Supabase Error] fetchProfiles:', error.message || error);
    return null;
  }
  return data as UserProfile[];
}

export async function upsertProfileInSupabase(profile: Partial<UserProfile>): Promise<UserProfile | null> {
  if (!isSupabaseConfigured()) return null;
  
  const validCollegeId = isValidUUID(profile.college_id) ? profile.college_id : null;
  const validId = isValidUUID(profile.id) ? profile.id : undefined;

  // Format payload to match Supabase 'profiles' table columns
  const payload: any = {
    email: profile.email || null,
    phone: profile.phone || null,
    full_name: profile.full_name || 'Technova User',
    display_name: profile.display_name || profile.full_name || 'Technova User',
    avatar_url: profile.avatar_url || null,
    role: profile.role || 'teacher',
    college_id: validCollegeId,
    college_name: profile.college_name || null,
    designation: profile.designation || null,
    bio: profile.bio || null,
    is_profile_complete: profile.is_profile_complete ?? true
  };

  if (validId) {
    payload.id = validId;
  }

  const onConflictCol = profile.email ? 'email' : (profile.phone ? 'phone' : undefined);

  const { data, error } = await supabase
    .from('profiles')
    .upsert(payload, onConflictCol ? { onConflict: onConflictCol } : undefined)
    .select()
    .single();

  if (error) {
    console.error('[Supabase Error] upsertProfile:', error.message || error);
    const insertRes = await supabase.from('profiles').insert(payload).select().single();
    if (insertRes.error) {
      console.error('[Supabase Error] insertProfile retry failed:', insertRes.error.message || insertRes.error);
      return null;
    }
    console.log('[Supabase Success] Profile inserted on retry:', insertRes.data);
    return insertRes.data as UserProfile;
  }

  console.log('[Supabase Success] Profile updated:', data);
  return data as UserProfile;
}

export const updateUserRoleInSupabase = async (userId: string, role: string): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  const { error } = await supabase.from('profiles').update({ role }).eq('id', userId);
  if (error) {
    console.error('[Supabase Error] updateUserRole:', error.message || error);
    return false;
  }
  console.log('[Supabase Success] User role updated:', userId, role);
  return true;
};

export const updateUserStatusInSupabase = async (userId: string, is_active: boolean): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  const { error } = await supabase.from('profiles').update({ is_active }).eq('id', userId);
  if (error) {
    console.error('[Supabase Error] updateUserStatus:', error.message || error);
    return false;
  }
  console.log('[Supabase Success] User status updated:', userId, is_active);
  return true;
};

// ==========================================
// CONVERSATIONS & MESSAGES
// ==========================================

export async function fetchConversationsFromSupabase(): Promise<Conversation[] | null> {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase.from('conversations').select('*').order('updated_at', { ascending: false });
  if (error) {
    console.error('[Supabase Error] fetchConversations:', error.message || error);
    return null;
  }
  return data as Conversation[];
}

export async function fetchMessagesFromSupabase(conversationId: string): Promise<Message[] | null> {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });
  if (error) {
    console.error('[Supabase Error] fetchMessages:', error.message || error);
    return null;
  }
  return data as Message[];
}

export async function insertMessageInSupabase(message: Partial<Message>): Promise<Message | null> {
  if (!isSupabaseConfigured()) return null;
  
  const payload = {
    message_type: message.message_type || 'text',
    content: message.content || '',
    attachment_url: message.attachment_url || null,
    attachment_name: message.attachment_name || null
  };

  const { data, error } = await supabase.from('messages').insert(payload).select().single();
  if (error) {
    console.error('[Supabase Error] insertMessage:', error.message || error);
    return null;
  }
  console.log('[Supabase Success] Message inserted:', data);
  return data as Message;
}

// ==========================================
// ANNOUNCEMENTS
// ==========================================

export async function fetchAnnouncementsFromSupabase(): Promise<Announcement[] | null> {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('announcements')
    .select('*, announcement_acknowledgements(*)')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('[Supabase Error] fetchAnnouncements:', error.message || error);
    return null;
  }
  return data as Announcement[];
}

export async function insertAnnouncementInSupabase(announcement: Partial<Announcement>): Promise<Announcement | null> {
  if (!isSupabaseConfigured()) return null;

  const payload = {
    title: announcement.title || 'Official Announcement',
    content: announcement.content || '',
    announcement_type: announcement.announcement_type || 'General',
    priority: announcement.priority || 'high'
  };

  const { data, error } = await supabase.from('announcements').insert(payload).select().single();
  if (error) {
    console.error('[Supabase Error] insertAnnouncement:', error.message || error);
    return null;
  }
  console.log('[Supabase Success] Announcement inserted:', data);
  return data as Announcement;
}

// ==========================================
// EVENTS & WORKSHOPS
// ==========================================

export async function fetchEventsFromSupabase(): Promise<EventItem[] | null> {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase.from('events').select('*').order('event_date', { ascending: true });
  if (error) {
    console.error('[Supabase Error] fetchEvents:', error.message || error);
    return null;
  }
  return data as EventItem[];
}

export async function fetchWorkshopsFromSupabase(): Promise<Workshop[] | null> {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase.from('workshops').select('*').order('start_time', { ascending: true });
  if (error) {
    console.error('[Supabase Error] fetchWorkshops:', error.message || error);
    return null;
  }
  return data as Workshop[];
}

// ==========================================
// ISSUES
// ==========================================

export async function fetchIssuesFromSupabase(): Promise<Issue[] | null> {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('issues')
    .select('*, issue_messages(*)')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('[Supabase Error] fetchIssues:', error.message || error);
    return null;
  }
  return data as Issue[];
}

export async function insertIssueInSupabase(issue: Partial<Issue>): Promise<Issue | null> {
  if (!isSupabaseConfigured()) return null;

  const payload = {
    type: issue.type || 'Other',
    title: issue.title || 'Reported Issue',
    description: issue.description || '',
    priority: issue.priority || 'medium',
    status: issue.status || 'Open'
  };

  const { data, error } = await supabase.from('issues').insert(payload).select().single();
  if (error) {
    console.error('[Supabase Error] insertIssue:', error.message || error);
    return null;
  }
  console.log('[Supabase Success] Issue inserted:', data);
  return data as Issue;
}

export async function updateIssueStatusInSupabase(issueId: string, status: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  const { error } = await supabase.from('issues').update({ status }).eq('id', issueId);
  if (error) {
    console.error('[Supabase Error] updateIssueStatus:', error.message || error);
    return false;
  }
  console.log('[Supabase Success] Issue status updated:', issueId, status);
  return true;
}
