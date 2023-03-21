import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser";
import { connectDB } from "./connect.js";


const CONNECTION_URL = "mongodb+srv://mayuresh_1606:maddy865210@mern.h62t5qm.mongodb.net/?retryWrites=true&w=majority";

const app = express();

const PORT = 5000

app.use("/", (req, res) => {
    res.send("Hello")
})

app.use(bodyParser.json())

const start = async () => {
    try {
        await connectDB(CONNECTION_URL);
        app.listen(PORT, () => console.log(`App listening on port: ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start();