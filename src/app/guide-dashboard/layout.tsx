'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  FaHome, FaCalendarAlt, FaComments, FaChartBar, 
  FaUser, FaCog, FaSignOutAlt, FaBars, FaTimes,
  FaBell, FaMapMarkedAlt, FaUsers
} from 'react-icons/fa';

interface GuideDashboardLayoutProps {
  children: ReactNode;
}

export default function GuideDashboardLayout({ children }: GuideDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Dashboard', href: '/guide-dashboard', icon: FaHome },
    { name: 'My Tours', href: '/guide-dashboard/tours', icon: FaMapMarkedAlt },
    { name: 'Bookings', href: '/guide-dashboard/bookings', icon: FaCalendarAlt },
    { name: 'Messages', href: '/guide-dashboard/messages', icon: FaComments },
    { name: 'Analytics', href: '/guide-dashboard/analytics', icon: FaChartBar },
    { name: 'Profile', href: '/guide-dashboard/profile', icon: FaUser },
    { name: 'Settings', href: '/guide-dashboard/settings', icon: FaCog },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-gray-800 z-30 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <Link href="/guide-dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-orange-500">IndianGuide</span>
            <span className="text-white font-bold">Guide</span>
          </Link>
          <button className="lg:hidden text-white" onClick={toggleSidebar}>
            <FaTimes size={24} />
          </button>
        </div>

        <div className="px-4 py-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500">
              <Image 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" 
                alt="Guide" 
                fill 
                sizes="40px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="font-medium text-white">Guide Name</p>
              <p className="text-sm text-gray-400">Professional Guide</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                  pathname === link.href 
                    ? 'bg-orange-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <link.icon className="mr-3 text-lg" />
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="mt-10 pt-6 border-t border-gray-700">
            <Link
              href="/"
              className="flex items-center px-4 py-3 text-sm text-gray-300 rounded-md hover:bg-gray-700 transition-colors mb-2"
            >
              <FaHome className="mr-3 text-lg" />
              View Website
            </Link>
            <Link
              href="/guide-dashboard/logout"
              className="flex items-center px-4 py-3 text-sm text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
            >
              <FaSignOutAlt className="mr-3 text-lg" />
              Sign Out
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 shadow-md border-b border-gray-700">
          <div className="flex items-center justify-between px-4 py-3">
            <button 
              className="lg:hidden text-gray-300 hover:text-white transition-colors" 
              onClick={toggleSidebar}
            >
              <FaBars size={24} />
            </button>

            <div className="flex items-center space-x-4 ml-auto">
              <button className="relative text-gray-300 hover:text-white transition-colors">
                <FaBell size={20} />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <span className="text-gray-400">|</span>
              <div className="text-sm text-gray-300">
                Welcome, <span className="font-semibold text-white">Guide</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
} 