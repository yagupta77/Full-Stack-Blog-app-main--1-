import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { deletePost, get } from '../services/Endpoint';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext'; // Assuming the user data is in context

export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loadedata, setLoadedata] = useState(false);
    const { user } = useAuth(); // Get user data from context

    const handleDelete = async (postId) => {
        // Confirm before deleting
        const confirmed = window.confirm('Are you sure you want to delete this post?');

        if (confirmed) {
            try {
                const response = await deletePost(`/blog/delete/${postId}`);
                const data = response.data;

                if (data.success) {
                    toast.success(data.message);
                    setLoadedata(!loadedata);
                } else {
                    toast.error('Failed to delete the post.');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
                toast.error('Error deleting post');
            }
        }
    };

    const handleUpdate = (postId) => {
        // Implement the update functionality here
        console.log(`Post with ID ${postId} updated.`);
    };

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await get("/blog/GetPosts");
                const data = response.data;
                setPosts(data.posts);
            } catch (error) {
                console.error(error);
            }
        };
        getPosts();
    }, [loadedata]);

    // Check if the user is available before trying to access user.id
    if (!user) {
        return <div>Loading...</div>; // Or any other loading state you prefer
    }

    return (
        <div className="container">
            <h1 className="text-center mb-4">All Posts</h1>
            <div className="row">
                {posts && posts.map((post) => (
                    <div className="col-md-4 mb-4" key={post._id}>
                        <div className="card h-100">
                            <img src={`http://localhost:5000/images/${post.image}`} className="card-img-top" alt={post.title} />
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.desc}</p>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                {/* Update this condition to check if the user is the author of the post */}
                                {(user.id === post.userId) && (
                                    <>
                                        <button className="btn btn-danger" onClick={() => handleDelete(post._id)}>
                                            <FaTrashAlt /> Delete
                                        </button>
                                        <button className="btn btn-warning" onClick={() => handleUpdate(post._id)}>
                                            <FaEdit /> Update
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
