'use client';

import { useState } from 'react';
import Link from 'next/link';
import TransitionLink from './TransitionLink';

export default function ClientHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-gray-800 shadow-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and site name */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <TransitionLink href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">Find Your Best Guide</span>
              </TransitionLink>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <TransitionLink href="/search-guides" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Find Guides
            </TransitionLink>
            <TransitionLink href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              About
            </TransitionLink>
            <TransitionLink href="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Contact
            </TransitionLink>
            <TransitionLink href="/guides/join" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Become a Guide
            </TransitionLink>
            <TransitionLink href="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
              Dashboard
            </TransitionLink>
          </nav>

          {/* Login and Signup buttons - Desktop */}
          <div className="hidden md:flex md:items-center">
            <TransitionLink href="/login" className="ml-2 px-4 py-2 text-sm text-orange-400 font-medium rounded-md hover:bg-gray-700">
              Login
            </TransitionLink>
            <TransitionLink href="/signup" className="ml-2 px-4 py-2 text-sm bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700">
              Sign Up
            </TransitionLink>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg border-b border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <TransitionLink 
              href="/search-guides" 
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Guides
            </TransitionLink>
            <TransitionLink 
              href="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </TransitionLink>
            <TransitionLink 
              href="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </TransitionLink>
            <TransitionLink 
              href="/guides/join" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Become a Guide
            </TransitionLink>
            <TransitionLink 
              href="/dashboard" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </TransitionLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center justify-center space-x-3 px-5">
              <TransitionLink 
                href="/login" 
                className="w-full px-4 py-2 text-center text-sm text-orange-400 font-medium rounded-md border border-orange-400 hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </TransitionLink>
              <TransitionLink 
                href="/signup" 
                className="w-full px-4 py-2 text-center text-sm bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </TransitionLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 