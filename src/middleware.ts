import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseMiddlewareClient } from '@/lib/supabaseServer';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const pathname = request.nextUrl.pathname;
  const origin = request.nextUrl.origin;

  // Static assets & internal routes bypass
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return response;
  }

  const supabase = createSupabaseMiddlewareClient(request, response);

  // Refresh auth session
  const { data: { session } } = await supabase.auth.getSession();

  const isAuthRoute = pathname === '/get-started' || pathname === '/login';
  const isCompleteProfileRoute = pathname === '/complete-profile';
  const isDashboardRoute = pathname.startsWith('/dashboard') || pathname === '/';

  if (session?.user) {
    // Check user profile completion status in database
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_profile_complete, college_id')
      .or(`id.eq.${session.user.id},email.eq.${session.user.email}`)
      .maybeSingle();

    const isProfileComplete = profile && profile.is_profile_complete && profile.college_id;

    if (!isProfileComplete && isDashboardRoute) {
      // Authenticated user with incomplete profile visiting /dashboard -> Redirect to /complete-profile
      return NextResponse.redirect(new URL('/complete-profile', origin));
    }

    if (isProfileComplete && (isAuthRoute || isCompleteProfileRoute)) {
      // Authenticated user with complete profile visiting /complete-profile or /get-started -> Redirect to /dashboard
      return NextResponse.redirect(new URL('/dashboard', origin));
    }
  } else {
    // Unauthenticated guest trying to access /dashboard or /complete-profile -> Redirect to /get-started
    if (isDashboardRoute || isCompleteProfileRoute) {
      // Allow root route landing or redirect to /get-started
      if (isDashboardRoute && pathname !== '/') {
        return NextResponse.redirect(new URL('/get-started', origin));
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/complete-profile',
    '/get-started',
    '/login',
  ],
};
