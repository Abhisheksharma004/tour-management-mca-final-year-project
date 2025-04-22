import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { MongoClient, ObjectId } from "mongodb";

// Define interface for decoded JWT token
interface DecodedToken {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

// MongoDB connection string
const uri = process.env.MONGODB_URI as string;

// GET request handler
export async function GET(req: NextRequest) {
  try {
    // Get token from cookie
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access: No token provided" },
        { status: 401 }
      );
    }

    // Decode and verify token
    const secret = process.env.JWT_SECRET as string;
    if (!secret) {
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Decode the token
    const decodedToken = jwtDecode<DecodedToken>(token);

    // Check if user is admin
    if (decodedToken.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized access: Admin privileges required" },
        { status: 403 }
      );
    }

    // Initialize MongoDB client
    const client = new MongoClient(uri);
    
    try {
      await client.connect();
      console.log("Connected to MongoDB for dashboard data");
      
      const db = client.db();
      
      // Get counts and stats
      const [
        guidesCount, 
        destinationsCount,
        totalBookings,
        currentMonthBookings,
        totalRatings,
        monthlyRevenue,
        recentBookings,
        popularDestinations
      ] = await Promise.all([
        // Total guides count
        db.collection("guides").countDocuments({ status: "active" }),
        
        // Total destinations count
        db.collection("destinations").countDocuments(),
        
        // Total bookings
        db.collection("bookings").countDocuments(),
        
        // Bookings this month
        db.collection("bookings").countDocuments({
          startDate: { 
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
            $lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString()
          }
        }),
        
        // Get all ratings
        db.collection("reviews").find({}).toArray(),
        
        // Get monthly revenue data
        getMonthlyRevenue(db),
        
        // Get recent bookings with traveler, guide, and destination details
        getRecentBookings(db),
        
        // Get popular destinations
        getPopularDestinations(db)
      ]);
      
      // Calculate average rating
      const averageRating = totalRatings.length > 0 
        ? totalRatings.reduce((acc, curr) => acc + curr.rating, 0) / totalRatings.length 
        : 0;
        
      // Get previous month data for change percentage calculations
      const lastMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString();
      const lastMonthEnd = new Date(new Date().getFullYear(), new Date().getMonth(), 0).toISOString();
      
      const [
        previousMonthBookings,
        previousMonthNewGuides,
        previousMonthNewDestinations,
        previousMonthRatings
      ] = await Promise.all([
        // Previous month bookings
        db.collection("bookings").countDocuments({
          startDate: { $gte: lastMonthStart, $lte: lastMonthEnd }
        }),
        
        // Previous month new guides
        db.collection("guides").countDocuments({
          createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd }
        }),
        
        // Previous month new destinations
        db.collection("destinations").countDocuments({
          createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd }
        }),
        
        // Previous month ratings
        db.collection("reviews").find({
          createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd }
        }).toArray(),
      ]);
      
      // Current month new guides and destinations
      const [
        currentMonthNewGuides,
        currentMonthNewDestinations,
        currentMonthRatings
      ] = await Promise.all([
        // Current month new guides
        db.collection("guides").countDocuments({
          createdAt: { 
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
            $lte: new Date().toISOString()
          }
        }),
        
        // Current month new destinations
        db.collection("destinations").countDocuments({
          createdAt: { 
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
            $lte: new Date().toISOString()
          }
        }),
        
        // Current month ratings
        db.collection("reviews").find({
          createdAt: { 
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
            $lte: new Date().toISOString() 
          }
        }).toArray(),
      ]);
      
      // Calculate change percentages
      const previousMonthAvgRating = previousMonthRatings.length > 0 
        ? previousMonthRatings.reduce((acc, curr) => acc + curr.rating, 0) / previousMonthRatings.length 
        : 0;
        
      const currentMonthAvgRating = currentMonthRatings.length > 0 
        ? currentMonthRatings.reduce((acc, curr) => acc + curr.rating, 0) / currentMonthRatings.length 
        : 0;
      
      const bookingsChange = previousMonthBookings > 0 
        ? Math.round(((currentMonthBookings - previousMonthBookings) / previousMonthBookings) * 100) 
        : 100;
        
      const guidesChange = previousMonthNewGuides > 0 
        ? Math.round(((currentMonthNewGuides - previousMonthNewGuides) / previousMonthNewGuides) * 100) 
        : currentMonthNewGuides > 0 ? 100 : 0;
        
      const destinationsChange = previousMonthNewDestinations > 0 
        ? Math.round(((currentMonthNewDestinations - previousMonthNewDestinations) / previousMonthNewDestinations) * 100) 
        : currentMonthNewDestinations > 0 ? 100 : 0;
        
      const ratingChange = previousMonthAvgRating > 0 
        ? Math.round(((currentMonthAvgRating - previousMonthAvgRating) / previousMonthAvgRating) * 100) 
        : currentMonthAvgRating > 0 ? 100 : 0;
      
      // Prepare response
      return NextResponse.json({
        success: true,
        stats: {
          totalGuides: guidesCount,
          totalDestinations: destinationsCount,
          monthlyBookings: currentMonthBookings,
          averageRating: averageRating,
          guidesChange: guidesChange,
          destinationsChange: destinationsChange,
          bookingsChange: bookingsChange,
          ratingChange: ratingChange,
        },
        recentBookings,
        popularDestinations,
        monthlyRevenue,
      });
    } finally {
      await client.close();
      console.log("MongoDB connection closed");
    }
  } catch (error) {
    console.error("Error in dashboard API:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to get monthly revenue data
async function getMonthlyRevenue(db: any) {
  const currentYear = new Date().getFullYear();
  
  // Get all bookings for the current year
  const bookings = await db.collection("bookings").find({
    startDate: {
      $gte: new Date(currentYear, 0, 1).toISOString(),
      $lte: new Date(currentYear, 11, 31).toISOString()
    },
    status: { $in: ["confirmed", "completed"] }
  }).toArray();
  
  // Group bookings by month and calculate revenue
  const monthlyData = Array(12).fill(0).map((_, index) => ({
    month: new Date(currentYear, index).toLocaleString('default', { month: 'short' }),
    amount: 0
  }));
  
  bookings.forEach(booking => {
    const bookingDate = new Date(booking.startDate);
    if (bookingDate.getFullYear() === currentYear) {
      const monthIndex = bookingDate.getMonth();
      monthlyData[monthIndex].amount += booking.amount;
    }
  });
  
  return monthlyData;
}

// Helper function to get recent bookings
async function getRecentBookings(db: any) {
  const bookings = await db.collection("bookings")
    .aggregate([
      { $sort: { createdAt: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "travelers",
          localField: "travelerId",
          foreignField: "_id",
          as: "travelerInfo"
        }
      },
      {
        $lookup: {
          from: "guides",
          localField: "guideId",
          foreignField: "_id",
          as: "guideInfo"
        }
      },
      {
        $lookup: {
          from: "destinations",
          localField: "destinationId",
          foreignField: "_id",
          as: "destinationInfo"
        }
      },
      {
        $addFields: {
          travelerId: {
            _id: { $arrayElemAt: ["$travelerInfo._id", 0] },
            name: { $arrayElemAt: ["$travelerInfo.name", 0] },
            profileImage: { $arrayElemAt: ["$travelerInfo.profileImage", 0] },
          },
          guideId: {
            _id: { $arrayElemAt: ["$guideInfo._id", 0] },
            name: { $arrayElemAt: ["$guideInfo.name", 0] },
            profileImage: { $arrayElemAt: ["$guideInfo.profileImage", 0] },
          },
          destinationId: {
            _id: { $arrayElemAt: ["$destinationInfo._id", 0] },
            name: { $arrayElemAt: ["$destinationInfo.name", 0] },
          }
        }
      },
      {
        $project: {
          travelerInfo: 0,
          guideInfo: 0,
          destinationInfo: 0
        }
      }
    ]).toArray();
    
  return bookings;
}

// Helper function to get popular destinations
async function getPopularDestinations(db: any) {
  // Get all destinations
  const destinations = await db.collection("destinations")
    .aggregate([
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "destinationId",
          as: "bookings"
        }
      },
      {
        $addFields: {
          bookingsCount: { $size: "$bookings" },
          image: { $ifNull: ["$imageUrl", "/placeholder-destination.jpg"] }
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          bookingsCount: 1,
          image: 1
        }
      },
      { $sort: { bookingsCount: -1 } },
      { $limit: 5 }
    ]).toArray();
    
  return destinations;
} 