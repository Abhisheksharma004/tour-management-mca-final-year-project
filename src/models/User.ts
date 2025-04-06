import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['traveler', 'admin'],
    default: 'traveler',
  },
  avatar: {
    type: String,
    default: 'https://ui-avatars.com/api/?name=User&background=random',
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
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

// Method to compare password
UserSchema.methods.matchPassword = async function(enteredPassword: string) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
};

// Check if the model already exists before creating a new one
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User; 