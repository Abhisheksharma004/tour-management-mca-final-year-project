import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  let client = null;
  
  try {
    // Get the token from the Authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({
        authenticated: false,
        error: 'No token provided'
      }, { status: 401 });
    }
    
    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as { id: string };
    } catch (e) {
      return NextResponse.json({
        authenticated: false,
        error: 'Invalid token'
      }, { status: 401 });
    }
    
    if (!decoded.id) {
      return NextResponse.json({
        authenticated: false,
        error: 'Invalid token payload'
      }, { status: 401 });
    }
    
    // Connect to MongoDB
    client = new MongoClient(process.env.MONGODB_URI || '');
    await client.connect();
    
    // Get the database name
    const uri = process.env.MONGODB_URI || '';
    const dbName = uri.split('/').pop()?.split('?')[0] || 'find_best_guide';
    
    const db = client.db(dbName);
    
    // Find the user
    let userId;
    try {
      userId = new ObjectId(decoded.id);
    } catch (e) {
      return NextResponse.json({
        authenticated: false,
        error: 'Invalid user ID format'
      }, { status: 401 });
    }
    
    const user = await db.collection('users').findOne(
      { _id: userId },
      { projection: { password: 0 } } // Exclude password
    );
    
    if (!user) {
      return NextResponse.json({
        authenticated: false,
        error: 'User not found'
      }, { status: 401 });
    }
    
    // Convert ObjectId to string for JSON
    user._id = user._id.toString();
    
    return NextResponse.json({
      authenticated: true,
      user
    });
  } catch (error) {
    console.error('Auth check error:', error);
    
    return NextResponse.json({
      authenticated: false,
      error: 'Server error during authentication check'
    }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
} 