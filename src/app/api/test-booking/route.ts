import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import Tour from '@/models/Tour';
import User from '@/models/User';
import mongoose from 'mongoose';

// Function to generate a valid ObjectId
const createObjectId = () => new mongoose.Types.ObjectId();

export async function GET() {
  try {
    console.log('Starting test booking creation...');
    
    // Connect to database
    await connectDB();
    console.log('Connected to database successfully');
    
    // Check if there's at least one user in the database
    const user = await User.findOne();
    const userId = user ? user._id : createObjectId();
    console.log('Using user ID:', userId);
    
    // Check if there's at least one tour in the database
    const tour = await Tour.findOne();
    const tourId = tour ? tour._id : createObjectId();
    console.log('Using tour ID:', tourId);
    
    // Create test booking data
    const bookingData = {
      userId: userId,
      tourId: tourId,
      numberOfParticipants: 2,
      totalAmount: 5000,
      status: 'pending',
      paymentStatus: 'unpaid',
      bookingDate: new Date()
    };
    
    console.log('Creating test booking with data:', bookingData);
    
    // Create the booking
    const booking = await Booking.create(bookingData);
    console.log('Booking created successfully with ID:', booking._id);
    
    // Get all bookings count
    const bookingCount = await Booking.countDocuments();
    
    return NextResponse.json({
      success: true,
      message: 'Test booking created successfully',
      bookingId: booking._id.toString(),
      totalBookings: bookingCount
    });
  } catch (error) {
    console.error('Error creating test booking:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
} 