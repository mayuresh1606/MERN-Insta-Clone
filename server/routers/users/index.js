import express from "express";
import User from "../../models/User.js";

const router = express.Router();


router.get("/", async (req, res) => {
    try{
        const user = await User.find({});
        res.status(200).json({user});
    }catch(err){
        return res.status(500).json(err)
    }
})

router.post("/", async (req, res) => {
    try{
        console.log(req.body);
        const user = await User.create(req.body)
        if (user){
            return res.status(201).json({message:"user created", user});
        }
    }catch(err){
        return res.status(500).json({err})
    }
})

export default router;