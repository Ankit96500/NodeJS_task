
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hb0jhqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


async function connectMongoDB(cb){
    try {
        mongoose.connect(URI);
        if(cb){
            cb();
        }
    } catch (error) {
        console.log(error);
        if (cb) {
            cb(error)
        }
    }
}



export default connectMongoDB



