import mongoose from 'mongoose';

// Define the schema for your data
const DataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  // Add other fields as needed
}, {
  timestamps: true
});

// Create and export the model
export default mongoose.models.Data || mongoose.model('Data', DataSchema); 