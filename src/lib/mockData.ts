import { College, UserProfile, Conversation, Message, EventItem, Workshop, Student, Announcement, Issue, NotificationItem, AuditLogItem } from '@/types';

export const INITIAL_COLLEGES: College[] = [
  {
    id: 'col-1',
    name: 'St. Aloysius PU College',
    short_name: 'St. Aloysius',
    address: 'Light House Hill Road, Mangaluru',
    contact_name: 'Fr. Melwyn Pinto',
    contact_phone: '+91 824 2449700',
    teachers_count: 4,
    students_count: 72,
    is_active: true
  },
  {
    id: 'col-2',
    name: 'Canara PU College',
    short_name: 'Canara PU',
    address: 'MG Road, Kodialbail, Mangaluru',
    contact_name: 'Prof. M. V. Prabhu',
    contact_phone: '+91 824 2492366',
    teachers_count: 3,
    students_count: 58,
    is_active: true
  },
  {
    id: 'col-3',
    name: 'Sharada PU College',
    short_name: 'Sharada PU',
    address: 'Kodialbail, Mangaluru',
    contact_name: 'Dr. Leela Upadhyaya',
    contact_phone: '+91 824 2493388',
    teachers_count: 5,
    students_count: 85,
    is_active: true
  },
  {
    id: 'col-4',
    name: 'Expert PU College',
    short_name: 'Expert PU',
    address: 'Valachil Campus, Mangaluru',
    contact_name: 'Prof. Narendra Nayak',
    contact_phone: '+91 824 2253456',
    teachers_count: 6,
    students_count: 94,
    is_active: true
  }
];

export const INITIAL_PROFILES: UserProfile[] = [
  {
    id: 'user-admin',
    phone: '+919876543210',
    full_name: 'Dr. Vikram Hegde',
    display_name: 'Dr. Vikram (Admin)',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    designation: 'Technova Convener & Chief Admin',
    bio: 'Overseeing overall Technova 2026 operations and PU college coordination.',
    is_active: true,
    created_at: '2026-09-01T08:00:00Z'
  },
  {
    id: 'user-coord-1',
    phone: '+919811122233',
    full_name: 'Prof. Rajesh Sharma',
    display_name: 'Rajesh (Coordinator)',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'coordinator',
    designation: 'Senior Technova Event Lead',
    bio: 'Lead Coordinator for St. Aloysius & Canara PU College streams.',
    is_active: true,
    created_at: '2026-09-02T09:00:00Z'
  },
  {
    id: 'user-coord-2',
    phone: '+919844455566',
    full_name: 'Ananya Rao',
    display_name: 'Ananya (Coordinator)',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'coordinator',
    designation: 'Workshop & Logistics Coordinator',
    bio: 'Managing venue changes, scheduling & food logistics.',
    is_active: true,
    created_at: '2026-09-02T10:00:00Z'
  },
  {
    id: 'user-teacher-1',
    phone: '+919800011122',
    full_name: 'Ramesh Bhat',
    display_name: 'Ramesh Bhat',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'teacher',
    college_id: 'col-1',
    college_name: 'St. Aloysius PU College',
    designation: 'Senior CS Lecturer',
    bio: 'Accompanying 72 students from St. Aloysius PU College.',
    is_active: true,
    created_at: '2026-09-03T11:00:00Z'
  },
  {
    id: 'user-teacher-2',
    phone: '+919800033344',
    full_name: 'Priya Nair',
    display_name: 'Priya Nair',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'teacher',
    college_id: 'col-2',
    college_name: 'Canara PU College',
    designation: 'Physics Faculty Lead',
    bio: 'Managing Canara PU College student delegations.',
    is_active: true,
    created_at: '2026-09-03T11:30:00Z'
  },
  {
    id: 'user-teacher-3',
    phone: '+919800055566',
    full_name: 'Anitha Shetty',
    display_name: 'Anitha Shetty',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'teacher',
    college_id: 'col-3',
    college_name: 'Sharada PU College',
    designation: 'Maths Department Head',
    bio: 'Lead teacher for Sharada PU College robotics contingent.',
    is_active: true,
    created_at: '2026-09-03T12:00:00Z'
  },
  {
    id: 'user-teacher-4',
    phone: '+919800077788',
    full_name: 'Kumar Swamy',
    display_name: 'Kumar Swamy',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    role: 'teacher',
    college_id: 'col-4',
    college_name: 'Expert PU College',
    designation: 'Electronics Faculty',
    bio: 'In charge of Expert PU College tech teams.',
    is_active: true,
    created_at: '2026-09-03T12:30:00Z'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-group-1',
    type: 'group',
    name: 'St. Aloysius PU College',
    college_id: 'col-1',
    avatar_url: '🏫',
    last_message: '📢 OFFICIAL UPDATE: Cybersecurity Workshop moved from Room 204 to Lab 2.',
    last_message_time: '10:32 AM',
    unread_count: 2,
    pinned: true
  },
  {
    id: 'conv-group-2',
    type: 'group',
    name: 'Canara PU College Contingent',
    college_id: 'col-2',
    avatar_url: '🏛️',
    last_message: 'All 58 students have arrived safely at the Main Auditorium.',
    last_message_time: '10:15 AM',
    unread_count: 0,
    pinned: true
  },
  {
    id: 'conv-group-3',
    type: 'group',
    name: 'Sharada PU College Group',
    college_id: 'col-3',
    avatar_url: '📚',
    last_message: 'Lunch tokens distributed for Sharada students in Block B.',
    last_message_time: '09:45 AM',
    unread_count: 1
  },
  {
    id: 'conv-private-1',
    type: 'private',
    name: 'Prof. Rajesh Sharma (Coordinator)',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    last_message: 'Hi Ramesh, please acknowledge the room change notice when free.',
    last_message_time: '10:35 AM',
    unread_count: 1
  },
  {
    id: 'conv-private-2',
    type: 'private',
    name: 'Ananya Rao (Coordinator)',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    last_message: 'Bus schedule confirmed for 4:30 PM departure.',
    last_message_time: 'Yesterday',
    unread_count: 0
  }
];

