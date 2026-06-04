const router = require('express').Router();
const multer = require('multer');
const { protect } = require('../middleware/auth');
const { processUpload } = require('../controllers/uploadController');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only PDF and image files are allowed'));
  },
});

router.post('/', protect, upload.array('documents', 5), processUpload);

module.exports = router;