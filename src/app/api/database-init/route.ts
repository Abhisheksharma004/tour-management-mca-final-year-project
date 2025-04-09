import { NextResponse } from 'next/server';
import { connectToDatabase, createDemoDataIfEmpty } from '@/lib/db-schema-utils';

export async function GET() {
  try {
    console.log('Starting database initialization...');
    
    // Connect to database and initialize collections
    const { client, db } = await connectToDatabase();
    console.log('Connected to database');
    
    try {
      // Create demo data if the database is empty
      await createDemoDataIfEmpty(db);
      
      // Return success response
      return NextResponse.json({
        success: true,
        message: 'Database initialized successfully',
        collections: await db.listCollections().toArray().then(cols => cols.map(c => c.name)),
        demoDataCreated: true
      });
    } finally {
      await client.close();
      console.log('Database connection closed');
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
      stack: process.env.NODE_ENV !== 'production' && error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
} 