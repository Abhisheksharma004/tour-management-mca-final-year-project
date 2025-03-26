'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaSort,
  FaMapMarkedAlt,
  FaGlobe,
  FaUserFriends,
  FaTag
} from 'react-icons/fa';
import DateDisplay from '@/components/DateDisplay';

// Mock data for destinations
const destinationsData = [
  {
    id: 1,
    name: 'Delhi',
    region: 'North India',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
    status: 'Active',
    popularityRank: 1,
    tourCount: 8,
    guideCount: 5,
    lastUpdated: '2024-04-10',
    featured: true
  },
  {
    id: 2,
    name: 'Mumbai',
    region: 'West India',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7',
    status: 'Active',
    popularityRank: 2,
    tourCount: 7,
    guideCount: 4,
    lastUpdated: '2024-04-12',
    featured: true
  },
  {
    id: 3,
    name: 'Jaipur',
    region: 'North India',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1599661046827-9d1be56d4043',
    status: 'Active',
    popularityRank: 3,
    tourCount: 6,
    guideCount: 3,
    lastUpdated: '2024-04-08',
    featured: true
  },
  {
    id: 4,
    name: 'Varanasi',
    region: 'North India',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1561361058-c24cecda72e5',
    status: 'Active',
    popularityRank: 4,
    tourCount: 5,
    guideCount: 2,
    lastUpdated: '2024-04-05',
    featured: false
  },
  {
    id: 5,
    name: 'Goa',
    region: 'West India',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
    status: 'Active',
    popularityRank: 5,
    tourCount: 6,
    guideCount: 3,
    lastUpdated: '2024-04-11',
    featured: true
  },
  {
    id: 6,
    name: 'Kerala',
    region: 'South India',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944',
    status: 'Active',
    popularityRank: 6,
    tourCount: 4,
    guideCount: 2,
    lastUpdated: '2024-04-07',
    featured: true
  },
  {
    id: 7,
    name: 'Agra',
    region: 'North India',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523',
    status: 'Active',
    popularityRank: 7,
    tourCount: 3,
    guideCount: 2,
    lastUpdated: '2024-04-09',
    featured: true
  },
  {
    id: 8,
    name: 'Darjeeling',
    region: 'East India',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1544634980-e3e81a389340',
    status: 'Inactive',
    popularityRank: 8,
    tourCount: 2,
    guideCount: 1,
    lastUpdated: '2024-03-30',
    featured: false
  }
];

export default function DestinationsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [featuredFilter, setFeaturedFilter] = useState('All');
  
  // Get unique regions for filter dropdown
  const regions = ['All', ...new Set(destinationsData.map(dest => dest.region))];
  
  // Filter destinations based on search term, region, status, and featured
  const filteredDestinations = destinationsData.filter(destination => {
    const matchesSearch = 
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      destination.region.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = 
      regionFilter === 'All' || destination.region === regionFilter;
    
    const matchesStatus = 
      statusFilter === 'All' || destination.status === statusFilter;
    
    const matchesFeatured = 
      featuredFilter === 'All' || 
      (featuredFilter === 'Featured' && destination.featured) || 
      (featuredFilter === 'Not Featured' && !destination.featured);
    
    return matchesSearch && matchesRegion && matchesStatus && matchesFeatured;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Destinations Management</h1>
          <p className="text-gray-400 mt-1">Manage your travel destinations and their information</p>
        </div>
        <Link 
          href="/admin/destinations/new" 
          className="mt-4 md:mt-0 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition shadow-lg shadow-orange-600/20 flex items-center"
        >
          <FaPlus className="mr-2" />
          Add New Destination
        </Link>
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden mb-8">
        {/* Filters */}
        <div className="p-4 border-b border-gray-700 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search destinations by name or region..."
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaGlobe className="text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
              >
                {regions.map((region, index) => (
                  <option key={index} value={region}>{region}</option>
                ))}
              </select>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaTag className="text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                value={featuredFilter}
                onChange={(e) => setFeaturedFilter(e.target.value)}
              >
                <option value="All">All Destinations</option>
                <option value="Featured">Featured Only</option>
                <option value="Not Featured">Not Featured</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Destinations Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50 text-left">
              <tr>
                <th className="p-4 font-medium text-gray-300">Destination</th>
                <th className="p-4 font-medium text-gray-300">
                  <div className="flex items-center">
                    Region
                    <FaSort className="ml-1 text-gray-500 cursor-pointer" />
                  </div>
                </th>
                <th className="p-4 font-medium text-gray-300">
                  <div className="flex items-center">
                    Popularity
                    <FaSort className="ml-1 text-gray-500 cursor-pointer" />
                  </div>
                </th>
                <th className="p-4 font-medium text-gray-300">Tours</th>
                <th className="p-4 font-medium text-gray-300">Guides</th>
                <th className="p-4 font-medium text-gray-300">Status</th>
                <th className="p-4 font-medium text-gray-300">Featured</th>
                <th className="p-4 font-medium text-gray-300">Last Updated</th>
                <th className="p-4 font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDestinations.map((destination) => (
                <tr key={destination.id} className="border-t border-gray-700 hover:bg-gray-700/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden mr-3 border border-gray-600">
                        <Image 
                          src={destination.image} 
                          alt={destination.name} 
                          fill 
                          sizes="40px"
                          style={{ objectFit: "cover" }}
                          unoptimized
                        />
                      </div>
                      <span className="font-medium text-gray-200">{destination.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <FaMapMarkedAlt className="text-orange-400 mr-2" />
                      <span className="text-gray-300">{destination.region}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${
                        destination.popularityRank <= 3 ? 'bg-green-900 text-green-300' : 
                        destination.popularityRank <= 6 ? 'bg-blue-900 text-blue-300' : 
                        'bg-gray-700 text-gray-300'
                      }`}>
                        {destination.popularityRank}
                      </span>
                      <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-600 to-orange-400" 
                          style={{ width: `${Math.max(100 - (destination.popularityRank * 10), 10)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-gray-200 font-medium">{destination.tourCount}</span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center">
                      <FaUserFriends className="text-gray-400 mr-1" />
                      <span className="text-gray-200">{destination.guideCount}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      destination.status === 'Active' ? 'bg-green-900/60 text-green-300 border border-green-700' : 
                      'bg-red-900/60 text-red-300 border border-red-700'
                    }`}>
                      {destination.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {destination.featured ? (
                      <span className="px-2 py-1 rounded-full text-xs bg-orange-900/60 text-orange-300 border border-orange-700">
                        Featured
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs bg-gray-700 text-gray-400 border border-gray-600">
                        Not Featured
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-gray-300">
                    <DateDisplay date={destination.lastUpdated} className="text-sm text-gray-400" />
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button 
                        className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                        title="View Destination"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="p-1 text-orange-400 hover:text-orange-300 transition-colors"
                        title="Edit Destination"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        title="Delete Destination"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredDestinations.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-400">No destinations found matching your search criteria.</p>
          </div>
        )}
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-700 flex justify-between items-center">
          <p className="text-sm text-gray-400">Showing {filteredDestinations.length} of {destinationsData.length} destinations</p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-l hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 bg-orange-600 text-white rounded-none">1</button>
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-r hover:bg-gray-600">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 