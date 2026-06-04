const router = require('express').Router();
const { protect } = require('../middleware/auth');
const {
  getUserItineraries,
  getItineraryById,
  getSharedItinerary,
  deleteItinerary,
  toggleVisibility,
} = require('../controllers/itineraryController');

router.get('/', protect, getUserItineraries);
router.get('/share/:token', getSharedItinerary);    // public, no auth
router.get('/:id', protect, getItineraryById);
router.delete('/:id', protect, deleteItinerary);
router.patch('/:id/visibility', protect, toggleVisibility);

module.exports = router;