import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`);
        
        console.log(`\nDatabase connected | Host: ${connectionInstance.
        connection.host}`);

        return connectionInstance;

    } catch (error) {
        console.log("Database connection error!");
        throw error;
    }
}

export default connectDB;