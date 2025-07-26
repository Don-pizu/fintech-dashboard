//routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const profileController = require('../controllers/profileController');



//upload image with a simple setup
router.post('/upload-video', upload.single('video'), profileController.uploadVideo);

module.exports = router;