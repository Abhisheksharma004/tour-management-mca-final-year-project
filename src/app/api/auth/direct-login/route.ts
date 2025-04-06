import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

// Define schema for validation
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

export async function POST(request: Request) {
  let client = null;
  
  try {
    console.log('Starting direct login process...');
    
    // Parse and validate request body
    const body = await request.json();
    console.log('Received login data for:', body.email);
    
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      console.log('Validation failed:', result.error.errors);
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const { email, password } = result.data;
    
    // Connect directly to MongoDB
    client = new MongoClient(process.env.MONGODB_URI || '');
    await client.connect();
    console.log('Connected to MongoDB');
    
    // Determine database name from connection string
    const uri = process.env.MONGODB_URI || '';
    const dbName = uri.split('/').pop()?.split('?')[0] || 'find_best_guide';
    console.log('Using database:', dbName);
    
    const db = client.db(dbName);
    
    // Find user by email
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      console.log('User not found with email:', email);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password for user:', email);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '30d' }
    );
    
    // Prepare response without password
    const userResponse = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    };
    
    console.log('Login successful for:', email);
    
    return NextResponse.json({
      success: true,
      user: userResponse,
      token,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred during login',
      stack: process.env.NODE_ENV !== 'production' && error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
} 