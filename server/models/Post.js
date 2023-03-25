import mongoose from "mongoose";
import User from "./User.js";


const postSchema = mongoose.Schema({
    caption: String,
    location: String,
    creator: {
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:[true, "Username must be provided"]
    },
    tags: [String],
    likeCount:{
        type:Number,
        default: 0
    },
    createdAt:{
        type:Date,
        default: new Date()
    },
})

const Post = mongoose.model("Post", postSchema);

export default Post;