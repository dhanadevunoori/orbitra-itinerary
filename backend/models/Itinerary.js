const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const DaySchema = new mongoose.Schema({
  day: Number,
  date: String,
  title: String,
  activities: [
    {
      time: String,
      description: String,
      location: String,
      type: { type: String, enum: ['flight', 'hotel', 'activity', 'transport', 'meal', 'other'] },
    },
  ],
});

const UploadedFileSchema = new mongoose.Schema({
  name: String,
  type: String,
});

const ItinerarySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  summary: String,
  destination: String,
  startDate: String,
  endDate: String,
  days: [DaySchema],
  rawExtractedText: String,
  uploadedFiles: [UploadedFileSchema],
  shareToken: { type: String, default: () => uuidv4(), unique: true },
  isPublic: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Itinerary', ItinerarySchema);