'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaFilter, FaStar, FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import DateDisplay from '@/components/DateDisplay';

// Mock data for guides
const guidesData = [
  {
    id: 1,
    name: 'Raj Mehta',
    location: 'Mumbai, India',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    languages: ['English', 'Hindi', 'Marathi'],
    rating: 4.8,
    reviews: 127,
    status: 'Active',
    specialties: ['Historical Tours', 'Food & Culture', 'Photography'],
    lastUpdated: '2024-04-12'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    location: 'Delhi, India',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    languages: ['English', 'Hindi', 'Punjabi'],
    rating: 4.9,
    reviews: 215,
    status: 'Active',
    specialties: ['Heritage Tours', 'Street Food', 'Shopping'],
    lastUpdated: '2024-04-15'
  },
  {
    id: 3,
    name: 'Arjun Patel',
    location: 'Jaipur, India',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    languages: ['English', 'Hindi', 'Rajasthani'],
    rating: 4.7,
    reviews: 98,
    status: 'Active',
    specialties: ['Palace Tours', 'Cultural Experiences', 'Desert Safaris'],
    lastUpdated: '2024-04-08'
  },
  {
    id: 4,
    name: 'Meera Iyer',
    location: 'Varanasi, India',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    languages: ['English', 'Hindi', 'Sanskrit'],
    rating: 4.6,
    reviews: 94,
    status: 'On Leave',
    specialties: ['Spiritual Tours', 'Cultural Heritage', 'Photography'],
    lastUpdated: '2024-04-02'
  },
  {
    id: 5,
    name: 'Vikram Nair',
    location: 'Kerala, India',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    languages: ['English', 'Malayalam', 'Tamil'],
    rating: 4.9,
    reviews: 156,
    status: 'Active',
    specialties: ['Backwaters', 'Nature', 'Ayurveda'],
    lastUpdated: '2024-04-14'
  },
  {
    id: 6,
    name: 'Anita Desai',
    location: 'Kolkata, India',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    languages: ['English', 'Bengali', 'Hindi'],
    rating: 4.7,
    reviews: 88,
    status: 'Inactive',
    specialties: ['Cultural Heritage', 'Food Tours', 'Literary Tours'],
    lastUpdated: '2024-03-25'
  },
];

export default function GuidesManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Filter guides based on search term and status
  const filteredGuides = guidesData.filter(guide => {
    const matchesSearch = 
      guide.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      guide.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesStatus = statusFilter === 'All' || guide.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Guides Management</h1>
          <p className="text-gray-400 mt-1">Manage your tour guides and their information</p>
        </div>
        <Link 
          href="/admin/guides/new" 
          className="mt-4 md:mt-0 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition shadow-lg shadow-orange-600/20 flex items-center"
        >
          <FaPlus className="mr-2" />
          Add New Guide
        </Link>
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-700 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search guides by name, location, or specialty..."
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
            <button className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 border border-gray-600 transition">
              More Filters
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50 text-left">
              <tr>
                <th className="p-4 font-medium text-gray-300">Guide</th>
                <th className="p-4 font-medium text-gray-300">Location</th>
                <th className="p-4 font-medium text-gray-300">Languages</th>
                <th className="p-4 font-medium text-gray-300">Rating</th>
                <th className="p-4 font-medium text-gray-300">Specialties</th>
                <th className="p-4 font-medium text-gray-300">Status</th>
                <th className="p-4 font-medium text-gray-300">Last Updated</th>
                <th className="p-4 font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuides.map((guide) => (
                <tr key={guide.id} className="border-t border-gray-700 hover:bg-gray-700/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 border border-gray-600">
                        <Image 
                          src={guide.profileImage} 
                          alt={guide.name} 
                          fill 
                          sizes="40px"
                          style={{ objectFit: "cover" }}
                          unoptimized
                        />
                      </div>
                      <span className="font-medium text-gray-200">{guide.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{guide.location}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {guide.languages.map((language, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className="text-gray-200 font-medium mr-1">{guide.rating}</span>
                      <FaStar className="text-yellow-400" />
                      <span className="text-gray-400 text-sm ml-1">({guide.reviews})</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {guide.specialties.map((specialty, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      guide.status === 'Active' ? 'bg-green-900/60 text-green-300 border border-green-700' : 
                      guide.status === 'Inactive' ? 'bg-red-900/60 text-red-300 border border-red-700' : 
                      'bg-yellow-900/60 text-yellow-300 border border-yellow-700'
                    }`}>
                      {guide.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">
                    <DateDisplay date={guide.lastUpdated} className="text-sm text-gray-400" />
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button 
                        className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                        title="View Guide"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="p-1 text-orange-400 hover:text-orange-300 transition-colors"
                        title="Edit Guide"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        title="Delete Guide"
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
        
        {filteredGuides.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-400">No guides found matching your search criteria.</p>
          </div>
        )}
        
        <div className="p-4 border-t border-gray-700 flex justify-between items-center">
          <p className="text-sm text-gray-400">Showing {filteredGuides.length} of {guidesData.length} guides</p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 