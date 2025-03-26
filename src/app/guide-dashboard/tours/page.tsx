'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaSearch, 
  FaFilter, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaClock, 
  FaUsers, 
  FaRupeeSign, 
  FaTrashAlt, 
  FaEdit, 
  FaEye, 
  FaPlus,
  FaSort,
  FaToggleOn,
  FaToggleOff,
  FaEllipsisV
} from 'react-icons/fa';
import DateDisplay from '@/components/DateDisplay';

// Sample tour data
const tours = [
  {
    id: 'T001',
    name: 'Old Delhi Heritage Tour',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
    description: 'Explore the historic streets and monuments of Old Delhi with a knowledgeable local guide.',
    location: 'Delhi, India',
    duration: '4 hours',
    price: 1600,
    maxParticipants: 6,
    status: 'Active',
    bookings: 12,
    rating: 4.8,
    lastUpdated: '2024-04-10',
    upcoming: 2
  },
  {
    id: 'T002',
    name: 'Mumbai Heritage Walk',
    image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7',
    description: 'Discover the colonial architecture and history of South Mumbai on this guided walking tour.',
    location: 'Mumbai, India',
    duration: '3 hours',
    price: 1200,
    maxParticipants: 8,
    status: 'Active',
    bookings: 18,
    rating: 4.7,
    lastUpdated: '2024-04-05',
    upcoming: 3
  },
  {
    id: 'T003',
    name: 'Cultural Food Tour',
    image: 'https://images.unsplash.com/photo-1596392301391-8bac945b6139',
    description: 'Sample the diverse flavors of Mumbai street food with safety and expertise.',
    location: 'Mumbai, India',
    duration: '3 hours',
    price: 1400,
    maxParticipants: 6,
    status: 'Active',
    bookings: 24,
    rating: 4.9,
    lastUpdated: '2024-04-12',
    upcoming: 2
  },
  {
    id: 'T004',
    name: 'City Highlights Tour',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
    description: 'See the most iconic landmarks of Delhi in this comprehensive city tour.',
    location: 'Delhi, India',
    duration: '6 hours',
    price: 2400,
    maxParticipants: 4,
    status: 'Draft',
    bookings: 0,
    rating: 0,
    lastUpdated: '2024-04-20',
    upcoming: 0
  },
  {
    id: 'T005',
    name: 'Street Food Adventure',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950',
    description: 'Experience the authentic flavors of Delhi street food with a culinary expert.',
    location: 'Delhi, India',
    duration: '3 hours',
    price: 1200,
    maxParticipants: 6,
    status: 'Inactive',
    bookings: 8,
    rating: 4.6,
    lastUpdated: '2024-03-25',
    upcoming: 0
  }
];

