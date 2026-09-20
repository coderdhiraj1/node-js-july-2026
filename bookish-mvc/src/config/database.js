import mongoose from 'mongoose';

const connectDB = async(startServer) => {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Database connection established.")
        startServer(null);
    })
    .catch((error) => {
        startServer(error);
    });
}

export default connectDB;