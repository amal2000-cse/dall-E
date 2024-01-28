# DALL-E Image Generation Project

This project is a MERN stack application that utilizes the OpenAI API for image generation based on user-entered text prompts. The generated images are stored in MongoDB, and Cloudinary is used for image storage.

## Frontend

### Technologies Used:
- React
- Vite
- Tailwind CSS

### Project Structure:
- `src/pages/CreatePostt.jsx`: React component for creating posts with image generation.
- `src/pages/Home.jsx`: Display all the generated images in the community showcase.

### Running the Frontend:
1. Install dependencies: `npm install`
2. Run the development server: `npm run dev`

## Backend

### Technologies Used:
- Node.js
- Express
- MongoDB
- Cloudinary
- React
- Tailwind

### Project Structure:
- `mongodb/models/post.js`: Mongoose schema for MongoDB, defining the structure of the Post collection.
- `routes/posts.js`: Express routes for handling post-related operations.

### Running the Backend:
1. Install dependencies: `npm install`
2. Set up environment variables (`.env`) with Cloudinary and MongoDB credentials.
3. Run the server: `npm start`

## Database Schema

### Post Schema:
```javascript
const mongoose = require("mongoose");

const Post = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
});

const PostSchema = mongoose.model("Post", Post);
module.exports = PostSchema;
```
### API Endpoints:

GET /api/v1/post: Retrieve all posts.
POST /api/v1/post: Create a new post with a name, prompt, and generated photo.

###Deployment
The application is deployed on Render at https://dall-e-3d8u.onrender.com/.
