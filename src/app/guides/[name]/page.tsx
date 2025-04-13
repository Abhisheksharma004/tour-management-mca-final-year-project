'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUser, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { use } from 'react';

// Define types
type Tour = {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  maxParticipants: number;
};

type Review = {
  id: number;
  user: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
};

type Availability = {
  date: string;
  slots: string[];
};

type Guide = {
  id: string;
  name: string;
  location: string;
  languages: string[];
  rating: number;
  reviews: number | Review[];
  price: number;
  experience: number;
  bio: string;
  profileImage: string;
  specialties: string[];
  tours: Tour[];
  availability: Availability[];
  slug: string;
  email?: string;
  phone?: string;
};

export default function GuideProfile({ params }: { params: { name: string } | Promise<{ name: string }> }) {
  // Unwrap params if it's a Promise
  const unwrappedParams = params instanceof Promise ? use(params) : params;
  const guideName = unwrappedParams.name;
  
  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTour, setSelectedTour] = useState('');
  const [participants, setParticipants] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [validTours, setValidTours] = useState<Tour[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTourObject, setSelectedTourObject] = useState<Tour | undefined>(undefined);

  // Fetch guide data
  useEffect(() => {
    const fetchGuideData = async () => {
      try {
        setLoading(true);
        
        console.log(`Fetching guide data for slug: ${guideName}`);
        
        // Fetch guide from API by slug (which is the guideName parameter)
        const response = await fetch(`/api/guides/profile?slug=${guideName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        });
        
        console.log(`API response status: ${response.status}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            console.error(`Guide not found: ${guideName}`);
            notFound();
          }
          
          // Try to get error details from response
          let errorDetail = '';
          try {
            const errorData = await response.json();
            errorDetail = errorData.error || errorData.details || response.statusText;
          } catch (e) {
            errorDetail = response.statusText;
          }
          
          throw new Error(`Failed to fetch guide: ${errorDetail}`);
        }
        
        const data = await response.json();
        console.log(`Received data: success=${data.success}, guide=${data.guide ? data.guide.name : 'undefined'}`);
        
        if (data.success && data.guide) {
          console.log(`Guide data loaded for: ${data.guide.name}`);
          console.log(`Tours found: ${data.guide.tours?.length || 0}, Availability slots: ${data.guide.availability?.length || 0}`);
          
          const guide = data.guide;
          setGuide(guide);
          
          // Process data immediately
          const tours = Array.isArray(guide.tours) && guide.tours.length > 0 ? guide.tours : [];
          setValidTours(tours);
          
          const dates = guide.availability?.map(item => item.date) || [];
          setAvailableDates(dates);
          
          // Set default selected tour if available
          if (tours.length > 0) {
            setSelectedTour(tours[0].id);
            setSelectedTourObject(tours[0]);
          }
          
          setError(null);
        } else if (data.error) {
          throw new Error(data.error);
        } else {
          throw new Error('Invalid response format from server');
        }
      } catch (err) {
        console.error('Error fetching guide:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchGuideData();
  }, [guideName]);

  // Update available times when date changes
  useEffect(() => {
    if (guide && selectedDate) {
      const times = guide.availability?.find(item => item.date === selectedDate)?.slots || [];
      setAvailableTimes(times);
    } else {
      setAvailableTimes([]);
    }
  }, [selectedDate, guide]);

  // Update selected tour object when tour selection changes
  useEffect(() => {
    if (validTours.length > 0 && selectedTour) {
      const tourObj = validTours.find(tour => tour.id === selectedTour);
      setSelectedTourObject(tourObj);
    }
  }, [selectedTour, validTours]);

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
    setSelectedTime(''); // Reset time when date changes
  };

  const handleBookTour = () => {
    if (!selectedDate || !selectedTime || !selectedTour) {
      alert('Please select a date, time and tour');
      return;
    }
    
    // In a real app, this would send the booking data to a server
    console.log('Booking:', {
      guideId: guide?.id,
      guideName: guide?.name,
      tourId: selectedTour,
      tourName: selectedTourObject?.title,
      date: selectedDate,
      time: selectedTime,
      participants
    });
    
    // Show success message
    setBookingSuccess(true);
    
    // Reset form
    setTimeout(() => {
      setSelectedDate('');
      setSelectedTime('');
      setParticipants(1);
      setBookingSuccess(false);
    }, 3000);
  };

  // If loading, show a loading spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-orange-500 mx-auto mb-4" size={40} />
          <h1 className="text-2xl font-bold">Loading guide profile...</h1>
          <p className="text-gray-300 mt-2">Please wait while we fetch the guide's information.</p>
        </div>
      </div>
    );
  }
  
  // If error, show error message
  if (error || !guide) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto bg-gray-800 p-8 rounded-lg">
          <h1 className="text-2xl font-bold text-red-400">Error Loading Guide</h1>
          <p className="text-gray-300 mt-4">{error || 'Failed to load guide information'}</p>
          <Link href="/search-guides">
            <button className="mt-6 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-md">
              Return to Search
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-12">
      {/* Header with guide photo and basic info */}
      <div className="relative h-96">
        <div className="absolute inset-0">
          <Image 
            src={guide.profileImage}
            alt={`${guide.name}, tour guide in ${guide.location} - cover image`}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            className="opacity-40"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-end">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image 
                src={guide.profileImage}
                alt={`${guide.name} - profile photo`}
                fill
                sizes="128px"
                style={{ objectFit: "cover" }}
                unoptimized
              />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h1 className="text-3xl font-bold">{guide.name}</h1>
              <p className="text-xl text-gray-300">{guide.location}</p>
              <div className="mt-2 flex items-center justify-center md:justify-start">
                <span className="text-yellow-500">★</span>
                <span className="ml-1 font-bold">{guide.rating}</span>
                <span className="ml-1 text-gray-300">({typeof guide.reviews === 'number' ? guide.reviews : guide.reviews.length} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">About {guide.name}</h2>
              <div className="space-y-4">
                <p className="text-gray-300">{guide.bio}</p>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold text-orange-400">Languages</h3>
                    <ul className="mt-2 text-gray-300">
                      {guide.languages.map((language, index) => (
                        <li key={index}>{language}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-orange-400">Specialties</h3>
                    <ul className="mt-2 text-gray-300">
                      {guide.specialties.map((specialty, index) => (
                        <li key={index}>{specialty}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="pt-4 mt-4 border-t border-gray-700">
                  <div className="flex justify-between">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{guide.experience}+</p>
                      <p className="text-gray-300">Years Experience</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{typeof guide.reviews === 'number' ? guide.reviews : guide.reviews.length}</p>
                      <p className="text-gray-300">Reviews</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">₹{guide.price}</p>
                      <p className="text-gray-300">Average Rate/Hour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Tours with {guide.name}</h2>
              {validTours.length > 0 ? (
                <div className="space-y-6">
                  {validTours.map((tour) => {
                    // Use title or name or a fallback
                    const tourTitle = tour.title || (tour as any).name || 'Unnamed Tour';
                    return (
                      <div 
                        key={tour.id} 
                        className={`p-4 rounded-lg transition-colors ${selectedTour === tour.id ? 'bg-gray-700 border border-orange-500' : 'bg-gray-700 border border-transparent hover:border-gray-600'}`}
                        onClick={() => setSelectedTour(tour.id)}
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 mb-4 md:mb-0">
                            <div className="relative h-40 md:h-full rounded-lg overflow-hidden">
                              <Image 
                                src={tour.image}
                                alt={`${tourTitle} - Tour offered by ${guide.name} in ${guide.location}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 25vw"
                                style={{ objectFit: "cover" }}
                                unoptimized
                              />
                            </div>
                          </div>
                          <div className="md:w-3/4 md:pl-6">
                            <div className="flex flex-wrap justify-between items-start mb-2">
                              <h3 className="text-xl font-bold">{tourTitle}</h3>
                              <p className="font-bold text-orange-400">₹{tour.price} / person</p>
                            </div>
                            <p className="text-gray-300 mb-4">{tour.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                              <div className="flex items-center">
                                <FaClock className="mr-1" />
                                <span>{tour.duration}</span>
                              </div>
                              <div className="flex items-center">
                                <FaUser className="mr-1" />
                                <span>Max {tour.maxParticipants} people</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 bg-gray-700 rounded-lg text-center">
                  <p className="text-gray-300">This guide has not added any tours yet.</p>
                  <p className="text-gray-400 mt-2">Please check back later or contact them directly for custom tour arrangements.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Right column - Booking */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-4">Book a Tour</h2>
              
              {bookingSuccess ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-green-800 text-white p-4 rounded-lg mb-4"
                >
                  <h3 className="font-bold text-lg">Booking Successful!</h3>
                  <p>Your tour with {guide.name} has been booked. Check your email for details.</p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Select Tour</label>
                    <select 
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={selectedTour}
                      onChange={(e) => setSelectedTour(e.target.value)}
                    >
                      {guide.tours.map(tour => (
                        <option key={tour.id} value={tour.id}>
                          {tour.title} - ₹{tour.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        <span>Select Date</span>
                      </div>
                    </label>
                    <select 
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={selectedDate}
                      onChange={handleDateChange}
                    >
                      <option value="">Choose a date</option>
                      {availableDates.map(date => (
                        <option key={date} value={date}>{date}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      <div className="flex items-center">
                        <FaClock className="mr-2" />
                        <span>Select Time</span>
                      </div>
                    </label>
                    <select 
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      disabled={!selectedDate}
                    >
                      <option value="">Choose a time</option>
                      {availableTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      <div className="flex items-center">
                        <FaUser className="mr-2" />
                        <span>Number of Participants</span>
                      </div>
                    </label>
                    <select 
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={participants}
                      onChange={(e) => setParticipants(Number(e.target.value))}
                    >
                      {[...Array(selectedTourObject?.maxParticipants || 10)].map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center text-lg mb-4">
                      <span className="font-medium">Total Price:</span>
                      <span className="font-bold text-orange-400">
                        ₹{selectedTourObject ? selectedTourObject.price * participants : 0}
                      </span>
                    </div>
                    
                    <motion.button 
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-md"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBookTour}
                    >
                      Book Now
                    </motion.button>
                    
                    <p className="text-sm text-gray-400 mt-2 text-center">
                      No payment required now. Pay directly to the guide.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 