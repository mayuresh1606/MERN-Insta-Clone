import express from "express"
const router = express.Router();
import Post from "../../models/Post.js"


router.get("/", async (req, res) => {
    const posts = await Post.find({});
    res.status(200).json({posts});
})


router.post("/", async (req, res) => {
    // console.log(req.)
    try{
        const postBody = req.body;
        const post = await Post.create(postBody)
        res.status(201).json({post});
    }catch(err){
        res.status(500).json(err);
    }
    // const posts = await Post.create()
})

export default router;