
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


// default route:
app.get("/",(req,res)=>{
    if (req.url !=="/favicon.ico") {
        res.sendFile(path.join(process.cwd(),"public","account","login.html"));
    }
});


// import routes
import accountRoute from "./routes/accountRoutes.js";
import blogRoute from "./routes/blogRoutes.js";


// load routes
app.use('/account',accountRoute);
app.use('/blog',blogRoute);


// import db
import connectMongoDB from "./config/database.js";
import User from "./models/user.js";
import Blog from "./models/blog.js";



connectMongoDB((err)=>{
    if(err){
        console.log("Error connecting to MongoDB",err);
    }else{
        app.listen(3000,()=>{
            console.log("Server is running on port 3000");
        });
        console.log("Connected to MongoDB");         
    }
});