import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseServer';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createSupabaseServerClient();

    // 1. Exchange authorization code for a valid Supabase session
    const { data: sessionData, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (!exchangeError && sessionData?.user) {
      const user = sessionData.user;
      const userMeta = user.user_metadata || {};

      // 2. Extract Google OAuth identity details
      const email = user.email || userMeta.email || '';
      const fullName = userMeta.full_name || userMeta.name || '';
      const avatarUrl = userMeta.avatar_url || userMeta.picture || '';

      // 3. Query profiles table for this auth.uid() or email
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .or(`id.eq.${user.id},email.eq.${email}`)
        .maybeSingle();

      // 4. Determine onboarding status & route
      const isComplete = profile && profile.is_profile_complete && profile.college_id;

      if (!isComplete) {
        // Redirect to /complete-profile with Google metadata passed via URL search params as fallback
        const completeUrl = new URL('/complete-profile', origin);
        if (email) completeUrl.searchParams.set('email', email);
        if (fullName) completeUrl.searchParams.set('full_name', fullName);
        if (avatarUrl) completeUrl.searchParams.set('avatar_url', avatarUrl);
        
        return NextResponse.redirect(completeUrl);
      } else {
        // Redirect complete profile directly to /dashboard
        return NextResponse.redirect(new URL('/dashboard', origin));
      }
    }
  }

  // Fallback if no code or exchange error: return to /get-started
  return NextResponse.redirect(new URL('/get-started', origin));
}
