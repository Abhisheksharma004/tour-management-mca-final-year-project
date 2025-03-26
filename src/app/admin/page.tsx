'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaUsers, FaMapMarkedAlt, FaCalendarAlt, FaStar, 
  FaArrowUp, FaArrowDown, FaEllipsisH, FaExclamationCircle,
  FaUserPlus, FaFileAlt, FaChartLine, FaRupeeSign
} from 'react-icons/fa';
import DateDisplay from '@/components/DateDisplay';

// Mock data for dashboard
const stats = [
  { title: 'Total Guides', value: 65, change: +12, icon: FaUsers, color: 'bg-blue-600', lightColor: 'bg-blue-500/20', textColor: 'text-blue-400' },
  { title: 'Total Destinations', value: 24, change: +4, icon: FaMapMarkedAlt, color: 'bg-green-600', lightColor: 'bg-green-500/20', textColor: 'text-green-400' },
  { title: 'Bookings This Month', value: 158, change: +22, icon: FaCalendarAlt, color: 'bg-purple-600', lightColor: 'bg-purple-500/20', textColor: 'text-purple-400' },
  { title: 'Average Rating', value: '4.8', change: +0.2, icon: FaStar, color: 'bg-amber-600', lightColor: 'bg-amber-500/20', textColor: 'text-amber-400' },
];

const recentBookings = [
  { 
    id: 'B12345',
    customer: 'Rahul Sharma',
    customerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    guide: 'Priya Sharma',
    guideImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    destination: 'Delhi, India',
    date: '2024-05-15',
    amount: 3200,
    status: 'Confirmed'
  },
  { 
    id: 'B12346',
    customer: 'Aditya Patel',
    customerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    guide: 'Raj Mehta',
    guideImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    destination: 'Mumbai, India',
    date: '2024-05-12',
    amount: 2500,
    status: 'Pending'
  },
  { 
    id: 'B12347',
    customer: 'Neha Gupta',
    customerImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    guide: 'Arjun Patel',
    guideImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    destination: 'Jaipur, India',
    date: '2024-05-18',
    amount: 2800,
    status: 'Confirmed'
  },
  { 
    id: 'B12348',
    customer: 'Vikram Singh',
    customerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    guide: 'Meera Iyer',
    guideImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    destination: 'Varanasi, India',
    date: '2024-05-16',
    amount: 2200,
    status: 'Cancelled'
  },
];

