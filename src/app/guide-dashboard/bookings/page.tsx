'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaSearch, 
  FaFilter, 
  FaCalendarAlt, 
  FaUserFriends,
  FaMapMarkerAlt,
  FaClock,
  FaEdit,
  FaEye,
  FaTrashAlt,
  FaDownload,
  FaPrint,
  FaStar
} from 'react-icons/fa';
import DateDisplay from '@/components/DateDisplay';

// Sample bookings data
const bookingsData = [
  {
    id: 'B001',
    tourName: 'Old Delhi Heritage Tour',
    tourImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
    customer: {
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 98765 43210',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    },
    date: '2024-05-15',
    time: '09:00',
    duration: '4 hours',
    location: 'Delhi, India',
    participants: 2,
    amount: 3200,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    review: null,
    notes: ''
  },
  {
    id: 'B002',
    tourName: 'Mumbai Heritage Walk',
    tourImage: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7',
    customer: {
      name: 'Aditya Patel',
      email: 'aditya.patel@example.com',
      phone: '+91 87654 32109',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    },
    date: '2024-05-20',
    time: '10:00',
    duration: '3 hours',
    location: 'Mumbai, India',
    participants: 4,
    amount: 4800,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    review: null,
    notes: 'Customer requested information about nearby lunch options after the tour.'
  },
  {
    id: 'B003',
    tourName: 'Cultural Food Tour',
    tourImage: 'https://images.unsplash.com/photo-1596392301391-8bac945b6139',
    customer: {
      name: 'Priya Kapoor',
      email: 'priya.kapoor@example.com',
      phone: '+91 76543 21098',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
    },
    date: '2024-05-25',
    time: '18:00',
    duration: '3 hours',
    location: 'Mumbai, India',
    participants: 2,
    amount: 2800,
    status: 'Pending',
    paymentStatus: 'Pending',
    review: null,
    notes: ''
  },
  {
    id: 'B004',
    tourName: 'Old Delhi Heritage Tour',
    tourImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
    customer: {
      name: 'Vikash Gupta',
      email: 'vikash.gupta@example.com',
      phone: '+91 65432 10987',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    },
    date: '2024-05-28',
    time: '09:00',
    duration: '4 hours',
    location: 'Delhi, India',
    participants: 3,
    amount: 4800,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    review: null,
    notes: ''
  },
  {
    id: 'B005',
    tourName: 'City Highlights Tour',
    tourImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
    customer: {
      name: 'Meera Shah',
      email: 'meera.shah@example.com',
      phone: '+91 54321 09876',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
    },
    date: '2024-04-28',
    time: '10:00',
    duration: '6 hours',
    location: 'Delhi, India',
    participants: 2,
    amount: 4800,
    status: 'Completed',
    paymentStatus: 'Paid',
    review: {
      rating: 5,
      comment: 'Raj was an exceptional guide who made our tour both educational and fun. His knowledge of Delhi history is impressive!'
    },
    notes: ''
  }
];

export default function BookingsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  // Filter bookings based on search and filters
  const filteredBookings = bookingsData.filter(booking => {
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      booking.tourName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status.toLowerCase() === statusFilter.toLowerCase();
    
    let matchesDate = true;
    const today = new Date();
    const bookingDate = new Date(booking.date);
    
    if (dateFilter === 'today') {
      matchesDate = bookingDate.toDateString() === today.toDateString();
    } else if (dateFilter === 'upcoming') {
      matchesDate = bookingDate >= today;
    } else if (dateFilter === 'past') {
      matchesDate = bookingDate < today;
    } else if (dateFilter === 'this-week') {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      matchesDate = bookingDate >= startOfWeek && bookingDate <= endOfWeek;
    } else if (dateFilter === 'this-month') {
      matchesDate = bookingDate.getMonth() === today.getMonth() && 
                   bookingDate.getFullYear() === today.getFullYear();
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });
  
  // Sort filtered bookings
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'price-high':
        return b.amount - a.amount;
      case 'price-low':
        return a.amount - b.amount;
      default:
        return 0;
    }
  });
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-900/60 text-green-300 border border-green-700';
      case 'pending':
        return 'bg-yellow-900/60 text-yellow-300 border border-yellow-700';
      case 'cancelled':
        return 'bg-red-900/60 text-red-300 border border-red-700';
      case 'completed':
        return 'bg-blue-900/60 text-blue-300 border border-blue-700';
      default:
        return 'bg-gray-700 text-gray-300 border border-gray-600';
    }
  };
  
  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-900/60 text-green-300 border border-green-700';
      case 'pending':
        return 'bg-yellow-900/60 text-yellow-300 border border-yellow-700';
      case 'refunded':
        return 'bg-blue-900/60 text-blue-300 border border-blue-700';
      default:
        return 'bg-gray-700 text-gray-300 border border-gray-600';
    }
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Bookings Management</h1>
          <p className="text-gray-400 mt-1">View and manage your tour bookings</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition shadow-lg border border-gray-600 flex items-center text-sm">
            <FaDownload className="mr-2" />
            Export
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition shadow-lg shadow-orange-600/20 flex items-center text-sm">
            <FaPrint className="mr-2" />
            Print
          </button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs mb-1">Total Bookings</p>
              <p className="text-2xl font-bold text-white">38</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <FaCalendarAlt className="text-blue-400" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">+12% from last month</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs mb-1">Confirmed</p>
              <p className="text-2xl font-bold text-green-400">28</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <FaCalendarAlt className="text-green-400" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">3 tours this week</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">8</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <FaCalendarAlt className="text-yellow-400" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Requires confirmation</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs mb-1">Cancellations</p>
              <p className="text-2xl font-bold text-red-400">2</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <FaCalendarAlt className="text-red-400" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">5% cancellation rate</p>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-700 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by ID, tour name, or customer..."
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
              </select>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="price-high">Sort: Price High to Low</option>
                <option value="price-low">Sort: Price Low to High</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Bookings Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50 text-left">
              <tr>
                <th className="p-4 font-medium text-gray-300">Booking Info</th>
                <th className="p-4 font-medium text-gray-300">Customer</th>
                <th className="p-4 font-medium text-gray-300">Date & Time</th>
                <th className="p-4 font-medium text-gray-300">Participants</th>
                <th className="p-4 font-medium text-gray-300">Amount</th>
                <th className="p-4 font-medium text-gray-300">Status</th>
                <th className="p-4 font-medium text-gray-300">Payment</th>
                <th className="p-4 font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedBookings.map((booking) => (
                <tr key={booking.id} className="border-t border-gray-700 hover:bg-gray-700/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-start">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-3 border border-gray-600">
                        <Image 
                          src={booking.tourImage} 
                          alt={booking.tourName} 
                          fill 
                          sizes="48px"
                          style={{ objectFit: "cover" }}
                          unoptimized
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{booking.tourName}</h3>
                        <div className="flex items-center text-xs text-gray-400">
                          <span className="mr-2">#{booking.id}</span>
                          <FaMapMarkerAlt className="mr-1" size={10} />
                          {booking.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2 border border-gray-600">
                        <Image 
                          src={booking.customer.image} 
                          alt={booking.customer.name} 
                          fill 
                          sizes="32px"
                          style={{ objectFit: "cover" }}
                          unoptimized
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-200">{booking.customer.name}</div>
                        <div className="text-xs text-gray-400">{booking.customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-200">
                      <DateDisplay date={booking.date} className="text-sm" />
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <FaClock className="mr-1" size={10} />
                      {booking.time} • {booking.duration}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center text-gray-200">
                      <FaUserFriends className="mr-2 text-gray-400" />
                      {booking.participants}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-200">₹{booking.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <Link 
                        href={`/guide-dashboard/bookings/${booking.id}`}
                        className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded transition-colors" 
                        title="View Details"
                      >
                        <FaEye size={14} />
                      </Link>
                      {(booking.status === 'Pending' || booking.status === 'Confirmed') && (
                        <Link 
                          href={`/guide-dashboard/bookings/${booking.id}/edit`}
                          className="p-1.5 text-orange-400 hover:text-orange-300 hover:bg-orange-900/30 rounded transition-colors" 
                          title="Edit Booking"
                        >
                          <FaEdit size={14} />
                        </Link>
                      )}
                      {booking.status !== 'Completed' && booking.status !== 'Cancelled' && (
                        <button 
                          className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded transition-colors" 
                          title="Cancel Booking"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      )}
                      {booking.review && (
                        <div className="p-1.5 text-yellow-400 flex items-center" title={`Rating: ${booking.review.rating}/5`}>
                          <FaStar size={14} />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {sortedBookings.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-400">No bookings found matching your search criteria.</p>
          </div>
        )}
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-700 flex justify-between items-center">
          <p className="text-sm text-gray-400">Showing {sortedBookings.length} of {bookingsData.length} bookings</p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 bg-orange-600 text-white rounded-md">1</button>
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600">2</button>
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 