import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Guide from '@/models/Guide';

// GET /api/guides
export async function GET() {
  try {
    await connectDB();
    const guides = await Guide.find({}).sort({ createdAt: -1 });
    return NextResponse.json(guides);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch guides' },
      { status: 500 }
    );
  }
}

// POST /api/guides
export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const guide = await Guide.create(data);
    return NextResponse.json(guide, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create guide' },
      { status: 500 }
    );
  }
} 