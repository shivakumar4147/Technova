# Technova Connect — Supabase Database & Auth Setup Guide

Follow these instructions to connect your live **Supabase** backend to Technova Connect.

---

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and click **New Project**.
2. Select your Organization, enter a project name (`technova-connect`), set a secure database password, and choose a region close to your users (e.g. `Mumbai / ap-south-1`).

---

## 2. Execute SQL Schema Migration

1. In your Supabase Dashboard, open the **SQL Editor** tab from the left sidebar.
2. Click **New Query**.
3. Open the file [`supabase/schema.sql`](file:///d:/Technova26/supabase/schema.sql) in this codebase, copy all code, and paste it into the SQL Editor.
4. Click **Run** (or `Ctrl+Enter`).
5. All 21 database tables (Profiles, Colleges, Conversations, Messages, Announcements, Events, Workshops, Issues, Notifications, Audit Logs) and Row-Level Security (RLS) policies will be created automatically!

---

## 3. Configure Environment Variables

1. In your Supabase Dashboard, go to **Project Settings** -> **API**.
2. Copy your **Project URL** and **`anon` `public` Key**.
3. In your project root, open or create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Restart your Next.js dev server:
```bash
npm run dev
```

---

## 4. Automatic Mode Switching

- **Live Supabase Mode**: Active whenever valid `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are provided in `.env.local`. All reads and writes automatically query live Supabase tables.
- **Offline / Mock Mode**: Active when environment variables are blank or template placeholders. The app seamlessly falls back to local data so you can test features without an internet connection!
