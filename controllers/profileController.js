 //controllers/profileController.js

/*

const User = require('../models/User');

exports.uploadProfileImage = async (req, res) => {
try {
    const userId = req.user._id;
    const profilePath = req.file.path;

const user = await User.findByIdAndUpdate (
    userId,
    { profileImage: profilePath},
    { new: true }
);

res.json({
    message: 'Profile image uploaded successfully',
    profileImage: user.profileImage
});
} catch (error) {
    res.status(500).json({ error: 'Failed to upload profile image'});
  }
};

*/

//NUMBER 1 ===== upload image

const path = require('path');
const User = require('../models/User');


exports.uploadSimple = async (req, res) => {
    try {

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // File type check — allow only images
      const allowedExtensions = /\.(jpg|jpeg|png|gif)$/i;
      const ext = path.extname(req.file.originalname).toLowerCase();
      const mime = req.file.mimetype.toLowerCase();

      if (!allowedExtensions.test(ext)) {
        return res.status(400).json({ message: 'Invalid file type. Only images are allowed.' });
      }

      // ✅ Save image path to the user
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.profileImage = `uploads/${req.file.filename}`;
        await user.save();

      // Optional: Rename file or move it if needed

      res.json({
        message: 'File uploaded successfully',
        file: {
          originalname: req.file.originalname,
          filename: req.file.filename,
          path: req.file.path,
          size: req.file.size,
          mimetype: req.file.mimetype,
          profileImage: user.profileImage,
        },
      });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload profile image'});
  }
};


//Number 2  ===== upload video

exports.uploadVideo = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No Video Uploaded' }); // 
    }

    // Optional: check MIME type again if needed
    const allowedVideoTypes = /mp4|mov/;
    const ext = path.extname(req.file.originalname).toLowerCase();

    if (!allowedVideoTypes.test(ext)) {
        return res.status(400).json({ message: 'Unsupported video format. Only .mp4 and .mov are allowed.' });
    }

    res.json({
        message: 'Video Uploaded Successfully',
        file: {
            originalname: req.file.originalname,
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            mimetype: req.file.mimetype,
        },
    });
};