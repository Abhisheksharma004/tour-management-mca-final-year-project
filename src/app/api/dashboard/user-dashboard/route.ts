import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: string;
  role: string;
  exp: number;
  iat: number;
}

export async function GET() {
  try {
    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    
    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI as string);
    const db = client.db();
    
    // Find user in database
    const user = await db.collection('users').findOne({ 
      _id: new ObjectId(decoded.id)
    });
    
    if (!user) {
      await client.close();
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Mock data for now - would be replaced with actual data from DB
    const userData = {
      name: user.name,
      email: user.email,
      avatar: user.avatar || '/images/default-avatar.png',
      phone: user.phone || '',
      location: user.location || '',
      dob: user.dob || '',
      bio: user.bio || '',
      preferences: {
        tourTypes: user.preferences?.tourTypes || [],
        languages: user.preferences?.languages || []
      },
      profileCompleted: user.profileCompleted || false,
      upcomingBookings: [
        {
          id: '1',
          tourName: 'Historical Delhi Walk',
          guideName: 'Amit Sharma',
          location: 'Delhi, India',
          date: '2023-07-15',
          time: '09:00 AM',
          status: 'Confirmed',
          image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5'
        },
        {
          id: '2',
          tourName: 'Agra Food Tour',
          guideName: 'Priya Patel',
          location: 'Agra, India',
          date: '2023-08-03',
          time: '06:00 PM',
          status: 'Pending',
          image: 'https://images.unsplash.com/photo-1528493859953-39d70f2a62f2'
        }
      ],
      pastBookings: [
        {
          id: '3',
          tourName: 'Mumbai Street Art Tour',
          guideName: 'Rohan Mehta',
          location: 'Mumbai, India',
          date: '2023-04-20',
          time: '11:00 AM',
          status: 'Completed',
          image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875',
          hasReviewed: true
        },
        {
          id: '4',
          tourName: 'Jaipur Heritage Walk',
          guideName: 'Vikram Singh',
          location: 'Jaipur, India',
          date: '2023-03-12',
          time: '08:30 AM',
          status: 'Completed',
          image: 'https://images.unsplash.com/photo-1477586957327-847a0f3f4fe3',
          hasReviewed: false
        }
      ],
      savedGuides: [
        {
          id: '101',
          name: 'Deepak Kumar',
          location: 'Varanasi, India',
          rating: 4.9,
          specialty: 'Cultural & Religious Tours',
          image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115'
        },
        {
          id: '102',
          name: 'Ananya Desai',
          location: 'Goa, India',
          rating: 4.7,
          specialty: 'Beach & Water Activities',
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
        },
        {
          id: '103',
          name: 'Rajiv Kapoor',
          location: 'Darjeeling, India',
          rating: 4.8,
          specialty: 'Mountain Treks & Tea Tours',
          image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d'
        }
      ]
    };
    
    await client.close();
    
    return NextResponse.json({
      success: true,
      userData
    });
    
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch dashboard data'
    }, { status: 500 });
  }
} 