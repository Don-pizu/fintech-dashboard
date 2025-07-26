//middleware/upload.js

const multer = require('multer');

const path = require('path');

/*

 // Basic setup using 'dest' = multer handles file saving automatically
//for in memory(as a buffer) storsge

// NUMBER 1
const upload = multer ({dest: 'uploads/'});

module.exports = upload;

*/

// 1. Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files to 'uploads' folder
  },
  filename: function (req, file, cb) {
    // Corrected: Fix typo in template string
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, uniqueName + ext); // e.g., 1659988891234-123456789.jpg
  },
});

// 2. File filter: only allow certain types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp4|mov/;

  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype.toLowerCase();

  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

// 3. Multer upload setup
const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB max 
  },
  fileFilter,
});

module.exports = upload;


