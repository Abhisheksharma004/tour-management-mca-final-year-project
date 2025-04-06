import mongoose from 'mongoose';

const TourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a tour title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a tour description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a tour price'],
    min: [0, 'Price must be a positive number'],
  },
  duration: {
    type: Number,
    required: [true, 'Please provide tour duration'],
    min: [1, 'Duration must be at least 1 day'],
  },
  location: {
    type: String,
    required: [true, 'Please provide tour location'],
  },
  image: {
    type: String,
    default: '/images/default-tour.jpg',
  },
  date: {
    type: Date,
    required: [true, 'Please provide tour date'],
  },
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guide',
    required: [true, 'Tour must be associated with a guide'],
  },
  maxParticipants: {
    type: Number,
    required: [true, 'Please provide maximum number of participants'],
    min: [1, 'Must allow at least 1 participant'],
  },
  availableSpots: {
    type: Number,
    required: [true, 'Please provide available spots'],
    min: [0, 'Available spots cannot be negative'],
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

// Check if the model already exists before creating a new one
const Tour = mongoose.models.Tour || mongoose.model('Tour', TourSchema);

export default Tour; 