export default function ToursManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [activeView, setActiveView] = useState('grid');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  
  // Filter tours based on search and filters
  const filteredTours = tours.filter(tour => {
    const matchesSearch = 
      tour.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tour.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || tour.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort filtered tours
  const sortedTours = [...filteredTours].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      case 'oldest':
        return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      case 'popular':
        return b.bookings - a.bookings;
      default:
        return 0;
    }
  });
  
  const toggleDropdown = (id: string) => {
    setShowDropdown(showDropdown === id ? null : id);
  };
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-900/60 text-green-300 border border-green-700';
      case 'inactive':
        return 'bg-red-900/60 text-red-300 border border-red-700';
      case 'draft':
        return 'bg-yellow-900/60 text-yellow-300 border border-yellow-700';
      default:
        return 'bg-gray-700 text-gray-300 border border-gray-600';
    }
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Tour Management</h1>
          <p className="text-gray-400 mt-1">Create and manage your tour listings</p>
        </div>
        <Link 
          href="/guide-dashboard/tours/new"
          className="mt-4 sm:mt-0 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition shadow-lg shadow-orange-600/20 flex items-center text-sm"
        >
          <FaPlus className="mr-2" />
          Create New Tour
        </Link>
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
              placeholder="Search tours by name, location, or keywords..."
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSort className="text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
            
            <div className="flex border border-gray-600 rounded-md overflow-hidden">
              <button
                className={`px-3 py-2 ${activeView === 'grid' ? 'bg-gray-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'}`}
                onClick={() => setActiveView('grid')}
              >
                Grid
              </button>
              <button
                className={`px-3 py-2 ${activeView === 'list' ? 'bg-gray-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'}`}
                onClick={() => setActiveView('list')}
              >
                List
              </button>
            </div>
          </div>
        </div>
        
        {/* Grid View */}
        {activeView === 'grid' && (
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedTours.map((tour) => (
                <div key={tour.id} className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600 shadow-md hover:shadow-lg transition-all hover:translate-y-[-2px]">
                  <div className="relative h-40">
                    <Image 
                      src={tour.image} 
                      alt={tour.name} 
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                    <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs ${getStatusColor(tour.status)}`}>
                      {tour.status}
                    </span>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-white mb-1">{tour.name}</h3>
                    
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <FaMapMarkerAlt className="mr-1" size={12} />
                      {tour.location}
                    </div>
                    
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-400 mb-3">
                      <div className="flex items-center">
                        <FaClock className="mr-1" size={10} />
                        {tour.duration}
                      </div>
                      <div className="flex items-center">
                        <FaUsers className="mr-1" size={10} />
                        Max: {tour.maxParticipants}
                      </div>
                      <div className="flex items-center">
                        <FaRupeeSign className="mr-1" size={10} />
                        {tour.price} per person
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-400">
                        <div>Bookings: <span className="text-white">{tour.bookings}</span></div>
                        {tour.upcoming > 0 && (
                          <div className="text-orange-400">{tour.upcoming} upcoming</div>
                        )}
                      </div>
                      
                      <div className="flex gap-1">
                        <Link 
                          href={`/guide-dashboard/tours/${tour.id}`}
                          className="p-2 bg-gray-800 text-blue-400 hover:text-blue-300 rounded"
                        >
                          <FaEye size={14} />
                        </Link>
                        <Link 
                          href={`/guide-dashboard/tours/${tour.id}/edit`}
                          className="p-2 bg-gray-800 text-orange-400 hover:text-orange-300 rounded"
                        >
                          <FaEdit size={14} />
                        </Link>
                        <button 
                          className="p-2 bg-gray-800 text-gray-400 hover:text-white rounded"
                          onClick={() => toggleDropdown(tour.id)}
                        >
                          <FaEllipsisV size={14} />
                        </button>
                        
                        {showDropdown === tour.id && (
                          <div className="absolute mt-8 right-0 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 w-36">
                            <button 
                              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
                            >
                              {tour.status === 'Active' ? (
                                <>
                                  <FaToggleOff className="mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <FaToggleOn className="mr-2" />
                                  Activate
                                </>
                              )}
                            </button>
                            <button 
                              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center"
                            >
                              <FaTrashAlt className="mr-2" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* List View */}
        {activeView === 'list' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50 text-left">
                <tr>
                  <th className="p-4 font-medium text-gray-300">Tour</th>
                  <th className="p-4 font-medium text-gray-300">Location</th>
                  <th className="p-4 font-medium text-gray-300">Duration</th>
                  <th className="p-4 font-medium text-gray-300">Price</th>
                  <th className="p-4 font-medium text-gray-300">Bookings</th>
                  <th className="p-4 font-medium text-gray-300">Status</th>
                  <th className="p-4 font-medium text-gray-300">Last Updated</th>
                  <th className="p-4 font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedTours.map((tour) => (
                  <tr key={tour.id} className="border-t border-gray-700 hover:bg-gray-700/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-3 border border-gray-600">
                          <Image 
                            src={tour.image} 
                            alt={tour.name} 
                            fill 
                            sizes="48px"
                            style={{ objectFit: "cover" }}
                            unoptimized
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{tour.name}</h3>
                          <div className="text-xs text-gray-400">#{tour.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">{tour.location}</td>
                    <td className="p-4 text-gray-300">{tour.duration}</td>
                    <td className="p-4 text-gray-300">₹{tour.price}</td>
                    <td className="p-4">
                      <div className="text-white">{tour.bookings} total</div>
                      {tour.upcoming > 0 && (
                        <div className="text-xs text-orange-400">{tour.upcoming} upcoming</div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(tour.status)}`}>
                        {tour.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">
                      <DateDisplay date={tour.lastUpdated} className="text-sm" />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2 relative">
                        <Link 
                          href={`/guide-dashboard/tours/${tour.id}`}
                          className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded transition-colors" 
                          title="View Tour"
                        >
                          <FaEye size={14} />
                        </Link>
                        <Link 
                          href={`/guide-dashboard/tours/${tour.id}/edit`}
                          className="p-1.5 text-orange-400 hover:text-orange-300 hover:bg-orange-900/30 rounded transition-colors" 
                          title="Edit Tour"
                        >
                          <FaEdit size={14} />
                        </Link>
                        <button 
                          className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors" 
                          title="More Options"
                          onClick={() => toggleDropdown(tour.id)}
                        >
                          <FaEllipsisV size={14} />
                        </button>
                        
                        {showDropdown === tour.id && (
                          <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 w-36">
                            <button 
                              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
                            >
                              {tour.status === 'Active' ? (
                                <>
                                  <FaToggleOff className="mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <FaToggleOn className="mr-2" />
                                  Activate
                                </>
                              )}
                            </button>
                            <button 
                              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center"
                            >
                              <FaTrashAlt className="mr-2" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {sortedTours.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-400">No tours found matching your search criteria.</p>
            <Link
              href="/guide-dashboard/tours/new"
              className="inline-block mt-4 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
            >
              Create Your First Tour
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 