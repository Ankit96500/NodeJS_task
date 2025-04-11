import mongoose from "mongoose";

// create blog schema:
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    }

});

// using blog schema create blog model
const Blog = mongoose.model("Blog",blogSchema);

// export blog model
export default Blog;






