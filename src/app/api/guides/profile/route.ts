import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export async function GET() {
  try {
    // Get token from cookies
    const token = cookies().get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    
    // Check if user is a guide
    if (decoded.role !== 'guide') {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
    }

    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI as string);
    const db = client.db();

    // Find guide in database
    const guide = await db.collection('users').findOne({ 
      _id: new ObjectId(decoded.id),
      role: 'guide'
    });
    
    if (!guide) {
      await client.close();
      return NextResponse.json({ error: 'Guide not found' }, { status: 404 });
    }

    // Fetch additional guide-specific data if needed
    // For now we'll just use the user data

    await client.close();

    // Return guide data (excluding sensitive information)
    const { password, ...guideData } = guide;
    
    return NextResponse.json({ 
      success: true,
      guide: {
        ...guideData,
        id: guideData._id.toString()
      }
    });
    
  } catch (error) {
    console.error('Error fetching guide profile:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch guide profile'
    }, { status: 500 });
  }
} 