import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Booking must be associated with a user'],
  },
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must be associated with a tour'],
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  numberOfParticipants: {
    type: Number,
    required: [true, 'Please provide number of participants'],
    min: [1, 'Number of participants must be at least 1'],
  },
  totalAmount: {
    type: Number,
    required: [true, 'Please provide total amount'],
    min: [0, 'Total amount cannot be negative'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'refunded'],
    default: 'unpaid',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual populate to get tour details
BookingSchema.virtual('tour', {
  ref: 'Tour',
  localField: 'tourId',
  foreignField: '_id',
  justOne: true,
});

// Virtual populate to get user details
BookingSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

// Make virtuals show up when converting to JSON
BookingSchema.set('toJSON', { virtuals: true });
BookingSchema.set('toObject', { virtuals: true });

// Check if the model already exists before creating a new one
const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

export default Booking; 