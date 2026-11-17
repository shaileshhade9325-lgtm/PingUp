import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }
        mongoose.connection.on("connected", () => {
            console.log("Database connected");
        });
        await mongoose.connect(`${process.env.MONGODB_URI}/pingup`);
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
        throw error;
    }
};

export default connectDB;
