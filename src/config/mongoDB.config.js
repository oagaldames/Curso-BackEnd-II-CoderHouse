import mongosse from "mongoose";
import envs from "./envs.config.js";

export const connectMongoDB = async () => {
    try {
        mongosse.connect(envs.MONGO_URL);
        console.log("MongoDB connected")

    } catch (error) {
        console.log(error);
    }
}