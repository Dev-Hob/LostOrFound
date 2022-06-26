import express from "express"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import env from "dotenv"
import authUser from "./routes/authUser.js"
import data from "./routes/data.js"
import path from 'path';
import { fileURLToPath } from 'url';
//initiating setup for our app
const app = express()
env.config()
const MONGO_URI = process.env.MONGO_URI
//we are using modules in our json types thatswhy __dirname has to be defined initially for later use.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// function trying to establish connection with database
const connect = async () => {
    try{
        await mongoose.connect(MONGO_URI)
    }
    catch(error){
        console.log(error)
    }
}

//listening to event of disconnection
mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconnected!")
})

//listening to event of connection
mongoose.connection.on("connected", () => {
    console.log("mongoDB connected!")
})

//middleware for cookies that we will parse later
app.use(cookieParser())
//middleware for json formating
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.use("/api/auth", authUser)
app.use("/api/data", data)



// if any error or none of above routes then this:
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMsg = err.message || "Something went wrong!";
    return res.status(errorStatus).json(
        {   success: false,
            status: errorStatus, 
            message: errorMsg,
            stack: err.stack
        })
})

//app listening on port 4400 and a callback calls database connection
app.listen(3000, () => {
    connect()
})