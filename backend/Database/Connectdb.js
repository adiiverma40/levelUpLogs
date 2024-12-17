import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv()

async function connectDB() {
    try {
        const connect = await mongoose.connect(process.env.DATABASE_URI)
        console.log(`MongoDB Connected: ${connect.connection.host}`);
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;