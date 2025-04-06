import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db';
import User from '@/models/User';
import Booking from '@/models/Booking';

async function getUserBookings(userId: string) {
  try {
    await connectDB();
    
    // Find user to verify they exist
    const user = await User.findById(userId);
    if (!user) {
      return { error: 'User not found' };
    }
    
    // Find bookings for this user
    const bookings = await Booking.find({ userId })
      .populate({
        path: 'tourId',
        populate: { path: 'guideId', select: 'name' }
      })
      .sort({ bookingDate: -1 })
      .limit(5);
    
    return { bookings, user };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return { error: 'Failed to fetch dashboard data' };
  }
}

// Mock user for development
const mockUser = {
  _id: '123456789012345678901234',
  name: 'Test Traveler',
  email: 'traveler@example.com',
  role: 'traveler',
};

export default async function TravelerDashboard() {
  // In production, you would use actual authentication
  // const session = await getServerSession();
  // const userId = session?.user?.id;
  
  // For development, use mock user ID
  const userId = mockUser._id;
  
  // Fetch user and bookings
  const { bookings, user, error } = await getUserBookings(userId);
  
  if (error) {
    if (error === 'User not found') {
      return notFound();
    }
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error loading dashboard data. Please try again later.
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}!</h1>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
          <p className="text-3xl font-bold text-blue-600">{bookings?.length || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Upcoming Tours</h3>
          <p className="text-3xl font-bold text-green-600">
            {bookings?.filter(b => new Date(b.tourId.date) > new Date() && b.status !== 'cancelled').length || 0}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Completed Tours</h3>
          <p className="text-3xl font-bold text-purple-600">
            {bookings?.filter(b => new Date(b.tourId.date) < new Date() && b.status === 'completed').length || 0}
          </p>
        </div>
      </div>
      
      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Bookings</h2>
          <Link href="/traveler/bookings" className="text-blue-600 hover:text-blue-800">
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings && bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{booking.tourId.title}</div>
                          <div className="text-sm text-gray-500">Guide: {booking.tourId.guideId?.name || 'Unknown'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(booking.tourId.date).toLocaleDateString('en-GB')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{booking.totalAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={`/traveler/bookings/${booking._id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Recommended Tours */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recommended Tours</h2>
          <Link href="/traveler/tours" className="text-blue-600 hover:text-blue-800">
            View All Tours
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img 
              src="/images/tours/delhi-heritage.jpg" 
              alt="Delhi Heritage Walk" 
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">Delhi Heritage Walk</h3>
              <p className="text-gray-600 text-sm mb-2">Explore the rich history of Delhi with our expert guide</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold">₹2,500</span>
                <Link href="/traveler/tours/123" className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  View Details
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img 
              src="/images/tours/taj-mahal.jpg" 
              alt="Agra Taj Mahal Tour" 
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">Agra Taj Mahal Tour</h3>
              <p className="text-gray-600 text-sm mb-2">Visit the iconic Taj Mahal and Agra Fort in a day trip</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold">₹4,500</span>
                <Link href="/traveler/tours/456" className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 