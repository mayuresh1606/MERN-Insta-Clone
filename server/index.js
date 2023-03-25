import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./connect.js";


import homeRouter from "./routers/index.js"
import userRouter from "./routers/users/index.js"
import postRouter from "./routers/posts/index.js"

const CONNECTION_URL = "mongodb+srv://mayuresh_1606:maddy865210@mern.h62t5qm.mongodb.net/?retryWrites=true&w=majority";

const app = express();
const PORT = 5000

app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(cors())

app.use("/", homeRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);


const start = async () => {
    try {
        await connectDB(CONNECTION_URL);
        app.listen(PORT, () => console.log(`App listening on port: ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start();