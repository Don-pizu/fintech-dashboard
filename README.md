# 📊 Fintech Dashboard Backend

A backend service for managing user authentication, transactions, and secure media file uploads (images and videos) for a fintech application.

---

## 🚀 Features

- 🔐 **Authentication**: JWT-based login/register
- 💳 **Transaction System**: Credit and debit with admin override support
- 🧾 **Profile Management**: User profile image handling
- 📁 **Secure File Upload**: Image and video support with strict validation
- 🛡️ **File Upload Protection**: Extension + MIME checking, size limits, executable file blocking

---

## 📂 File Upload System

### ✅ Supported File Types

| Type    | Formats           | Max Size | Upload Path            |
|---------|-------------------|----------|------------------------|
| Image   | `.jpg`, `.jpeg`, `.png`, `.gif` | 20MB     | `/uploads/images/`     |
| Video   | `.mp4`, `.mov`     | 20MB     | `/uploads/videos/`     |

> 🚫 Executable files or unsupported types are automatically rejected.

### 🔐 File Security

- Unique filenames (`timestamp + randomNumber + extension`)
- Safe characters only
- MIME type and extension validation
- Executable and script file blocking
- JWT token required for access

---

## 🔌 API Endpoints

### 🖼️ Upload Image

POST /api/profile/upload-image
Headers:
  Authorization: Bearer <JWT_TOKEN>
Body (form-data):
  image: [file] (.jpg, .jpeg, .png, .gif | ≤ 20MB)


//Upload Video

POST /api/profile/upload-video
Headers:
  Authorization: Bearer <JWT_TOKEN>
Body (form-data):
  video: [file] (.mp4, .mov | ≤ 20MB)


📁 Upload Profile (Legacy)

POST /api/profile/upload-profile
Headers:
  Authorization: Bearer <JWT_TOKEN>
Body (form-data):
  profile: [file] (.jpg, .jpeg, .png, .gif | ≤ 20MB)


🔄 Response Format
✅ Success (200 OK)
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "filename": "1703123456789-123456789.jpg",
    "originalName": "profile.jpg",
    "filePath": "/uploads/images/1703123456789-123456789.jpg",
    "fileSize": "2.45",
    "mimetype": "image/jpeg",
    "profileImage": "/uploads/images/1703123456789-123456789.jpg"
  }
}


❌ Common Errors
Code	Reason
400	Invalid file or no file
401	Missing or invalid token
413	File size exceeds 20MB

🔬 Testing with Postman

Step 1: Start Server
npm start
Server will run at: http://localhost:5001


Step 2: Register & Login

Register
POST http://localhost:5001/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "password": "testpass123"
}

Login
POST http://localhost:5001/api/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "testpass123"
}
Copy the token from login response and use it in the Authorization header for uploads.

Step 3: Test Uploads
✅ Valid Image Upload
URL: http://localhost:5001/api/profile/upload-image

Method: POST

Headers: Authorization: Bearer <token>

Body: form-data

Key: image

Type: File

Value: Choose a valid .jpg, .png, .gif file (≤ 20MB)

✅ Valid Video Upload
URL: http://localhost:5001/api/profile/upload-video

Same format as above, but with video key and valid .mp4 or .mov




📁 Project Structure
bash
Copy
Edit
fintech-dashboard/
├── uploads/              # Uploaded files (ignored in Git)
│   ├── images/
│   └── videos/
├── middleware/           # Upload + Auth logic
├── controllers/          # Upload handlers
├── routes/               # API routes
└── .gitignore            # Excludes uploads, .env, etc.
📚 Documentation
API docs available at:
http://localhost:5001/api-docs

📝 License
Licensed under the ISC License