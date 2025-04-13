import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  travelerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  travelerName: {
    type: String,
    required: true
  },
  travelerEmail: {
    type: String,
    required: true
  },
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  guideName: {
    type: String,
    required: true
  },
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true
  },
  tourName: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  participants: {
    type: Number,
    required: true,
    min: 1
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for better query performance
bookingSchema.index({ travelerId: 1, createdAt: -1 });
bookingSchema.index({ guideId: 1, createdAt: -1 });
bookingSchema.index({ date: 1 });

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema); 