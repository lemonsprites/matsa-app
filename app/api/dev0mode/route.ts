// pages/api/dev-mode.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL));
  response.cookies.set('dev_mode', 'true', {
    httpOnly: false,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });
  return response;
}