const popularDestinations = [
  { name: 'Delhi, India', bookings: 42, image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5' },
  { name: 'Mumbai, India', bookings: 38, image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7' },
  { name: 'Jaipur, India', bookings: 31, image: 'https://images.unsplash.com/photo-1599661046827-9d1be56d4043' },
  { name: 'Varanasi, India', bookings: 27, image: 'https://images.unsplash.com/photo-1561361058-c24cecda72e5' },
];

const recentAlerts = [
  { id: 1, type: 'warning', message: 'Low availability for Delhi tours next week', time: '2 hours ago' },
  { id: 2, type: 'danger', message: 'Guide Raj Mehta has requested profile changes', time: '5 hours ago' },
  { id: 3, type: 'info', message: '3 new customer support tickets waiting for response', time: '1 day ago' },
];

// Monthly revenue data for chart
const monthlyRevenue = [
  { month: 'Jan', amount: 125000 },
  { month: 'Feb', amount: 145000 },
  { month: 'Mar', amount: 165000 },
  { month: 'Apr', amount: 190000 },
  { month: 'May', amount: 220000 },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition shadow-lg shadow-orange-600/20 flex items-center">
            <FaUserPlus className="mr-2" />
            Add Guide
          </button>
          <button className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition shadow flex items-center">
            <FaFileAlt className="mr-2" />
            Reports
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 transition-all hover:translate-y-[-5px]">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.lightColor} rounded-lg flex items-center justify-center`}>
                <stat.icon size={24} className={stat.textColor} />
              </div>
              <div className="flex items-center space-x-1">
                <span className={`text-sm ${stat.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change > 0 ? '+' : ''}{stat.change}
                </span>
                {stat.change > 0 ? (
                  <FaArrowUp className="text-green-400 text-xs" />
                ) : (
                  <FaArrowDown className="text-red-400 text-xs" />
                )}
              </div>
            </div>
            <h3 className="text-gray-400 text-sm">{stat.title}</h3>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="mb-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Revenue Overview</h2>
            <p className="text-gray-400 text-sm">Monthly revenue for the current year</p>
          </div>
          <div className="px-4 py-2 bg-gray-700 rounded-md flex items-center">
            <FaRupeeSign className="text-orange-400 mr-2" />
            <span className="text-white font-semibold">₹845,000</span>
            <span className="text-green-400 text-sm ml-2">+18.2%</span>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Chart */}
          <div className="h-48 w-full lg:w-2/3">
            <div className="flex items-end justify-between h-40 px-2">
              {monthlyRevenue.map((item, index) => (
                <div key={index} className="flex flex-col items-center space-y-1 group">
                  <div className="text-xs text-gray-400">₹{(item.amount/1000)}k</div>
                  <div 
                    className="w-10 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-md transition-all group-hover:from-orange-500 group-hover:to-orange-300" 
                    style={{ 
                      height: `${(item.amount / 220000) * 100}%`,
                      opacity: 0.8 + (index * 0.05)
                    }}
                  ></div>
                  <div className="text-xs text-gray-400">{item.month}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4 lg:w-1/3">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400">Total Revenue</div>
              <div className="text-xl font-bold text-orange-400">₹845,000</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400">Highest Month</div>
              <div className="text-xl font-bold text-green-400">May (₹220k)</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400">Average</div>
              <div className="text-xl font-bold text-blue-400">₹169,000</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="font-bold text-lg text-white">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-sm text-orange-400 hover:text-orange-300 flex items-center">
              View All
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50 text-left">
                <tr>
                  <th className="p-4 font-medium text-gray-300">Booking ID</th>
                  <th className="p-4 font-medium text-gray-300">Customer</th>
                  <th className="p-4 font-medium text-gray-300">Guide</th>
                  <th className="p-4 font-medium text-gray-300">Destination</th>
                  <th className="p-4 font-medium text-gray-300">Date</th>
                  <th className="p-4 font-medium text-gray-300">Amount</th>
                  <th className="p-4 font-medium text-gray-300">Status</th>
                  <th className="p-4 font-medium text-gray-300"></th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking, index) => (
                  <tr key={index} className="border-t border-gray-700 hover:bg-gray-700/20 transition-colors">
                    <td className="p-4 font-medium text-gray-300">{booking.id}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                          <Image 
                            src={booking.customerImage} 
                            alt={booking.customer} 
                            fill 
                            sizes="32px"
                            style={{ objectFit: "cover" }}
                            unoptimized
                          />
                        </div>
                        <span className="text-gray-200">{booking.customer}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                          <Image 
                            src={booking.guideImage} 
                            alt={booking.guide} 
                            fill 
                            sizes="32px"
                            style={{ objectFit: "cover" }}
                            unoptimized
                          />
                        </div>
                        <span className="text-gray-200">{booking.guide}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">{booking.destination}</td>
                    <td className="p-4 text-gray-300">
                      <DateDisplay date={booking.date} className="text-sm text-gray-300" />
                    </td>
                    <td className="p-4 text-gray-200 font-medium">₹{booking.amount.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === 'Confirmed' ? 'bg-green-900/60 text-green-300 border border-green-700' : 
                        booking.status === 'Pending' ? 'bg-yellow-900/60 text-yellow-300 border border-yellow-700' : 
                        'bg-red-900/60 text-red-300 border border-red-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <FaEllipsisH />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Popular Destinations */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="font-bold text-lg text-white">Popular Destinations</h2>
              <Link href="/admin/destinations" className="text-sm text-orange-400 hover:text-orange-300">
                View All
              </Link>
            </div>
            <div className="p-4 space-y-4">
              {popularDestinations.map((destination, index) => (
                <div key={index} className="flex items-center bg-gray-700/20 p-3 rounded-lg hover:bg-gray-700/40 transition-colors">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-4">
                    <Image 
                      src={destination.image} 
                      alt={destination.name} 
                      fill 
                      sizes="48px"
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-200">{destination.name}</h3>
                    <div className="flex items-center mt-1">
                      <FaCalendarAlt className="text-orange-400 text-xs mr-1" />
                      <p className="text-sm text-gray-400">{destination.bookings} bookings</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h2 className="font-bold text-lg text-white">Recent Alerts</h2>
            </div>
            <div className="p-4 space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start bg-gray-700/20 p-3 rounded-lg">
                  <div className={`mt-1 mr-3 ${
                    alert.type === 'warning' ? 'text-yellow-400' : 
                    alert.type === 'danger' ? 'text-red-400' : 
                    'text-blue-400'
                  }`}>
                    <FaExclamationCircle />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-200 mb-1">{alert.message}</p>
                    <p className="text-xs text-gray-400">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* At a Glance */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h2 className="font-bold text-lg text-white">At a Glance</h2>
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-700">
              <div className="p-4 text-center">
                <p className="text-gray-400 text-sm">Revenue Today</p>
                <p className="text-2xl font-bold text-white mt-1">₹12,540</p>
                <p className="text-sm text-green-400 flex items-center justify-center mt-1">
                  <FaArrowUp className="mr-1" size={10} />
                  +8% from yesterday
                </p>
              </div>
              <div className="p-4 text-center">
                <p className="text-gray-400 text-sm">New Users</p>
                <p className="text-2xl font-bold text-white mt-1">18</p>
                <p className="text-sm text-green-400 flex items-center justify-center mt-1">
                  <FaArrowUp className="mr-1" size={10} />
                  +12% from yesterday
                </p>
              </div>
            </div>
            <div className="border-t border-gray-700 p-4">
              <Link href="/admin/analytics" className="text-orange-400 hover:text-orange-300 text-sm flex items-center justify-center">
                View Detailed Analytics
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 