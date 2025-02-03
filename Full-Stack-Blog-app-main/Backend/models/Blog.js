import { Schema, model } from 'mongoose';

const BlogSchema = new Schema({
  title: String,
  desc: String,
  image: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Store the user ID
}, { timestamps: true });

const Blog = model('Blog', BlogSchema);

export default Blog;
