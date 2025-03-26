'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Mock data for guides focusing on Indian destinations
const MOCK_GUIDES = [
  {
    id: 1,
    name: 'Raj Mehta',
    location: 'Mumbai, India',
    languages: ['English', 'Hindi', 'Marathi'],
    rating: 4.9,
    reviews: 127,
    price: 2500,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    specialties: ['History', 'Food', 'Architecture'],
    slug: 'raj-mehta'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    location: 'Delhi, India',
    languages: ['English', 'Hindi', 'Punjabi'],
    rating: 5.0,
    reviews: 89,
    price: 3200,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    specialties: ['Heritage', 'Food Tours', 'Cultural Experiences'],
    slug: 'priya-sharma'
  },
  {
    id: 3,
    name: 'Arjun Patel',
    location: 'Jaipur, India',
    languages: ['English', 'Hindi', 'Rajasthani'],
    rating: 4.8,
    reviews: 215,
    price: 2800,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    specialties: ['History', 'Architecture', 'Photography'],
    slug: 'arjun-patel'
  },
  {
    id: 4,
    name: 'Meera Iyer',
    location: 'Varanasi, India',
    languages: ['English', 'Hindi', 'Sanskrit'],
    rating: 4.7,
    reviews: 94,
    price: 2200,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    specialties: ['Spiritual Tours', 'Cultural Heritage', 'Photography'],
    slug: 'meera-iyer'
  },
  {
    id: 5,
    name: 'Vikram Nair',
    location: 'Kerala, India',
    languages: ['English', 'Malayalam', 'Tamil'],
    rating: 4.9,
    reviews: 156,
    price: 2600,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    specialties: ['Backwaters', 'Nature', 'Culture'],
    slug: 'vikram-nair'
  },
  {
    id: 6,
    name: 'Ananya Reddy',
    location: 'Goa, India',
    languages: ['English', 'Konkani', 'Hindi'],
    rating: 4.8,
    reviews: 178,
    price: 3000,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
    specialties: ['Beaches', 'Nightlife', 'Portuguese Heritage'],
    slug: 'ananya-reddy'
  },
  {
    id: 7,
    name: 'Rahul Verma',
    location: 'Agra, India',
    languages: ['English', 'Hindi', 'Urdu'],
    rating: 4.9,
    reviews: 210,
    price: 3400,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    specialties: ['Mughal History', 'Architecture', 'Photography'],
    slug: 'rahul-verma'
  },
  {
    id: 8,
    name: 'Sunita Das',
    location: 'Darjeeling, India',
    languages: ['English', 'Bengali', 'Nepali'],
    rating: 4.7,
    reviews: 86,
    price: 2400,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    specialties: ['Tea Plantations', 'Himalayan Treks', 'Local Culture'],
    slug: 'sunita-das'
  },
  {
    id: 9,
    name: 'Ajay Gupta',
    location: 'Delhi, India',
    languages: ['English', 'Hindi', 'French'],
    rating: 4.8,
    reviews: 123,
    price: 2700,
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1448&q=80',
    specialties: ['Street Food', 'History', 'Local Markets'],
    slug: 'ajay-gupta'
  },
  {
    id: 10,
    name: 'Shreya Choudhury',
    location: 'Mumbai, India',
    languages: ['English', 'Hindi', 'Gujarati'],
    rating: 4.7,
    reviews: 95,
    price: 2650,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
    specialties: ['Bollywood', 'Urban Culture', 'Coastal Cuisine'],
    slug: 'shreya-choudhury'
  },
  {
    id: 11,
    name: 'Nikhil Desai',
    location: 'Jaipur, India',
    languages: ['English', 'Hindi', 'German'],
    rating: 4.6,
    reviews: 78,
    price: 2450,
    image: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    specialties: ['Craft Workshops', 'Royal Heritage', 'Textile History'],
    slug: 'nikhil-desai'
  },
  {
    id: 12,
    name: 'Kavita Singh',
    location: 'Varanasi, India',
    languages: ['English', 'Hindi', 'Bhojpuri'],
    rating: 4.9,
    reviews: 142,
    price: 2300,
    image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=689&q=80',
    specialties: ['Spiritual Ceremonies', 'River Cruises', 'Ancient History'],
    slug: 'kavita-singh'
  }
];

