import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin'],
    required: true,
    default: 'patient'
  },

  // New field for doctor availability
  availability: [
    {
      day: { type: String, enum: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], required: true },
      startTime: { type: String, required: true }, // e.g., "09:00"
      endTime: { type: String, required: true }   // e.g., "17:00"
    }
  ]
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
