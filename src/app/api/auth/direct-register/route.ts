import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

// Define schema for validation
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export async function POST(request: Request) {
  let client = null;
  
  try {
    console.log('Starting direct registration process...');
    
    // Parse and validate request body
    const body = await request.json();
    console.log('Received registration data:', { ...body, password: '[REDACTED]' });
    
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      console.log('Validation failed:', result.error.errors);
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const { name, email, password } = result.data;
    
    // Connect directly to MongoDB
    client = new MongoClient(process.env.MONGODB_URI || '');
    await client.connect();
    console.log('Connected to MongoDB');
    
    // Determine database name from connection string
    const uri = process.env.MONGODB_URI || '';
    const dbName = uri.split('/').pop()?.split('?')[0] || 'find_best_guide';
    console.log('Using database:', dbName);
    
    const db = client.db(dbName);
    
    // Check if users collection exists, create if it doesn't
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    if (!collectionNames.includes('users')) {
      console.log('Creating users collection...');
      await db.createCollection('users');
      await db.collection('users').createIndex({ email: 1 }, { unique: true });
    }
    
    // Check if user exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      console.log('User already exists with email:', email);
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Password hashed successfully');
    
    // Create user document
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: 'traveler',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Insert user directly
    console.log('Inserting user into database...');
    const insertResult = await db.collection('users').insertOne(newUser);
    console.log('User inserted with ID:', insertResult.insertedId);
    
    // Generate JWT token
    const token = jwt.sign(
      { id: insertResult.insertedId.toString() },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '30d' }
    );
    
    // Prepare response without password
    const userResponse = {
      _id: insertResult.insertedId.toString(),
      name,
      email,
      role: 'traveler'
    };
    
    console.log('Registration successful for:', email);
    
    return NextResponse.json({
      success: true,
      user: userResponse,
      token,
      message: 'User registered successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred during registration',
      stack: process.env.NODE_ENV !== 'production' && error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
} 