import { connect } from 'mongoose';
import { config } from 'dotenv';

config(); // Load environment variables

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI; // Get the MongoDB URI from environment variables
        if (!uri) {
            throw new Error('MONGO_URI is not defined in .env file');
        }
        console.log('MongoDB URI:', uri); // Debugging line
        await connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

export default connectDB;