import express from "express";
import User from "../../models/User.js";
import jwt from "jsonwebtoken"
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


router.post("/login", async (req, res) => {
    try{
        const {userName, password} = req.body
        const user = await User.findOne({userName});
        console.log(user);
        
        if (!user){
            return res.status(400).json({message:"Invalid Credentials!!!"})
        }
        
        const isPassword = await user.comparePassword(password)
        console.log(isPassword);
        if (!isPassword){
            return res.status(400).json({message:"Invalid Credentials!!!"})
        }
    
        const token = user.createJWT()
        return res.status(201).json({user, token});
    }catch(err){
        return res.status(500).json(err)
    }
})


export default router;