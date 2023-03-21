import mongoose from "mongoose";

export const connectDB = async (URL) => mongoose.connect(URL, {
    useUnifiedTopology: true,
    useNewURLParser: true,
});