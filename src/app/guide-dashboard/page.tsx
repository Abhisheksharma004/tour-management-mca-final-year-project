'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaStar, 
  FaWallet, 
  FaMapMarkerAlt, 
  FaMapMarkedAlt, 
  FaClock, 
  FaUsers,
  FaChevronRight,
  FaListAlt,
  FaEnvelope,
  FaEye
} from 'react-icons/fa';
import DateDisplay from '@/components/DateDisplay';

// Sample data for dashboard
const upcomingTours = [
  {
    id: 'T001',
    name: 'Old Delhi Heritage Tour',
    date: '2024-05-15',
    time: '09:00',
    duration: '4 hours',
    location: 'Delhi, India',
    participants: 2,
    customer: {
      name: 'Rahul Sharma',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    }
  },
  {
    id: 'T002',
    name: 'Mumbai Heritage Walk',
    date: '2024-05-20',
    time: '10:00',
    duration: '3 hours',
    location: 'Mumbai, India',
    participants: 4,
    customer: {
      name: 'Aditya Patel',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    }
  },
  {
    id: 'T003',
    name: 'Cultural Food Tour',
    date: '2024-05-25',
    time: '18:00',
    duration: '3 hours',
    location: 'Mumbai, India',
    participants: 2,
    customer: {
      name: 'Priya Kapoor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
    }
  }
];

const recentBookings = [
  {
    id: 'B001',
    tourName: 'City Highlights Tour',
    date: '2024-04-28',
    customer: 'Vikash Gupta',
    participants: 3,
    amount: 3600,
    status: 'Confirmed'
  },
  {
    id: 'B002',
    tourName: 'Street Food Adventure',
    date: '2024-04-30',
    customer: 'Meera Shah',
    participants: 2,
    amount: 2400,
    status: 'Pending'
  },
  {
    id: 'B003',
    tourName: 'Historical Monuments Tour',
    date: '2024-05-02',
    customer: 'Raj Malhotra',
    participants: 1,
    amount: 1500,
    status: 'Confirmed'
  }
];

const unreadMessages = [
  {
    id: 'M001',
    from: 'Rahul Sharma',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    message: 'Hi, looking forward to our tour! Can we meet 10 minutes early?',
    time: '2 hours ago'
  },
  {
    id: 'M002',
    from: 'Priya Kapoor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    message: 'Is the tour still on if it rains tomorrow?',
    time: '5 hours ago'
  }
];

// Monthly earnings data
const monthlyEarnings = [
  { month: 'Jan', amount: 32500 },
  { month: 'Feb', amount: 28000 },
  { month: 'Mar', amount: 35000 },
  { month: 'Apr', amount: 42000 },
  { month: 'May', amount: 45620 },
  { month: 'Jun', amount: 0 },
  { month: 'Jul', amount: 0 },
  { month: 'Aug', amount: 0 },
  { month: 'Sep', amount: 0 },
  { month: 'Oct', amount: 0 },
  { month: 'Nov', amount: 0 },
  { month: 'Dec', amount: 0 }
];

