'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DateDisplay from '@/components/DateDisplay';

// Mock user data
const user = {
  name: 'Emily Johnson',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  upcomingBookings: [
    {
      id: 1,
      tourName: 'Tokyo Night Food Tour',
      guideName: 'Sophia Chen',
      location: 'Tokyo, Japan',
      date: '2023-12-15',
      time: '19:00',
      status: 'Confirmed',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80'
    },
    {
      id: 2,
      tourName: 'Ancient Rome Walking Tour',
      guideName: 'Marco Rossi',
      location: 'Rome, Italy',
      date: '2024-02-10',
      time: '09:30',
      status: 'Pending',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1396&q=80'
    }
  ],
  pastBookings: [
    {
      id: 3,
      tourName: 'Old Delhi Food Walk',
      guideName: 'Raj Mehta',
      location: 'Delhi, India',
      date: '2023-09-05',
      time: '18:00',
      status: 'Completed',
      hasReviewed: true,
      image: 'https://images.unsplash.com/photo-1582650642304-8e5d25eab1b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80'
    },
    {
      id: 4,
      tourName: 'Cairo Pyramids Tour',
      guideName: 'Aisha Rahman',
      location: 'Cairo, Egypt',
      date: '2023-08-12',
      time: '08:00',
      status: 'Completed',
      hasReviewed: false,
      image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    }
  ],
  savedGuides: [
    {
      id: 1,
      name: 'Sophia Chen',
      location: 'Tokyo, Japan',
      rating: 5.0,
      specialty: 'Food, Nightlife, Culture',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
    },
    {
      id: 3,
      name: 'Marco Rossi',
      location: 'Rome, Italy',
      rating: 4.8,
      specialty: 'History, Art, Architecture',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 5,
      name: 'Carlos Mendoza',
      location: 'Mexico City, Mexico',
      rating: 4.9,
      specialty: 'Food, History, Indigenous Culture',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    }
  ]
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image 
                  src={user.avatar} 
                  alt={user.name}
                  fill
                  sizes="64px"
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-orange-400">Traveler</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              <button 
                className={`w-full text-left px-4 py-2 rounded-md transition ${activeTab === 'upcoming' ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming Trips
              </button>
              <button 
                className={`w-full text-left px-4 py-2 rounded-md transition ${activeTab === 'past' ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                onClick={() => setActiveTab('past')}
              >
                Past Trips
              </button>
              <button 
                className={`w-full text-left px-4 py-2 rounded-md transition ${activeTab === 'saved' ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                onClick={() => setActiveTab('saved')}
              >
                Saved Guides
              </button>
            </nav>
            
            <div className="mt-8 pt-6 border-t border-gray-700">
              <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition">
                Find New Guides
              </button>
              <button className="w-full mt-2 px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition">
                Account Settings
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 w-full">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">My Dashboard</h1>
              <p className="text-gray-400 mt-1">Manage your bookings and saved guides</p>
            </div>
            
            {/* Upcoming Bookings */}
            {activeTab === 'upcoming' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Upcoming Trips</h2>
                
                {user.upcomingBookings.length > 0 ? (
                  user.upcomingBookings.map((booking, index) => (
                    <div key={booking.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                      <div className="relative w-full md:w-48 h-48 md:h-auto">
                        <Image 
                          src={booking.image} 
                          alt={booking.tourName}
                          fill
                          sizes="(max-width: 768px) 100vw, 192px"
                          style={{ objectFit: "cover" }}
                          priority={index === 0}
                          unoptimized
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-lg">{booking.tourName}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${booking.status === 'Confirmed' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-gray-300 mt-1">
                          <span className="font-medium">Guide:</span> {booking.guideName}
                        </p>
                        <p className="text-gray-300">
                          <span className="font-medium">Location:</span> {booking.location}
                        </p>
                        <p className="text-gray-300">
                          <span className="font-medium">Date:</span> <DateDisplay date={booking.date} />
                        </p>
                        <p className="text-gray-300">
                          <span className="font-medium">Time:</span> {booking.time}
                        </p>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                            View Details
                          </button>
                          <button className="px-4 py-2 border border-red-500 text-red-400 rounded-md hover:bg-red-900">
                            Cancel Booking
                          </button>
                          <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700">
                            Contact Guide
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-medium">No upcoming trips</h3>
                    <p className="text-gray-400 mt-2">Start exploring to find your next adventure</p>
                    <Link href="/search-guides">
                      <div className="mt-4 inline-block px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                        Find Guides
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {/* Past Bookings */}
            {activeTab === 'past' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Past Trips</h2>
                
                {user.pastBookings.length > 0 ? (
                  user.pastBookings.map(booking => (
                    <div key={booking.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                      <div className="relative w-full md:w-48 h-48 md:h-auto">
                        <Image 
                          src={booking.image} 
                          alt={booking.tourName}
                          fill
                          sizes="(max-width: 768px) 100vw, 192px"
                          style={{ objectFit: "cover" }}
                          unoptimized
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-lg">{booking.tourName}</h3>
                          <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-gray-300 mt-1">
                          <span className="font-medium">Guide:</span> {booking.guideName}
                        </p>
                        <p className="text-gray-300">
                          <span className="font-medium">Location:</span> {booking.location}
                        </p>
                        <p className="text-gray-300">
                          <span className="font-medium">Date:</span> <DateDisplay date={booking.date} />
                        </p>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          {!booking.hasReviewed && (
                            <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                              Write a Review
                            </button>
                          )}
                          <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700">
                            View Details
                          </button>
                          <button className="px-4 py-2 border border-orange-500 text-orange-400 rounded-md hover:bg-orange-900">
                            Book Again
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-medium">No past trips</h3>
                    <p className="text-gray-400 mt-2">Your completed trips will appear here</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Saved Guides */}
            {activeTab === 'saved' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Saved Guides</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.savedGuides.map(guide => (
                    <div key={guide.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                      <div className="relative h-48">
                        <Image 
                          src={guide.image} 
                          alt={guide.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: "cover" }}
                          unoptimized
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-lg">{guide.name}</h3>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>{guide.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 mt-1">{guide.location}</p>
                        <p className="text-gray-400 text-sm mt-1">Specializes in: {guide.specialty}</p>
                        
                        <div className="mt-4 flex gap-2">
                          <button className="flex-1 px-2 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-sm">
                            View Profile
                          </button>
                          <button className="flex-1 px-2 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 text-sm">
                            Book Tour
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 