export const INITIAL_MESSAGES: Record<string, Message[]> = {
  'conv-group-1': [
    {
      id: 'msg-1',
      conversation_id: 'conv-group-1',
      sender_id: 'user-coord-1',
      sender_name: 'Prof. Rajesh Sharma',
      sender_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      sender_role: 'coordinator',
      message_type: 'system',
      content: 'Prof. Rajesh Sharma added Ramesh Bhat to St. Aloysius PU College group.',
      created_at: '09:00 AM'
    },
    {
      id: 'msg-2',
      conversation_id: 'conv-group-1',
      sender_id: 'user-teacher-1',
      sender_name: 'Ramesh Bhat',
      sender_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      sender_role: 'teacher',
      message_type: 'text',
      content: 'Good morning team! We have arrived at the Technova campus with 72 students.',
      created_at: '09:15 AM'
    },
    {
      id: 'msg-3',
      conversation_id: 'conv-group-1',
      sender_id: 'user-coord-1',
      sender_name: 'Prof. Rajesh Sharma',
      sender_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      sender_role: 'coordinator',
      message_type: 'text',
      content: 'Welcome St. Aloysius team! Please direct students to Hall 1 for breakfast and registration.',
      created_at: '09:20 AM'
    },
    {
      id: 'msg-4',
      conversation_id: 'conv-group-1',
      sender_id: 'user-coord-1',
      sender_name: 'Prof. Rajesh Sharma',
      sender_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      sender_role: 'coordinator',
      message_type: 'official',
      content: 'Cybersecurity Workshop has moved from Room 204 to Lab 2 due to higher lab capacity requirements.',
      announcement_id: 'ann-1',
      is_acknowledged_by_me: false,
      acknowledged_count: 7,
      total_recipients_count: 8,
      created_at: '10:32 AM'
    },
    {
      id: 'msg-5',
      conversation_id: 'conv-group-1',
      sender_id: 'user-teacher-1',
      sender_name: 'Ramesh Bhat',
      sender_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      sender_role: 'teacher',
      message_type: 'text',
      content: 'Okay, received. Informing our computer science student batch right now.',
      created_at: '10:33 AM'
    }
  ],
  'conv-private-1': [
    {
      id: 'msg-p1',
      conversation_id: 'conv-private-1',
      sender_id: 'user-teacher-1',
      sender_name: 'Ramesh Bhat',
      sender_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      sender_role: 'teacher',
      message_type: 'text',
      content: 'Hello Prof. Rajesh, one of our students is asking if food coupons cover dietary restrictions.',
      created_at: '10:25 AM'
    },
    {
      id: 'msg-p2',
      conversation_id: 'conv-private-1',
      sender_id: 'user-coord-1',
      sender_name: 'Prof. Rajesh Sharma',
      sender_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      sender_role: 'coordinator',
      message_type: 'text',
      content: 'Yes! Counter 3 at the cafeteria serves pure Jain and vegetarian options.',
      created_at: '10:28 AM'
    },
    {
      id: 'msg-p3',
      conversation_id: 'conv-private-1',
      sender_id: 'user-coord-1',
      sender_name: 'Prof. Rajesh Sharma',
      sender_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      sender_role: 'coordinator',
      message_type: 'text',
      content: 'Hi Ramesh, please acknowledge the room change notice when free.',
      created_at: '10:35 AM'
    }
  ]
};

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    sender_id: 'user-coord-1',
    sender_name: 'Prof. Rajesh Sharma',
    sender_role: 'Technova Lead Coordinator',
    title: 'Cybersecurity Workshop Venue Shift',
    content: 'Cybersecurity Workshop has moved from Room 204 to Lab 2 on 2nd Floor (Main Tech Block). Please guide all registered students.',
    announcement_type: 'Room change',
    priority: 'high',
    target_colleges: ['col-1', 'col-2', 'col-3', 'col-4'],
    target_college_names: ['St. Aloysius', 'Canara PU', 'Sharada PU', 'Expert PU'],
    sent_to_count: 8,
    acknowledged_count: 7,
    created_at: '10:32 AM',
    acknowledgements: [
      { user_id: 'user-teacher-2', user_name: 'Priya Nair', college_name: 'Canara PU College', acknowledged_at: '10:33 AM' },
      { user_id: 'user-teacher-3', user_name: 'Anitha Shetty', college_name: 'Sharada PU College', acknowledged_at: '10:34 AM' },
      { user_id: 'user-admin', user_name: 'Dr. Vikram Hegde', college_name: 'Technova Central', acknowledged_at: '10:35 AM' },
      { user_id: 'user-coord-2', user_name: 'Ananya Rao', college_name: 'Technova Central', acknowledged_at: '10:36 AM' }
    ],
    pending_users: [
      { user_id: 'user-teacher-1', user_name: 'Ramesh Bhat', college_name: 'St. Aloysius PU College', phone: '+919800011122' }
    ]
  },
  {
    id: 'ann-2',
    sender_id: 'user-coord-2',
    sender_name: 'Ananya Rao',
    sender_role: 'Workshop Coordinator',
    title: 'Keynote & AI Expo Timing Update',
    content: 'The afternoon AI Keynote session will begin at 02:15 PM in the Convention Center Auditorium.',
    announcement_type: 'Schedule update',
    priority: 'normal',
    target_colleges: ['ALL'],
    target_college_names: ['All PU Colleges'],
    sent_to_count: 18,
    acknowledged_count: 15,
    created_at: '09:30 AM',
    acknowledgements: [],
    pending_users: []
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    name: 'Technova 2026 National Tech Conclave',
    description: 'Annual mega technology flagship event featuring hands-on workshops, hackathons, and innovation exhibits for PU colleges.',
    event_date: '2026-09-13',
    start_time: '09:00 AM',
    end_time: '05:00 PM',
    venue: 'Technova Central Campus, Mangaluru',
    status: 'ONGOING',
    participating_colleges_count: 14,
    registered_students_count: 320
  },
  {
    id: 'evt-2',
    name: 'AI & Robotics Student Hackathon',
    description: '24-Hour continuous coding sprint for PU college computer science teams.',
    event_date: '2026-09-14',
    start_time: '10:00 AM',
    end_time: '04:00 PM',
    venue: 'Innovation Hub, Block C',
    status: 'UPCOMING',
    participating_colleges_count: 8,
    registered_students_count: 140
  }
];

