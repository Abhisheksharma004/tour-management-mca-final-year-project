'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function TravelerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <ProtectedRoute allowedRoles={['traveler']}>
      <div className="min-h-screen bg-gray-900">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-200 ease-in-out`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 px-4 bg-gray-900">
              <Link href="/" className="flex items-center">
                <div className="relative w-8 h-8">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="ml-2 text-xl font-bold text-white">
                  TourGuide
                </span>
              </Link>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
              <Link
                href="/traveler/dashboard"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
              >
                <FaUser className="mr-3" />
                Dashboard
              </Link>
              {/* Add more navigation links here */}
            </nav>

            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="relative w-8 h-8">
                    <Image
                      src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=random'}
                      alt="User avatar"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-4 w-full flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
              >
                <FaSignOutAlt className="mr-3" />
                Sign out
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          <main className="p-4">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
} 