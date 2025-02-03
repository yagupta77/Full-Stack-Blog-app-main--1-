import Blgomodel from "../models/Blog.js";

// Get a single post with comments and user data
const GetSinglePost = async (req, res) => {
    try {
        const postId = req.params.id;

        // Validate the postId to ensure it's a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ success: false, message: 'Invalid post ID' });
        }

        const post = await Blgomodel.findById(postId)
            .populate({
                path: "comments",
                populate: {
                    path: "userId"
                }
            });

        if (!post) {
            return res.status(404).json({ success: false, message: 'Blog post not found' });
        }

        res.status(200).json({ success: true, post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export { GetSinglePost };
