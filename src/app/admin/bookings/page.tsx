'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaFilter, FaCalendarAlt, FaMapMarkerAlt, FaUser, FaEllipsisV, FaCheck, FaTimes, FaDownload, FaPencilAlt, FaTrash, FaEllipsisH, FaPrint, FaSort, FaEye } from 'react-icons/fa';
import DateDisplay from '@/components/DateDisplay';

// Sample bookings data
const bookings = [
  { 
    id: 'B12345',
    date: '2024-05-15',
    tourTime: '09:00',
    customer: {
      id: 'C001',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 98765 43210',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    },
    guide: {
      id: 'G001',
      name: 'Priya Sharma',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
    },
    tour: {
      name: 'Old Delhi Heritage Tour',
      destination: 'Delhi, India',
      duration: '4 hours',
    },
    participants: 2,
    amount: 3200,
    status: 'Confirmed',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    createdAt: '2024-04-01'
  },
  { 
    id: 'B12346',
    date: '2024-05-12',
    tourTime: '10:00',
    customer: {
      id: 'C002',
      name: 'Aditya Patel',
      email: 'aditya.patel@example.com',
      phone: '+91 87654 32109',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    },
    guide: {
      id: 'G002',
      name: 'Raj Mehta',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d'
    },
    tour: {
      name: 'Mumbai Heritage Walk',
      destination: 'Mumbai, India',
      duration: '3 hours',
    },
    participants: 1,
    amount: 2500,
    status: 'Pending',
    paymentMethod: 'PayPal',
    paymentStatus: 'Pending',
    createdAt: '2024-04-05'
  },
  { 
    id: 'B12347',
    date: '2024-05-18',
    tourTime: '09:30',
    customer: {
      id: 'C003',
      name: 'Neha Gupta',
      email: 'neha.gupta@example.com',
      phone: '+91 76543 21098',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
    },
    guide: {
      id: 'G003',
      name: 'Arjun Patel',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    },
    tour: {
      name: 'Amber Fort Royal Tour',
      destination: 'Jaipur, India',
      duration: '4 hours',
    },
    participants: 4,
    amount: 2800,
    status: 'Confirmed',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Paid',
    createdAt: '2024-03-28'
  },
  { 
    id: 'B12348',
    date: '2024-05-16',
    tourTime: '06:00',
    customer: {
      id: 'C004',
      name: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      phone: '+91 65432 10987',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    },
    guide: {
      id: 'G004',
      name: 'Meera Iyer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    tour: {
      name: 'Sunrise Ganges Boat Ride',
      destination: 'Varanasi, India',
      duration: '2 hours',
    },
    participants: 2,
    amount: 2200,
    status: 'Cancelled',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Refunded',
    createdAt: '2024-04-02'
  },
  { 
    id: 'B12349',
    date: '2024-06-02',
    tourTime: '09:00',
    customer: {
      id: 'C005',
      name: 'Anita Desai',
      email: 'anita.desai@example.com',
      phone: '+91 54321 09876',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
    },
    guide: {
      id: 'G005',
      name: 'Vikram Nair',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    },
    tour: {
      name: 'Alleppey Backwater Cruise',
      destination: 'Kerala, India',
      duration: '6 hours',
    },
    participants: 2,
    amount: 3500,
    status: 'Confirmed',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    createdAt: '2024-04-10'
  },
  { 
    id: 'B12350',
    date: '2024-06-05',
    tourTime: '16:00',
    customer: {
      id: 'C006',
      name: 'Ravi Kumar',
      email: 'ravi.kumar@example.com',
      phone: '+91 43210 98765',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    },
    guide: {
      id: 'G006',
      name: 'Ananya Reddy',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
    },
    tour: {
      name: 'North Goa Beach Hopping',
      destination: 'Goa, India',
      duration: '6 hours',
    },
    participants: 2,
    amount: 2800,
    status: 'Pending',
    paymentMethod: 'PayPal',
    paymentStatus: 'Pending',
    createdAt: '2024-04-15'
  },
];

export default function BookingsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [destinationFilter, setDestinationFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [formattedDates, setFormattedDates] = useState<{[key: string]: string}>({});
  
  // Format date with consistent locale
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(dateString));
  };
  
  // Format dates after component mounts to ensure client-side only
  useEffect(() => {
    const dates: {[key: string]: string} = {};
    bookings.forEach(booking => {
      dates[`${booking.id}-date`] = formatDate(booking.date);
      dates[`${booking.id}-created`] = formatDate(booking.createdAt);
    });
    setFormattedDates(dates);
  }, []);
  
  // Extract unique destinations for filter
  const destinations = Array.from(new Set(bookings.map(booking => booking.tour.destination.split(',')[0])));
  
  // Filter bookings based on search and filters
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.guide.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status.toLowerCase() === statusFilter.toLowerCase();
    
    const matchesDestination = destinationFilter === 'all' || 
                              booking.tour.destination.toLowerCase().includes(destinationFilter.toLowerCase());
    
    let matchesDate = true;
    const today = new Date();
    const bookingDate = new Date(booking.date);
    
    if (dateFilter === 'today') {
      matchesDate = bookingDate.toDateString() === today.toDateString();
    } else if (dateFilter === 'tomorrow') {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      matchesDate = bookingDate.toDateString() === tomorrow.toDateString();
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
    
    return matchesSearch && matchesStatus && matchesDestination && matchesDate;
  });
  
  const toggleDropdown = (id: string) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

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
      case 'failed':
        return 'bg-red-900/60 text-red-300 border border-red-700';
      default:
        return 'bg-gray-700 text-gray-300 border border-gray-600';
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Bookings Management</h1>
          <p className="text-gray-400 mt-1">View and manage all tour bookings</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition shadow flex items-center">
            <FaDownload className="mr-2" />
            Export
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition shadow-lg shadow-orange-600/20 flex items-center">
            <FaPrint className="mr-2" />
            Print Report
          </button>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Bookings</p>
              <p className="text-2xl font-bold text-white">156</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <FaCalendarAlt className="text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Confirmed</p>
              <p className="text-2xl font-bold text-green-400">98</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <FaCheck className="text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">42</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <FaSort className="text-yellow-400" />
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Cancelled</p>
              <p className="text-2xl font-bold text-red-400">16</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <FaTimes className="text-red-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-700 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by ID, customer, guide, destination..."
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
                <option value="all">All Booking Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
              >
                <option value="all">All Destinations</option>
                {destinations.map((destination, index) => (
                  <option key={index} value={destination}>
                    {destination}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="text-gray-400" />
              </div>
              <input
                type="date"
                className="pl-10 pr-4 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Bookings Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50 text-left">
              <tr>
                <th className="p-4 font-medium text-gray-300">Booking ID</th>
                <th className="p-4 font-medium text-gray-300">
                  <div className="flex items-center">
                    Customer
                    <FaSort className="ml-1 text-gray-500 cursor-pointer" />
                  </div>
                </th>
                <th className="p-4 font-medium text-gray-300">Guide</th>
                <th className="p-4 font-medium text-gray-300">
                  <div className="flex items-center">
                    Tour 
                    <FaSort className="ml-1 text-gray-500 cursor-pointer" />
                  </div>
                </th>
                <th className="p-4 font-medium text-gray-300">
                  <div className="flex items-center">
                    Date
                    <FaSort className="ml-1 text-gray-500 cursor-pointer" />
                  </div>
                </th>
                <th className="p-4 font-medium text-gray-300">
                  <div className="flex items-center">
                    Amount
                    <FaSort className="ml-1 text-gray-500 cursor-pointer" />
                  </div>
                </th>
                <th className="p-4 font-medium text-gray-300">Status</th>
                <th className="p-4 font-medium text-gray-300">Payment</th>
                <th className="p-4 font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-t border-gray-700 hover:bg-gray-700/20 transition-colors">
                  <td className="p-4 font-medium text-gray-300">{booking.id}</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3 border border-gray-600">
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
                    <div className="flex items-center">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3 border border-gray-600">
                        <Image 
                          src={booking.guide.image} 
                          alt={booking.guide.name} 
                          fill 
                          sizes="32px"
                          style={{ objectFit: "cover" }}
                          unoptimized
                        />
                      </div>
                      <span className="text-gray-200">{booking.guide.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="text-gray-200">{booking.tour.name}</div>
                      <div className="text-xs text-gray-400">
                        <span className="flex items-center">
                          <FaMapMarkerAlt className="mr-1 text-gray-400" size={12} />
                          {booking.tour.destination}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        <span>{booking.tour.duration}, {booking.participants} {booking.participants > 1 ? 'persons' : 'person'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="text-gray-200">
                        <DateDisplay date={booking.date} className="text-sm" />
                      </div>
                      <div className="text-xs text-gray-400">{booking.tourTime} • {booking.tour.duration}</div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-200 font-medium">₹{booking.amount.toLocaleString()}</td>
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
                    <div className="flex space-x-1">
                      <button className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded transition-colors" title="View Details">
                        <FaEye size={14} />
                      </button>
                      <button className="p-1.5 text-orange-400 hover:text-orange-300 hover:bg-orange-900/30 rounded transition-colors" title="Edit Booking">
                        <FaPencilAlt size={14} />
                      </button>
                      <button className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded transition-colors" title="Cancel Booking">
                        <FaTrash size={14} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-300 hover:bg-gray-600 rounded transition-colors" title="More Options">
                        <FaEllipsisH size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredBookings.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-400">No bookings found matching your search criteria.</p>
          </div>
        )}
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </div>
          <div className="flex items-center">
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-l hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 bg-orange-600 text-white rounded-none">1</button>
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-none hover:bg-gray-600">2</button>
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-none hover:bg-gray-600">3</button>
            <span className="px-3 py-1 bg-gray-700 text-gray-300">...</span>
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-none hover:bg-gray-600">10</button>
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-r hover:bg-gray-600">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 