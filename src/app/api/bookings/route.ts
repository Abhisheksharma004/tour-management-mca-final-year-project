import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import User from '@/models/User';
import { sendEmail, generateBookingConfirmationEmail } from '@/lib/email';

interface DecodedToken {
  id: string;
  email: string;
  role: string;
}

// POST /api/bookings
export async function POST(request: Request) {
  try {
    // Get token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    // Check if user exists and is a traveler
    await connectDB();
    const user = await User.findById(decoded.id);

    if (!user || user.role !== 'traveler') {
      return NextResponse.json(
        { success: false, error: 'Only travelers can create bookings' },
        { status: 403 }
      );
    }

    // Get booking data from request
    const bookingData = await request.json();

    // Validate required fields
    if (!bookingData.guideId || !bookingData.tourId || !bookingData.date || !bookingData.participants || !bookingData.totalPrice) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new booking
    const booking = new Booking({
      travelerId: user._id,
      travelerName: user.name,
      travelerEmail: user.email,
      ...bookingData,
      status: 'pending',
      createdAt: new Date()
    });

    // Save booking to database
    await booking.save();

    // Send booking confirmation email
    const emailHtml = generateBookingConfirmationEmail({
      travelerName: user.name,
      guideName: bookingData.guideName,
      tourName: bookingData.tourName,
      date: bookingData.date,
      participants: bookingData.participants,
      totalPrice: bookingData.totalPrice
    });

    await sendEmail({
      to: user.email,
      subject: `Tour Booking Confirmation - ${bookingData.tourName}`,
      html: emailHtml
    });

    return NextResponse.json({
      success: true,
      booking: {
        id: booking._id,
        guideId: booking.guideId,
        tourId: booking.tourId,
        date: booking.date,
        participants: booking.participants,
        totalPrice: booking.totalPrice,
        status: booking.status,
        createdAt: booking.createdAt
      }
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

// GET /api/bookings
export async function GET(request: Request) {
  try {
    // Get token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    // Connect to database
    await connectDB();

    // Get user
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Get bookings based on user role
    let bookings;
    if (user.role === 'traveler') {
      bookings = await Booking.find({ travelerId: user._id })
        .sort({ createdAt: -1 })
        .populate('guideId', 'name email phone')
        .populate('tourId', 'title price');
    } else if (user.role === 'guide') {
      bookings = await Booking.find({ guideId: user._id })
        .sort({ createdAt: -1 })
        .populate('travelerId', 'name email')
        .populate('tourId', 'title price');
    }

    return NextResponse.json({
      success: true,
      bookings: bookings.map(booking => ({
        id: booking._id,
        guideId: booking.guideId,
        travelerId: booking.travelerId,
        tourId: booking.tourId,
        date: booking.date,
        participants: booking.participants,
        totalPrice: booking.totalPrice,
        status: booking.status,
        createdAt: booking.createdAt
      }))
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
} 