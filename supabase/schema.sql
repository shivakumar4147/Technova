-- ========================================================
-- TECHNOVA CONNECT - COMPLETE SUPABASE DATABASE SCHEMA
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE,
    phone TEXT UNIQUE,
    full_name TEXT NOT NULL,
    display_name TEXT,
    avatar_url TEXT,
    role TEXT CHECK (role IN ('admin', 'coordinator', 'teacher')) NOT NULL DEFAULT 'teacher',
    college_id UUID,
    college_name TEXT,
    designation TEXT,
    bio TEXT,
    is_profile_complete BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure optional columns exist if updating an existing schema instance
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='college_name') THEN
        ALTER TABLE public.profiles ADD COLUMN college_name TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='is_profile_complete') THEN
        ALTER TABLE public.profiles ADD COLUMN is_profile_complete BOOLEAN DEFAULT false;
    END IF;
END $$;

-- 2. COLLEGES TABLE
CREATE TABLE IF NOT EXISTS public.colleges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    short_name TEXT NOT NULL,
    city TEXT,
    address TEXT,
    contact_name TEXT,
    contact_phone TEXT,
    teachers_count INTEGER DEFAULT 0,
    students_count INTEGER DEFAULT 0,
    assigned_coordinator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    assigned_coordinator_name TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Foreign Key: profiles -> colleges
ALTER TABLE public.profiles 
    ADD CONSTRAINT fk_profiles_college 
    FOREIGN KEY (college_id) REFERENCES public.colleges(id) ON DELETE SET NULL;

-- 3. COLLEGE MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.college_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    college_id UUID NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    membership_role TEXT DEFAULT 'member',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(college_id, user_id)
);

-- 4. CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT CHECK (type IN ('private', 'group', 'event')) NOT NULL DEFAULT 'private',
    name TEXT NOT NULL,
    is_group BOOLEAN DEFAULT false,
    is_online BOOLEAN DEFAULT false,
    college_id UUID REFERENCES public.colleges(id) ON DELETE CASCADE,
    avatar_url TEXT,
    last_message TEXT,
    last_message_time TEXT,
    unread_count INTEGER DEFAULT 0,
    pinned BOOLEAN DEFAULT false,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. CONVERSATION MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.conversation_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('admin', 'member')) DEFAULT 'member',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_read_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    is_muted BOOLEAN DEFAULT false,
    UNIQUE(conversation_id, user_id)
);

-- 6. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    sender_name TEXT,
    sender_avatar TEXT,
    sender_role TEXT DEFAULT 'teacher',
    message_type TEXT CHECK (message_type IN ('text', 'image', 'document', 'voice', 'official', 'system')) NOT NULL DEFAULT 'text',
    content TEXT,
    reply_to_id UUID REFERENCES public.messages(id) ON DELETE SET NULL,
    attachment_url TEXT,
    attachment_name TEXT,
    announcement_id UUID,
    is_acknowledged_by_me BOOLEAN DEFAULT false,
    acknowledged_count INTEGER DEFAULT 0,
    total_recipients_count INTEGER DEFAULT 0,
    is_deleted BOOLEAN DEFAULT false,
    reads_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. MESSAGE READS TABLE
CREATE TABLE IF NOT EXISTS public.message_reads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    message_id UUID NOT NULL REFERENCES public.messages(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    read_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(message_id, user_id)
);

-- 8. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    venue TEXT NOT NULL,
    status TEXT CHECK (status IN ('UPCOMING', 'ONGOING', 'COMPLETED')) DEFAULT 'UPCOMING',
    participating_colleges_count INTEGER DEFAULT 0,
    registered_students_count INTEGER DEFAULT 0,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. WORKSHOPS TABLE
CREATE TABLE IF NOT EXISTS public.workshops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    venue TEXT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    capacity INTEGER DEFAULT 60,
    coordinator_name TEXT,
    coordinator_phone TEXT,
    coordinator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    participating_colleges TEXT[] DEFAULT ARRAY[]::TEXT[],
    status TEXT CHECK (status IN ('UPCOMING', 'ONGOING', 'COMPLETED')) DEFAULT 'UPCOMING',
    enrolled_students INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. WORKSHOP COLLEGES TABLE
