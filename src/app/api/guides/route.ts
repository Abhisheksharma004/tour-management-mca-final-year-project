import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

// GET /api/guides
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const language = searchParams.get('language');
    const specialty = searchParams.get('specialty');
    const priceMin = searchParams.get('priceMin') ? parseInt(searchParams.get('priceMin')!) : 0;
    const priceMax = searchParams.get('priceMax') ? parseInt(searchParams.get('priceMax')!) : 10000;
    const rating = searchParams.get('rating') ? parseInt(searchParams.get('rating')!) : 0;

    // Connect to database
    await connectDB();
    
    // Build query to find users with role 'guide'
    const query: any = { role: 'guide' };
    
    // Add filters if provided
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (language) {
      // Simpler query for languages
      query.languages = { $regex: language, $options: 'i' };
    }
    
    if (specialty) {
      // Simpler query for specialties
      query.specialties = { $regex: specialty, $options: 'i' };
    }
    
    if (priceMin || priceMax) {
      query.price = { 
        $gte: priceMin || 0, 
        $lte: priceMax || 10000 
      };
    }
    
    if (rating > 0) {
      query.rating = { $gte: rating };
    }
    
    // Find guides using Mongoose
    const guides = await User.find(query).limit(50).lean();
    
    // Transform guides to match the frontend format
    const transformedGuides = guides.map(guide => ({
      id: guide._id.toString(),
      name: guide.name || 'Guide',
      location: guide.location || 'India',
      languages: Array.isArray(guide.languages) ? guide.languages : [guide.languages || 'English'],
      rating: guide.rating || 4.5,
      reviews: guide.reviews || Math.floor(Math.random() * 100) + 20,
      price: guide.price || 2000,
      image: guide.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      specialties: Array.isArray(guide.specialties) ? guide.specialties : [guide.specialties || 'Tours'],
      slug: guide.slug || guide._id.toString()
    }));

    return NextResponse.json({
      success: true,
      guides: transformedGuides
    });
  } catch (error) {
    console.error('Error fetching guides:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch guides' },
      { status: 500 }
    );
  }
}

// POST /api/guides
export async function POST(request: Request) {
  try {
    await connectDB();
    
    const data = await request.json();
    const newGuide = new User({
      ...data,
      role: 'guide',
      createdAt: new Date()
    });
    
    await newGuide.save();
    
    return NextResponse.json({ 
      success: true, 
      id: newGuide._id 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating guide:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create guide' },
      { status: 500 }
    );
  }
} 