export const INITIAL_WORKSHOPS: Workshop[] = [
  {
    id: 'wk-1',
    event_id: 'evt-1',
    name: 'Cybersecurity & Ethical Hacking',
    description: 'Hands-on penetration testing, network sniffing, and web app security fundamentals.',
    venue: 'Lab 2 (Shifted from Room 204)',
    start_time: '11:00 AM',
    end_time: '01:00 PM',
    capacity: 65,
    coordinator_name: 'Prof. Rajesh Sharma',
    coordinator_phone: '+91 9811122233',
    participating_colleges: ['St. Aloysius PU College', 'Canara PU College', 'Expert PU College'],
    status: 'ONGOING',
    enrolled_students: 58
  },
  {
    id: 'wk-2',
    event_id: 'evt-1',
    name: 'AI & Machine Learning with Python',
    description: 'Neural networks, computer vision demos, and LLM API integrations for students.',
    venue: 'Room 101 (Main Building)',
    start_time: '09:30 AM',
    end_time: '11:30 AM',
    capacity: 70,
    coordinator_name: 'Ananya Rao',
    coordinator_phone: '+91 9844455566',
    participating_colleges: ['St. Aloysius PU College', 'Sharada PU College'],
    status: 'ONGOING',
    enrolled_students: 60
  },
  {
    id: 'wk-3',
    event_id: 'evt-1',
    name: 'IoT & Embedded Robotics',
    description: 'Arduino microcontrollers, sensor integration, and autonomous mini-bot assembly.',
    venue: 'Robotics Lab, Block B',
    start_time: '02:00 PM',
    end_time: '04:30 PM',
    capacity: 50,
    coordinator_name: 'Prof. Rajesh Sharma',
    coordinator_phone: '+91 9811122233',
    participating_colleges: ['Canara PU College', 'Expert PU College', 'Sharada PU College'],
    status: 'UPCOMING',
    enrolled_students: 45
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'stud-1',
    college_id: 'col-1',
    college_name: 'St. Aloysius PU College',
    name: 'Aditya Shenoy',
    class_name: 'II PCMB A',
    phone: '+91 9740112233',
    student_identifier: 'ALO-2026-001',
    workshop_name: 'Cybersecurity & Ethical Hacking',
    attendance_status: 'PRESENT'
  },
  {
    id: 'stud-2',
    college_id: 'col-1',
    college_name: 'St. Aloysius PU College',
    name: 'Sneha Kamath',
    class_name: 'II PCMC B',
    phone: '+91 9740112234',
    student_identifier: 'ALO-2026-002',
    workshop_name: 'AI & Machine Learning with Python',
    attendance_status: 'PRESENT'
  },
  {
    id: 'stud-3',
    college_id: 'col-1',
    college_name: 'St. Aloysius PU College',
    name: 'Karthik Rao',
    class_name: 'I PCMB C',
    phone: '+91 9740112235',
    student_identifier: 'ALO-2026-003',
    workshop_name: 'Cybersecurity & Ethical Hacking',
    attendance_status: 'REGISTERED'
  },
  {
    id: 'stud-4',
    college_id: 'col-2',
    college_name: 'Canara PU College',
    name: 'Varun Prabhu',
    class_name: 'II PCMC A',
    phone: '+91 9740223344',
    student_identifier: 'CAN-2026-012',
    workshop_name: 'Cybersecurity & Ethical Hacking',
    attendance_status: 'PRESENT'
  },
  {
    id: 'stud-5',
    college_id: 'col-2',
    college_name: 'Canara PU College',
    name: 'Divya M',
    class_name: 'II PCMB B',
    phone: '+91 9740223345',
    student_identifier: 'CAN-2026-015',
    workshop_name: 'IoT & Embedded Robotics',
    attendance_status: 'REGISTERED'
  }
];

