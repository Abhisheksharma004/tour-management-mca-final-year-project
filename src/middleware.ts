import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  role: string;
  exp: number;
}

export function middleware(request: NextRequest) {
  // Get the token from the cookies
  const token = request.cookies.get('token')?.value;
  const url = request.nextUrl.pathname;
  
  // Skip authentication for API test routes and auth routes
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
  
  // Check for protected routes
  if (url === '/dashboard' || url.startsWith('/dashboard/')) {
    // If no token is found, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Decode the token to check if it's expired
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;

      // If token is expired, redirect to login
      if (decoded.exp && decoded.exp < currentTime) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      
      // For dashboard, allow all authenticated users (any role)
      return NextResponse.next();
    } catch (error) {
      // If there's any error with the token, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Check for guide-dashboard route
  if (url.startsWith('/guide-dashboard')) {
    // If no token is found, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Decode the token to check if it's expired
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;

      // If token is expired, redirect to login
      if (decoded.exp && decoded.exp < currentTime) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      // Check if the user has the guide role
      if (decoded.role !== 'guide') {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      // If all checks pass, allow the request to proceed
      return NextResponse.next();
    } catch (error) {
      // If there's any error with the token, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // For admin dashboard (if you have one)
  if (url.startsWith('/admin-dashboard')) {
    // If no token is found, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Decode the token to check if it's expired
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;

      // If token is expired, redirect to login
      if (decoded.exp && decoded.exp < currentTime) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      // Check if the user has the admin role
      if (decoded.role !== 'admin') {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      // If all checks pass, allow the request to proceed
      return NextResponse.next();
    } catch (error) {
      // If there's any error with the token, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // For all other routes, allow the request to proceed
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/api/:path*', 
    '/dashboard/:path*', 
    '/dashboard', 
    '/guide-dashboard/:path*',
    '/admin-dashboard/:path*'
  ],
};
