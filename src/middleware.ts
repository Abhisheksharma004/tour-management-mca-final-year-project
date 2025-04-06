import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip authentication for test routes
  const url = request.nextUrl.pathname;
  if (
    url.includes('/api/test') ||
    url.includes('/api/db-test') ||
    url.includes('/api/init-db') ||
    url.includes('/api/auth/') ||
    url.includes('/api/db-debug') ||
    url.includes('/api/direct-mongodb')
  ) {
    return NextResponse.next();
  }
  
  // For other routes, you can implement authentication here
  // This simplified version will just pass through all requests
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
