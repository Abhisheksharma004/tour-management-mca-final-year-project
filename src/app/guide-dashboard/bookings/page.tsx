'use client';

import { useState, useEffect } from 'react';
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
  FaStar,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSpinner,
  FaInfoCircle
} from 'react-icons/fa';
import DateDisplay from '@/components/DateDisplay';
import { format } from 'date-fns';

// Define booking interface to match API response
interface Booking {
  id: string;
  travelerName: string;
  travelerEmail: string;
  tourName: string;
  date: string;
  participants: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export default function BookingsManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Fetch bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/guides/bookings');
        const data = await response.json();
        
        console.log('API Response:', data);
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch bookings');
        }
        
        // Ensure we have an array of bookings
        if (Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        } else {
          console.error('Invalid bookings data format:', data);
          throw new Error('Invalid data format received from server');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);
  
  // Filter bookings based on search and filters
  const filteredBookings = bookings.filter(booking => {
    // Handle case where any of these properties might be undefined
    const matchesSearch = 
      (booking.id?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
      (booking.tourName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
      (booking.travelerName?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (booking.status?.toLowerCase() || '') === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  
  // Get count of different status types
  const confirmedCount = bookings.filter(b => b.status?.toLowerCase() === 'confirmed').length;
  const pendingCount = bookings.filter(b => b.status?.toLowerCase() === 'pending').length;
  const cancelledCount = bookings.filter(b => b.status?.toLowerCase() === 'cancelled').length;
  
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
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
  
  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return <FaCheckCircle className="mr-1" />;
      case 'pending':
        return <FaInfoCircle className="mr-1" />;
      case 'cancelled':
        return <FaExclamationTriangle className="mr-1" />;
      case 'completed':
        return <FaCheckCircle className="mr-1" />;
      default:
        return null;
    }
  };
  
  // Format date helper
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PP');
    } catch (e) {
      return 'Invalid date';
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
              <p className="text-2xl font-bold text-white">{bookings.length}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <FaCalendarAlt className="text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs mb-1">Confirmed</p>
              <p className="text-2xl font-bold text-green-400">{confirmedCount}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <FaCheckCircle className="text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">{pendingCount}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <FaInfoCircle className="text-yellow-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs mb-1">Cancelled</p>
              <p className="text-2xl font-bold text-red-400">{cancelledCount}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <FaExclamationTriangle className="text-red-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-lg mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, tour or booking ID..."
              className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <select
              className="w-full md:w-40 pl-10 pr-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Loading and Error States */}
      {loading && (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
          <FaSpinner className="animate-spin text-4xl text-orange-500 mb-4" />
          <p className="text-gray-300">Loading your bookings...</p>
        </div>
      )}
      
      {error && (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-lg border border-red-800 shadow-lg">
          <FaExclamationTriangle className="text-4xl text-red-500 mb-4" />
          <p className="text-red-400 font-medium">Error loading bookings</p>
          <p className="text-gray-400 mt-2">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
          >
            Try Again
          </button>
        </div>
      )}
      
      {/* Bookings Table */}
      {!loading && !error && (
        <>
          {filteredBookings.length > 0 ? (
            <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700 bg-gray-900">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Booking Details</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Traveler</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-700/50 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-start">
                            <div>
                              <p className="text-sm font-medium text-white">{booking.tourName || 'Unnamed Tour'}</p>
                              <p className="text-xs text-gray-400">ID: {booking.id}</p>
                              <div className="flex items-center mt-1">
                                <FaUserFriends className="text-gray-500 mr-1 text-xs" />
                                <span className="text-xs text-gray-400">{booking.participants} people</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <p className="text-sm font-medium text-white">{booking.travelerName}</p>
                          <p className="text-xs text-gray-400">{booking.travelerEmail}</p>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <p className="text-sm text-white">{formatDate(booking.date)}</p>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)} inline-flex items-center`}>
                            {getStatusIcon(booking.status)}
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <p className="text-sm font-medium text-white">₹{booking.totalPrice}</p>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end space-x-2">
                            <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors" title="View Details">
                              <FaEye />
                            </button>
                            <button className="p-1 text-orange-400 hover:text-orange-300 transition-colors" title="Edit Booking">
                              <FaEdit />
                            </button>
                            <button className="p-1 text-red-400 hover:text-red-300 transition-colors" title="Cancel Booking">
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 shadow-lg text-center">
              <FaCalendarAlt className="text-4xl text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No bookings found</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No bookings match your search criteria. Try changing your filters.'
                  : 'You don\'t have any bookings yet. Once travelers book your tours, they will appear here.'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
} 