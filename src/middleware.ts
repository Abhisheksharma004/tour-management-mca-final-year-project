import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  // Get token from header
  const token = request.headers.get('authorization')?.replace('Bearer ', '');

  // Check if the path is for authentication
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Check if token exists
  if (!token) {
    return NextResponse.json(
      { error: 'Not authorized, no token' },
      { status: 401 }
    );
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Add user info to request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('user', JSON.stringify(decoded));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Not authorized, token failed' },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: '/api/:path*',
}; 