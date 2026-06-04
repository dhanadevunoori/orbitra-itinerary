const Itinerary = require('../models/Itinerary');

exports.getUserItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ user: req.user._id })
      .select('-rawExtractedText')
      .sort({ createdAt: -1 });
    res.json({ itineraries });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({ _id: req.params.id, user: req.user._id });
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
    res.json({ itinerary });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSharedItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      shareToken: req.params.token,
      isPublic: true,
    }).select('-rawExtractedText');
    if (!itinerary) return res.status(404).json({ message: 'Shared itinerary not found or is private' });
    res.json({ itinerary });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
    res.json({ message: 'Itinerary deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleVisibility = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({ _id: req.params.id, user: req.user._id });
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
    itinerary.isPublic = !itinerary.isPublic;
    await itinerary.save();
    res.json({ itinerary });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};