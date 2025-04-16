import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

interface DecodedToken {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  exp: number;
}

export async function POST(request: Request) {
  try {
    console.log('Canceling booking...');
    
    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({
        success: false,
        error: 'Not authenticated'
      }, { status: 401 });
    }
    
    // Parse request body to get bookingId
    const body = await request.json();
    const { bookingId } = body;
    
    if (!bookingId) {
      return NextResponse.json({
        success: false,
        error: 'Booking ID is required'
      }, { status: 400 });
    }
    
    // This is a placeholder that simulates successful cancellation
    return NextResponse.json({
      success: true,
      message: 'Booking canceled successfully'
    });
  } catch (error) {
    console.error('Error canceling booking:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while canceling the booking',
      stack: process.env.NODE_ENV !== 'production' && error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
} 