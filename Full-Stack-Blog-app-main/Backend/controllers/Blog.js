import BlogModel from "../models/Blog.js"; // Ensure the model name is correct
import fs from "fs";
import path from "path";

// ✅ Create Post
const Create = async (req, res) => {
    try {
        const { title, desc } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Image file is required' });
        }

        const imagePath = req.file.filename;

        // Add userId when creating the blog
        const CreateBlog = new BlogModel({
            title,
            desc,
            image: imagePath,
            userId: req.user.id, // Assuming req.user.id is set by your authentication middleware
        });

        await CreateBlog.save();

        res.status(201).json({
            success: true,
            message: 'Blog Created Successfully',
            blog: CreateBlog
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// ✅ Update Post
// In the backend (controller function)

// For Delete Blog
const DeleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await BlogModel.findById(blogId);

        if (!blog) return res.status(404).json({ message: "Post not found" });

        // Check if logged-in user is the author of the post or an admin
        if (blog.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: "You are not authorized to delete this post" });
        }

        await blog.findByIdAndDelete(blogId);
        res.json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// For Update Blog
const update = async (req, res) => {
    try {
        const { title, desc } = req.body;
        const blogId = req.params.id;

        const blog = await BlogModel.findById(blogId);

        if (!blog) return res.status(404).json({ message: "Post not found" });

        // Check if logged-in user is the author of the post or an admin
        if (blog.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: "You are not authorized to update this post" });
        }

        if (title) blog.title = title;
        if (desc) blog.desc = desc;
        if (req.file) blog.image = req.file.filename;

        await blog.save();

        res.status(200).json({ success: true, message: 'Blog updated successfully', blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


// ✅ Get All Posts
const GetPosts = async (req, res) => {
    try {
        const posts = await BlogModel.find();
        if (!posts.length) {
            return res.status(404).json({ success: false, message: "No blogs found" });
        }
        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// ✅ Export Functions
export { Create, update, GetPosts, DeleteBlog };
