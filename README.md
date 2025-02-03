# Simple Blog Application

A simple blog application built using React.js for the frontend, Node.js + Express.js for the backend, and MongoDB for storing blog posts. The application supports CRUD operations for blog posts.

## Features

- View a list of blog posts.
- View a detailed view of each blog post.
- Create new blog posts.
- Edit existing blog posts.
- Delete blog posts.
- Basic form validation.
- Error handling.
- CORS enabled for cross-origin requests.
- Optional authentication with JWT (for future implementation).

## Technology Stack

### Backend
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database to store blog posts.
- **Mongoose**: ODM for MongoDB.
- **CORS**: Middleware for enabling cross-origin requests.

### Frontend
- **React.js**: Frontend framework for building the user interface.
- **Axios**: Promise-based HTTP client for making API requests.

## Setup and Installation

### Backend Setup

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/yourusername/blog-backend.git
    cd blog-backend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following:
    ```
    MONGO_URI=mongodb://localhost:27017/blogApp
    ```

4. Start the backend server:
    ```bash
    node server.js
    ```

    The backend should now be running on `http://localhost:5000`.

### Frontend Setup

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/yourusername/blog-frontend.git
    cd blog-frontend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Start the React development server:
    ```bash
    npm start
    ```

    The frontend should now be running on `http://localhost:3000`.

## API Endpoints

### Backend Endpoints

- **GET /posts**: Get a list of all blog posts.
- **GET /posts/:id**: Get a specific blog post by ID.
- **POST /posts**: Create a new blog post.
- **PUT /posts/:id**: Edit an existing blog post.
- **DELETE /posts/:id**: Delete a blog post.

### Sample Request Payload for Creating a Post

```json

{
  "title": "My First Blog Post",
  "content": "This is the content of the first blog post.",
  "createdAt": "2025-02-03T10:00:00.000Z",
  "updatedAt": "2025-02-03T10:00:00.000Z"
}