CREATE TABLE IF NOT EXISTS public.workshop_colleges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workshop_id UUID NOT NULL REFERENCES public.workshops(id) ON DELETE CASCADE,
    college_id UUID NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
    UNIQUE(workshop_id, college_id)
);

-- 11. STUDENTS TABLE
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    college_id UUID REFERENCES public.colleges(id) ON DELETE CASCADE,
    college_name TEXT,
    name TEXT NOT NULL,
    class_name TEXT NOT NULL,
    phone TEXT,
    student_identifier TEXT UNIQUE NOT NULL,
    workshop_name TEXT,
    attendance_status TEXT CHECK (attendance_status IN ('REGISTERED', 'PRESENT', 'ABSENT')) DEFAULT 'REGISTERED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. WORKSHOP REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS public.workshop_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workshop_id UUID NOT NULL REFERENCES public.workshops(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('REGISTERED', 'PRESENT', 'ABSENT')) DEFAULT 'REGISTERED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(workshop_id, student_id)
);

-- 13. ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    sender_name TEXT,
    sender_role TEXT DEFAULT 'coordinator',
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    announcement_type TEXT CHECK (announcement_type IN ('General', 'Room change', 'Schedule update', 'Emergency', 'Transport', 'Workshop', 'Important notice')) NOT NULL DEFAULT 'General',
    priority TEXT CHECK (priority IN ('normal', 'high', 'urgent')) DEFAULT 'normal',
    target_colleges TEXT[] DEFAULT ARRAY['ALL']::TEXT[],
    target_college_names TEXT[] DEFAULT ARRAY['All Colleges']::TEXT[],
    sent_to_count INTEGER DEFAULT 0,
    acknowledged_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 14. ANNOUNCEMENT ACKNOWLEDGEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.announcement_acknowledgements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    announcement_id UUID NOT NULL REFERENCES public.announcements(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    user_name TEXT,
    college_name TEXT,
    acknowledged_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(announcement_id, user_id)
);

-- 15. ISSUES TABLE
CREATE TABLE IF NOT EXISTS public.issues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    creator_name TEXT,
    creator_role TEXT DEFAULT 'teacher',
    college_id UUID REFERENCES public.colleges(id) ON DELETE CASCADE,
    college_name TEXT,
    type TEXT CHECK (type IN ('Student missing', 'Bus delay', 'Room problem', 'Workshop issue', 'Food issue', 'Technical issue', 'Emergency', 'Other')) NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
    status TEXT CHECK (status IN ('Open', 'In progress', 'Resolved')) DEFAULT 'Open',
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    assigned_to_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- 16. ISSUE MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.issue_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    issue_id UUID NOT NULL REFERENCES public.issues(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    sender_name TEXT,
    sender_role TEXT DEFAULT 'teacher',
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 17. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('message', 'announcement', 'event', 'issue', 'system')) NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    reference_type TEXT,
    reference_id UUID,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 18. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    user_name TEXT,
    user_role TEXT,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    metadata TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcement_acknowledgements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;

-- Permissive Policies for Web Application Operations
CREATE POLICY "Profiles select policy" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Profiles insert policy" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Profiles update policy" ON public.profiles FOR UPDATE USING (true);

CREATE POLICY "Colleges select policy" ON public.colleges FOR SELECT USING (true);
CREATE POLICY "Colleges insert policy" ON public.colleges FOR INSERT WITH CHECK (true);

CREATE POLICY "Conversations select policy" ON public.conversations FOR SELECT USING (true);
CREATE POLICY "Conversations insert policy" ON public.conversations FOR INSERT WITH CHECK (true);

CREATE POLICY "Messages select policy" ON public.messages FOR SELECT USING (true);
CREATE POLICY "Messages insert policy" ON public.messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Announcements select policy" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Announcements insert policy" ON public.announcements FOR INSERT WITH CHECK (true);

CREATE POLICY "Issues select policy" ON public.issues FOR SELECT USING (true);
CREATE POLICY "Issues insert policy" ON public.issues FOR INSERT WITH CHECK (true);
CREATE POLICY "Issues update policy" ON public.issues FOR UPDATE USING (true);
