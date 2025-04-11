
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();
const app = express();


// Serve static files from the 'public' directory
app.use(express.static(path.join(process.cwd(),"public")))

// linked middelwares
app.use(express.json());
app.use(cors());


// import db
import connectMongoDB from "./config/database.js";
import User from "./models/user.js";
import Blog from "./models/blog.js";



connectMongoDB((err)=>{
    if(err){
        console.log("Error connecting to MongoDB",err);
    }else{
                
        app.listen(4000,()=>{
            console.log("Server is running on port 4000");
        });
        console.log("Connected to MongoDB");
    }
});