export const INITIAL_ISSUES: Issue[] = [
  {
    id: 'iss-1',
    created_by: 'user-teacher-1',
    creator_name: 'Ramesh Bhat',
    creator_role: 'Teacher (St. Aloysius)',
    college_id: 'col-1',
    college_name: 'St. Aloysius PU College',
    type: 'Bus delay',
    title: 'Bus #3 delayed by 20 minutes due to traffic near Nanthoor',
    description: 'Our second batch of 24 students is stuck near Nanthoor circle. Expected arrival extended to 11:15 AM.',
    priority: 'high',
    status: 'In progress',
    assigned_to_name: 'Prof. Rajesh Sharma',
    created_at: '10:10 AM',
    messages: [
      {
        id: 'im-1',
        sender_id: 'user-teacher-1',
        sender_name: 'Ramesh Bhat',
        sender_role: 'teacher',
        message: 'Bus is delayed by 20 minutes due to heavy traffic on NH 66.',
        created_at: '10:10 AM'
      },
      {
        id: 'im-2',
        sender_id: 'user-coord-1',
        sender_name: 'Prof. Rajesh Sharma',
        sender_role: 'coordinator',
        message: 'Transport team has been informed. We will hold the cybersecurity lab entry until 11:20 AM for your batch.',
        created_at: '10:14 AM'
      }
    ]
  },
  {
    id: 'iss-2',
    created_by: 'user-teacher-3',
    creator_name: 'Anitha Shetty',
    creator_role: 'Teacher (Sharada PU)',
    college_id: 'col-3',
    college_name: 'Sharada PU College',
    type: 'Food issue',
    title: 'Request extra lunch tokens for student volunteers',
    description: 'We have 5 extra student volunteers who were added to the registration list this morning.',
    priority: 'medium',
    status: 'Resolved',
    assigned_to_name: 'Ananya Rao',
    created_at: '09:40 AM',
    resolved_at: '10:05 AM',
    messages: [
      {
        id: 'im-3',
        sender_id: 'user-teacher-3',
        sender_name: 'Anitha Shetty',
        sender_role: 'teacher',
        message: 'Need 5 food coupons at Food Desk 2.',
        created_at: '09:40 AM'
      },
      {
        id: 'im-4',
        sender_id: 'user-coord-2',
        sender_name: 'Ananya Rao',
        sender_role: 'coordinator',
        message: 'Handed 5 additional tokens to Anitha at Central Helpdesk.',
        created_at: '10:05 AM'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    user_id: 'user-teacher-1',
    type: 'announcement',
    title: 'OFFICIAL UPDATE: Room Change',
    body: 'Cybersecurity Workshop has moved from Room 204 to Lab 2.',
    reference_type: 'announcement',
    reference_id: 'ann-1',
    is_read: false,
    created_at: '10:32 AM'
  },
  {
    id: 'notif-2',
    user_id: 'user-teacher-1',
    type: 'issue',
    title: 'Issue Status Updated',
    body: 'Prof. Rajesh Sharma set your bus delay issue status to IN PROGRESS.',
    reference_type: 'issue',
    reference_id: 'iss-1',
    is_read: true,
    created_at: '10:14 AM'
  },
  {
    id: 'notif-3',
    user_id: 'user-teacher-1',
    type: 'event',
    title: 'Upcoming Workshop Alert',
    body: 'Cybersecurity Workshop starts at 11:00 AM in Lab 2.',
    reference_type: 'event',
    reference_id: 'wk-1',
    is_read: true,
    created_at: '09:00 AM'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'aud-1',
    user_id: 'user-teacher-2',
    user_name: 'Priya Nair',
    user_role: 'Teacher',
    action: 'Acknowledged Announcement',
    entity_type: 'Announcement',
    entity_id: 'ann-1',
    metadata: 'Cybersecurity Workshop Venue Shift',
    created_at: '10:33 AM'
  },
  {
    id: 'aud-2',
    user_id: 'user-coord-1',
    user_name: 'Prof. Rajesh Sharma',
    user_role: 'Coordinator',
    action: 'Created Official Announcement',
    entity_type: 'Announcement',
    entity_id: 'ann-1',
    metadata: 'Target: All Colleges | Priority: High',
    created_at: '10:32 AM'
  },
  {
    id: 'aud-3',
    user_id: 'user-teacher-1',
    user_name: 'Ramesh Bhat',
    user_role: 'Teacher',
    action: 'Raised Issue',
    entity_type: 'Issue',
    entity_id: 'iss-1',
    metadata: 'Bus delay on NH 66',
    created_at: '10:10 AM'
  },
  {
    id: 'aud-4',
    user_id: 'user-admin',
    user_name: 'Dr. Vikram Hegde',
    user_role: 'Admin',
    action: 'Created College',
    entity_type: 'College',
    entity_id: 'col-4',
    metadata: 'Expert PU College registered',
    created_at: '08:45 AM'
  }
];