export default function GuideDashboard() {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome Back, Raj!</h1>
          <p className="text-gray-400 mt-1">Here's what's happening with your tours today</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link 
            href="/guide-dashboard/tours/new" 
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition shadow-lg shadow-orange-600/20 flex items-center text-sm"
          >
            <FaMapMarkedAlt className="mr-2" />
            Create New Tour
          </Link>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs mb-1">Today's Tours</p>
              <p className="text-2xl font-bold text-white">2</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <FaCalendarAlt className="text-blue-400" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Next: Old Delhi Heritage (9:00 AM)</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs mb-1">Upcoming Bookings</p>
              <p className="text-2xl font-bold text-white">8</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <FaUsers className="text-green-400" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">3 new bookings this week</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs mb-1">Rating</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-white mr-1">4.8</p>
                <FaStar className="text-yellow-500" />
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <FaStar className="text-yellow-400" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Based on 127 reviews</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs mb-1">This Month</p>
              <p className="text-2xl font-bold text-white">₹45,620</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
              <FaWallet className="text-orange-400" />
            </div>
          </div>
          <p className="text-xs text-green-400 mt-2">+8.5% from last month</p>
        </div>
      </div>
      
      {/* Upcoming Tours & Earnings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden">
            <div className="flex border-b border-gray-700">
              <button 
                onClick={() => setActiveTab('upcoming')}
                className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'upcoming' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400 hover:text-white'}`}
              >
                Upcoming Tours
              </button>
              <button 
                onClick={() => setActiveTab('bookings')}
                className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'bookings' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400 hover:text-white'}`}
              >
                Recent Bookings
              </button>
              <button 
                onClick={() => setActiveTab('messages')}
                className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'messages' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400 hover:text-white'}`}
              >
                Unread Messages
              </button>
            </div>
            
            <div className="p-4">
              {activeTab === 'upcoming' && (
                <div>
                  {upcomingTours.map((tour) => (
                    <div key={tour.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 mb-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition">
                      <div className="flex items-center mb-2 sm:mb-0 w-full sm:w-auto">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden mr-3 border border-gray-600">
                          <Image 
                            src={tour.customer.image} 
                            alt={tour.customer.name} 
                            fill 
                            sizes="40px"
                            style={{ objectFit: "cover" }}
                            unoptimized
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{tour.name}</h3>
                          <div className="flex items-center text-xs text-gray-400">
                            <FaMapMarkerAlt className="mr-1" size={10} />
                            {tour.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-xs text-gray-400 flex items-center mr-3">
                          <FaCalendarAlt className="mr-1" size={10} />
                          <DateDisplay date={tour.date} className="text-xs" />
                        </div>
                        <div className="text-xs text-gray-400 flex items-center mr-3">
                          <FaClock className="mr-1" size={10} />
                          {tour.time}
                        </div>
                        <div className="text-xs text-gray-400 flex items-center mr-3">
                          <FaUsers className="mr-1" size={10} />
                          {tour.participants} people
                        </div>
                        <Link href={`/guide-dashboard/tours/${tour.id}`} className="text-xs bg-gray-700 text-orange-400 hover:bg-gray-600 rounded-md px-2 py-1 flex items-center">
                          <FaEye className="mr-1" size={10} />
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                  <Link href="/guide-dashboard/tours" className="text-sm text-orange-500 hover:text-orange-400 flex items-center justify-center mt-3">
                    View All Tours <FaChevronRight className="ml-1" size={12} />
                  </Link>
                </div>
              )}
              
              {activeTab === 'bookings' && (
                <div>
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 mb-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition">
                      <div>
                        <h3 className="font-medium text-white">{booking.tourName}</h3>
                        <div className="flex items-center text-xs text-gray-400">
                          <span className="mr-2">#{booking.id}</span> • 
                          <span className="ml-2">{booking.customer} ({booking.participants} people)</span>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 sm:mt-0">
                        <div className="mr-3 text-right">
                          <div className="text-white font-medium">₹{booking.amount.toLocaleString()}</div>
                          <div className="text-xs text-gray-400">
                            <DateDisplay date={booking.date} className="text-xs" />
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          booking.status === 'Confirmed' ? 'bg-green-900/60 text-green-300 border border-green-700' : 
                          'bg-yellow-900/60 text-yellow-300 border border-yellow-700'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  <Link href="/guide-dashboard/bookings" className="text-sm text-orange-500 hover:text-orange-400 flex items-center justify-center mt-3">
                    View All Bookings <FaChevronRight className="ml-1" size={12} />
                  </Link>
                </div>
              )}
              
              {activeTab === 'messages' && (
                <div>
                  {unreadMessages.map((message) => (
                    <div key={message.id} className="flex items-start p-3 mb-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 border border-gray-600">
                        <Image 
                          src={message.avatar} 
                          alt={message.from} 
                          fill 
                          sizes="40px"
                          style={{ objectFit: "cover" }}
                          unoptimized
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-white">{message.from}</h3>
                          <span className="text-xs text-gray-400">{message.time}</span>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">{message.message}</p>
                      </div>
                    </div>
                  ))}
                  <Link href="/guide-dashboard/messages" className="text-sm text-orange-500 hover:text-orange-400 flex items-center justify-center mt-3">
                    View All Messages <FaChevronRight className="ml-1" size={12} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Earnings Chart */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-medium text-white">Earnings Overview</h2>
          </div>
          <div className="p-4">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Total Earnings (2024)</span>
                <span className="text-white font-medium">₹183,120</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 w-5/12"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Target: ₹450,000</span>
                <span>41% achieved</span>
              </div>
            </div>
            
            <div className="flex h-40 items-end space-x-2 mt-6">
              {monthlyEarnings.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-orange-600 to-orange-400 rounded-t hover:from-orange-500 hover:to-orange-300 transition-all group relative"
                    style={{ height: `${data.amount > 0 ? (data.amount / 50000) * 100 : 0}%` }}
                  >
                    {data.amount > 0 && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                        ₹{data.amount.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 mt-1">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-700 p-3">
            <Link href="/guide-dashboard/analytics" className="text-sm text-orange-500 hover:text-orange-400 flex items-center justify-center">
              View Detailed Analytics <FaChevronRight className="ml-1" size={12} />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg p-4 mb-6">
        <h2 className="text-lg font-medium text-white mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link 
            href="/guide-dashboard/tours/new" 
            className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg flex flex-col items-center justify-center transition"
          >
            <FaMapMarkedAlt className="text-orange-500 text-xl mb-2" />
            <span className="text-sm text-gray-200">New Tour</span>
          </Link>
          <Link 
            href="/guide-dashboard/messages" 
            className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg flex flex-col items-center justify-center transition"
          >
            <FaEnvelope className="text-orange-500 text-xl mb-2" />
            <span className="text-sm text-gray-200">Messages</span>
          </Link>
          <Link 
            href="/guide-dashboard/bookings" 
            className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg flex flex-col items-center justify-center transition"
          >
            <FaListAlt className="text-orange-500 text-xl mb-2" />
            <span className="text-sm text-gray-200">Bookings</span>
          </Link>
          <Link 
            href="/guide-dashboard/profile" 
            className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg flex flex-col items-center justify-center transition"
          >
            <FaUser className="text-orange-500 text-xl mb-2" />
            <span className="text-sm text-gray-200">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 