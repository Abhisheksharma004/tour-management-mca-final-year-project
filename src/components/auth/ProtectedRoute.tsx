'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

interface DecodedToken {
  id: string;
  exp: number;
  iat: number;
}

export default function ProtectedRoute({ children, allowedRoles = ['traveler'] }: ProtectedRouteProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (!token || !userStr) {
        router.push('/login');
        return;
      }

      try {
        // Check token expiration
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
          return;
        }

        const user = JSON.parse(userStr);
        
        if (!allowedRoles.includes(user.role)) {
          router.push('/');
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
        return;
      }
    };

    checkAuth();
  }, [router, allowedRoles]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return <>{children}</>;
} 