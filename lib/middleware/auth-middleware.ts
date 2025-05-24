import { getMaintenanceModeFlag } from '@/lib/services/getMaintenanceModeFlag';
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';


export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const pathname = request.nextUrl.pathname;

  // ⛔ Prevent maintenance redirect loop
  if (pathname === '/maintenance') return supabaseResponse;

  // ✅ Dev mode cookie bypass
  const devMode = request.cookies.get('dev_mode')?.value;
  if (devMode === 'true') {
    return supabaseResponse;
  }

  // ✅ Maintenance check
  const isMaintenanceMode = await getMaintenanceModeFlag();
  const publicDuringMaintenance = ['/masuk', '/admin', '/status','/api'];

  if (
    isMaintenanceMode &&
    !publicDuringMaintenance.some(path => pathname.startsWith(path))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return NextResponse.redirect(url);
  }

  // ✅ Supabase auth check
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && pathname.startsWith('/admin')) {
    const url = request.nextUrl.clone();
    url.pathname = '/masuk';
    return NextResponse.redirect(url);
  } else if (user && pathname === '/masuk') {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}