import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';

export async function GET() {
  try {
    // Get JWT token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
    }

    // Verify token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
    }

    try {
      const decoded = jwt.verify(token, secret) as { userId: string, role: string };
      
      if (decoded.role !== 'guide') {
        return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 403 });
      }
      
      // Connect to MongoDB
      await connectDB();
      
      console.log('Guide ID from token:', decoded.userId);
      
      // Find all bookings first to debug
      const allBookings = await Booking.find({});
      console.log('All bookings in system:', allBookings.length);
      
      // Find bookings for this guide
      const bookings = await Booking.find({ guideId: decoded.userId })
        .populate('travelerId')
        .populate('tourId')
        .sort({ createdAt: -1 });
      
      console.log('Bookings found for guide:', bookings.length);
      
      // Transform bookings to frontend format
      const transformedBookings = bookings.map(booking => ({
        id: booking._id.toString(),
        travelerName: booking.travelerId?.name || 'Unknown',
        travelerEmail: booking.travelerId?.email || 'No email',
        tourName: booking.tourId?.name || booking.tourName || 'Unnamed Tour',
        date: booking.date,
        participants: booking.participants,
        totalPrice: booking.price,
        status: booking.status,
        createdAt: booking.createdAt
      }));
      
      console.log('Transformed bookings:', transformedBookings.length);
      
      return NextResponse.json({ 
        success: true, 
        bookings: transformedBookings 
      });
      
    } catch (error) {
      console.error('Token verification error:', error);
      return NextResponse.json({ success: false, error: 'Invalid or expired token' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ success: false, error: 'Error fetching bookings' }, { status: 500 });
  }
} 