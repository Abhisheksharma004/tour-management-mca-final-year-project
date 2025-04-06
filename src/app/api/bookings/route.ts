import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import { getServerSession } from 'next-auth';

export async function GET(request: Request) {
  try {
    await connectDB();
    
    // Get the URL object from the request
    const url = new URL(request.url);
    
    // Get userId from query parameters
    const userId = url.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Fetch bookings for the user
    const bookings = await Booking.find({ userId })
      .populate('tourId') // Populate the tour details
      .sort({ bookingDate: -1 }); // Sort by booking date (newest first)
    
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch bookings. Please try again.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    
    // Parse request body
    const body = await request.json();
    
    // Extract booking data
    const { userId, tourId, numberOfParticipants } = body;
    
    if (!userId || !tourId || !numberOfParticipants) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create new booking
    const newBooking = await Booking.create({
      userId,
      tourId,
      numberOfParticipants,
      totalAmount: body.totalAmount,
      status: 'pending',
      paymentStatus: 'unpaid',
    });
    
    // Populate tour data
    await newBooking.populate('tourId');
    
    return NextResponse.json(
      { message: 'Booking created successfully', booking: newBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    
    return NextResponse.json(
      { error: 'Failed to create booking. Please try again.' },
      { status: 500 }
    );
  }
} 