export default function SearchGuides() {
  const searchParams = useSearchParams();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [language, setLanguage] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [filters, setFilters] = useState({
    priceMin: 500,
    priceMax: 5000,
    rating: 0
  });

  // Handle location parameter from destination pages
  useEffect(() => {
    const locationParam = searchParams.get('location');
    if (locationParam) {
      setLocation(locationParam);
    }
  }, [searchParams]);

  // Filter guides based on search criteria
  const filteredGuides = MOCK_GUIDES.filter(guide => {
    const matchLocation = !location || guide.location.toLowerCase().includes(location.toLowerCase());
    const matchLanguage = !language || guide.languages.some(lang => lang.toLowerCase().includes(language.toLowerCase()));
    const matchSpecialty = !specialty || guide.specialties.some(spec => spec.toLowerCase().includes(specialty.toLowerCase()));
    const matchPrice = guide.price >= filters.priceMin && guide.price <= filters.priceMax;
    const matchRating = guide.rating >= filters.rating;
    
    return matchLocation && matchLanguage && matchSpecialty && matchPrice && matchRating;
  });

  return (
    <div className="min-h-screen bg-gray-900 pb-12">
      {/* Search Header */}
      <section className="bg-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">Find Your Perfect Guide in India</h1>
          <div className="bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">Destination</label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where in India?"
                  className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-1">Language</label>
                <input
                  type="text"
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  placeholder="Hindi, English, etc."
                  className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400"
                />
              </div>
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-300 mb-1">Specialty</label>
                <input
                  type="text"
                  id="specialty"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  placeholder="History, Food, Culture, etc."
                  className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <button 
                onClick={() => {
                  // Reset focus on search button when clicked
                  if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                  }
                }}
                className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                Search Guides
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 bg-gray-800 p-4 rounded-lg shadow-md h-fit">
            <h2 className="font-semibold text-lg mb-4 text-white">Filters</h2>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2 text-gray-300">Price Range (₹ per hour)</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={filters.priceMin}
                  onChange={(e) => setFilters({...filters, priceMin: Number(e.target.value)})}
                  className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                  min="500"
                />
                <span className="text-gray-300">to</span>
                <input
                  type="number"
                  value={filters.priceMax}
                  onChange={(e) => setFilters({...filters, priceMax: Number(e.target.value)})}
                  className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                  min="500"
                  max="5000"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2 text-gray-300">Minimum Rating</h3>
              <select 
                value={filters.rating} 
                onChange={(e) => setFilters({...filters, rating: Number(e.target.value)})}
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              >
                <option value="0">Any rating</option>
                <option value="3">3+ stars</option>
                <option value="4">4+ stars</option>
                <option value="4.5">4.5+ stars</option>
                <option value="5">5 stars only</option>
              </select>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2 text-gray-300">Popular Specialties</h3>
              <div className="space-y-2">
                {['History', 'Food', 'Culture', 'Architecture', 'Spirituality', 'Nature', 'Photography'].map((item) => (
                  <div key={item} className="flex items-center">
                    <input
                      id={`specialty-${item}`}
                      type="checkbox"
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-700 rounded bg-gray-700"
                      onChange={() => setSpecialty(specialty === item ? '' : item)}
                      checked={specialty === item}
                    />
                    <label htmlFor={`specialty-${item}`} className="ml-2 text-sm text-gray-300">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => {
                setFilters({ priceMin: 500, priceMax: 5000, rating: 0 });
                setSpecialty('');
                setLocation('');
                setLanguage('');
              }}
              className="w-full py-2 text-sm text-orange-400 border border-orange-500 rounded-md hover:bg-gray-700"
            >
              Reset Filters
            </button>
          </div>
          
          {/* Guide Results */}
          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">
                {filteredGuides.length} Guide{filteredGuides.length !== 1 ? 's' : ''} Available
              </h2>
              <select className="p-2 border border-gray-600 rounded-md bg-gray-700 text-white">
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: High to Low</option>
                <option>Reviews: Most to Least</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <Link href={`/guides/${guide.slug}`} key={guide.id}>
                  <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={guide.image}
                        alt={`${guide.name}, local guide in ${guide.location}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                        unoptimized
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-white">{guide.name}</h3>
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="ml-1 font-medium text-white">{guide.rating}</span>
                          <span className="ml-1 text-gray-400 text-sm">({guide.reviews})</span>
                        </div>
                      </div>
                      <p className="text-gray-300 mt-1">{guide.location}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {guide.specialties.slice(0, 3).map((specialty, idx) => (
                          <span key={idx} className="px-2 py-1 bg-orange-900 text-orange-300 rounded-full text-xs">
                            {specialty}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 text-sm text-gray-300">
                        Speaks: {guide.languages.join(', ')}
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="font-bold text-white">₹{guide.price} <span className="text-sm font-normal text-gray-300">/ hour</span></div>
                        <span className="px-3 py-1 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700">
                          View Profile
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {filteredGuides.length === 0 && (
              <div className="text-center py-12 bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-white">No guides found</h3>
                <p className="mt-2 text-gray-300">Try adjusting your search filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 