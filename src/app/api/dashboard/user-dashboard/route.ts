import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  exp?: number;
}

export async function GET() {
  try {
    // Retrieve token from cookies - use await as cookies() returns Promise in newer Next.js versions
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify JWT token
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Decode the token (don't verify yet to get the ID for debugging)
    let decoded: DecodedToken;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
      console.log('Decoded token:', decoded);
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    if (!decoded || typeof decoded !== 'object' || !decoded.id) {
      console.error('Token missing user ID');
      return NextResponse.json(
        { success: false, error: 'Invalid token format' },
        { status: 401 }
      );
    }

    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      console.error('MONGODB_URI is not defined');
      return NextResponse.json(
        { success: false, error: 'Database configuration error' },
        { status: 500 }
      );
    }

    const client = new MongoClient(MONGODB_URI);
    
    try {
      await client.connect();
      console.log('Connected to MongoDB');
      
      const db = client.db();
      
      // Find the user - try with string ID first
      console.log('Looking up user with ID:', decoded.id);
      
      // Try to convert string ID to ObjectId
      let user;
      try {
        // Try with ObjectId first
        const userId = new ObjectId(decoded.id);
        user = await db.collection('users').findOne(
          { _id: userId }, 
          { projection: { password: 0 } } // Exclude password
        );
      } catch (error) {
        // If ObjectId conversion fails, try with string ID
        user = await db.collection('users').findOne(
          { _id: decoded.id as any }, 
          { projection: { password: 0 } } // Exclude password
        );
      }

      if (!user) {
        console.error(`User not found with ID: ${decoded.id}`);
        return NextResponse.json(
          { success: false, error: 'User not found' },
          { status: 404 }
        );
      }
      
      console.log('User found:', user);

      // For demo purposes, generate mock dashboard data
      // In a real application, you would fetch this from your database
      const userData = {
        name: user.name || 'User',
        avatar: user.avatar || 'https://via.placeholder.com/150',
        upcomingBookings: [
          {
            id: 'booking1',
            tourName: 'Historic City Tour',
            guideName: 'John Smith',
            location: 'Rome, Italy',
            date: '2023-12-15',
            time: '10:00 AM',
            status: 'Confirmed',
            image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop',
            hasReviewed: false
          },
          {
            id: 'booking2',
            tourName: 'Food Tasting Experience',
            guideName: 'Maria Garcia',
            location: 'Barcelona, Spain',
            date: '2024-01-20',
            time: '6:00 PM',
            status: 'Confirmed',
            image: 'https://images.unsplash.com/photo-1512753360435-329c4535a9a7?q=80&w=2070&auto=format&fit=crop',
            hasReviewed: false
          }
        ],
        pastBookings: [
          {
            id: 'booking3',
            tourName: 'Mountain Trekking',
            guideName: 'Alex Johnson',
            location: 'Swiss Alps',
            date: '2023-08-05',
            time: '8:00 AM',
            status: 'Completed',
            image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop',
            hasReviewed: true
          },
          {
            id: 'booking4',
            tourName: 'Cultural Heritage Walk',
            guideName: 'Sophia Lee',
            location: 'Kyoto, Japan',
            date: '2023-09-12',
            time: '2:00 PM',
            status: 'Completed',
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
            hasReviewed: false
          }
        ],
        savedGuides: [
          {
            id: 'guide1',
            name: 'Emma Wilson',
            location: 'London, UK',
            rating: 4.8,
            specialty: 'Historical Tours',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'
          },
          {
            id: 'guide2',
            name: 'Carlos Rodriguez',
            location: 'Mexico City, Mexico',
            rating: 4.9,
            specialty: 'Culinary Tours',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop'
          },
          {
            id: 'guide3',
            name: 'Aisha Patel',
            location: 'Mumbai, India',
            rating: 4.7,
            specialty: 'Cultural Experiences',
            image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=1974&auto=format&fit=crop'
          }
        ]
      };

      // Return the dashboard data
      return NextResponse.json({
        success: true,
        userData
      }, { status: 200 });
      
    } finally {
      await client.close();
      console.log('MongoDB connection closed');
    }
    
  } catch (error) {
    console.error('Error in dashboard API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Server error', 
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined 
      },
      { status: 500 }
    );
  }
} 