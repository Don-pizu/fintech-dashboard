//routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadSimple, uploadVideo } = require('../controllers/profileController');

const { protect } = require('../middleware/authMiddleware');  // To add authentication to the route 




//upload image with a simple setup
router.post('/upload-image', upload.single('image'), protect, uploadSimple);

//upload video with a simple setup
router.post('/upload-video', upload.single('video'), protect, uploadVideo);

module.exports = router;