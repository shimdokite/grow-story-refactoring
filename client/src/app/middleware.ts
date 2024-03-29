import { NextRequest, NextResponse } from 'next/server';

import useUserStore from '@/stores/userStore';

import { ADMIN_USER_ID } from '@/constants/values';

export function middleware(request: NextRequest) {
  const { userId } = useUserStore();

  if (userId !== ADMIN_USER_ID && request.nextUrl.pathname.startsWith('/admin'))
    return NextResponse.redirect(new URL('/', request.url));
}

export const cofig = {
  matcher: '/admin',
};
